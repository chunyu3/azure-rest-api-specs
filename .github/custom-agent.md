┌──────┐          ┌─────────────┐          ┌───────────┐          ┌───────────┐          ┌────────────────┐
│ User │          │ custom agent│          │ azsdk     │          │ AI search │          │ llms.txt       │ 
│      │          │ Copilot     │          │ MCP       │          │           │          │ web fetch tool │
└──┬───┘          └──────┬──────┘          └─────┬─────┘          └─────┬─────┘          └──────┬─────────┘
   │                     │                       │                      │                        │
   │ "Add new preview    │                       │                      │                        │
   │  version 2025-12-09 │                       │                      │                        │
   │  to my project"     │                       │                      │                        │
   │────────────────────>│                       │                      │                        │
   │                     │                       │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │ detect scenario  │                      │                        │
   │                     │<───┘                  │                      │                        │
   │                     │                       │                      │                        │
   │                     │ (if: normal authoring)│                      │                        │
   │                     │ Request versioning    │                      │                        │
   │                     │ info                  │                      │                        │
   │                     │──────────────────────>│                      │                        │
   │                     │                       │                      │                        │
   │                     │                       │ Search request       │                        │
   │                     │                       │─────────────────────>│                        │
   │                     │                       │                      │                        │
   │                     │                       │ Versioning knowledge │                        │
   │                     │                       │<─────────────────────│                        │
   │                     │                       │                      │                        │
   │                     │ Versioning knowledge  │                      │                        │
   │                     │<──────────────────────│                      │                        │
   │                     │                       │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │generate solution │                      │                        │
   │                     │<───┘                  │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │ Make edits       │                      │                        │
   │                     │<───┘                  │                      │                        │
   │                     │                       │                      │                        │
   │ "Changes made"      │                       │                      │                        │
   │<────────────────────│                       │                      │                        │
   │                     │                       │                      │                        │
   │                     │                       │                      │                        │
   │ "rename model name  │                       │                      │                        │
   │  for dotnet sdk"    │                       │                      │                        │
   │────────────────────>│                       │                      │                        │
   │                     │                       │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │ detect scenario  │                      │                        │
   │                     │<───┘                  │                      │                        │
   │                     │                       │                      │                        │
   │                     │ (if: customization)   │                      │                        │
   │                     │ Request customization │                      │                        │
   │                     │ request               │                      │                        │
   │                     │───────────────────────│──────────────────────│───────────────────────>│
   │                     │                       │                      │                        │
   │                     │ customization context │                      │                        │
   │                     │<──────────────────────│──────────────────────│────────────────────────│
   │                     │                       │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │generate solution │                      │                        │
   │                     │<───┘                  │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │ Make edits       │                      │                        │
   │                     │<───┘                  │                      │                        │         