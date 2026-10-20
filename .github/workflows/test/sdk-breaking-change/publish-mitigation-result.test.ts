import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  buildMitigationReport,
  publishMitigationResult,
} from "../../src/sdk-breaking-change/publish-mitigation-result.ts";
import { createMockContext, createMockCore, createMockGithub } from "../mocks.ts";

let resultsPath: string;
let mitigationResultPath: string;

beforeEach(async () => {
  resultsPath = join(import.meta.dirname, `results-${crypto.randomUUID()}`);
  mitigationResultPath = join(resultsPath, "sdk-breaking-change-mitigation.json");
  await mkdir(resultsPath, { recursive: true });
  await writeFile(
    mitigationResultPath,
    JSON.stringify({
      schemaVersion: 1,
      prNumber: 42,
      headSha: "a".repeat(40),
      sdkLanguage: "Java",
      mitigationWorkflowUrl: "https://github.com/owner/repo/actions/runs/456",
      status: "success",
      customizationCode: "+customization",
      projects: [
        {
          typespecProject: "specification/service/Widget.Service",
          sdkPackage: "armwidget",
          breakingChanges: [
            {
              id: "model-change",
              breakingChange: "Model changed",
              suggestedFix: "Restored compatibility",
              isResolved: true,
              typespecChangesSummary: ["Added client customization"],
            },
            {
              id: "property-change",
              breakingChange: "Property changed",
              suggestedFix: "Restore the old property",
              isResolved: false,
            },
          ],
        },
      ],
    }),
  );
});

afterEach(async () => {
  await rm(resultsPath, { recursive: true, force: true });
});

describe("buildMitigationReport", () => {
  it("builds resolved and unresolved mitigation sections", async () => {
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });

    const { report } = await buildMitigationReport({
      github,
      context: createMockContext(),
      core: createMockCore(),
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(report).toContain("**TypeSpec project:** specification/service/Widget.Service");
    expect(report).toContain(
      "| Model changed | Restored compatibility | Added client customization |",
    );
    expect(report).toContain("| Property changed | Restore the old property |");
    expect(report).toContain("````diff\n+customization\n````");
    expect(report).toContain(
      "<details><summary>View customization Code</summary>\n\n````diff\n+customization\n````\n\n</details>",
    );
    expect(report).toContain(
      "<details open><summary>View resolved breaking changes</summary>\n\n| ID | Breaking change | Resolution | TypeSpec changes |",
    );
  });

  it("keeps the no-changes message outside a collapsible block", async () => {
    const artifact = JSON.parse(await readFile(mitigationResultPath, "utf8")) as Record<
      string,
      unknown
    >;
    await writeFile(
      mitigationResultPath,
      JSON.stringify({ ...artifact, customizationCode: " \n " }),
    );
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });

    const { report } = await buildMitigationReport({
      github,
      context: createMockContext(),
      core: createMockCore(),
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(report).toContain("No mitigation changes were produced.");
    expect(report).not.toContain("<details>");
  });

  it("includes the full customization code even beyond 12,000 characters", async () => {
    const customizationCode = `+${"a".repeat(12_000)}`;
    const artifact = JSON.parse(await readFile(mitigationResultPath, "utf8")) as Record<
      string,
      unknown
    >;
    await writeFile(mitigationResultPath, JSON.stringify({ ...artifact, customizationCode }));
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });

    const { report, result } = await buildMitigationReport({
      github,
      context: createMockContext(),
      core: createMockCore(),
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(report).toContain(`\`\`\`\`diff\n${customizationCode}\n\`\`\`\``);
    expect(report).not.toContain("diff truncated.");
    expect(result.customizationCode).toBe(customizationCode);
  });

  it("displays None when all breaking changes are resolved", async () => {
    const artifact = JSON.parse(await readFile(mitigationResultPath, "utf8")) as {
      projects: Array<{ breakingChanges: Array<{ isResolved: boolean }> }>;
    };
    artifact.projects[0].breakingChanges = artifact.projects[0].breakingChanges.filter(
      ({ isResolved }) => isResolved,
    );
    await writeFile(mitigationResultPath, JSON.stringify(artifact));
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });

    const { report } = await buildMitigationReport({
      github,
      context: createMockContext(),
      core: createMockCore(),
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(report).toContain("**Unresolved Breaking Changes:**\n\nNone");
    expect(report).not.toContain("| ID | Breaking change | Suggested resolution |");
  });

  it("displays None when no breaking changes are resolved", async () => {
    const artifact = JSON.parse(await readFile(mitigationResultPath, "utf8")) as {
      projects: Array<{ breakingChanges: Array<{ isResolved: boolean }> }>;
    };
    artifact.projects[0].breakingChanges = artifact.projects[0].breakingChanges.filter(
      ({ isResolved }) => !isResolved,
    );
    await writeFile(mitigationResultPath, JSON.stringify(artifact));
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });

    const { report } = await buildMitigationReport({
      github,
      context: createMockContext(),
      core: createMockCore(),
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(report).toContain("**Resolved Breaking Changes:**\n\nNone");
    expect(report).not.toContain("| ID | Breaking change | Resolution | TypeSpec changes |");
  });
});

describe("publishMitigationResult", () => {
  it("publishes using the language-specific mitigation command", async () => {
    const github = createMockGithub();
    github.rest.pulls.get.mockResolvedValue({ data: { head: { sha: "a".repeat(40) } } });
    const core = createMockCore();

    await publishMitigationResult({
      github,
      context: createMockContext(),
      core,
      mitigationResultPath,
      workflowSummaryUrl: "https://github.com/owner/repo/actions/runs/456",
    });

    expect(github.rest.issues.createComment).toHaveBeenCalled();
    const comment = github.rest.issues.createComment.mock.calls[0]?.[0] as {
      issue_number: number;
      body: string;
    };
    expect(comment.issue_number).toBe(42);
    expect(comment.body).toMatch(/^\/azsdk sdk-breaking-mitigate Java\n\n/);
    expect(comment.body).toContain(`<!-- sdk-breaking-change-head-sha: ${"a".repeat(40)} -->`);
    expect(core.setOutput).toHaveBeenCalledWith("issue_number", 42);
    expect(core.setOutput).toHaveBeenCalledWith("head_sha", "a".repeat(40));
  });
});
