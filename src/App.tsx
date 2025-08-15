import React from 'react'
import useSafeWallet from './hooks/useSafeWallet'

export default function App() {
  const { safe, isReady } = useSafeWallet()

  return (
    <div>
      <h1>Safe Wallet Connected ✅</h1>
      {isReady ? (
        <p>Safe address: {safe?.getAddress()}</p>
      ) : (
        <p>Loading Safe...</p>
      )}
    </div>
  )
}
