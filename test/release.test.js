import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  compareFluentContractVersions,
  evaluateProbeCompatibility,
} from '../src/doctor.js';
import {
  FLUENT_MINIMUM_CONTRACT_VERSION,
  FLUENT_RELEASE_CHANNEL,
  FLUENT_REQUIRED_HOSTED_SCOPES,
} from '../src/constants.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('package metadata is ready for the public beta release', async () => {
  const packageJson = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));
  const openclawPluginJson = JSON.parse(await readFile(path.join(rootDir, 'openclaw.plugin.json'), 'utf8'));

  assert.equal(packageJson.version, '0.1.8');
  assert.equal(openclawPluginJson.version, '0.1.8');
  assert.equal(packageJson.author.email, 'hello@meetfluent.app');
  assert.equal(packageJson.bugs.email, 'hello@meetfluent.app');
  assert.equal(packageJson['x-fluent'].artifactKind, 'standalone-openclaw-package');
  assert.equal(packageJson['x-fluent'].canonicalPackageName, 'fluent-openclaw');
  assert.equal(packageJson['x-fluent'].packagingDecision, 'oss-embedded-openclaw-bundle-is-a-distinct-helper-package');
  assert.equal(packageJson['x-fluent'].ossEmbeddedPackageName, 'fluent-openclaw-oss-helper');
  assert.equal(packageJson['x-fluent'].ossEmbeddedPackageLocation, 'fluent-oss/openclaw-plugin/fluent');
  assert.equal(
    packageJson['x-fluent'].ossEmbeddedGenerationSource,
    'fluent-mcp/openclaw-plugin/fluent exported into fluent-oss',
  );
  assert.equal(packageJson['x-fluent'].contacts.general, 'hello@meetfluent.app');
  assert.equal(packageJson['x-fluent'].contacts.support, 'hello@meetfluent.app');
  assert.equal(packageJson['x-fluent'].contacts.security, 'security@meetfluent.app');
  assert.equal(packageJson['x-fluent'].releaseChannel, FLUENT_RELEASE_CHANNEL);
  assert.equal(packageJson['x-fluent'].minimumContractVersion, FLUENT_MINIMUM_CONTRACT_VERSION);
  assert.equal(packageJson['x-fluent'].currentReferenceContractVersion, '2026-07-09.fluent-core-v2.0');
  assert.deepEqual(packageJson['x-fluent'].requiredHostedScopes, FLUENT_REQUIRED_HOSTED_SCOPES);
  assert.equal(packageJson['x-fluent'].requiredHostedScopes.includes('style:write'), true);
  assert.equal('legacyBackendModes' in packageJson['x-fluent'], false);
  assert.equal('backendModesStatus' in packageJson['x-fluent'], false);
  assert.equal('backendModes' in packageJson['x-fluent'], false);
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.equal(packageJson.scripts.build, 'npm pack --dry-run');
});

test('README documents the public install and intentional omissions', async () => {
  const readme = await readFile(path.join(rootDir, 'README.md'), 'utf8');

  assert.match(readme, /public beta/i);
  assert.match(readme, /openclaw plugins install fluent-openclaw/);
  assert.match(readme, /canonical public source/i);
  assert.match(readme, /separate OSS helper package/i);
  assert.match(readme, /its own metadata and versioning/i);
  assert.match(readme, /neither package line is generated from the other/i);
  assert.match(readme, /openclaw fluent mcp --track cloud/);
  assert.match(readme, /openclaw fluent mcp --track oss --base-url http:\/\/127\.0\.0\.1:8788 --token <oss-token>/);
  assert.match(readme, /browser and retailer execution helpers are intentionally omitted/i);
  assert.match(readme, /hello@meetfluent\.app/);
  assert.match(readme, /Support: `hello@meetfluent\.app`/);
  assert.match(readme, /security@meetfluent\.app/);
});

test('package versioning doc keeps the standalone and OSS helper artifacts distinct', async () => {
  const versioningDoc = await readFile(path.join(rootDir, 'docs', 'package-versioning.md'), 'utf8');

  assert.match(versioningDoc, /bundled OSS helper/i);
  assert.match(versioningDoc, /canonical published OpenClaw package/i);
  assert.match(versioningDoc, /published package name: `fluent-openclaw`/);
  assert.match(versioningDoc, /package location: `fluent-oss\/openclaw-plugin\/fluent`/);
  assert.match(versioningDoc, /package source: `fluent-mcp\/openclaw-plugin\/fluent`/);
  assert.match(versioningDoc, /not the same artifact/i);
  assert.match(versioningDoc, /not generated from this repository/i);
  assert.match(versioningDoc, /2026-07-09\.fluent-core-v2\.0/);
});

