import React from "react";
import {
  Upload,
  Search,
  Filter,
  Download,
  FileText,
  FileImage,
  File,
  X,
  Eye,
} from "lucide-react";
import { Document } from "../types";

interface DocumentsViewProps {
  darkMode?: boolean;
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (document: Document | null) => void;
  showNewDocumentModal?: boolean;
  setShowNewDocumentModal?: (show: boolean) => void;
  showUploadDocumentModal?: boolean;
  setShowUploadDocumentModal?: (show: boolean) => void;
  onAddDocument?: (
    document: Omit<Document, "id" | "uploadDate" | "size">
  ) => void;
}

const DocumentsView: React.FC<DocumentsViewProps> = ({
  darkMode = false,
  documents,
  selectedDocument,
  setSelectedDocument,
  showNewDocumentModal = false,
  setShowNewDocumentModal,
  showUploadDocumentModal = false,
  setShowUploadDocumentModal,
  onAddDocument,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  // Form states
  const [newDocName, setNewDocName] = React.useState("");
  const [newDocCategory, setNewDocCategory] = React.useState("");
  const [newDocType, setNewDocType] = React.useState("");
  const [newDocPatient, setNewDocPatient] = React.useState("");
  const [newDocDoctor, setNewDocDoctor] = React.useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || doc.category === categoryFilter;
    const matchesType = typeFilter === "" || doc.type === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownloadDocument = (doc: Document) => {
    // Mock download logic
    const content = `Conteúdo do documento: ${doc.name}\nPaciente: ${doc.patientName}\nMédico: ${doc.doctor}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `${doc.name.replace(/\s+/g, "_").toLowerCase()}.txt`; // Mock extension
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    if ((window as any).showToast) {
      (window as any).showToast({
        type: "success",
        title: "Download Iniciado",
        message: `O download de ${doc.name} foi iniciado.`,
      });
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDownloadReport = () => {
    const headers = [
      "ID",
      "Nome",
      "Categoria",
      "Tipo",
      "Tamanho",
      "Data",
      "Paciente",
      "Médico",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredDocuments.map((doc) =>
        [
          doc.id,
          `"${doc.name}"`,
          doc.category,
          doc.type,
          doc.size,
          doc.uploadDate,
          `"${doc.patientName}"`,
          `"${doc.doctor}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `relatorio_documentos_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddDocument) {
      onAddDocument({
        name: newDocName,
        category: newDocCategory,
        type: newDocType || "pdf",
        patientId: parseInt(newDocPatient) || 1,
        patientName:
          newDocPatient === "1" ? "Maria Silva Santos" : "Paciente Exemplo", // Mock logic
        doctor:
          newDocDoctor === "dr_silva" ? "Dr. João Silva" : "Médico Exemplo", // Mock logic
      });
      // Reset form
      setNewDocName("");
      setNewDocCategory("");
      setNewDocType("");
      setNewDocPatient("");
      setNewDocDoctor("");
    }
  };
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    if (darkMode) {
      switch (category) {
        case "Exames":
          return "text-blue-400 bg-blue-900/30";
        case "Receitas":
          return "text-green-400 bg-green-900/30";
        case "Laudos":
          return "text-purple-400 bg-purple-900/30";
        case "Atestados":
          return "text-orange-400 bg-orange-900/30";
        default:
          return "text-gray-400 bg-gray-700/30";
      }
    } else {
      switch (category) {
        case "Exames":
          return "text-blue-600 bg-blue-50";
        case "Receitas":
          return "text-green-600 bg-green-50";
        case "Laudos":
          return "text-purple-600 bg-purple-50";
        case "Atestados":
          return "text-orange-600 bg-orange-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  return (
    <div className={`space-y-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Documentos</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gerencie exames, receitas, laudos e outros documentos médicos
          </p>
        </div>
        <button
          onClick={() =>
            setShowUploadDocumentModal && setShowUploadDocumentModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Upload size={20} />
          <span>Upload Documento</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total de Documentos
              </p>
              <p className="text-2xl font-semibold">
                {filteredDocuments.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Exames
              </p>
              <p className="text-2xl font-semibold">
                {documents.filter((doc) => doc.category === "Exames").length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Laudos
              </p>
              <p className="text-2xl font-semibold">
                {documents.filter((doc) => doc.category === "Laudos").length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receitas
              </p>
              <p className="text-2xl font-semibold">
                {documents.filter((doc) => doc.category === "Receitas").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6 border ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar por paciente, documento ou médico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Todas as Categorias</option>
            <option value="Exames">Exames</option>
            <option value="Receitas">Receitas</option>
            <option value="Laudos">Laudos</option>
            <option value="Atestados">Atestados</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Todos os Tipos</option>
            <option value="pdf">PDF</option>
            <option value="jpg">Imagem</option>
            <option value="doc">Documento</option>
          </select>
          <button
            onClick={handleDownloadReport}
            className={`p-2 rounded-lg border transition-colors ${
              darkMode
                ? "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                : "border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            title="Baixar Relatório CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocuments.map((document) => (
          <div
            key={document.id}
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-white border-gray-200 hover:shadow-md"
            } p-6 rounded-lg shadow-sm border transition-all cursor-pointer`}
            onClick={() => setSelectedDocument(document)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(document.type)}
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    document.category
                  )}`}
                >
                  {document.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDocument(document);
                  }}
                  className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadDocument(document);
                  }}
                  className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Download size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3
                className="font-semibold text-sm truncate"
                title={document.name}
              >
                {document.name}
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Paciente:
                  </span>
                  <span className="font-medium">{document.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Médico:
                  </span>
                  <span className="font-medium">{document.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Data:
                  </span>
                  <span className="font-medium">
                    {new Date(document.uploadDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Tamanho:
                  </span>
                  <span className="font-medium">{document.size}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getFileIcon(selectedDocument.type)}
                  <h2 className="text-xl font-bold">Detalhes do Documento</h2>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Informações do Documento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Nome do Documento
                      </label>
                      <p className="mt-1">{selectedDocument.name}</p>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Categoria
                      </label>
                      <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(
                          selectedDocument.category
                        )}`}
                      >
                        {selectedDocument.category}
                      </span>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Tipo de Arquivo
                      </label>
                      <p className="mt-1 uppercase">{selectedDocument.type}</p>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Tamanho
                      </label>
                      <p className="mt-1">{selectedDocument.size}</p>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Data de Upload
                      </label>
                      <p className="mt-1">
                        {new Date(
                          selectedDocument.uploadDate
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Informações do Paciente
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Paciente
                      </label>
                      <p className="mt-1">{selectedDocument.patientName}</p>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Médico Responsável
                      </label>
                      <p className="mt-1">{selectedDocument.doctor}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  } p-4 rounded-lg`}
                >
                  <div className="flex items-center justify-center py-12">
                    {getFileIcon(selectedDocument.type)}
                    <div className="ml-4 text-center">
                      <p className="text-lg font-semibold mb-2">
                        Prévia do Documento
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } text-sm`}
                      >
                        Clique em "Visualizar" para abrir o documento
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fechar
                </button>
                <button
                  onClick={() => handleDownloadDocument(selectedDocument)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    // Already viewing details, maybe open full screen or new tab in real app
                    // For now just show a toast
                    if ((window as any).showToast) {
                      (window as any).showToast({
                        type: "info",
                        title: "Visualização",
                        message: "Abrindo visualização em tela cheia...",
                      });
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Eye size={16} />
                  <span>Visualizar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Documento */}
      {showNewDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Novo Documento</h2>
                <button
                  onClick={() =>
                    setShowNewDocumentModal && setShowNewDocumentModal(false)
                  }
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleNewDocSubmit}>
                {/* Seção 1: Informações Básicas */}
                <div
                  className={`p-6 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } rounded-lg transition-colors`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    📋 Informações Básicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Nome do Documento *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: Exame de Sangue - João Silva"
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Categoria *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value)}
                      >
                        <option value="">Selecione uma categoria...</option>
                        <option value="Exames">📊 Exames</option>
                        <option value="Receitas">💊 Receitas</option>
                        <option value="Laudos">📝 Laudos</option>
                        <option value="Atestados">🏥 Atestados</option>
                        <option value="Imagens">📷 Imagens</option>
                        <option value="Resultados">📋 Resultados</option>
                        <option value="Outros">📄 Outros</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Tipo de Arquivo
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        value={newDocType}
                        onChange={(e) => setNewDocType(e.target.value)}
                      >
                        <option value="">Detectar automaticamente</option>
                        <option value="pdf">PDF</option>
                        <option value="jpg">JPEG/JPG</option>
                        <option value="png">PNG</option>
                        <option value="doc">Word</option>
                        <option value="txt">Texto</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Paciente *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        value={newDocPatient}
                        onChange={(e) => setNewDocPatient(e.target.value)}
                      >
                        <option value="">Selecione o paciente...</option>
                        <option value="1">Maria Silva Santos</option>
                        <option value="2">João Pedro Oliveira</option>
                        <option value="3">Ana Carolina Lima</option>
                        <option value="4">Carlos Eduardo Costa</option>
                        <option value="5">Fernanda Souza</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Médico Responsável *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        value={newDocDoctor}
                        onChange={(e) => setNewDocDoctor(e.target.value)}
                      >
                        <option value="">Selecione o médico...</option>
                        <option value="dr_silva">
                          Dr. João Silva - Clínico Geral
                        </option>
                        <option value="dr_santos">
                          Dra. Maria Santos - Cardiologia
                        </option>
                        <option value="dr_costa">
                          Dr. Pedro Costa - Pediatria
                        </option>
                        <option value="dr_lima">
                          Dra. Ana Lima - Ginecologia
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seção 2: Upload do Arquivo */}
                <div
                  className={`p-6 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } rounded-lg transition-colors`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    📁 Upload do Arquivo
                  </h3>
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        darkMode
                          ? "border-gray-600 hover:border-blue-500 bg-gray-700/30"
                          : "border-gray-300 hover:border-blue-500 bg-gray-50"
                      }`}
                    >
                      <Upload
                        className={`mx-auto h-12 w-12 mb-4 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <div>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700 font-medium">
                            Clique para selecionar um arquivo
                          </span>
                          <span
                            className={`${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {" "}
                            ou arraste e solte aqui
                          </span>
                        </label>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                        />
                      </div>
                      <p
                        className={`text-xs mt-2 ${
                          darkMode ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        Suportados: PDF, JPG, PNG, DOC, TXT (máx. 10MB)
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-1 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Tamanho Máximo
                        </label>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          10 MB
                        </p>
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-1 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Formatos Aceitos
                        </label>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          PDF, JPG, PNG, DOC, TXT
                        </p>
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-1 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Status do Upload
                        </label>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Nenhum arquivo selecionado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção 3: Metadados Adicionais */}
                <div
                  className={`p-6 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } rounded-lg transition-colors`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    🏷️ Metadados Adicionais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Data do Documento
                      </label>
                      <input
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Especialidade Relacionada
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione...</option>
                        <option value="clinica_geral">Clínica Geral</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="ginecologia">Ginecologia</option>
                        <option value="oftalmologia">Oftalmologia</option>
                        <option value="dermatologia">Dermatologia</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Nível de Privacidade
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="normal">Normal</option>
                        <option value="confidencial">Confidencial</option>
                        <option value="restrito">Restrito</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Palavras-chave (Tags)
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: exame, sangue, diabetes (separadas por vírgula)"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Observações / Descrição
                      </label>
                      <textarea
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Informações adicionais sobre o documento..."
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 4: Configurações de Acesso */}
                <div
                  className={`p-6 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } rounded-lg transition-colors`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    🔐 Configurações de Acesso
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="visivel_paciente"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="visivel_paciente"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Visível para o paciente no portal
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notificar_paciente"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="notificar_paciente"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Notificar paciente por email sobre novo documento
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="arquivar_automatico"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="arquivar_automatico"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Arquivar automaticamente após 1 ano
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="backup_automatico"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="backup_automatico"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Incluir em backup automático
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() =>
                      setShowNewDocumentModal && setShowNewDocumentModal(false)
                    }
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-300 bg-gray-600 hover:bg-gray-500"
                        : "text-gray-600 bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    Salvar Rascunho
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Criar Documento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Upload Documento */}
      {showUploadDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Upload className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold">
                    Upload Rápido de Documento
                  </h2>
                </div>
                <button
                  onClick={() =>
                    setShowUploadDocumentModal &&
                    setShowUploadDocumentModal(false)
                  }
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6">
                {/* Área de Upload */}
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    darkMode
                      ? "border-gray-600 hover:border-blue-500 bg-gray-700/30"
                      : "border-gray-300 hover:border-blue-500 bg-gray-50"
                  }`}
                >
                  <Upload
                    className={`mx-auto h-16 w-16 mb-6 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <div>
                    <label
                      htmlFor="quick-file-upload"
                      className="cursor-pointer"
                    >
                      <span className="text-xl text-blue-600 hover:text-blue-700 font-medium">
                        Clique para selecionar arquivos
                      </span>
                      <span
                        className={`block mt-2 text-lg ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        ou arraste e solte múltiplos arquivos aqui
                      </span>
                    </label>
                    <input
                      id="quick-file-upload"
                      name="quick-file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      📁 Suportados: PDF, JPG, PNG, DOC, TXT
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      📏 Tamanho máximo: 10MB por arquivo
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      📚 Múltiplos arquivos permitidos
                    </p>
                  </div>
                </div>

                {/* Configurações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Paciente *
                    </label>
                    <select
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">Selecione o paciente...</option>
                      <option value="1">Maria Silva Santos</option>
                      <option value="2">João Pedro Oliveira</option>
                      <option value="3">Ana Carolina Lima</option>
                      <option value="4">Carlos Eduardo Costa</option>
                      <option value="5">Fernanda Souza</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Categoria Padrão *
                    </label>
                    <select
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">Selecione uma categoria...</option>
                      <option value="Exames">📊 Exames</option>
                      <option value="Receitas">💊 Receitas</option>
                      <option value="Laudos">📝 Laudos</option>
                      <option value="Atestados">🏥 Atestados</option>
                      <option value="Imagens">📷 Imagens</option>
                      <option value="Resultados">📋 Resultados</option>
                      <option value="Outros">📄 Outros</option>
                    </select>
                  </div>
                </div>

                {/* Opções de Upload */}
                <div
                  className={`p-4 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } rounded-lg transition-colors`}
                >
                  <h4
                    className={`font-medium mb-3 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Opções de Upload
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto_detect_category"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="auto_detect_category"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Detectar categoria automaticamente pelo nome do arquivo
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto_extract_date"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="auto_extract_date"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Extrair data automaticamente do conteúdo
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="compress_images"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="compress_images"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Comprimir imagens automaticamente (otimizar tamanho)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notify_patient_upload"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="notify_patient_upload"
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Notificar paciente sobre novos documentos
                      </label>
                    </div>
                  </div>
                </div>

                {/* Progress Bar (visível durante upload) */}
                <div className="hidden">
                  <div
                    className={`bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors`}
                  >
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p
                    className={`text-sm text-center mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Fazendo upload... 0% concluído
                  </p>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() =>
                      setShowUploadDocumentModal &&
                      setShowUploadDocumentModal(false)
                    }
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Abrir modal "Novo Documento" para configuração detalhada
                      setShowUploadDocumentModal &&
                        setShowUploadDocumentModal(false);
                      setTimeout(
                        () =>
                          setShowNewDocumentModal &&
                          setShowNewDocumentModal(true),
                        200
                      );
                    }}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-300 bg-gray-600 hover:bg-gray-500"
                        : "text-gray-600 bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    Configuração Avançada
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Upload size={16} />
                    <span>Fazer Upload</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsView;
