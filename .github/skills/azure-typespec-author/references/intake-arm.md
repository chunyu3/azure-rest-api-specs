# TypeSpec ARM Authoring - Intake and Clarification

Complete all sub-steps to collect required information before proceeding to implementation.

| Sub-step                                                     | Goal                               | Mandatory?      |
| ------------------------------------------------------------ | ---------------------------------- | --------------- |
| [1.1 Analyze Project](#step-11-analyze-the-typespec-project) | Gather project inputs              | Yes             |
| [1.1.1 Detect Go SDK Breaking Changes](#step-111-detect-go-sdk-breaking-changes) | Identify Go breaking-change list (for "resolve Go" requests) | Yes (when requested) |
| [1.2 Identify Case](#step-12-identify-supported-case)        | Match request to a supported case  | Yes             |
| [1.3 Display Results](#step-13-display-analysis-results)     | Show analysis summary to user      | Yes             |
| [1.4 Case-Specific Intake](#step-14-case-specific-intake)    | Collect additional inputs per case | Only if matched |
| [1.5 Confirm & Proceed](#step-15-summary-and-confirmation)   | Confirm collected information      | Yes             |

---

## Step 1.1: Analyze the TypeSpec Project

> **Prerequisite**: ALWAYS complete this step before asking case-specific questions.

Collect the following inputs. Ask **up to 6 concise questions** for any that are missing:

| #   | Input                                   | Example                                                          |
| --- | --------------------------------------- | ---------------------------------------------------------------- |
| 1   | **Spec root / folder**                  | `/specification/widget/resource-manager/Microsoft.Widget/Widget` |
| 2   | **Path to tspconfig.yaml**              | `<spec-root>/tspconfig.yaml`                                     |
| 3   | **Service type**                        | management-plane / data-plane                                    |
| 4   | **Existing API versions**               | `2024-01-01 (stable)`, `2024-06-01-preview (preview)`            |
| 5   | **Latest API version**                  | Most recent entry in the `Versions` enum                         |
| 6   | **Current working API version**         | The version being added or modified this session                 |
| 7   | **Intent**                              | add / modify / fix                                               |
| 8   | **Target resource/interface/operation** | Resource or operation name (if known)                            |
| 9   | **Constraints**                         | Breaking-change limits, naming rules, emitter targets, etc.      |

## Step 1.1.1: Detect Go SDK Breaking Changes

Run this step during intake when the user asks to **resolve Go SDK breaking changes** (or otherwise requests Go breaking-change detection).

**Gate**: If the user request is to **resolve Go SDK breaking changes**, you MUST complete Step 1.1.1 **before** presenting the Step 1.3 analysis output.

**Goal**: Produce a concrete list of Go SDK breaking changes so subsequent authoring is scoped to exactly what needs to be fixed.

**How to run**:

Before running detection, ask the minimum questions to confirm required inputs:
 
### Questions

```
1. Which language SDK?
   □ Go
   □ JavaScript
   □ Java
   □ .NET

2. What is the language SDK repo root path on disk?
   Example (Windows): C:\dev\azure-sdk-for-go

3. What is the spec repo root path on disk?
   Example (Windows): C:\dev\azure-rest-api-specs

4. What is the TypeSpec project path (the folder that contains tspconfig.yaml)?
   Example (relative to azure-rest-api-specs): specification\webpubsub\resource-manager\Microsoft.SignalRService\SignalRService

```

### Data Collected
```json
{
   "goSdkRepoRoot": "[user input of Question #2]",
   "specRepoRoot": "[user input of Question #3]",
   "typeSpecProjectPath": "[user input of Question #4]",
}
```

- Follow the `detect-go-sdk-breaking-change` skill (`.github/skills/detect-go-sdk-breaking-change/SKILL.md`).

### Prompt Template (copy/paste)

Use this when you already collected answers to the Questions above and want to run the skill with those parameters (without re-asking).

```
Run the skill: detect-go-sdk-breaking-change.

Use the following inputs (collected from previous questions; do not ask again):
- goSdkRoot: <PASTE goSdkRepoRoot HERE>
- specsRoot: <PASTE specRepoRoot HERE>
- typeSpecProjectPath: <PASTE typeSpecProjectPath HERE>
- tspConfigRelativePath: <typeSpecProjectPath>\tspconfig.yaml

Output:
- Return a concise list formatted exactly like:
   ### Breaking Changes
   - ...
   ### Features Added
   - ...
```

Notes:
- `typeSpecProjectPath` must be the folder containing `tspconfig.yaml`.
- In JSON, Windows paths must escape backslashes (use `\\`). If you use YAML instead, you can use normal `C:\dev\...`.

**If prerequisites are missing** (no local `azure-sdk-for-go` clone / no Go toolchain), the user cancels the generation, or detection otherwise fails (generator error, changelog not produced, etc.):

- Ask the user to paste the Go changelog excerpt for the package: the first `## <version>` section, including both `### Breaking Changes` and `### Features Added`.
- Proceed using that pasted content as the **Detected Go SDK Breaking Changes** list in Step 1.3.

Suggested prompt to the user (copy/paste):

```
I couldn't complete automatic Go breaking-change detection (missing prerequisites / generation failed / cancelled).

Please paste the FIRST `## <version>` section from the generated Go package changelog,
including both `### Breaking Changes` and `### Features Added`.

For WebPubSub ARM, it is typically at:
   <go-sdk-root>\sdk\resourcemanager\webpubsub\armwebpubsub\CHANGELOG.md
```

---

## Step 1.2: Identify Supported Case

Match the user's request to a supported case:

| Case | Name                                                                       | Description                                                                                             |
| ---- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | [Add New Preview Version](#case-1-add-new-preview-version)                 | Add a new preview API version to the `Versions` enum                                                    |
| 2    | [Add New Stable Version](#case-2-add-new-stable-version)                   | Promote existing preview API version to a new stable API version or add the stable version from scratch |
| 3    | [Add New Resource Type](#case-3-add-new-resource-type)                     | Define a new ARM resource with operations                                                               |
| 4    | [Add Operations](#case-4-add-operations)                                   | Add CRUD operations or custom actions on a resource                                                     |
| 5    | [Add Long-Running Operation (LRO)](#case-5-add-long-running-operation-lro) | Add or configure an async/LRO operation                                                                 |
| 6    | [Add Patch Operation](#case-6-add-patch-operation)                         | Add a PATCH/update operation on a resource                                                              |
| 7    | [Add Paging](#case-7-add-paging)                                           | Add or configure pagination on list operations                                                          |
| 8    | [Add Decorators](#case-8-add-decorators)                                   | Add decorators on resources, properties, or operations                                                  |

> Cases 1-2 are **end-to-end user stories** -- the agent should proactively ask what features to add after the version is created.

- **Matched** -> Proceed to [Step 1.4](#step-14-case-specific-intake) for that case.
- **No match** -> Skip to **Step 2: Retrieve Solution** using Step 1.1 inputs and the user's request.

---

## Step 1.3: Display Analysis Results

> **MANDATORY**: You MUST display this output before proceeding. Do NOT skip.

```
TypeSpec Project Analysis

Spec Root: /path/to/project
tspconfig.yaml: /path/to/project/tspconfig.yaml
Service Type: management-plane
API Versions: 2024-01-01 (stable), 2024-06-01-preview (preview)
Latest Version: 2024-06-01-preview (preview)
Working Version: [TBD]
Intent: [add/modify/fix]
Target: [resource/operation if known]
Constraints: [if any]
Selected Case: [Case Name or "None"]

Detected Go SDK Breaking Changes: [Include when Step 1.1.1 was run]
   ### Breaking Changes
   - [Breaking change #1]
   - [Breaking change #2]
   ### Features Added
   - [New Feature #1]
   - [New Feature #2]
```

---

## Step 1.4: Case-Specific Intake

> Only collect if a supported case was matched in Step 1.2. Ask for any information not already known from Step 1.1.

### Case 1: Add New Preview Version

**Required information:**

- New preview version string (`YYYY-MM-DD-preview`)
- Whether latest existing version is preview or stable

**Key rule:** If latest is preview → replace it. If latest is stable → add new entry. New entry MUST use `@previewVersion`.

### Case 2: Add New Stable Version

**Required information:**

- New stable version string (`YYYY-MM-DD`)
- Which preview features (if any) to exclude from promotion

**Key rule:** Add new entry without `@previewVersion`. Alert user to breaking changes from previous stable version (these require breaking change review). Breaking changes from preview are expected and do not require review.

### Case 3: Add New Resource Type

**Required information:**

- Target API version(s)
- Resource name (PascalCase)
- Top-level or nested (if nested, parent resource)
- Resource properties (name, type, required/optional, description)

**Defaults (apply unless user says otherwise):**
- Base type: top-level → TrackedResource, child of another resource → ProxyResource
- All resources get: createOrReplace (PUT, async), get, update/patch, delete (async), list by parent
- Resources with resourceGroup as parent also get list by subscription
- Use `createOrReplace` templates (not `createOrUpdate`)
- Use `ArmCustomPatch` with updatable properties from resource and its properties bag

**Key rule:** Top-level tracked resources MUST have `listByResourceGroup` and `listBySubscription`.

---
### Case 4: Add Operations

**Required information:**

- Target resource
- Operation type (CRUD or custom action)
- Operation name (for custom actions)
- Request/response models (for custom actions)

**Defaults (apply unless user says otherwise):**
- Never async: GET, LIST, HEAD
- Default async (LRO): PUT, DELETE
- Default sync: PATCH
- Always ask user: POST/action

**Key rule:** Use `createOrReplace` templates (not `createOrUpdate`). Use `ArmCustomPatch` for PATCH.

---

### Case 5: Add Long-Running Operation (LRO)

**Required information:**

- Target resource and operation
- LRO template to use (e.g., `ArmResourceCreateOrReplaceAsync`, `ArmResourceDeleteWithoutOkAsync`)
- Final state via polling (if non-standard)

**Key rule:** PUT and DELETE default to async (LRO). GET, LIST, HEAD can never be async. Use `createOrReplace` (not `createOrUpdate`) templates.

---

### Case 6: Add Patch Operation

**Required information:**

- Target resource
- Which properties are patchable

**Key rule:** Use `ArmCustomPatch` with a PATCH request template that takes updatable properties from the resource and its `properties` bag. PATCH defaults to sync.

---

### Case 7: Add Paging

**Required information:**

- Target list operation(s)
- Whether default ARM paging is sufficient or custom paging is needed

**Key rule:** ARM list operations (e.g., `ArmResourceListByParent`, `ArmListBySubscription`) include paging by default.

---

### Case 8: Add Decorators

**Required information:**

- Target element (resource, property, operation, model, enum, union)
- Decorator name or intent (e.g., visibility, versioning, encoding)
- Decorator parameters/values

**Key rule:** If using versioning decorators (`@added`, `@removed`, `@renamedFrom`, etc.), ensure `@typespec/versioning` is imported.

### Verify and resolve Go SDK breaking changes

- This is handled during intake in **Step 1.1.1** when the user asks to resolve Go SDK breaking changes.

---

## Step 1.5: Summary and Confirmation

Display collected information and wait for user confirmation:

```
Information Collection Complete

Case: [Case Name]
Namespace: [namespace]
Project Path: [path]
Latest Version: [version] ([preview/stable])
Requested Changes: [summary]
Target Version(s): [versions]

Is this information correct? (yes/no)
```

Once confirmed, proceed to Step 2: Retrieve Solution.
