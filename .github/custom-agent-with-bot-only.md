┌──────┐          ┌─────────────┐          ┌───────────┐          ┌───────────┐
│ User │          │ custom agent│          │ azsdk     │          │ Knowledge │
│      │          │ Copilot     │          │ MCP       │          │ base      │
└──┬───┘          └──────┬──────┘          └─────┬─────┘          └─────┬─────┘
   │                     │                       │                      │
   │ "Add new preview    │                       │                      │
   │  version 2025-12-09 │                       │                      │
   │  to my project"     │                       │                      │
   │────────────────────>│                       │                      │
   │                     │                       │                      │
   │                     │────┐                  │                      │
   │                     │    │ detect scenario  │                      │
   │                     │<───┘                  │                      │
   │                     │                       │                      │
   │                     │ (if: normal authoring)│                      │
   │                     │ Request versioning    │                      │
   │                     │ info                  │                      │
   │                     │──────────────────────>│                      │
   │                     │                       │                      │
   │                     │                       │ Search request       │
   │                     │                       │─────────────────────>│
   │                     │                       │                      │
   │                     │                       │ Versioning solution  │
   │                     │                       │<─────────────────────│
   │                     │                       │                      │
   │                     │ Versioning solution   │                      │
   │                     │<──────────────────────│                      │
   │                     │────┐                  │                      │
   │                     │    │ Make edits       │                      │
   │                     │<───┘                  │                      │
   │                     │                       │                      │
   │ "Changes made"      │                       │                      │
   │<────────────────────│                       │                      │
   │                     │                       │                      │