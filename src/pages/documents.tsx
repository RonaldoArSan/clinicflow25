import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import DocumentsView from "../components/DocumentsView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDocuments } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";
import ToastContainer from "../components/common/ToastContainer";
import { Document } from "../types";

export default function DocumentsPage() {
  const { darkMode } = useDarkMode();
  const { documents, setDocuments } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);

  const handleAddDocument = (
    newDoc: Omit<Document, "id" | "uploadDate" | "size">
  ) => {
    const doc: Document = {
      ...newDoc,
      id: documents.length + 1,
      uploadDate: new Date().toISOString(),
      size: "1.5 MB", // Mock size
    };

    setDocuments((prev) => [doc, ...prev]);
    setShowNewDocumentModal(false);
    setShowUploadDocumentModal(false);

    if ((window as any).showToast) {
      (window as any).showToast({
        type: "success",
        title: "Documento Adicionado",
        message: `${doc.name} foi adicionado com sucesso.`,
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={["doctor", "nurse", "admin", "receptionist"]}>
      <MainLayout
        title="Documentos Médicos"
        actions={
          <button
            onClick={() => setShowNewDocumentModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Documento</span>
          </button>
        }
      >
        <DocumentsView
          darkMode={darkMode}
          documents={documents}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          showNewDocumentModal={showNewDocumentModal}
          setShowNewDocumentModal={setShowNewDocumentModal}
          showUploadDocumentModal={showUploadDocumentModal}
          setShowUploadDocumentModal={setShowUploadDocumentModal}
          onAddDocument={handleAddDocument}
        />
        <ToastContainer darkMode={darkMode} />
      </MainLayout>
    </ProtectedRoute>
  );
}
