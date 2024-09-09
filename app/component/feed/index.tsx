import { IDataFeed } from "../../../pages/search";
import FormatMoney from "../../utils/formatMoney";
import {FormatDateBr} from "../../utils/formatDate";

const typePgto = (type: string) => {
  return type === "Débito" ? 'bg-danger/10 text-danger' : "bg-sucsses/10 text-sucsses"
}

export default function Feed({dataFeed}: {dataFeed : IDataFeed}) {
    return (
      <div className="p-5 bg-card shadow-lg rounded h-full grid gap-5 lg:grid-cols-12  ">
        <div className="col-span-2 gap-2">
            <p className={`bottom-0 right-0 p-2 w-100 ${typePgto(dataFeed.tipo_pgto)}`}>{dataFeed.tipo_pgto}</p>
          <div className={` flex justify-center flex-col items-center col-span-2 px-4 py-[70px] rounded bg-ground`}>
              <p className="text-lg">{FormatMoney(dataFeed.valor)}</p>
              <p>Valor</p>
          </div>
        </div>

        <div className="col-span-7 flex flex-col justify-between">
          <div>
            <h1>{dataFeed.nome}</h1>
            <h5 className="text-sm mt-2 text-secondary">{dataFeed.natureza}</h5>
          </div>

          <p className="py-1 px-2 bg-primary/10 text-primary rounded w-fit">{dataFeed.centro_custo}</p>
        </div>
        <div className="col-span-3 relative">
          <p className="absolute top-0 right-0">{FormatDateBr(dataFeed.data)}</p>
        </div>

      </div>
    );
  }
  