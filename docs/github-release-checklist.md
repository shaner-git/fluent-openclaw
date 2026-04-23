# Fluent OpenClaw GitHub Release Checklist

Use this checklist when cutting a public package release such as `v0.1.6`.

## Before Tagging

- confirm `package.json` version matches the intended release
- confirm `package.json` release channel is `public-beta` or the intended public channel
- confirm `CHANGELOG.md` includes the release entry
- confirm [docs/known-limitations.md](./known-limitations.md) is current
- confirm [docs/support-matrix.md](./support-matrix.md) is current
- confirm install docs use `openclaw plugins install fluent-openclaw`
- confirm the minimum supported Fluent contract version matches the canonical Fluent MCP contract
- confirm [docs/package-versioning.md](./package-versioning.md) still states that `fluent-openclaw` is the published package and the `fluent-oss` embedded bundle is a separate OSS helper
- confirm package metadata still identifies the embedded OSS helper as `fluent-openclaw-oss-helper`
- confirm release-facing docs do not say the standalone package and embedded helper are generated from each other
- confirm the package still intentionally omits browser and retailer execution helpers

## Verification

- run `npm test`
- run `npm run build`
- run `openclaw plugins install fluent-openclaw`
- run `openclaw fluent doctor`
- run `openclaw fluent mcp cloud`
- run `openclaw fluent mcp oss --base-url http://127.0.0.1:8788`
- verify no release-facing doc implies that `fluent-oss/openclaw-plugin/fluent` is the same package artifact

## Release Notes

- describe the package as a public beta release, not private beta
- call out the supported OpenClaw setup flow for both `cloud` and `oss`
- call out known limitations
- call out the OpenClaw versus ChatGPT versus Claude support shape
- state clearly that browser and retailer execution helpers are intentionally omitted

## Publish

- create tag `v0.1.6`
- publish the package release to GitHub
- use [docs/releases/v0.1.6.md](./releases/v0.1.6.md) as the release body
- verify README links and docs links render correctly on GitHub

## After Publish

- confirm the public package metadata shows `0.1.6`
- confirm the install command works from a clean OpenClaw environment
- confirm the package docs still match the live command behavior
