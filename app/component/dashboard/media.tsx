
import { useEffect, useState } from "react";
import Api from "../../API";
import FormatMoney from "../../utils/formatMoney";
import { Imedia } from "../../../pages/dashBoard";

// Definindo a interface para um produto


// Definindo a interface para a resposta da API
export default function Media({media}: {media: Imedia}) {
    const [data, setData] = useState<Imedia>(media);

  if (!data) {
    return <div>Carregando...</div>;
  }


  const totalDays = data.daysWithData + data.daysWithNoData;
  const daysWithDataPercentage = (data.daysWithData / totalDays) * 100;
  const daysWithNoDataPercentage = (data.daysWithNoData / totalDays) * 100;

  return (

    <div className="flex flex-col h-[94%]">
        <div className="flex gap-2 justify-around grow items-center">
            <div>
                <p className="text-xl">{FormatMoney(data.mediaEntradaMensal)}</p>
            </div>
            <div>
                <p className="text-xl">{FormatMoney(data.mediaSaidaMensal)}</p>
            </div>
        </div>
        <div className="flex gap-1 w-full">
            <div
            style={{ width: `${daysWithDataPercentage}%` }}>
                <div className="bg-primary  h-[4px] rounded"></div>
                <div className="flex gap-2 mt-5">
                    <div className="bg-primary py-2 w-1 rounded-full mb-2"></div>
                    <small className="text-secondary">Dias ativos</small>
                </div>
                <p>{media.daysWithData}</p>
            </div>
            <div style={{ width: `${daysWithNoDataPercentage}%` }}>
                <div className="bg-info h-[4px] rounded"></div>
                <div className="flex gap-2 mt-5">
                    <div className="bg-info py-2 w-1 rounded-full mb-2"></div>
                    <small className="text-secondary">Dias inativos</small>
                </div>
                <p>{media.daysWithNoData}</p>
            </div>
        </div>

    </div>
  );
}
