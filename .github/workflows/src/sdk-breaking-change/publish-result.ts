import type { GitHubScriptArgs } from "../github.ts";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { escapeMarkdown, table } from "@azure-tools/specs-shared/markdown";
import { MarkdownHeadingId, type MitigationResult, MitigationResultSchema } from "./types.ts";
import { publishResultInComment } from "./publish-result-in-comment.ts";
import { publishMitigationSuggestions } from "./publish-mitigation-suggestions.ts";

const MAX_CHANGED_CODE_LENGTH = 12_000;

export async function buildReport({
  github,
  context,
  core,
  resultDir,
  workflowSummaryUrl,
}: GitHubScriptArgs & {
  resultDir: string;
  workflowSummaryUrl: string;
}): Promise<{ report: string; result: MitigationResult }> {
  const mitigationResultPath = path.join(resultDir, "sdk-breaking-change-mitigation.json");
  const result = MitigationResultSchema.parse(
    JSON.parse(await readFile(mitigationResultPath, "utf8")),
  );
  if (result.status !== "success") {
    const errorMessage = `SDK breaking change mitigation failed.\n\n${result.errorMessage ?? ""}\n\n[See mitigation workflow](${result.mitigationWorkflowUrl})`;
    core.warning(errorMessage); // Handle the failure case if needed
    return { report: `❌ ${errorMessage}`, result };
  }
  const { data: pull } = await github.rest.pulls.get({
    ...context.repo,
    pull_number: result.prNumber,
  });
  if (pull.head.sha !== result.headSha) {
    const staleMessage = `Mitigation result for ${result.headSha} is stale; current PR head is ${pull.head.sha}.`;
    core.warning(staleMessage);
    return { report: `⚠️ ${staleMessage}`, result };
  }
  const breakingChangeSummary = [workflowSummaryUrl, "#", MarkdownHeadingId.BreakingChange].join(
    "",
  );
  const projectSections = result.projects.flatMap((project) => {
    const resolvedChanges: string[][] = project.breakingChanges
      .filter((change) => change.isResolved)
      .map((change) => [
        escapeMarkdown(change.breakingChange),
        change.suggestedFix ? escapeMarkdown(change.suggestedFix) : "",
        change.typespecChangesSummary?.[0] ? escapeMarkdown(change.typespecChangesSummary[0]) : "",
      ]);
    const unresolvedChanges: string[][] = project.breakingChanges
      .filter((change) => !change.isResolved)
      .map((change) => [
        escapeMarkdown(change.breakingChange),
        change.suggestedFix ? escapeMarkdown(change.suggestedFix) : "",
      ]);
    return [
      `**TypeSpec project:** ${project.typespecProject}`,
      "",
      `**SDK package:** ${project.sdkPackage}`,
      "",
      `[View Breaking Change Details](${breakingChangeSummary})`,
      "**Resolved Breaking Changes:**",
      "",
      resolvedChanges.length > 0
        ? table([["Breaking change", "Resolution", "TypeSpec changes"], ...resolvedChanges])
        : "None",
      "",
      "**Unresolved Breaking Changes:**",
      "",
      unresolvedChanges.length > 0
        ? table([["Breaking change", "Suggested resolution"], ...unresolvedChanges])
        : "None",
      "",
    ];
  });

  const fullChangedCode = result.customizationCode.trim();
  const changedCode =
    fullChangedCode.length > MAX_CHANGED_CODE_LENGTH
      ? `${fullChangedCode.slice(0, MAX_CHANGED_CODE_LENGTH)}\n... diff truncated.`
      : fullChangedCode;
  return {
    report: [
      `## SDK breaking-change mitigation for ${result.sdkLanguage}`,
      "",
      `**Mitigation upon commit:** \`${result.headSha}\``,
      "",
      ...projectSections,
      "**Customization Code:**",
      "",
      changedCode
        ? ["````diff", changedCode, "````"].join("\n")
        : "No mitigation changes were produced.",
      `[View customization code in the workflow summary](${workflowSummaryUrl})`,
    ].join("\n"),
    result,
  };
}

export async function publishResult({
  github,
  context,
  core,
  resultDir,
  workflowSummaryUrl,
}: GitHubScriptArgs & {
  resultDir: string;
  workflowSummaryUrl: string;
}): Promise<void> {
  const buildResult = await buildReport({
    github,
    context,
    core,
    resultDir,
    workflowSummaryUrl,
  });
  core.setOutput("issue_number", buildResult.result.prNumber);
  core.setOutput("head_sha", buildResult.result.headSha);
  await publishResultInComment(
    { github, context, core },
    buildResult.result.prNumber,
    `/azsdk sdk-breaking-run ${buildResult.result.sdkLanguage}`,
    buildResult.report,
    buildResult.result.headSha,
  );
}
