// src/components/AppLoader.tsx

import { isOfficialSafeAppUrl } from '../utils/safeAppValidator';
import WarningModal from './WarningModal';

const AppLoader = ({ appUrl }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isOfficialSafeAppUrl(appUrl)) {
      setShowWarning(true);
    }
  }, [appUrl]);

  const handleCancel = () => {
    window.history.back();
  };

  const handleProceed = () => {
    setShowWarning(false);
  };

  return (
    <>
      {showWarning ? (
        <WarningModal onCancel={handleCancel} onProceed={handleProceed} />
      ) : (
        <iframe src={appUrl} />
      )}
    </>
  );
};
