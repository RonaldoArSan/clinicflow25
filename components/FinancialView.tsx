import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Download, Filter, Search, X, Plus, FileText, PieChart } from 'lucide-react';

interface FinancialViewProps {
  darkMode?: boolean;
  showNewTransactionModal?: boolean;
  setShowNewTransactionModal?: (show: boolean) => void;
  showFinancialReportModal?: boolean;
  setShowFinancialReportModal?: (show: boolean) => void;
}

const FinancialView: React.FC<FinancialViewProps> = ({ 
  darkMode = false,
  showNewTransactionModal = false,
  setShowNewTransactionModal,
  showFinancialReportModal = false,
  setShowFinancialReportModal
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock financial data
  const financialData = {
    revenue: {
      today: 2800,
      week: 18500,
      month: 75620,
      year: 856400,
      growth: 12.5
    },
    expenses: {
      month: 45000,
      growth: -5.2
    },
    profit: {
      month: 30620,
      growth: 18.7
    },
    transactions: [
      {
        id: 1,
        date: '2024-02-01',
        description: 'Consulta - Maria Santos',
        type: 'receita',
        amount: 250,
        method: 'Cartão de Crédito',
        status: 'confirmado'
      },
      {
        id: 2,
        date: '2024-02-01',
        description: 'Exame - João Oliveira',
        type: 'receita',
        amount: 150,
        method: 'Dinheiro',
        status: 'confirmado'
      },
      {
        id: 3,
        date: '2024-02-01',
        description: 'Material Médico - Farmácia Central',
        type: 'despesa',
        amount: -320,
        method: 'Transferência',
        status: 'confirmado'
      },
      {
        id: 4,
        date: '2024-01-31',
        description: 'Consulta - Ana Costa',
        type: 'receita',
        amount: 280,
        method: 'PIX',
        status: 'pendente'
      },
      {
        id: 5,
        date: '2024-01-31',
        description: 'Energia Elétrica',
        type: 'despesa',
        amount: -450,
        method: 'Débito Automático',
        status: 'confirmado'
      }
    ],
    pendingPayments: [
      {
        id: 1,
        patient: 'Carlos Silva',
        description: 'Consulta Cardiológica',
        amount: 380,
        dueDate: '2024-02-05',
        days: 4
      },
      {
        id: 2,
        patient: 'Fernanda Lima',
        description: 'Exames Laboratoriais',
        amount: 180,
        dueDate: '2024-02-03',
        days: 2
      }
    ]
  };

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "confirmado":
          return "text-green-400 bg-green-900/30";
        case "pendente":
          return "text-yellow-400 bg-yellow-900/30";
        case "cancelado":
          return "text-red-400 bg-red-900/30";
        default:
          return "text-gray-400 bg-gray-700/30";
      }
    } else {
      switch (status) {
        case "confirmado":
          return "text-green-600 bg-green-50";
        case "pendente":
          return "text-yellow-600 bg-yellow-50";
        case "cancelado":
          return "text-red-600 bg-red-50";
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
          <h1 className="text-2xl font-bold mb-2">Financeiro</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Acompanhe receitas, despesas e fluxo de caixa da clínica
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="year">Este Ano</option>
          </select>
          <button 
            onClick={() => setShowFinancialReportModal && setShowFinancialReportModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FileText size={20} />
            <span>Relatório</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Receita do Mês</p>
              <p className="text-2xl font-bold text-green-600">R$ {financialData.revenue.month.toLocaleString('pt-BR')}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+{financialData.revenue.growth}%</span>
              </div>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Despesas do Mês</p>
              <p className="text-2xl font-bold text-red-600">R$ {financialData.expenses.month.toLocaleString('pt-BR')}</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{financialData.expenses.growth}%</span>
              </div>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Lucro Líquido</p>
              <p className="text-2xl font-bold text-blue-600">R$ {financialData.profit.month.toLocaleString('pt-BR')}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-500">+{financialData.profit.growth}%</span>
              </div>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Receita Hoje</p>
              <p className="text-2xl font-bold text-purple-600">R$ {financialData.revenue.today.toLocaleString('pt-BR')}</p>
              <div className="flex items-center mt-2">
                <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-500">Atualizado</span>
              </div>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className={`lg:col-span-2 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Transações Recentes</h2>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? "hover:bg-gray-700 text-gray-400" 
                    : "hover:bg-gray-100 text-gray-500"
                }`}>
                  <Filter size={20} />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? "hover:bg-gray-700 text-gray-400" 
                    : "hover:bg-gray-100 text-gray-500"
                }`}>
                  <Search size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {financialData.transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className={`p-4 rounded-lg border ${
                    darkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-200 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.type === 'receita' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-semibold">{transaction.description}</p>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {new Date(transaction.date).toLocaleDateString('pt-BR')} • {transaction.method}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'receita' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                      </p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Pagamentos Pendentes</h2>
            <div className="space-y-4">
              {financialData.pendingPayments.map((payment) => (
                <div 
                  key={payment.id}
                  className={`p-4 rounded-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{payment.patient}</p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {payment.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.days <= 2 ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30' :
                        payment.days <= 5 ? 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30' :
                        'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30'
                      }`}>
                        {payment.days}d
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-green-600">
                        R$ {payment.amount.toLocaleString('pt-BR')}
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Vence: {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Formas de Pagamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Cartão de Crédito</p>
                  <p className="text-xl font-bold">35%</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>PIX</p>
                  <p className="text-xl font-bold">25%</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-orange-600" />
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Convênio</p>
                  <p className="text-xl font-bold">25%</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-purple-600" />
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Dinheiro</p>
                  <p className="text-xl font-bold">12%</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-red-600" />
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Outros</p>
                  <p className="text-xl font-bold">3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nova Transação */}
      {showNewTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Plus className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-bold">Nova Transação</h2>
                </div>
                <button
                  onClick={() => setShowNewTransactionModal && setShowNewTransactionModal(false)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6">
                {/* Seção 1: Tipo e Informações Básicas */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    💰 Tipo e Informações Básicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Tipo de Transação *
                      </label>
                      <select 
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o tipo...</option>
                        <option value="receita">💚 Receita</option>
                        <option value="despesa">❤️ Despesa</option>
                        <option value="transferencia">🔄 Transferência</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Categoria *
                      </label>
                      <select 
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione a categoria...</option>
                        <optgroup label="Receitas">
                          <option value="consultas">🏥 Consultas</option>
                          <option value="exames">📊 Exames</option>
                          <option value="procedimentos">⚕️ Procedimentos</option>
                          <option value="convenios">💳 Convênios</option>
                          <option value="outros_receitas">📈 Outras Receitas</option>
                        </optgroup>
                        <optgroup label="Despesas">
                          <option value="materiais">🧪 Materiais Médicos</option>
                          <option value="medicamentos">💊 Medicamentos</option>
                          <option value="equipamentos">🔬 Equipamentos</option>
                          <option value="pessoal">👥 Pessoal</option>
                          <option value="aluguel">🏢 Aluguel</option>
                          <option value="utilidades">⚡ Utilidades</option>
                          <option value="outros_despesas">📉 Outras Despesas</option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Descrição da Transação *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: Consulta - Maria Santos ou Compra Material Cirúrgico"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Valor (R$) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Data da Transação *
                      </label>
                      <input
                        type="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 2: Forma de Pagamento */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    💳 Forma de Pagamento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Método de Pagamento *
                      </label>
                      <select 
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o método...</option>
                        <option value="dinheiro">💵 Dinheiro</option>
                        <option value="pix">🔄 PIX</option>
                        <option value="cartao_credito">💳 Cartão de Crédito</option>
                        <option value="cartao_debito">💳 Cartão de Débito</option>
                        <option value="transferencia">🏦 Transferência Bancária</option>
                        <option value="cheque">📄 Cheque</option>
                        <option value="convenio">🏥 Convênio</option>
                        <option value="boleto">📋 Boleto</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Status da Transação *
                      </label>
                      <select 
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o status...</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="pendente">⏳ Pendente</option>
                        <option value="processando">🔄 Processando</option>
                        <option value="cancelado">❌ Cancelado</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Número da Parcela (se aplicável)
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: 1/3, 2/12"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Taxa/Desconto (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 3: Informações Adicionais */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    📝 Informações Adicionais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Paciente Relacionado
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Nenhum paciente selecionado</option>
                        <option value="1">Maria Silva Santos</option>
                        <option value="2">João Pedro Oliveira</option>
                        <option value="3">Ana Carolina Lima</option>
                        <option value="4">Carlos Eduardo Costa</option>
                        <option value="5">Fernanda Souza</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Médico Responsável
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Nenhum médico selecionado</option>
                        <option value="dr_silva">Dr. João Silva - Clínico Geral</option>
                        <option value="dr_santos">Dra. Maria Santos - Cardiologia</option>
                        <option value="dr_costa">Dr. Pedro Costa - Pediatria</option>
                        <option value="dr_lima">Dra. Ana Lima - Ginecologia</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Número de Referência
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Número do comprovante, nota fiscal, etc."
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Centro de Custo
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione...</option>
                        <option value="consultorio_1">Consultório 1</option>
                        <option value="consultorio_2">Consultório 2</option>
                        <option value="recepcao">Recepção</option>
                        <option value="laboratorio">Laboratório</option>
                        <option value="administracao">Administração</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Informações adicionais sobre a transação..."
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 4: Configurações Avançadas */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    ⚙️ Configurações Avançadas
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="recorrente"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="recorrente" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Transação recorrente (repetir automaticamente)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notificar"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="notificar" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Notificar por email sobre a transação
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anexar_comprovante"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="anexar_comprovante" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Anexar comprovante da transação
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="conciliacao"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="conciliacao" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Incluir na conciliação bancária automática
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => setShowNewTransactionModal && setShowNewTransactionModal(false)}
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
                    className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Criar Transação</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Relatório Financeiro */}
      {showFinancialReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <PieChart className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold">Gerar Relatório Financeiro</h2>
                </div>
                <button
                  onClick={() => setShowFinancialReportModal && setShowFinancialReportModal(false)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6">
                {/* Seção 1: Período do Relatório */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    📅 Período do Relatório
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Período Pré-definido
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Período personalizado</option>
                        <option value="hoje">Hoje</option>
                        <option value="ontem">Ontem</option>
                        <option value="esta_semana">Esta semana</option>
                        <option value="semana_passada">Semana passada</option>
                        <option value="este_mes">Este mês</option>
                        <option value="mes_passado">Mês passado</option>
                        <option value="este_trimestre">Este trimestre</option>
                        <option value="este_ano">Este ano</option>
                        <option value="ano_passado">Ano passado</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Data Inicial
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
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Data Final
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
                  </div>
                </div>

                {/* Seção 2: Filtros e Categorias */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    🔍 Filtros e Categorias
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Tipo de Transação
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Todas as transações</option>
                        <option value="receita">Apenas Receitas</option>
                        <option value="despesa">Apenas Despesas</option>
                        <option value="transferencia">Apenas Transferências</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Status da Transação
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Todos os status</option>
                        <option value="confirmado">Confirmadas</option>
                        <option value="pendente">Pendentes</option>
                        <option value="processando">Processando</option>
                        <option value="cancelado">Canceladas</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Forma de Pagamento
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Todas as formas</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="pix">PIX</option>
                        <option value="cartao_credito">Cartão de Crédito</option>
                        <option value="cartao_debito">Cartão de Débito</option>
                        <option value="convenio">Convênio</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Médico Responsável
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Todos os médicos</option>
                        <option value="dr_silva">Dr. João Silva</option>
                        <option value="dr_santos">Dra. Maria Santos</option>
                        <option value="dr_costa">Dr. Pedro Costa</option>
                        <option value="dr_lima">Dra. Ana Lima</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seção 3: Tipo de Relatório */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    📊 Tipo de Relatório
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="resumo_executivo"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="resumo_executivo" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Resumo Executivo (receitas, despesas, lucro)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="fluxo_caixa"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="fluxo_caixa" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Fluxo de Caixa Detalhado
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="categorias"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="categorias" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Análise por Categorias
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="formas_pagamento"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="formas_pagamento" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Distribuição por Formas de Pagamento
                        </label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="evolucao_temporal"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="evolucao_temporal" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Evolução Temporal (gráficos)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="comparativo_periodo"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="comparativo_periodo" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Comparativo com Período Anterior
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="detalhado_transacoes"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="detalhado_transacoes" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Lista Detalhada de Transações
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="indicadores_performance"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="indicadores_performance" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Indicadores de Performance
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção 4: Formato e Entrega */}
                <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    📄 Formato e Entrega
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Formato do Arquivo
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="pdf">📄 PDF (Recomendado)</option>
                        <option value="excel">📊 Excel (.xlsx)</option>
                        <option value="csv">📋 CSV</option>
                        <option value="html">🌐 HTML</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Orientação da Página
                      </label>
                      <select 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-gray-100" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="retrato">📄 Retrato</option>
                        <option value="paisagem">📄 Paisagem</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="incluir_graficos"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="incluir_graficos" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Incluir gráficos e visualizações
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="enviar_email"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="enviar_email" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Enviar relatório por email após geração
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="salvar_modelo"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="salvar_modelo" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Salvar como modelo para relatórios futuros
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => setShowFinancialReportModal && setShowFinancialReportModal(false)}
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
                    Visualizar Preview
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Gerar Relatório</span>
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

export default FinancialView;