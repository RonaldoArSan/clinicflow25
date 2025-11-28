import { useState } from 'react';

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface UseCepReturn {
  loading: boolean;
  error: string | null;
  data: CepData | null;
  fetchCep: (cep: string) => Promise<CepData | null>;
}

export const useCep = (): UseCepReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CepData | null>(null);

  const fetchCep = async (cep: string): Promise<CepData | null> => {
    // Remove non-digits
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      // Don't set error for incomplete typing, just return null
      return null;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado.');
        return null;
      }

      setData(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar CEP. Verifique sua conexão.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchCep };
};
