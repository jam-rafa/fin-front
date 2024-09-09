import { useEffect, useState } from "react";
import Feed from "../app/component/feed";
import Api from "../app/API";

// Interface para os dados que serão exibidos
export interface IDataFeed {
  id: number;
  natureza: string;
  nome: string;
  valor: number;
  tipo_custo: string;
  centro_custo: string;
  data: string; // ou Date, se preferir usar tipos de data
}

export default function SearchPage() {
  // Estado para armazenar o relatório
  const [relatorio, setRelatorio] = useState<IDataFeed[]>([]);

  // Efeito para buscar os dados quando o componente é montado
  useEffect(() => {
    fetchData();
  }, []);

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await Api.get<IDataFeed[]>(`/search`);
      setRelatorio(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  return (
    <div className="p-5 grid lg:grid-cols-12 gap-5">
      
      {relatorio.map(item => (
        <div className="col-span-12">
            <Feed dataFeed={item} />
        </div>
      ))}
    </div>
  );
}
