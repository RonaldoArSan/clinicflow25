import React, { useState } from "react";
import { Patient } from "../types";

interface NewPatientFormProps {
  darkMode: boolean;
  onCancel: () => void;
  onSubmit: (patient: Omit<Patient, "id">) => void;
}

export default function NewPatientForm({
  darkMode,
  onCancel,
  onSubmit,
}: NewPatientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    profession: "",
    phone: "",
    altPhone: "",
    email: "",
    zipCode: "",
    city: "",
    address: "",
    bloodType: "",
    weight: "",
    height: "",
    responsibleDoctor: "",
    allergies: "",
    chronicConditions: "",
    healthPlanType: "",
    healthPlan: "",
    planNumber: "",
    planExpiry: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    emergencyEmail: "",
    referralSource: "",
    generalNotes: "",
    termsAccepted: false,
    marketingAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Converter dados do formulário para o formato Patient
    const newPatient: Omit<Patient, "id"> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      birthDate: formData.birthDate,
      cpf: formData.cpf,
      bloodType: formData.bloodType,
      allergies: formData.allergies
        ? formData.allergies.split(",").map((s) => s.trim())
        : [],
      chronicConditions: formData.chronicConditions
        ? formData.chronicConditions.split(",").map((s) => s.trim())
        : [],
      healthPlan: formData.healthPlan,
      planNumber: formData.planNumber,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRelation,
      },
      lastVisit: new Date().toISOString().split("T")[0],
      status: "ativo",
      notes: formData.generalNotes,
    };

    onSubmit(newPatient);
  };

  const inputClass = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    darkMode
      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
  }`;

  const labelClass = `block text-sm font-medium mb-1 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`;
  const sectionClass = `p-6 ${
    darkMode ? "bg-gray-700/50" : "bg-gray-50"
  } rounded-lg transition-colors`;
  const sectionTitleClass = `text-lg font-semibold mb-4 ${
    darkMode ? "text-gray-200" : "text-gray-800"
  }`;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Seção 1: Dados Pessoais */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>📋 Dados Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome Completo *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Digite o nome completo"
            />
          </div>
          <div>
            <label className={labelClass}>CPF *</label>
            <input
              type="text"
              name="cpf"
              required
              value={formData.cpf}
              onChange={handleChange}
              className={inputClass}
              placeholder="000.000.000-00"
            />
          </div>
          <div>
            <label className={labelClass}>Data de Nascimento *</label>
            <input
              type="date"
              name="birthDate"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sexo *</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado Civil</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="uniao_estavel">União Estável</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Profissão</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className={inputClass}
              placeholder="Digite a profissão"
            />
          </div>
        </div>
      </div>

      {/* Seção 2: Contato e Endereço */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>📞 Contato e Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Telefone Principal *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <label className={labelClass}>Telefone Alternativo</label>
            <input
              type="tel"
              name="altPhone"
              value={formData.altPhone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>E-mail *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <label className={labelClass}>CEP *</label>
            <input
              type="text"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              className={inputClass}
              placeholder="00000-000"
            />
          </div>
          <div>
            <label className={labelClass}>Cidade *</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              placeholder="Digite a cidade"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Endereço Completo *</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="Rua, número, complemento, bairro"
            />
          </div>
        </div>
      </div>

      {/* Seção 3: Informações Médicas */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>🩺 Informações Médicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo Sanguíneo</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={inputClass}
              placeholder="70.5"
            />
          </div>
          <div>
            <label className={labelClass}>Altura (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={inputClass}
              placeholder="175"
            />
          </div>
          <div>
            <label className={labelClass}>Médico Responsável</label>
            <select
              name="responsibleDoctor"
              value={formData.responsibleDoctor}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione um médico...</option>
              <option value="dr_silva">Dr. João Silva - Clínico Geral</option>
              <option value="dr_santos">Dra. Maria Santos - Cardiologia</option>
              <option value="dr_costa">Dr. Pedro Costa - Pediatria</option>
              <option value="dr_lima">Dra. Ana Lima - Ginecologia</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Alergias Conhecidas</label>
            <textarea
              name="allergies"
              rows={3}
              value={formData.allergies}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Liste todas as alergias conhecidas (medicamentos, alimentos, etc.)"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>
              Condições Crônicas / Histórico Médico
            </label>
            <textarea
              name="chronicConditions"
              rows={3}
              value={formData.chronicConditions}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Diabetes, hipertensão, cirurgias anteriores, etc."
            />
          </div>
        </div>
      </div>

      {/* Seção 4: Convênio e Plano de Saúde */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>💳 Convênio e Plano de Saúde</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo de Atendimento *</label>
            <select
              name="healthPlanType"
              required
              value={formData.healthPlanType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="particular">Particular</option>
              <option value="convenio">Convênio</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Convênio / Plano de Saúde</label>
            <select
              name="healthPlan"
              value={formData.healthPlan}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="unimed">Unimed</option>
              <option value="bradesco">Bradesco Saúde</option>
              <option value="amil">Amil</option>
              <option value="sulamerica">SulAmérica</option>
              <option value="porto_seguro">Porto Seguro</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Número da Carteirinha</label>
            <input
              type="text"
              name="planNumber"
              value={formData.planNumber}
              onChange={handleChange}
              className={inputClass}
              placeholder="Digite o número da carteirinha"
            />
          </div>
          <div>
            <label className={labelClass}>Validade do Plano</label>
            <input
              type="date"
              name="planExpiry"
              value={formData.planExpiry}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Seção 5: Contato de Emergência */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>🚨 Contato de Emergência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome Completo *</label>
            <input
              type="text"
              name="emergencyName"
              required
              value={formData.emergencyName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Nome do contato de emergência"
            />
          </div>
          <div>
            <label className={labelClass}>Parentesco *</label>
            <select
              name="emergencyRelation"
              required
              value={formData.emergencyRelation}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="pai">Pai</option>
              <option value="mae">Mãe</option>
              <option value="conjuge">Cônjuge</option>
              <option value="filho">Filho(a)</option>
              <option value="irmao">Irmão(ã)</option>
              <option value="amigo">Amigo(a)</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Telefone *</label>
            <input
              type="tel"
              name="emergencyPhone"
              required
              value={formData.emergencyPhone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <label className={labelClass}>E-mail do Contato</label>
            <input
              type="email"
              name="emergencyEmail"
              value={formData.emergencyEmail}
              onChange={handleChange}
              className={inputClass}
              placeholder="email@exemplo.com"
            />
          </div>
        </div>
      </div>

      {/* Seção 6: Observações Adicionais */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>📝 Observações Adicionais</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Como chegou à clínica?</label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              <option value="indicacao">Indicação de paciente</option>
              <option value="medico">Indicação médica</option>
              <option value="internet">Pesquisa na internet</option>
              <option value="redes_sociais">Redes sociais</option>
              <option value="convenio">Pelo convênio</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Observações Gerais</label>
            <textarea
              name="generalNotes"
              rows={4}
              value={formData.generalNotes}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Informações adicionais sobre o paciente, preferências, restrições, etc."
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="termos"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="termos"
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Aceito os termos de uso e política de privacidade da clínica
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="marketing"
              name="marketingAccepted"
              checked={formData.marketingAccepted}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="marketing"
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Autorizo o recebimento de comunicações sobre consultas e serviços
            </label>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
        <button
          type="button"
          onClick={onCancel}
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
          Cadastrar Paciente
        </button>
      </div>
    </form>
  );
}
