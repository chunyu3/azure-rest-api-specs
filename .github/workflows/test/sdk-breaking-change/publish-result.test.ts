import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildReport, publishResult } from "../../src/sdk-breaking-change/publish-result.ts";
import type { MitigationResult } from "../../src/sdk-breaking-change/types.ts";
import { createMockContext, createMockCore, createMockGithub } from "../mocks.ts";

const headSha = "a".repeat(40);
const workflowSummaryUrl = "https://github.com/owner/repo/actions/runs/456";
let tempDir: string;
let resultDir: string;
let result: MitigationResult;
let github: ReturnType<typeof createMockGithub>;
let core: ReturnType<typeof createMockCore>;

function args() {
  return { github, core, context: createMockContext(), resultDir, workflowSummaryUrl };
}

async function writeResult(): Promise<void> {
  await writeFile(join(resultDir, "sdk-breaking-change-mitigation.json"), JSON.stringify(result));
}

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), "publish-result-"));
  resultDir = join(tempDir, "downloaded-results");
  await mkdir(resultDir);
  github = createMockGithub();
  core = createMockCore();
  github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: headSha } } });
  result = {
    schemaVersion: 1,
    prNumber: 42,
    headSha,
    sdkLanguage: "Go",
    mitigationWorkflowUrl: "https://github.com/owner/repo/actions/runs/123",
    status: "success",
    customizationCode: " \n-old\n+new\n ",
    projects: [
      {
        typespecProject: "specification/service/Widget.Service",
        sdkPackage: "armwidget",
        breakingChanges: [
          {
            breakingChange: "Model changed",
            suggestedFix: "Restore compatibility",
            isResolved: true,
            typespecChangesSummary: ["Added customization", "Additional details"],
          },
          {
            breakingChange: "Property removed",
            suggestedFix: "Restore the property",
            isResolved: false,
          },
        ],
      },
    ],
  };
  await writeResult();
});

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

describe("buildReport", () => {
  it("reads the artifact from resultDir and renders project results and summary links", async () => {
    const built = await buildReport(args());

    expect(built.result).toEqual(result);
    expect(built.report).toContain("## SDK breaking-change mitigation for Go");
    expect(built.report).toContain(`**Mitigation upon commit:** \`${headSha}\``);
    expect(built.report).toContain("**TypeSpec project:** specification/service/Widget.Service");
    expect(built.report).toContain("**SDK package:** armwidget");
    expect(built.report).toContain(
      "| Model changed | Restore compatibility | Added customization |",
    );
    expect(built.report).toContain("| Property removed | Restore the property |");
    expect(built.report).not.toContain("Additional details");
    expect(built.report).toContain(
      `[View Breaking Change Details](${workflowSummaryUrl}#breaking-change)`,
    );
    expect(built.report).toContain("````diff\n-old\n+new\n````");
    expect(built.report).toContain(
      `[View customization code in the workflow summary](${workflowSummaryUrl})`,
    );
    expect(github.rest.pulls.get).toHaveBeenCalledExactlyOnceWith({
      ...createMockContext().repo,
      pull_number: 42,
    });
  });

  it("renders every project separately", async () => {
    result.projects.push({
      typespecProject: "specification/other/Other.Service",
      sdkPackage: "armother",
      breakingChanges: [],
    });
    await writeResult();
    const { report } = await buildReport(args());
    expect(report).toContain("**TypeSpec project:** specification/other/Other.Service");
    expect(report).toContain("**SDK package:** armother");
    expect(report.match(/\[View Breaking Change Details\]/g)).toHaveLength(2);
  });

  it.each([true, false])(
    "renders None for an empty change group (resolved=%s)",
    async (resolved) => {
      result.projects[0].breakingChanges = result.projects[0].breakingChanges.filter(
        (change) => change.isResolved === resolved,
      );
      await writeResult();
      const { report } = await buildReport(args());
      const emptyGroup = resolved ? "Unresolved" : "Resolved";
      expect(report).toContain(`**${emptyGroup} Breaking Changes:**\n\nNone`);
    },
  );

  it("escapes change text and renders missing optional details as empty cells", async () => {
    result.projects[0].breakingChanges = [
      {
        breakingChange: "<Model> | @team",
        suggestedFix: "*restore*",
        isResolved: true,
        typespecChangesSummary: ["[customization]"],
      },
      { breakingChange: "Resolved", suggestedFix: "", isResolved: true },
      {
        breakingChange: "Empty summary",
        suggestedFix: "",
        isResolved: true,
        typespecChangesSummary: [],
      },
      { breakingChange: "Unresolved", suggestedFix: "", isResolved: false },
    ];
    await writeResult();
    const { report } = await buildReport(args());
    expect(report).toContain(
      "| &lt;Model&gt; &#124; &#64;team | \\*restore\\* | \\[customization\\] |",
    );
    expect(report).toContain("| Resolved |  |  |");
    expect(report).toContain("| Empty summary |  |  |");
    expect(report).toContain("| Unresolved |  |");
  });

  it.each([0, 12_000, 12_001])("handles a trimmed diff of %s characters", async (length) => {
    const code = "x".repeat(length);
    result.customizationCode = ` \n${code}\n `;
    await writeResult();
    const { report, result: artifact } = await buildReport(args());
    expect(artifact.customizationCode).toBe(result.customizationCode);
    if (length === 0) {
      expect(report).toContain("No mitigation changes were produced.");
      expect(report).not.toContain("````diff");
    } else {
      const displayed = length > 12_000 ? `${code.slice(0, 12_000)}\n... diff truncated.` : code;
      expect(report).toContain(`\`\`\`\`diff\n${displayed}\n\`\`\`\``);
      if (length <= 12_000) expect(report).not.toContain("diff truncated.");
      else expect(report).not.toContain(code);
    }
  });

  it.each([undefined, "Customization failed"])("reports failure with error %j", async (error) => {
    result.status = "failure";
    result.errorMessage = error;
    await writeResult();
    const { report } = await buildReport(args());
    expect(report).toContain("SDK breaking change mitigation failed.");
    expect(report).toContain(`[See mitigation workflow](${result.mitigationWorkflowUrl})`);
    if (error) expect(report).toContain(error);
    expect(report).not.toContain("**SDK package:**");
    expect(core.warning).toHaveBeenCalledOnce();
    expect(github.rest.pulls.get).not.toHaveBeenCalled();
  });

  it("reports a stale result without displaying its proposed changes", async () => {
    const currentSha = "b".repeat(40);
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: currentSha } } });
    const { report } = await buildReport(args());
    expect(report).toContain(
      `Mitigation result for ${headSha} is stale; current PR head is ${currentSha}.`,
    );
    expect(report).not.toContain("**Customization Code:**");
    expect(core.warning).toHaveBeenCalledOnce();
  });

  it.each(["missing file", "invalid JSON", "invalid schema"])("rejects %s", async (kind) => {
    const file = join(resultDir, "sdk-breaking-change-mitigation.json");
    if (kind === "missing file") await rm(file);
    else await writeFile(file, kind === "invalid JSON" ? "{" : '{"schemaVersion":2}');
    await expect(buildReport(args())).rejects.toThrow();
    expect(github.rest.pulls.get).not.toHaveBeenCalled();
  });

  it("propagates PR lookup failures", async () => {
    github.rest.pulls.get.mockRejectedValue(new Error("PR lookup failed"));
    await expect(buildReport(args())).rejects.toThrow("PR lookup failed");
  });
});

