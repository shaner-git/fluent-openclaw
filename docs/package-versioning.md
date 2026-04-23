# Fluent OpenClaw Package Versioning

Decision: `fluent-openclaw` is the canonical published OpenClaw package. The embedded `fluent-oss/openclaw-plugin/fluent` package is a bundled OSS helper with its own metadata and versioning.

The embedded helper is exported from `fluent-mcp/openclaw-plugin/fluent` into `fluent-oss`. It is not generated from this repository, and this repository is not generated from the embedded helper.

## Canonical Published Package

- published package name: `fluent-openclaw`
- source repository: this `fluent-openclaw` repository
- install command: `openclaw plugins install fluent-openclaw`
- supported tracks in this package: `cloud` and `oss`
- package role: canonical public OpenClaw package for Fluent

## Embedded OSS Helper Package

- package location: `fluent-oss/openclaw-plugin/fluent`
- package source: `fluent-mcp/openclaw-plugin/fluent`, exported into `fluent-oss`
- package role: bundled OpenClaw helper copy for the Fluent OSS export
- package identity: not the same artifact as the published `fluent-openclaw` package
- version policy: helper versions track bundled OSS helper revisions and must not be presented as the public `fluent-openclaw` release line

## Rules

- keep the published OpenClaw package metadata in this repo authoritative for `fluent-openclaw`
- keep the Fluent OSS embedded helper metadata visibly distinct from `fluent-openclaw`
- keep the minimum Fluent contract floor at `2026-04-20.fluent-core-v1.37` in both places
- for OpenClaw installs, direct users to `fluent-openclaw`; only mention the embedded OSS helper as a repo-local bundle or fallback helper
