---
name: detect-go-sdk-breaking-change
description: "Detect go sdk breaking changes"
---

## Workflow

Follow these steps to help users review the Go SDK breaking changes.

### Step 1: Generate Go SDK

run command under directory `C:\project\azure-sdk-for-go\eng\tools\generator`

```
go run . generate c:\project\azure-sdk-for-go c:\project\azure-rest-api-specs --tsp-config=specification\webpubsub\resource-manager\Microsoft.SignalRService\SignalRService\tspconfig.yaml
```

### Step2: Analyze Breaking Changes Systematically

read first '### Breaking Changes' chapter in changelog file 'C:\project\azure-sdk-for-go\sdk\resourcemanager\webpubsub\armwebpubsub\CHANGELOG.md'
