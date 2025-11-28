import React from "react";
import { useClinicContext } from "../../context/ClinicContext";

interface DocumentHeaderProps {
  showLogo?: boolean;
  showAddress?: boolean;
  showContact?: boolean;
  className?: string;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  showLogo = true,
  showAddress = true,
  showContact = true,
  className = "",
}) => {
  const { getDocumentHeader } = useClinicContext();
  const headerData = getDocumentHeader();

  return (
    <div className={`w-full border-b-2 border-gray-200 pb-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showLogo && headerData.logoUrl && (
            <img
              src={headerData.logoUrl}
              alt="Logo da Clínica"
              className="h-16 w-auto object-contain"
            />
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
              {headerData.title}
            </h1>
            {showAddress && (
              <p className="text-sm text-gray-600 mt-1">
                {headerData.subtitle}
              </p>
            )}
            {showContact && (
              <p className="text-sm text-gray-600">{headerData.contact}</p>
            )}
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">
          {headerData.cnes && <p>CNES: {headerData.cnes}</p>}
          {headerData.cnpj && <p>CNPJ: {headerData.cnpj}</p>}
        </div>
      </div>
    </div>
  );
};

export default DocumentHeader;
