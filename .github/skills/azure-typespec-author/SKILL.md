---
name: azure-typespec-author
description: "Author or modify Azure TypeSpec API specifications in the azure-rest-api-specs repository. USE FOR: Any task that creates, modifies, or troubleshoots .tsp files or TypeSpec API specifications — including but not limited to API versioning, ARM or data-plane resource definitions (tracked, proxy, extension, child resources), resource operations (CRUD, PATCH, custom actions, async/LRO), models, enums, unions, properties, decorators, constraints, and swagger-to-TypeSpec conversion. Resolve SDK breaking changes for a typespec project. Resolve TypeSpec compiler errors. DO NOT USE FOR: SDK generation from TypeSpec, releasing SDK packages, single MCP tool calls that do not require multi-step workflows. TOOLS/COMMANDS: azsdk_typespec_generate_authoring_plan, azsdk_run_typespec_validation"
---

# Azure TypeSpec Author

## Quick Reference

| Property | Value |
|----------|-------|
| **Services** | Azure TypeSpec API Specifications (ARM & Data-plane) |
| **MCP Tools** | `azsdk_typespec_generate_authoring_plan`, `azsdk_run_typespec_validation` |
| **Best For** | Authoring, modifying, and troubleshooting `.tsp` files |

## When to Use This Skill

- Creating, modifying, or deleting content in `.tsp` files
- API versioning (adding preview or stable versions)
- ARM or data-plane resource definitions (tracked, proxy, extension, child resources)
- Resource operations (CRUD, PATCH, custom actions, async/LRO)
- Models, enums, unions, properties, decorators, and constraints
- Swagger-to-TypeSpec conversion follow-up

## MCP Tools

| Tool | Command | Use |
|------|---------|-----|
| `azsdk_typespec_generate_authoring_plan` | Generate authoring plan | Produces a grounded plan for TypeSpec changes based on user request and existing code |
| `azsdk_run_typespec_validation` | Run validation | Runs TypeSpec compilation and lint validation after edits |

---

## Operating Principles

> **Non-negotiable** — all principles below apply to every invocation of this skill.

1. **This skill is MANDATORY for ALL `.tsp` file edits.** Any request that modifies, creates, or deletes content in a `.tsp` file MUST follow the full workflow — regardless of how simple the change appears. There are no "trivial" TypeSpec edits. Even changing a single `?` (optional → required) can be a breaking change requiring versioning decorators.
2. **Do not edit any files until you have required inputs and have retrieved a solution.** Use the `azsdk_typespec_generate_authoring_plan` MCP tool.
3. **Make minimal, scoped edits** to satisfy the request. Avoid refactors unless explicitly asked.
4. **After edits, validate** (compile / lint / emitter checks if available) and report results.
5. **Always provide references** (titles / sections / links) from retrieved context that justify the recommended approach.

---

## Workflow Steps

> **All 6 steps are MANDATORY. Do NOT skip any step.**

| Step | Name | Tool / File | Gate |
|------|------|-------------|------|
| 1 | [Intake & Clarification](#step-1-intake--clarification) | `references/intake-arm.md` | All inputs collected + analysis displayed |
| 2 | [Retrieve Solution](#step-2-retrieve-solution) | `azsdk_typespec_generate_authoring_plan` | Grounded plan returned |
| 3 | [Apply Changes](#step-3-apply-changes) | Editor | User confirms uncertainties |
| 4 | [Validate](#step-4-validate) | `azsdk_run_typespec_validation` | Compilation passes + request satisfied |
| 5 | [Summarize](#step-5-summarize) | — | Summary displayed to user |
| 6 | [Next Steps](#step-6-next-steps) | `references/next-steps-arm.md` | Follow-up actions presented |

---

### Step 1: Intake & Clarification

Follow `references/intake-arm.md` to gather all required inputs.

Do NOT proceed to Step 2 until all required inputs are collected **and** the analysis output has been displayed.

---

### Step 2: Retrieve Solution

Invoke `azsdk_typespec_generate_authoring_plan` MCP tool:

| Parameter | Value |
|-----------|-------|
| `request` | User request (verbatim) |
| `additionalInformation` | Relevant `.tsp` code read from the project |
| `typeSpecProjectRootPath` | TypeSpec project root path |

Do NOT proceed to Step 3 without a grounded plan from this tool.

---

### Step 3: Apply Changes

Only after a grounded plan is produced:

1. Confirm with user if any uncertainties remain
2. Make the minimal changes required in the relevant `.tsp` files
3. Prefer the official template/pattern from retrieved context even if the repo has older patterns

---

### Step 4: Validate

This step has **two parts**:

#### Part 1 — The two validation actions to take

1. **Run TypeSpec validation (tool-driven)**
   - Invoke `azsdk_run_typespec_validation` to run TypeSpec compilation + lint validation.
   - Follow the **Validation plan** returned by `azsdk_typespec_generate_authoring_plan` (if it calls out specific commands, project roots, or checks, use those).

   **MANDATORY: Show what you are validating**
   - In chat, explicitly state the validation plan you are following, including:
     - The TypeSpec project root path being validated
     - The exact tool or command being run (prefer `azsdk_run_typespec_validation`; if you also run `tsp compile`, say so)
     - What the validation is expected to prove (compile success, linter/ruleset success, emitter output presence, etc.)
   - If you retry validation (e.g., transient tool failure), explain why you retried and which run’s result you are reporting.
   - If the authoring plan requires checking generated OpenAPI output, show **where** you checked (file path(s) under the project) and **what** you looked for (e.g., presence of specific parameters on a specific operation).

2. **Verify the change satisfies the user request (intent-driven)**
   - Re-check the requested operations/models/decorators exist and match the requested behavior.
   - Confirm versioning and ARM/Azure patterns required by the retrieved plan are applied.
   - If the request includes examples / new endpoints / new API version, confirm those artifacts are present and correctly wired.

#### Part 2 — How to handle validation outcomes

- If validation **fails** → fix forward with minimal changes and re-validate.
  - Prefer addressing the *root* compile/lint error over suppressing it.
  - Keep changes scoped to what the retrieved plan requires.

- If validation **passes** → ensure Part 1.2 (intent verification) also passes.
  - If validation passes **but the request is not satisfied** → go back to **Step 1** and run another full iteration (Steps 1–4) using what you learned.

- **Iteration cap**: at most **2 total iterations**. If the second iteration still does not satisfy the request, stop and ask the user for clarification or to narrow scope.

Do NOT skip validation even if the change appears trivial.

---

### Step 5: Summarize

Return the following to the user:

| Item | Detail |
|------|--------|
| **Files changed** | List of modified files |
| **What changed** | Brief description of changes and rationale |
| **Validation results** | Pass/fail + key output |
| **References** | Titles/sections/links from the azure-sdk-mcp/azsdk_typespec_generate_authoring_plan tool response (do not omit this even for small or trivial changes) that justify decisions |

---

### Step 6: Next Steps

Read the file `references/next-steps-arm.md` (using the read_file tool) and execute **ALL** of its instructions.

> **Do NOT** summarize and end your turn without presenting the follow-up actions from `references/next-steps-arm.md` to the user. The user must be given the opportunity to request additional changes.

---

## Related Skills & References

| Resource | Purpose |
|----------|---------|
| [`references/intake-arm.md`](references/intake-arm.md) | Step 1 — Intake and clarification steps for ARM authoring |
| [`references/next-steps-arm.md`](references/next-steps-arm.md) | Step 6 — Post-authoring follow-up actions and case-specific guidance |
| `sdk-generation` skill | SDK generation from TypeSpec |
| `check-package-readiness` skill | Release readiness checks |
