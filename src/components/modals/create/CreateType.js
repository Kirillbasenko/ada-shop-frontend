import { useState } from 'react';

import { createType } from '../../../http/deviceApi';
import {styleReview} from '../../../utils/style';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const CreateType = ({open, handleClose}) => {
   const [value, setValue] = useState("")

   const addType = () => {
      createType({name: value}).then(data => {
         setValue("")
         handleClose()
      })
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
            <Box sx={styleReview}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Добавити тип
               </Typography>
               <TextField 
                  sx={{marginTop: 2}} 
                  id="outlined-basic" 
                  label="Бренд" 
                  name="name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  variant="outlined" />
               <Button 
                  disabled={!value} 
                  onClick={() => addType()}
                  color="success" 
                  sx={{width: "45%", marginTop: 2}} 
                  variant="outlined">
                     Відправити
               </Button>
            </Box>
      </Modal>
   )
}

export default CreateType