import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function NewP({Open , SClose , Handle , title , ID , S , Types = [`Adding` , `Discount`] , isID = true} ) {


const [Title , setTitle] = React.useState();
const [Amount , setAmount] = React.useState();
const [Type , setType] = React.useState()
const [Card , setCard] = React.useState(0)



  return (
<div>
      <BootstrapDialog onClose={SClose} aria-labelledby="customized-dialog-title" open={Open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className="w-80">{title}</DialogTitle>

            <IconButton aria-label="close" onClick={SClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}>x</IconButton>

        <DialogContent className='h-80'>


<div className="flex flex-col justify-center items-center h-64">

   {isID ?    <FormControl sx={{ m: 1, minWidth: 224 }} size="">   
        <TextField disabled id="outlined-disabled" label="ID :" defaultValue={ID + 1} className="w-56" />
      </FormControl> :     <FormControl sx={{ m: 1, minWidth: 224 }} size="">
      <InputLabel id="demo-select-small-label">Card :</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small" label="Card" className="w-56" onChange={(e)=>{setCard(e.target.value)}}>
      {S.map((i , index)=>{
        return <MenuItem value={i.value} key={index}>{i.name}</MenuItem>
      })}

      </Select>
    </FormControl> }

      <FormControl sx={{ m: 1, minWidth: 224 }} size="">   
        <TextField id="outlined" label="Title"  className="w-56" onChange={(e)=>{setTitle(e.target.value)}}/>
      </FormControl>

    <FormControl sx={{ m: 1, minWidth: 224 }} size="">    
        <TextField id="outlined" label="Amount"  type='number' className="w-56" onChange={(e)=>{setAmount(e.target.value)}}/>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 224 }} size="">
      <InputLabel id="demo-select-small-label">Type :</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small" label="Type" className="w-56" onChange={(e)=>{setType(e.target.value)}}>
      {Types.map((i , index)=>{
        return <MenuItem value={i} key={index}>{i}</MenuItem>
      })}

      </Select>
    </FormControl>
    
  </div>



        </DialogContent>

<DialogActions>
          <Button autoFocus onClick={()=>{Handle(Title , Amount , Type , Card)}}>Save changes</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}