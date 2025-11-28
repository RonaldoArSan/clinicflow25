import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { User, Permission, UserRole, MOCK_USERS } from "../types/user";

// Estados do contexto de usuário
interface UserContextState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  users: User[];
}

// Ações do contexto
type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<User["preferences"]> }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "SET_LOADING"; payload: boolean };

// Interface do contexto
interface UserContextType extends UserContextState {
  // Autenticação
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Verificações de permissão
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;

  // Gestão de usuários (para admins)
  getAllUsers: () => User[];
  getUserById: (id: string) => User | undefined;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  createUser: (userData: Omit<User, "id">) => Promise<User>;

  // Atualização de perfil
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (
    preferences: Partial<User["preferences"]>
  ) => Promise<void>;

  // Utilitários
  switchUser: (userId: string) => void; // Para desenvolvimento/admin
  isOnline: (userId: string) => boolean;
  getUserRoleInfo: () => {
    title: string;
    description: string;
    icon: string;
  } | null;
}

// Estado inicial
const initialState: UserContextState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  users: MOCK_USERS,
};

// Reducer
function userReducer(
  state: UserContextState,
  action: UserAction
): UserContextState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        error: null,
      };

    case "UPDATE_USER":
      if (!state.currentUser) return state;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };

    case "UPDATE_PREFERENCES":
      if (!state.currentUser) return state;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          preferences: {
            ...state.currentUser.preferences,
            ...action.payload,
          },
        },
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Criação do contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider do contexto
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Simular carregamento inicial (verificar localStorage, etc.)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Simular verificação de sessão
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
          // Nenhum usuário salvo, permanecer deslogado
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        dispatch({ type: "LOGIN_FAILURE", payload: "Erro ao carregar sessão" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Implementação das funções
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Simular autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = MOCK_USERS.find((u) => u.email === email);
      if (user && user.status === "active") {
        const updatedUser = {
          ...user,
          isOnline: true,
          lastLogin: new Date().toISOString(),
        };

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
        return true;
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Credenciais inválidas ou usuário inativo",
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Erro de login",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!state.currentUser) return false;
    return state.currentUser.permissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!state.currentUser) return false;
    return state.currentUser.role === role;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!state.currentUser) return false;
    return permissions.some((permission) =>
      state.currentUser!.permissions.includes(permission)
    );
  };

  const getAllUsers = (): User[] => {
    return state.users;
  };

  const getUserById = (id: string): User | undefined => {
    return state.users.find((user) => user.id === id);
  };

  const updateUser = async (
    userId: string,
    updates: Partial<User>
  ): Promise<void> => {
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUsers = state.users.map((user) =>
      user.id === userId ? { ...user, ...updates } : user
    );

    dispatch({ type: "SET_USERS", payload: updatedUsers });

    // Se atualizando o usuário atual
    if (state.currentUser?.id === userId) {
      dispatch({ type: "UPDATE_USER", payload: updates });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...state.currentUser, ...updates })
      );
    }
  };

  const createUser = async (userData: Omit<User, "id">): Promise<User> => {
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };

    const updatedUsers = [...state.users, newUser];
    dispatch({ type: "SET_USERS", payload: updatedUsers });

    return newUser;
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!state.currentUser) throw new Error("Usuário não autenticado");

    await updateUser(state.currentUser.id, updates);
  };

  const updatePreferences = async (
    preferences: Partial<User["preferences"]>
  ): Promise<void> => {
    if (!state.currentUser) throw new Error("Usuário não autenticado");

    const updatedUser = {
      ...state.currentUser,
      preferences: {
        ...state.currentUser.preferences,
        ...preferences,
      },
    };

    dispatch({
      type: "UPDATE_USER",
      payload: { preferences: updatedUser.preferences },
    });
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const switchUser = (userId: string) => {
    const user = getUserById(userId);
    if (user) {
      const updatedUser = { ...user, isOnline: true };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
    }
  };

  const isOnline = (userId: string): boolean => {
    const user = getUserById(userId);
    return user?.isOnline || false;
  };

  const getUserRoleInfo = () => {
    if (!state.currentUser) return null;

    const roleDescriptions = {
      admin: {
        title: "Administrador",
        description: "Acesso total ao sistema",
        icon: "⚙️",
      },
      doctor: {
        title: "Médico",
        description: "Acesso completo a prontuários",
        icon: "👨‍⚕️",
      },
      nurse: {
        title: "Enfermeiro",
        description: "Gestão de pacientes e procedimentos",
        icon: "👩‍⚕️",
      },
      receptionist: {
        title: "Recepcionista",
        description: "Agendamentos e cadastros",
        icon: "🏥",
      },
      viewer: {
        title: "Visualizador",
        description: "Acesso somente leitura",
        icon: "👁️",
      },
    };

    return roleDescriptions[state.currentUser.role];
  };

  const contextValue: UserContextType = {
    ...state,
    login,
    logout,
    hasPermission,
    hasRole,
    hasAnyPermission,
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    updateProfile,
    updatePreferences,
    switchUser,
    isOnline,
    getUserRoleInfo,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Hook para usar o contexto
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider");
  }
  return context;
}

// Hook de conveniência para verificações rápidas
export function usePermissions() {
  const { hasPermission, hasRole, hasAnyPermission, currentUser } =
    useUserContext();

  return {
    hasPermission,
    hasRole,
    hasAnyPermission,
    currentUser,

    // Verificações específicas comuns
    canManagePatients: hasAnyPermission([
      "patients:create",
      "patients:update",
      "patients:delete",
    ]),
    canViewPatients: hasPermission("patients:read"),
    canManageAppointments: hasAnyPermission([
      "appointments:create",
      "appointments:update",
      "appointments:delete",
    ]),
    canManageMedicalRecords: hasAnyPermission([
      "medical-records:create",
      "medical-records:update",
    ]),
    canViewFinancial: hasPermission("financial:read"),
    canManageSystem: hasPermission("admin:system"),
    isDoctor: hasRole("doctor"),
    isNurse: hasRole("nurse"),
    isAdmin: hasRole("admin"),
    isReceptionist: hasRole("receptionist"),
  };
}
