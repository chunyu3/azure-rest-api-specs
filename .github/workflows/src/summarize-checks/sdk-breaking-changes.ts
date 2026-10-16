import type { IssueComment } from "../comment.ts";
import { SDK_LANGUAGES_BY_LABEL } from "../sdk-breaking-change/resolve-analysis-inputs.ts";

export function hasSdkBreakingChanges(labels: string[]): boolean {
  return Array.from(SDK_LANGUAGES_BY_LABEL.keys()).some((label) => labels.includes(label));
}

export function buildSdkBreakingChangesSummary(
  labels: string[],
  comments: IssueComment[],
  headSha: string,
  prUrl: string,
): string {
  const rows: string[] = [];
  for (const [label, language] of SDK_LANGUAGES_BY_LABEL) {
    if (!labels.includes(label)) {
      continue;
    }

    const reportLink = (stage: "analysis" | "mitigate"): string | undefined => {
      const command = `/azsdk sdk-breaking-${stage} ${language}`;
      const report = comments.findLast(
        (comment) =>
          comment.user?.login === "github-actions[bot]" &&
          comment.body?.startsWith(`${command}\n`) &&
          comment.body.includes(`<!-- ${command} -->`) &&
          comment.body.includes(`<!-- sdk-breaking-change-head-sha: ${headSha} -->`),
      );
      return report ? `<a href="${prUrl}#issuecomment-${report.id}">View report</a>` : undefined;
    };

    const analysis = reportLink("analysis");
    const mitigation = reportLink("mitigate");
    const approvalLabel = `${label}-Approved`;
    const approved = labels.includes(approvalLabel);
    const nextAction = approved
      ? "SDK breaking changes approved."
      : (mitigation
          ? "Review the mitigation report, apply any proposed customizations, then rerun SDK validation. "
          : analysis
            ? "Review the analysis and mitigation guidance. "
            : "Check the SDK validation results; analysis is not yet available for this commit. ") +
        `For accepted breaking changes, request <code>${approvalLabel}</code> from an authorized reviewer.`;
    rows.push(
      `<tr><td>${language === "DotNet" ? ".NET" : language}</td>` +
        `<td>Breaking changes detected; ${approved ? "approved" : "approval required"}</td>` +
        `<td>${analysis ?? "Not available for this commit"}</td>` +
        `<td>${mitigation ?? "Not available for this commit"}</td>` +
        `<td>${nextAction}</td></tr>`,
    );
  }
  if (rows.length === 0) {
    return "";
  }
  return (
    "<h3>SDK Breaking Change detection and mitigation</h3>" +
    "<table><thead><tr><th>Language</th><th>Detection / approval</th><th>Analysis</th>" +
    "<th>Mitigation</th><th>Next action</th></tr></thead><tbody>" +
    rows.join("") +
    "</tbody></table>" +
    "<p>Mitigation reports contain proposed changes; they do not mean those changes have been applied or validated.</p>"
  );
}
