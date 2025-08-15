import Safe from '@safe-global/protocol-kit';
import { ethers } from 'ethers';

export async function getSafeInstance(safeAddress: string) {
  const provider = new ethers.providers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");
  const signer = provider.getSigner();
  const safe = await Safe.create({ ethAdapter: { provider, signer }, safeAddress });
  return safe;
}
