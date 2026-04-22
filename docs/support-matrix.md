# Fluent OpenClaw Support Matrix

This matrix documents what the public `fluent-openclaw` package supports compared with Fluent in ChatGPT and Claude.

| Capability | OpenClaw | ChatGPT | Claude |
|---|---|---|---|
| Canonical Fluent MCP tools | Yes | Yes | Yes |
| Canonical Fluent MCP resources | Yes | Yes | Yes |
| Native packaged client plugin for Fluent | Yes | No | No |
| Bundled Fluent skills in the client package | Yes | No | No |
| Plugin-managed hosted auth helper in this package | Yes | No | No |
| OSS MCP binding helper in this package | Yes | No | No |
| Fluent MCP widget surfaces | No | Yes | No |
| ChatGPT-style output templates | No | Yes | No |
| Text-first host rendering of canonical results | Yes | Yes | Yes |
| Fluent-specific recipe card widget | No | Yes | No |
| Fluent-specific grocery list widget | No | Yes | No |
| Fluent-specific pantry dashboard widget | No | Yes | No |
| Fluent-specific purchase analysis widget | No | Yes | No |

## Exact Positioning

- OpenClaw supports the same stable Fluent contract as the other clients, but its package value is native plugin packaging, Fluent skills, hosted auth helpers, and MCP binding commands.
- ChatGPT is the Fluent host with the richest first-party widget support today. If a workflow depends on Fluent-owned UI cards or output templates, ChatGPT is the reference host.
- Claude supports the canonical Fluent contract as a text-first MCP client. It should use the same durable tools and resources as OpenClaw, without relying on Fluent widgets.
- OpenClaw should be positioned as a text-first Fluent host with a native package, not as a widget-first host.

## Out Of Scope For This Package

- Browser execution helpers
- Retailer automation helpers
- Unsafe local browser scripts
- Retailer checkout runners
- ChatGPT-specific widget metadata or component bundles
