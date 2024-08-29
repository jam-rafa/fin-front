"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import FormatMoney from "../../utils/formatMoney";


export default function Balance({ title, total, icon }: {title: string, total: number, icon:any}) {

  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-2 relative">

      {/* <span className="bg-secondary-10 px-2 rounded text-secondary text-sm flex items-center absolute bottom-0 right-1">
        <span>0 {data.lucroPrejuizoPercentChange} %</span>
      </span> */}


      <div className="text-primary">
        {icon}
      </div>

      <section className="flex flex-col mt-1 items-center">
        <div className="text-2xl">{FormatMoney(total)}</div>
      </section>
      <h2 className="text-lg text-secondary">{title}</h2>
    </div>
  );
  
}



