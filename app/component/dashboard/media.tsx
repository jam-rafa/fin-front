import { useState } from "react";
import FormatMoney from "../../utils/formatMoney";
import { Imedia } from "../../../pages/dashBoard";

// Definindo a interface para um produto
// Certifique-se de que a interface Imedia esteja correta no seu projeto

export default function Media({ media }: { media: Imedia }) {

    if (!media) {
        return <div>Carregando...</div>;
    }

    const totalDays = media.daysWithData + media.daysWithNoData;
    const daysWithDataPercentage = totalDays > 0 ? (media.daysWithData / totalDays) * 100 : 0;
    const daysWithNoDataPercentage = totalDays > 0 ? (media.daysWithNoData / totalDays) * 100 : 0;

    return (
        <div className="flex flex-col h-[94%]">
            <div className="flex gap-2 justify-between grow items-center">
                <div className="flex flex-col gap-2 ">
                    <div className="flex gap-2 items-center">
                        <div className="p-1 bg-success/20 text-success rounded ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icon-tabler-trending-up"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 17l6 -6l4 4l8 -8" />
                                <path d="M14 7l7 0l0 7" />
                            </svg>
                        </div>
                        <span className="text-secondary/90">Entradas</span>
                    </div>
                    <p className="text-xl">{FormatMoney(media.mediaEntradaMensal)}</p>
                </div>
                <div className="h-[70%] w-[2px] bg-secondary/50"></div>
                <div className="flex flex-col gap-2 ">
                    <div className="flex gap-2 items-center">
                        <div className="p-1 bg-danger/20 text-danger rounded ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icon-tabler-trending-down"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 7l6 6l4 -4l8 8" />
                                <path d="M21 10l0 7l-7 0" />
                            </svg>
                        </div>
                        <span className="text-secondary/90">Saídas</span>
                    </div>
                    <p className="text-xl">{FormatMoney(media.mediaSaidaMensal)}</p>
                </div>
            </div>
            <div className="flex gap-1 w-full">
                <div style={{ width: `${daysWithDataPercentage}%` }}>
                    <div className="bg-primary h-[4px] rounded"></div>
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