describe("publishResult", () => {
  it("publishes the report with the language command, identity markers, and outputs", async () => {
    const { report } = await buildReport(args());
    await publishResult(args());

    expect(core.setOutput).toHaveBeenCalledWith("issue_number", 42);
    expect(core.setOutput).toHaveBeenCalledWith("head_sha", headSha);
    expect(github.rest.issues.createComment).toHaveBeenCalledExactlyOnceWith({
      ...createMockContext().repo,
      issue_number: 42,
      body: `/azsdk sdk-breaking-run Go\n\n${report}\n<!-- sdk-breaking-change-head-sha: ${headSha} -->\n<!-- /azsdk sdk-breaking-run Go -->`,
    });
  });

  it.each(["failure", "stale"] as const)("publishes a %s warning report", async (kind) => {
    if (kind === "failure") {
      result.status = "failure";
      await writeResult();
    } else {
      github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "b".repeat(40) } } });
    }
    await publishResult(args());
    expect(github.rest.issues.createComment).toHaveBeenCalledOnce();
    const comment = github.rest.issues.createComment.mock.calls[0]?.[0] as {
      issue_number: number;
      body: string;
    };
    expect(comment.issue_number).toBe(42);
    expect(comment.body).toContain(kind === "failure" ? "mitigation failed." : "is stale;");
  });

  it("does not publish or emit identity outputs for an invalid artifact", async () => {
    await writeFile(join(resultDir, "sdk-breaking-change-mitigation.json"), "{}");
    await expect(publishResult(args())).rejects.toThrow();
    expect(core.setOutput).not.toHaveBeenCalled();
    expect(github.rest.issues.createComment).not.toHaveBeenCalled();
    expect(github.rest.issues.updateComment).not.toHaveBeenCalled();
  });

  it("propagates comment publication errors", async () => {
    github.rest.issues.createComment.mockRejectedValue(new Error("Comment permission denied"));
    await expect(publishResult(args())).rejects.toThrow("Comment permission denied");
  });
});
