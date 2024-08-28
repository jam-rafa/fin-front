import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface IFiltersDashProps {
    date: number; // Atualizado para number
    setDate: (date: number) => void; // Atualizado para number
}

export default function FiltersDash({ date, setDate }: IFiltersDashProps) {


    const months = [
        { value: "-1", label: "Todos os meses" },
        { value: "0", label: "Janeiro" },
        { value: "1", label: "Fevereiro" },
        { value: "2", label: "Março" },
        { value: "3", label: "Abril" },
        { value: "4", label: "Maio" },
        { value: "5", label: "Junho" },
        { value: "6", label: "Julho" },
        { value: "7", label: "Agosto" },
        { value: "8", label: "Setembro" },
        { value: "9", label: "Outubro" },
        { value: "10", label: "Novembro" },
        { value: "11", label: "Dezembro" }
      ];

      const handleChange = (event: SelectChangeEvent<string>) => {
        setDate(parseInt(event.target.value));
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="select-label">Mês</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={date.toString()}
                    label="Mês"
                    onChange={handleChange}
                    className="w-80"
                >
                    {months.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
                </Select>
            </FormControl>
        </div>
    );
}
