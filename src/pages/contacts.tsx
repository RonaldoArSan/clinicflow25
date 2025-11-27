import React, { useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useReceptionData } from "../hooks/useReceptionData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

const ContactsView = dynamic(
  () => import("../components/reception/ContactsView"),
  { ssr: false }
);
const NewContactModal = dynamic(
  () => import("../components/reception/NewContactModal"),
  { ssr: false }
);

export default function ContactsPage() {
  const { darkMode } = useDarkMode();
  const { contacts, addContact, updateContact, deleteContact } =
    useReceptionData();
  const [showNewContactModal, setShowNewContactModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
      <MainLayout
        title="Contatos"
        actions={
          <button
            onClick={() => setShowNewContactModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Contato</span>
          </button>
        }
      >
        <ContactsView
          darkMode={darkMode}
          contacts={contacts}
          onAddContact={addContact}
          onEditContact={updateContact}
          onDeleteContact={deleteContact}
          onCall={(phone) => console.log("Ligando para:", phone)}
          onSendMessage={(phone) =>
            console.log("Enviando mensagem para:", phone)
          }
        />

        <NewContactModal
          darkMode={darkMode}
          isOpen={showNewContactModal}
          onClose={() => setShowNewContactModal(false)}
          onSave={(contact) => {
            addContact(contact);
            setShowNewContactModal(false);
          }}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
