┌──────┐          ┌─────────────┐          ┌───────────┐          ┌───────────┐          ┌────────────────┐
│ User │          │ custom agent│          │ azsdk     │          │ Knowledge │          │ llms.txt       │ 
│      │          │ Copilot     │          │ MCP       │          │ base (bot)│          │ web fetch tool │
└──┬───┘          └──────┬──────┘          └─────┬─────┘          └─────┬─────┘          └──────┬─────────┘
   │                     │                       │                      │                        │
   │ "Add new preview    │                       │                      │                        │
   │  version 2025-12-09 │                       │                      │                        │
   │  to my project"     │                       │                      │                        │
   │────────────────────>│                       │                      │                        │
   │                     │────┐                  │                      │
   │                     │    │ retrieve required│                      │
   │                     │<───┘ information      │                      │
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
   │                     │                       │ Versioning solution  │                        │
   │                     │                       │<─────────────────────│                        │
   │                     │                       │                      │                        │
   │                     │ Versioning solution   │                      │                        │
   │                     │<──────────────────────│                      │                        │
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
   │                     │────┐                  │                      │
   │                     │    │ retrieve required│                      │
   │                     │<───┘ information      │                      │
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
   │                     │<───┘  (llm call)      │                      │                        │
   │                     │────┐                  │                      │                        │
   │                     │    │ Make edits       │                      │                        │
   │                     │<───┘                  │                      │                        │