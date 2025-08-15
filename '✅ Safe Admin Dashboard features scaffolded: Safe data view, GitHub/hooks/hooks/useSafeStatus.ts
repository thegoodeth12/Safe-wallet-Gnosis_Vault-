// hooks/useSafeStatus.ts
export async function useSafeStatus() {
  const safeAddress = process.env.NEXT_PUBLIC_SAFE_ADDRESS!;
  const chainId = process.env.NEXT_PUBLIC_SAFE_CHAIN_ID!;

  const res = await fetch(
    `https://safe-transaction-${chainId}.safe.global/api/v1/safes/${safeAddress}`
  );
  const data = await res.json();

  return {
    threshold: data.threshold,
    owners: data.owners,
    ethBalance: parseFloat(data.ethBalance) / 1e18,
  };
}
