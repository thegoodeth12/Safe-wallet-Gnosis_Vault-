// src/components/WarningModal.tsx

const WarningModal = ({ onCancel, onProceed }) => (
  <div className="modal">
    <h2>⚠️ Unofficial Safe App</h2>
    <p>This Safe App is not from an official source. Please verify the source before proceeding.</p>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onProceed}>Continue Anyway</button>
  </div>
);

export default WarningModal;
