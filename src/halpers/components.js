import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export const Selected = (ladel, name, value, arr, onChange, onBlur) => {
   return(
      <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         label={ladel}
         name={name}
         onChange={onChange} 
         value={value}
         onBlur={onBlur}>
         {arr.items.map(item => {
            return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
         })}
      </Select>
   )
}

export const TextFieldCastom = (ladel, name, onChange, value, onBlur) => {
   return (
      <TextField
         sx={{marginTop: 2}}
         id="outlined-required"
         label={ladel}
         name={name}
         onChange={onChange} 
         value={value} 
         onBlur={onBlur}/>
   )
}