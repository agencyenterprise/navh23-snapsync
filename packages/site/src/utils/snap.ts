import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param id - The ID of the snap to install.
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (
  id: string,
  version?: string,
): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) => snap.id === id && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export const getGlobalState = async () => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'getState' },
    },
  });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

/**
 * Get saved API key in the sync snap.
 *
 * @param syncSnapId - The ID of the sync snap.
 * @returns Saved API key content.
 */
export const getAPIKey = async (syncSnapId: string) => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: syncSnapId,
      request: { method: 'get_api_key' },
    },
  });

  return response as { apiKey: string };
};

/**
 * Update saved API key in the sync snap.
 *
 * @param syncSnapId - The ID of the sync snap.
 * @param apiKey - The API key to save.
 */
export const saveAPIKey = async (
  syncSnapId: string,
  apiKey: string,
): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: syncSnapId,
      request: { method: 'save_api_key', params: { apiKey } },
    },
  });
};

/**
 * Get saved state in the sync snap. The snap ID is automatically identified by the request information.
 *
 * @param syncSnapId - The ID of the sync snap.
 */
export const getPersistedState = async (syncSnapId: string) => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: syncSnapId,
      request: { method: 'get' },
    },
  });
};

/**
 * Persist state in the sync snap. The snap ID is automatically identified by the request information.
 *
 * @param syncSnapId - The ID of the sync snap.
 * @param state - The state to persist.
 */
export const persistState = async (
  syncSnapId: string,
  state: Record<string, unknown>,
) => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: syncSnapId,
      request: { method: 'set', params: state },
    },
  });
};

/**
 * Clear snap state in the sync snap. The snap ID is automatically identified by the request information.
 *
 * @param syncSnapId - The ID of the sync snap.
 */
export const clearState = async (syncSnapId: string) => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: syncSnapId,
      request: { method: 'clear' },
    },
  });
};
