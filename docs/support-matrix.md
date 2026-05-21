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
| Fluent MCP widget surfaces | No | Yes | No | No | Only if the host explicitly supports MCP Apps-style widgets |
| ChatGPT-style rich app views | No | Yes | No | No | Only if the host explicitly supports MCP Apps-style widgets |
| Text-first answers from Fluent memory | Yes | Yes | Yes | Yes | Yes |
| Fluent-specific recipe card widget | No | Yes | No | No | Only if supported by the host |
| Fluent-specific grocery list widget | No | Yes | No | No | Only if supported by the host |
| Fluent-specific pantry dashboard widget | No | Broader MCP widget hosts only | No | No | Only if supported by a future host profile |
| Fluent-specific purchase analysis widget | No | Yes | No | No | Only if supported by the host |

## Exact Positioning

- Fluent keeps the same memory and tools across clients. Each assistant may present them differently.
- OpenClaw supports the same stable Fluent contract as the other clients, but its package value is native plugin packaging, Fluent skills, hosted auth helpers, and MCP binding commands.
- OpenClaw keeps `2026-04-20.fluent-core-v1.37` as the minimum compatible Fluent MCP contract and treats `2026-05-17.fluent-core-v1.84` as the current reference contract.
- ChatGPT is the Fluent host with the richest first-party widget support today. The current rich app experience focuses on Home, recipe cards, grocery lists, Style purchase analysis, Health routines, and account status.
- Claude, Codex, OpenClaw, and generic MCP clients support Fluent as text-first clients. They should use the same saved memory and complete answers without relying on Fluent widgets unless the host explicitly proves MCP Apps-style widget support.
- OpenClaw should be positioned as a text-first Fluent host with a native package, not as a widget-first host.

## Out Of Scope For This Package

- Browser execution helpers
- Retailer automation helpers
- Unsafe local browser scripts
- Retailer checkout runners
- ChatGPT-specific widget metadata or component bundles
