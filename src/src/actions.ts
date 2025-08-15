import { sendSlackMessage } from './slack'

export async function sendEth(to: string, amountEth: string) {
  const safe = await getSafeInstance();

  const txData: SafeTransactionDataPartial = {
    to,
    data: "0x",
    value: ethers.parseEther(amountEth).toString(),
  };

  const safeTx = await safe.createTransaction({ safeTransactionData: txData });

  const txHash = await safe.getTransactionHash(safeTx);
  const signature = await safe.signTransaction(safeTx);

  await sendSlackMessage(`🔐 Safe Transaction Proposed:
- To: ${to}
- Amount: ${amountEth} ETH
- Hash: ${txHash}`);

  const executeTxResponse = await safe.executeTransaction(safeTx);
  await executeTxResponse.transactionResponse?.wait();

  await sendSlackMessage(`✅ Transaction Executed!
Hash: ${txHash}`);
}
