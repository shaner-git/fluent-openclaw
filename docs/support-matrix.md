# Fluent OpenClaw Support Matrix

This matrix documents what the public `fluent-openclaw` package supports compared with Fluent in ChatGPT, Claude, Codex, and generic MCP clients.

| Capability | OpenClaw | ChatGPT | Claude | Codex | generic MCP clients |
|---|---|---|---|---|---|
| Fluent MCP tools | Yes | Yes | Yes | Yes | Yes |
| Fluent MCP resources | Yes | Yes | Yes | Yes | Yes |
| Native packaged client plugin for Fluent | Yes | No | No | Yes | No |
| Bundled Fluent skills in the client package | Yes | No | No | Yes | No |
| Plugin-managed hosted auth helper in this package | Yes | No | No | No | No |
| Open-source MCP binding helper in this package | Yes | No | No | Yes | Manual config |
| Fluent MCP widget surfaces | Host-dependent for promoted surfaces only | Promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only |
| ChatGPT-style rich app views | Host-dependent for promoted surfaces only | Promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only |
| Text-first answers from Fluent memory | Yes | Yes | Yes | Yes | Yes |
| Fluent-specific recipe card widget | No | No for public vNext | No | No | No for public vNext |
| Fluent-specific grocery list widget | Host-dependent | Yes | Host-dependent | Host-dependent | Host-dependent |
| Fluent-specific pantry dashboard widget | No | Legacy broader-MCP compatibility only | No | No | Legacy compatibility only; do not route new flows to it |
| Fluent-specific Budgets Envelope Setup widget | Host-dependent | Yes | Host-dependent | Host-dependent | Host-dependent |
| Fluent-specific Style Closet Manager widget | Host-dependent | Yes | Host-dependent | Host-dependent | Host-dependent |
| Fluent-specific Style setup widget | No | No for public vNext | No | No | No for public vNext |
| Fluent-specific purchase analysis widget | No | No for public vNext | No | No | No for public vNext |

## Exact Positioning

- Fluent keeps the same memory and tools across clients. Each assistant may present them differently.
- OpenClaw supports the same stable Fluent contract as the other clients, but its package value is native plugin packaging, Fluent skills, hosted auth helpers, and MCP binding commands.
- OpenClaw keeps `2026-06-01.fluent-core-v1.85` as the minimum compatible and current reference Fluent MCP contract for public vNext.
- Current public vNext uses one canonical `/mcp` profile with 26 tools, 10 resources, and only the promoted grocery-list, Budgets Envelope Setup, and Style Closet Manager widget families.
- Pantry Dashboard is retained only for broader-MCP legacy compatibility. It is not a current product surface for ChatGPT, OpenClaw, or new generic-MCP flows.
- Claude, Codex, OpenClaw, and generic MCP clients support Fluent as text-first clients by default. They should use the same saved memory and complete answers without relying on Fluent widgets unless the host explicitly proves MCP Apps-style widget support.
- OpenClaw should be positioned as a text-first Fluent host with a native package, not as a widget-first host.

## Out Of Scope For This Package

- Browser execution helpers
- Retailer automation helpers
- Unsafe local browser scripts
- Retailer checkout runners
- ChatGPT-specific widget metadata or component bundles
