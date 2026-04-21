# Fluent OpenClaw Plugin

This private-beta package ships Fluent as a personal operating system for meal planning, grocery workflows, kitchen inventory, fitness-first health routines, and closet-aware style decisions.

This repository is the public source for the published `fluent-openclaw` package.

Public references:
- OpenClaw setup guide: [guides/connecting-to-openclaw.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/connecting-to-openclaw.md)
- client configuration guide: [guides/client-configuration.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/client-configuration.md)
- troubleshooting guide: [guides/troubleshooting.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/troubleshooting.md)
- Fluent OSS runtime and setup docs: [shaner-git/fluent-oss](https://github.com/shaner-git/fluent-oss)

Install this package from the published package name:
- `openclaw plugins install fluent-openclaw`

For local development, you can also install from a checked-out package directory.

Plugin-managed auth commands:
- `openclaw fluent auth login`
- `openclaw fluent auth refresh`
- `openclaw fluent auth status`
- `openclaw fluent auth logout`
- `openclaw fluent mcp --track cloud`
- `openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>`
- `openclaw fluent doctor`

Default backend:
- `.mcp.json` points at Fluent Cloud

OpenClaw packaging note:
- this package now ships as a native OpenClaw plugin via `openclaw.plugin.json` plus `package.json`
- Fluent skills load from the native plugin manifest's `skills` roots
- the OpenClaw package intentionally excludes the local Meals browser and retailer-execution scripts so standard installs do not require the unsafe-install override
- the plugin now manages hosted Fluent token bootstrap and refresh itself, then rewrites `mcp.servers.fluent` for OpenClaw
- OpenClaw still reads Fluent MCP config from native `mcp.servers.fluent` profile state rather than the bundle manifest itself

Deployment tracks:
- Fluent Cloud is the default packaged track
- Fluent OSS is the supported self-hosted track

Compatibility templates:
- `.mcp.hosted.json` for Fluent Cloud
- `.mcp.oss.json` for Fluent OSS
- `.mcp.local.json` is a legacy bridge asset for Fluent OSS

Preferred hosted setup:
1. Install the native plugin from the published package `fluent-openclaw`.
2. Run `openclaw fluent auth login` and open the printed URL in your browser.
3. Confirm the binding with `openclaw fluent auth status`.
4. Run `openclaw fluent doctor` if the token expires or tools stop appearing.

Preferred OSS setup:
1. Start a Fluent OSS instance by following the public Fluent OSS docs in [shaner-git/fluent-oss](https://github.com/shaner-git/fluent-oss).
2. Install the native plugin from the published package `fluent-openclaw` so OpenClaw loads the Fluent skills.
3. Run `openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>`.
4. Start a fresh OpenClaw session or use `openclaw agent --local --session-id <new-id> ...` so the runtime preloads the updated MCP registry.

If the endpoint changes or tools look stale:
1. Re-run `openclaw fluent mcp --track <cloud|oss> ...`.
2. Re-authorize with `openclaw fluent auth login` if prompted.
3. Run `openclaw fluent doctor` to check token freshness and binding health.

Hosted Fluent now requires explicit supported scopes on OAuth grants. Older unscoped grants are no longer accepted, so reconnecting may require a fresh registration and authorization flow.

This package currently expects:
- minimum contract version `2026-04-19.fluent-core-v1.36`
- explicit hosted scopes `meals:read`, `meals:write`, `health:read`, `health:write`, `style:read`, `style:write`, and `offline_access` so hosted clients can refresh tokens without repeated reauthorization

Meals routing model:

- read `fluent_get_capabilities` first
- use `toolDiscovery` as guidance only; MCP `tools/list` remains the authoritative full registry
- if `fluent_get_capabilities` is deferred or keyword search misses it, call `meals_list_tools` as the eager fallback directory
- if `readyDomains` contains `meals`, route normally into `fluent-meals`
- if `meals` is `available`, enable it and continue onboarding
- if `meals` is `disabled`, do not auto-enable it
- for shopping, pantry checks, substitutions, and receipt reconciliation, start from the `meals_shopping` discovery group in `toolDiscovery`
- for grocery-list turns, keep the data/render split:
  - for ordinary asks like "What's on my grocery list?", "What do I still need to buy?", or "Show me this week's grocery list," prefer the pantry-aware grocery-list surface when the host supports rich app surfaces
  - use `meals_render_grocery_list` as the default end-user experience for those ordinary grocery-list asks; do not require `meals_get_grocery_plan` first unless the user explicitly wants plan internals or reconciliation detail
  - do not require the user to ask for a "list" or "surface" explicitly when the turn is clearly asking for the actionable shopping view
- for explicit weekly planning, use the hosted loop:
  - summary reads
  - `meals_generate_plan`
  - `meals_accept_plan_candidate`
  - `meals_generate_grocery_plan`
- `meals_prepare_order` before any retailer automation
- if preflight is blocked only by pantry-style uncertainty, use `meals_upsert_grocery_plan_action` for pantry-first sufficiency confirmations before retrying
- if receipt-backed current-week purchases should count toward future durable coverage, use `meals_upsert_grocery_plan_action` with `action_status = purchased` and `purchased_at` when available
- for weekly planning entrypoints, prefer the `meals_planning` discovery group in `toolDiscovery`
- runtime token discipline is defined by `skills/fluent-meals/SKILL.md`; treat the skill as the primary source of truth for summary-first versus full reads

Health routing model:

- use the `health_fitness` discovery group in `toolDiscovery` to choose the first Health read/write tools
- if `readyDomains` contains `health`, route normally into `fluent-health`
- if `health` is `available`, enable it and continue the light fitness-first onboarding flow
- if `health` is `disabled`, do not auto-enable it
- prefer `health_get_context`, `health_get_active_block`, `health_get_today_context`, and `health_list_goals` before detailed reads
- treat Health as block-first:
  - build or revise the active block with `health_upsert_block`
  - project the current week with `health_get_block_projection`
  - review and adjust with `health_get_review_context` and `health_record_block_review`
- use `health_log_workout` and `health_get_today_context` for in-block execution, not a separate tracking system
- keep meal execution changes in Meals when a fitness goal needs food support
- runtime discipline is defined by `skills/fluent-health/SKILL.md`

Style routing model:

- read `fluent_get_capabilities` first
- use the `style` discovery group in `toolDiscovery` to choose the first style read/write tools
- if `readyDomains` contains `style`, route normally into `fluent-style`
- if `style` is `available`, enable it and continue the light calibration flow
- if `style` is `disabled`, do not auto-enable it
- Style phase 2 is closet-derived and onboarding-aware:
  - Style is ready for visually grounded closet critique, redundancy checks, off-profile checks, and purchase analysis
  - use `style_get_context` and `style_get_profile` first
  - broad asks about the user's current style or shoe rotation should start from closet state, not from a request to upload photos
  - for seeded users, treat onboarding as calibration over the imported closet
  - for fresh users, prefer a purchase-first start when the user already has a current candidate; otherwise collect a tiny anchor set
  - use `style_list_items` and `style_get_item` for closet reads
  - use `style_get_item_profile` when typed item enrichment is needed
  - use `style_get_item_provenance` when the stylist read needs field evidence, source snapshots, or technical metadata
  - use `style_list_evidence_gaps` before high-confidence advice when missing photos or descriptors may be distorting the read
  - use `style_list_descriptor_backlog` to prioritize which existing closet items should get visual descriptor enrichment next
  - use `style_analyze_wardrobe` for gap lanes, replacements, bridge pieces, buy-next guidance, and wardrobe-level weak spots
  - use `style_analyze_purchase` for comparator-coverage-aware wardrobe context, then let the agent make the recommendation with an actual stylist point of view rather than a neutral shopping summary
  - for purchase analysis and closet critique, use metadata to surface the relevant pieces, then inspect the candidate image and the relevant closet item images before finalizing the recommendation when usable images exist
  - only ask for photos up front when the answer depends on a missing candidate image, fit photo, or other visual evidence Fluent does not already have
  - when enriching descriptors, prefer fit photos for `fitObservations`, `silhouette`, `visualWeight`, and `structureLevel`; use product or fit photos for `texture`, `fabricHand`, `polishLevel`, and `qualityTier`
  - for purchase analysis, treat `style_analyze_purchase` plus `style_get_visual_bundle` as the normal two-step flow; the analysis call does not replace the visual pass
  - for MCP clients, treat `style_get_visual_bundle` as the primary image path; direct `authenticatedOriginalUrl` fetches are not guaranteed to work across clients
  - purchase analysis is fully visually grounded when the candidate includes a direct image via `imageUrl`, `image_url`, or `imageUrls`; a product page URL alone is not enough, and without a direct image the candidate-side judgment remains partial
  - after the recommendation, ask “Are you going to keep it?” before adding a new item to the closet
  - if the answer is yes, require one clean representative image before writing the new item and photo set
  - on hosted Fluent, use upload bytes (`data_url` / `data_base64`) or a fetchable remote image URL when saving photos; local upload file paths do not produce reliable owned image delivery
  - do not assume saved outfits, shopping history, OOTD, or try-on exist in the canonical Style surface

Hosted client acceptance:

- OpenClaw setup guide: [guides/connecting-to-openclaw.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/connecting-to-openclaw.md)
- client configuration guide: [guides/client-configuration.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/client-configuration.md)
- troubleshooting guide: [guides/troubleshooting.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/troubleshooting.md)
- OpenClaw currently uses the native Fluent plugin plus a native `mcp.servers.fluent` entry

Intentional OpenClaw asymmetry:

- the OpenClaw package omits the bundled Meals browser and retailer scripts that still exist in the Codex and Claude package trees
- OpenClaw is currently limited to MCP planning, grocery reconciliation, and handoff for ordering execution

Meals first-use flow:

- plan-your-first-week recipe: [recipes/meals-first-week.md](https://github.com/shaner-git/fluent-docs/blob/main/recipes/meals-first-week.md)
- Meals domain guide: [domains/meals.md](https://github.com/shaner-git/fluent-docs/blob/main/domains/meals.md)
