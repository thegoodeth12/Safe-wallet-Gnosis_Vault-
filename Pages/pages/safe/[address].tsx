import { useRouter } from 'next/router';
import SafeInfoCard from '../../components/SafeInfoCard';

export default function SafePage() {
  const router = useRouter();
  const { address } = router.query;

  return address ? <SafeInfoCard safeAddress={address as string} /> : null;
}
