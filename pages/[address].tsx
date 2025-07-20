// Inside your page component (keep other imports and logic)
import { resolveENS } from '../../lib/ens'
import { Avatar } from '@chakra-ui/react'

type EnrichedOwner = {
  address: string
  name: string | null
  avatar: string | null
}

const [owners, setOwners] = useState<EnrichedOwner[]>([])

useEffect(() => {
  if (!safeAddress) return

  const fetchSafe = async () => {
    setLoading(true)
    const safeRes = await fetch(`https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}`)
    const safeData = await safeRes.json()

    const balanceRes = await fetch(`https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/balances/usd/`)
    const balanceData = await balanceRes.json()

    // Resolve ENS data
    const enriched = await Promise.all(
      safeData.owners.map(async (addr: string) => {
        const { name, avatar } = await resolveENS(addr)
        return { address: addr, name, avatar }
      })
    )

    setData(safeData)
    setBalances(balanceData)
    setOwners(enriched)
    setLoading(false)
  }

  fetchSafe()
}, [safeAddress])
