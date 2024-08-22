import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";


export default function FiltersDash() {

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };

  return (
    <div>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Meses"
            onChange={handleChange}
            className="w-40"
        >
            <MenuItem value={0}>Todos</MenuItem>
            <MenuItem value={10}>Janeiro</MenuItem>
            <MenuItem value={20}>Fevereiro</MenuItem>
            <MenuItem value={30}>Março</MenuItem>
        </Select>
        </FormControl>

    </div>
  );
  
}
