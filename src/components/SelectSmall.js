import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({wallets = [] , handle , label = "Wallet" ,}) {
  const [wallet, setWallet] = React.useState('');

  const handleChange = (event) => {setWallet(event.target.value); handle(event.target.value)};

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={wallet}
        label={label}
        onChange={handleChange}
        className="w-24"
      >

      {wallets.map((wa)=>{
        return <MenuItem value={wa.WID} key={wa.WID}>{wa.WName}</MenuItem>
      })}

      </Select>
    </FormControl>
  );
}
