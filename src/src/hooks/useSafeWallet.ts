import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'

export default function useSafeWallet() {
  const [safe, setSafe] = useState<Safe | null>(null)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })

      const factory = await SafeFactory.create({ ethAdapter })
      const deployedSafe = await factory.deploySafe({
        safeAccountConfig: {
          owners: [await signer.getAddress()],
          threshold: 1,
        },
      })

      setSafe(deployedSafe)
      setReady(true)
    }

    init()
  }, [])

  return { safe, isReady }
}
