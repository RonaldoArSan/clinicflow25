import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import FinancialView from "../components/FinancialView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function FinancialPage() {
  const { darkMode } = useDarkMode();
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showFinancialReportModal, setShowFinancialReportModal] =
    useState(false);

  return (
    <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
      <MainLayout
        title="Financeiro"
        actions={
          <button
            onClick={() => setShowNewTransactionModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Transação</span>
          </button>
        }
      >
        <FinancialView
          darkMode={darkMode}
          showNewTransactionModal={showNewTransactionModal}
          setShowNewTransactionModal={setShowNewTransactionModal}
          showFinancialReportModal={showFinancialReportModal}
          setShowFinancialReportModal={setShowFinancialReportModal}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
