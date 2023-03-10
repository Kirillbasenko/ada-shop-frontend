import { useState, useRef  } from 'react';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createDevice } from '../../../http/deviceApi';
import { Selected } from '../../../halpers/components';
import { styleReview } from '../../../halpers/style';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const CreateDevice = ({open, handleClose}) => {
   const [photo, setPhoto] = useState(null)
   const [info, setInfo] = useState([])
   const file = useRef(null)
   const [src, setSrc] = useState(null)

   const {types, brands} = useSelector(state => state.device)

   const clear = () => {
      formik.values.name = ""
      formik.values.price = ""
      setPhoto(null)
      formik.values.brandId = ""
      formik.values.typeId = ""
      setInfo([])
      setSrc(null)
   }

   const douwload = async () => {
      let reader = new FileReader()
      reader.readAsDataURL(file.current.files[0])
      reader.onload = function (){
         setSrc(reader.result)
      }
   }

   const addInfo = () => {
      setInfo([...info, {title: "", description: "", _id: Date.now()}])
   }

   const removeInfo = (_id) => {
      setInfo(info.filter(item => item._id !== _id))
   }

   const changeInfo = (key, value, _id) => {
      setInfo(info.map(i => i._id === _id ? {...i, [key]: value} : i))
   }

   const selectFile = e => {
      setPhoto(e.target.files[0]);
   }

   const addDevice = () => {
      try{
         const data = {
            "name": formik.values.name,
            "price": formik.values.price,
            'brandId': formik.values.brandId,
            'typeId': formik.values.typeId,
            "img": src,
            "info": info
         }
         createDevice(data)
      }catch(e){
         console.log(e);
      }finally{
         clear()
         handleClose()
      }
   }

   const formik = useFormik({
      initialValues:{
         name: "",
         price: "",
         brandId: "",
         typeId: "",
      },
      validationSchema: Yup.object({
         name: Yup.string()
                  .min("5", "?????????????? 5 ????????????????")
                  .required("????????'???????????? ????????"),
         price: Yup.number()
                  .required("????????'???????????? ????????"),
         brandId: Yup.string()
                  .required("????????'???????????? ????????"),
         typeId: Yup.string()
                  .required("????????'???????????? ????????"),
      }),
      onSubmit: addDevice
   })

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box sx={styleReview}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               ???????????????? ????????????????
            </Typography>
            <form 
               style={{display: "flex", flexDirection: "column"}}
               onSubmit={formik.handleSubmit}>
               <FormControl sx={{marginTop: 2}} fullWidth>
                  <InputLabel id="demo-simple-select-label">?????? ????????????????</InputLabel>
                  {Selected("?????? ????????????????", "typeId", 
                     formik.values.typeId, 
                     types, 
                     formik.handleChange, 
                     formik.handleBlur )}
               </FormControl>
               <FormControl sx={{marginTop: 2}} fullWidth>
                  <InputLabel id="demo-simple-select-label">?????????? ????????????????</InputLabel>
                  {Selected("?????????? ????????????????", 
                     "brandId", 
                     formik.values.brandId, 
                     brands, 
                     formik.handleChange, 
                     formik.handleBlur )}
               </FormControl>
               <TextField 
                  sx={{marginTop: 2}} 
                  error={formik.errors.name && formik.touched.name}
                  label="?????????? ????????????????" 
                  name="name"
                  onChange={formik.handleChange} 
                  value={formik.values.name} 
                  onBlur={formik.handleBlur}
                  variant="outlined" 
                  helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}/>
               <FormControl sx={{marginTop: 2}} fullWidth >
                  <InputLabel htmlFor="outlined-adornment-amount">???????????????? ????????????????</InputLabel>
                  <OutlinedInput
                     error={formik.errors.price && formik.touched.price}
                     onChange={formik.handleChange} 
                     value={formik.values.price} 
                     name="price"
                     type='number'
                     onBlur={formik.handleBlur}
                     endAdornment={<InputAdornment position="start">??????</InputAdornment>}
                     label="???????????????? ????????????????"
                     helperText={formik.errors.price && formik.touched.price ? formik.errors.price : null} />
               </FormControl>
               <img style={{width: 100, height: 100, marginTop: 15}} src={src} alt="" />
               <Button sx={{marginTop: 2}} variant="contained" component="label">
                  ???????????????? ????????
               <input onChange={(e) => {
                        selectFile(e)
                        douwload()
                     }} 
                  ref={file} 
                  hidden accept="image/*" 
                  multiple 
                  type="file" />
               </Button>
               <Button 
                  onClick={addInfo} 
                  sx={{marginTop: 2}} 
                  variant="outlined">
                     ???????????????? ???????? ??????????????????????
               </Button>
               {info.map(i => 
                  <Box sx={{display: "flex", alignItems: "center", marginTop: 2, justifyContent:"space-between"}} key={i.id}>
                        <TextField 
                           label="???????????????? ????????????????" 
                           name="name"
                           value={i.title}
                           onChange={(e) => changeInfo("title", e.target.value, i._id)}
                           variant="outlined" />
                        <TextField
                           label="???????????????? ????????????????" 
                           name="name"
                           value={i.description}
                           onChange={(e) => changeInfo("description", e.target.value, i._id)}
                           variant="outlined" />
                        <Button color="error" onClick={() => removeInfo(i._id)} variant="outlined">????????????????</Button>
                  </Box>)}
               <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 2}}>
                  <Button onClick={() => {
                     handleClose()
                     clear()}} color="error" sx={{width: "45%"}} variant="outlined">??????????????</Button>
                  <Button type='submit' color="success" sx={{width: "45%"}} variant="outlined">????????????????????</Button>
               </Box>
            </form>
         </Box>
      </Modal>
   )
}

export default CreateDevice