test('GitHub release notes stay aligned and public-safe', async () => {
  const releaseNotes = await readFile(path.join(rootDir, 'docs', 'releases', 'v0.1.8.md'), 'utf8');

  assert.match(releaseNotes, /Fluent for OpenClaw v0\.1\.8/);
  assert.match(releaseNotes, /canonical public beta package/i);
  assert.match(releaseNotes, /Minimum Fluent MCP contract: `2026-07-09\.fluent-core-v2\.0`/);
  assert.match(releaseNotes, /26 tools, 3 resources, 14 explicit writes, and 3 optional render adapters/);
  assert.match(releaseNotes, /`style:write`/);
  assert.match(releaseNotes, /openclaw plugins install fluent-openclaw/);
  assert.match(releaseNotes, /## Managed Early-Access Setup/);
  assert.match(releaseNotes, /## Run Fluent Yourself/);
  assert.match(releaseNotes, /openclaw fluent doctor/);
  assert.match(releaseNotes, /openclaw fluent deep-check/);
  assert.match(releaseNotes, /openclaw fluent mcp --track cloud/);
  assert.match(releaseNotes, /openclaw fluent mcp --track oss --base-url http:\/\/127\.0\.0\.1:8788/);
  assert.match(releaseNotes, /hello@meetfluent\.app/);
  assert.match(releaseNotes, /Support: `hello@meetfluent\.app`/);
  assert.match(releaseNotes, /security@meetfluent\.app/);
  assert.match(releaseNotes, /fluent-mcp\/openclaw-plugin\/fluent/);
  assert.match(releaseNotes, /not generated from this package line/i);
  assert.match(releaseNotes, /browser execution helpers are intentionally omitted/i);
  assert.match(releaseNotes, /retailer automation helpers are intentionally omitted/i);
  assert.doesNotMatch(releaseNotes, /C:\\Users\\/i);
  assert.doesNotMatch(releaseNotes, /fixture/i);
  assert.doesNotMatch(releaseNotes, /private-beta|private beta/i);
});

test('OpenClaw skills stay text-first and current with staged onboarding guidance', async () => {
  const coreSkill = await readFile(path.join(rootDir, 'skills', 'fluent-core', 'SKILL.md'), 'utf8');
  const healthSkill = await readFile(path.join(rootDir, 'skills', 'fluent-health', 'SKILL.md'), 'utf8');
  const mealsSkill = await readFile(path.join(rootDir, 'skills', 'fluent-meals', 'SKILL.md'), 'utf8');
  const styleSkill = await readFile(path.join(rootDir, 'skills', 'fluent-style', 'SKILL.md'), 'utf8');
  const releaseChecklist = await readFile(path.join(rootDir, 'docs', 'github-release-checklist.md'), 'utf8');

  assert.match(coreSkill, /26 tools, 14 explicit writes, 3 render adapters, and 3 resources/);
  assert.match(coreSkill, /There is no full, candidate, legacy, or compatibility route/);
  assert.match(healthSkill, /public contract has no Health tools or resources/);
  assert.match(mealsSkill, /fluent_get_context\(domain="meals", intent="planning"/);
  assert.match(mealsSkill, /fluent_update_shared_profile_patch/);
  assert.match(mealsSkill, /fluent_render_surface\(surface="meals_grocery_list"\)/);
  assert.doesNotMatch(mealsSkill, /prefer `meals_render_grocery_list_v2` as the default end-user experience/i);

  assert.match(styleSkill, /fluent_get_context\(domain="style", intent="closet"/);
  assert.match(styleSkill, /canonical Fluent 2\.0 `\/mcp` profile/);
  assert.match(styleSkill, /Fluent does not extract arbitrary product pages/);
  assert.match(styleSkill, /fluent_render_style_closet_surface/);
  assert.doesNotMatch(styleSkill, /style_show_purchase_analysis_widget` as the ChatGPT\/App SDK finish/i);
  assert.doesNotMatch(styleSkill, /Treat purchase analysis as a two-step flow/i);

  await assert.rejects(
    readFile(path.join(rootDir, 'skills', 'fluent-visual-sync', 'SKILL.md'), 'utf8'),
    /ENOENT/,
  );

  assert.match(releaseChecklist, /compatibility floor/);
  assert.match(releaseChecklist, /current reference Fluent MCP contract version matches the canonical Fluent MCP contract/);
});

test('contract version comparison treats newer Fluent contracts as compatible', () => {
  assert.equal(compareFluentContractVersions('2026-07-09.fluent-core-v2.0', '2026-07-09.fluent-core-v2.0'), 0);
  assert.equal(compareFluentContractVersions('2026-07-10.fluent-core-v2.1', '2026-07-09.fluent-core-v2.0'), 1);
  assert.equal(compareFluentContractVersions('2026-07-08.fluent-core-v1.99', '2026-07-09.fluent-core-v2.0'), -1);
});

test('probe compatibility flags mismatched tracks and older contracts', () => {
  const compatibility = evaluateProbeCompatibility({
    minimumContractVersion: FLUENT_MINIMUM_CONTRACT_VERSION,
    probe: {
      contract: {
        contractVersion: '2026-07-08.fluent-core-v1.99',
        tools: ['fluent_get_capabilities'],
      },
      deploymentTrack: 'cloud',
    },
    track: 'oss',
  });

  assert.equal(compatibility.contractVersion, '2026-07-08.fluent-core-v1.99');
  assert.match(compatibility.issues.join('\n'), /requested track is oss/i);
  assert.match(compatibility.issues.join('\n'), /older than the minimum supported/i);
});
