import { FLUENT_MINIMUM_CONTRACT_VERSION, FLUENT_SERVER_ID } from './constants.js';
import { normalizeBaseUrl, normalizeMcpUrl } from './config-model.js';

export function buildExpectedAuthorizationHeader(accessToken) {
  const trimmed = String(accessToken ?? '').trim();
  return trimmed ? `Bearer ${trimmed}` : null;
}

export function collectBindingIssues(input) {
  const issues = [];
  const expectedMcpUrl = normalizeMcpUrl(input.baseUrl);
  const actualMcpUrl = typeof input.server?.url === 'string' ? input.server.url : null;
  const actualAuthHeader = normalizeAuthorizationHeader(input.server?.headers?.Authorization);
  const expectedAuthHeader = normalizeAuthorizationHeader(input.expectedAuthorizationHeader);

  if (!input.server) {
    issues.push(`mcp.servers.${FLUENT_SERVER_ID} is missing.`);
    return issues;
  }

  if (!actualMcpUrl) {
    issues.push(`mcp.servers.${FLUENT_SERVER_ID}.url is missing.`);
  } else if (expectedMcpUrl && actualMcpUrl !== expectedMcpUrl) {
    issues.push(
      `mcp.servers.${FLUENT_SERVER_ID}.url points to ${actualMcpUrl} but ${expectedMcpUrl} is expected for the ${input.track} track.`,
    );
  }

  if (input.requireAuthorization === true && !actualAuthHeader) {
    issues.push(`mcp.servers.${FLUENT_SERVER_ID}.headers.Authorization is missing.`);
  }

  if (expectedAuthHeader && actualAuthHeader && actualAuthHeader !== expectedAuthHeader) {
    issues.push(`mcp.servers.${FLUENT_SERVER_ID}.headers.Authorization does not match the active ${input.track} token.`);
  }

  return issues;
}

export async function fetchProbe(input) {
  const baseUrl = normalizeBaseUrl(input.baseUrl);
  if (!baseUrl) {
    return {
      error: 'No Fluent base URL is available for the compatibility probe.',
      ok: false,
      probe: null,
      probeUrl: null,
      status: null,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs ?? 15_000);
  const probeUrl = `${baseUrl}/codex-probe`;

  try {
    const response = await fetch(probeUrl, {
      headers: {
        accept: 'application/json',
      },
      signal: controller.signal,
    });
    const text = await response.text();
    const probe = safeParseJson(text);

    if (!response.ok) {
      return {
        error: `Compatibility probe failed with HTTP ${response.status}.`,
        ok: false,
        probe,
        probeUrl,
        status: response.status,
      };
    }

    if (!isRecord(probe)) {
      return {
        error: 'Compatibility probe returned invalid JSON.',
        ok: false,
        probe: null,
        probeUrl,
        status: response.status,
      };
    }

    return {
      error: null,
      ok: true,
      probe,
      probeUrl,
      status: response.status,
    };
  } catch (error) {
    const message =
      error?.name === 'AbortError'
        ? 'Compatibility probe timed out.'
        : `Compatibility probe failed: ${error instanceof Error ? error.message : String(error)}`;
    return {
      error: message,
      ok: false,
      probe: null,
      probeUrl,
      status: null,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function evaluateProbeCompatibility(input) {
  const issues = [];
  const probe = isRecord(input.probe) ? input.probe : null;
  const contract = isRecord(probe?.contract) ? probe.contract : null;
  const contractVersion = typeof contract?.contractVersion === 'string' ? contract.contractVersion : null;
  const deploymentTrack = typeof probe?.deploymentTrack === 'string' ? probe.deploymentTrack : null;
  const toolNames = Array.isArray(contract?.tools) ? contract.tools.filter((value) => typeof value === 'string') : [];

  if (!probe) {
    issues.push('Compatibility probe did not return a Fluent payload.');
    return { contractVersion: null, deploymentTrack: null, issues };
  }

  if (deploymentTrack && deploymentTrack !== input.track) {
    issues.push(`Compatibility probe reports ${deploymentTrack}, but the requested track is ${input.track}.`);
  }

  if (!contractVersion) {
    issues.push('Compatibility probe did not report a contract version.');
  } else if (compareFluentContractVersions(contractVersion, input.minimumContractVersion) < 0) {
    issues.push(
      `Compatibility probe reports contract ${contractVersion}, which is older than the minimum supported ${input.minimumContractVersion}.`,
    );
  }

  if (!toolNames.includes('fluent_get_capabilities')) {
    issues.push('Compatibility probe did not advertise fluent_get_capabilities.');
  }

  return {
    contractVersion,
    deploymentTrack,
    issues,
  };
}

export function compareFluentContractVersions(left, right) {
  const parsedLeft = parseContractVersion(left);
  const parsedRight = parseContractVersion(right);

  if (parsedLeft && parsedRight) {
    if (parsedLeft.date !== parsedRight.date) {
      return parsedLeft.date > parsedRight.date ? 1 : -1;
    }
    if (parsedLeft.family !== parsedRight.family) {
      return parsedLeft.family > parsedRight.family ? 1 : -1;
    }
    if (parsedLeft.major !== parsedRight.major) {
      return parsedLeft.major > parsedRight.major ? 1 : -1;
    }
    if (parsedLeft.minor !== parsedRight.minor) {
      return parsedLeft.minor > parsedRight.minor ? 1 : -1;
    }
    return 0;
  }

  if (left === right) {
    return 0;
  }
  return String(left).localeCompare(String(right));
}

export function parseContractVersion(value) {
  const match = String(value ?? '').trim().match(/^(\d{4}-\d{2}-\d{2})\.([a-z-]+)-v(\d+)\.(\d+)$/i);
  if (!match) {
    return null;
  }

  return {
    date: match[1],
    family: match[2].toLowerCase(),
    major: Number(match[3]),
    minor: Number(match[4]),
  };
}

export function defaultDoctorContractVersion() {
  return FLUENT_MINIMUM_CONTRACT_VERSION;
}

function normalizeAuthorizationHeader(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed || null;
}

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
