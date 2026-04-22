import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  compareFluentContractVersions,
  evaluateProbeCompatibility,
} from '../src/doctor.js';
import { FLUENT_MINIMUM_CONTRACT_VERSION, FLUENT_RELEASE_CHANNEL } from '../src/constants.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('package metadata is ready for the public beta release', async () => {
  const packageJson = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));

  assert.equal(packageJson.version, '0.1.6');
  assert.equal(packageJson['x-fluent'].releaseChannel, FLUENT_RELEASE_CHANNEL);
  assert.equal(packageJson['x-fluent'].minimumContractVersion, FLUENT_MINIMUM_CONTRACT_VERSION);
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.equal(packageJson.scripts.build, 'npm pack --dry-run');
});

test('README documents the public install and intentional omissions', async () => {
  const readme = await readFile(path.join(rootDir, 'README.md'), 'utf8');

  assert.match(readme, /public beta/i);
  assert.match(readme, /openclaw plugins install fluent-openclaw/);
  assert.match(readme, /openclaw fluent mcp cloud/);
  assert.match(readme, /openclaw fluent mcp oss --base-url http:\/\/127\.0\.0\.1:8788 --token <oss-token>/);
  assert.match(readme, /browser and retailer execution helpers are intentionally omitted/i);
});

test('GitHub release notes stay aligned and public-safe', async () => {
  const releaseNotes = await readFile(path.join(rootDir, 'docs', 'releases', 'v0.1.6.md'), 'utf8');

  assert.match(releaseNotes, /Fluent for OpenClaw v0\.1\.6/);
  assert.match(releaseNotes, /Minimum Fluent MCP contract: `2026-04-20\.fluent-core-v1\.37`/);
  assert.match(releaseNotes, /openclaw plugins install fluent-openclaw/);
  assert.match(releaseNotes, /## Hosted Setup/);
  assert.match(releaseNotes, /## Self-Hosted Setup/);
  assert.match(releaseNotes, /openclaw fluent doctor/);
  assert.match(releaseNotes, /openclaw fluent deep-check/);
  assert.match(releaseNotes, /openclaw fluent mcp cloud/);
  assert.match(releaseNotes, /openclaw fluent mcp oss --base-url http:\/\/127\.0\.0\.1:8788/);
  assert.match(releaseNotes, /browser execution helpers are intentionally omitted/i);
  assert.match(releaseNotes, /retailer automation helpers are intentionally omitted/i);
  assert.doesNotMatch(releaseNotes, /C:\\Users\\/i);
  assert.doesNotMatch(releaseNotes, /fixture/i);
  assert.doesNotMatch(releaseNotes, /private-beta|private beta/i);
});

test('contract version comparison treats newer Fluent contracts as compatible', () => {
  assert.equal(compareFluentContractVersions('2026-04-20.fluent-core-v1.37', '2026-04-20.fluent-core-v1.37'), 0);
  assert.equal(compareFluentContractVersions('2026-04-21.fluent-core-v1.38', '2026-04-20.fluent-core-v1.37'), 1);
  assert.equal(compareFluentContractVersions('2026-04-19.fluent-core-v1.36', '2026-04-20.fluent-core-v1.37'), -1);
});

test('probe compatibility flags mismatched tracks and older contracts', () => {
  const compatibility = evaluateProbeCompatibility({
    minimumContractVersion: FLUENT_MINIMUM_CONTRACT_VERSION,
    probe: {
      contract: {
        contractVersion: '2026-04-19.fluent-core-v1.36',
        tools: ['fluent_get_capabilities'],
      },
      deploymentTrack: 'cloud',
    },
    track: 'oss',
  });

  assert.equal(compatibility.contractVersion, '2026-04-19.fluent-core-v1.36');
  assert.match(compatibility.issues.join('\n'), /requested track is oss/i);
  assert.match(compatibility.issues.join('\n'), /older than the minimum supported/i);
});
