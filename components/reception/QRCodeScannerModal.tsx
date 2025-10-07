import React, { useState } from 'react';
import { QrCode, Camera, X, CheckCircle } from 'lucide-react';
import Modal from '../Modal';

interface QRCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onScan: (qrData: string) => void;
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onScan
}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleStartScan = () => {
    setScanning(true);
    // Simulate QR code scan after 2 seconds
    setTimeout(() => {
      const mockQRData = `PATIENT-${Math.floor(Math.random() * 1000)}`;
      setScannedData(mockQRData);
      setScanning(false);
    }, 2000);
  };

  const handleConfirmScan = () => {
    if (scannedData) {
      onScan(scannedData);
      setScannedData(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setScanning(false);
    setScannedData(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Scanner de QR Code" size="md" darkMode={darkMode}>
      <div className="space-y-6">
        {/* Scanner Area */}
        <div className={`relative aspect-square rounded-lg border-4 border-dashed overflow-hidden ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
        }`}>
          {!scanning && !scannedData && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <QrCode className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Clique no botão abaixo para<br />iniciar a leitura do QR Code
                </p>
              </div>
            </div>
          )}

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse"></div>
                <Camera className="w-20 h-20 text-blue-500 animate-pulse" />
                <p className="text-white text-sm mt-4 text-center">
                  Escaneando...
                </p>
              </div>
            </div>
          )}

          {scannedData && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-100 dark:bg-green-900/30">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-600 dark:text-green-400" />
                <p className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  QR Code Detectado!
                </p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Código: {scannedData}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            Como usar:
          </h4>
          <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-400/80' : 'text-blue-600/80'}`}>
            <li>1. Clique em "Iniciar Scanner"</li>
            <li>2. Posicione o QR Code do paciente na câmera</li>
            <li>3. Aguarde a leitura automática</li>
            <li>4. Confirme o check-in do paciente</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancelar
          </button>
          
          {!scannedData && !scanning && (
            <button
              onClick={handleStartScan}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <Camera className="w-4 h-4 mr-2" />
              Iniciar Scanner
            </button>
          )}

          {scannedData && (
            <button
              onClick={handleConfirmScan}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar Check-in
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeScannerModal;
