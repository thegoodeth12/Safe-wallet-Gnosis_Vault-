// lib/safeApi.ts
import axios from 'axios';

const SAFE_TX_SERVICE_URL = 'https://safe-transaction-arbitrum.safe.global';

export async function getSafeInfo(safeAddress: string) {
  const res = await axios.get(`${SAFE_TX_SERVICE_URL}/api/v1/safes/${safeAddress}`);
  return res.data;
}
