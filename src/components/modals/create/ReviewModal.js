import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";

import { createReview } from '../../../http/reviewApi';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

import {styleReview} from '../../../utils/style';

const ReviewModal = ({open, handleClose, deviceId}) => {
   const [rating, setRating] = useState(0);

   let userName = localStorage.getItem("userName");

   const submitReview = async () => {
      const data = await {
         deviceId: formik.values.deviceId,
         userName: formik.values.userName,
         positive: formik.values.positive,
         negative: formik.values.negative,
         comment: formik.values.comment,
         rate: formik.values.rate
      }
      createReview(data, deviceId)
      formik.values.positive = ""
      formik.values.negative = ""
      formik.values.comment = ""
      formik.values.rate = null
      setRating(0)
      setTimeout(() => {
         handleClose()
      }, 1000)
   }

   const formik = useFormik({
      initialValues:{
         deviceId: deviceId,
         userName: userName ? userName : "",
         positive: "",
         negative: "",
         comment: "",
         rate: rating ? rating : ""
      },
      validationSchema: Yup.object({
         comment: Yup.string()
                  .min("5", "Мінімум 5 символів")
                  .required("Обов'язкове поле"),
         rate: Yup.number()
                  .required("Обов'язкове поле"),
      }),
      onSubmit: submitReview
   })

   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <Box sx={styleReview}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Написати відгук
            </Typography>
            <form 
               style={{display: "flex", flexDirection: "column"}}
               onSubmit={formik.handleSubmit}>
               <Rating
                  sx={{width: 150}}
                  name="simple-controlled"
                  value={+formik.values.rate}
                  onChange={(event, newValue) => {
                     setRating(formik.values.rate = +event.target.value);
                  }}
               />
               {formik.errors.rate && formik.touched.rate  ? <div style={{color: "red"}}>{formik.errors.rate}</div> : null}
               <TextField
                  sx={{marginTop: 2}}
                  id="outlined-required"
                  label="Ваше ім'я"
                  name="userName"
                  type="name"
                  onChange={formik.handleChange} 
                  value={formik.values.userName} 
                  onBlur={formik.handleBlur}/>
               <TextField
                  sx={{marginTop: 2}}
                  id="outlined-required"
                  label="Переваги"
                  name="positive"
                  onChange={formik.handleChange} 
                  value={formik.values.positive} 
                  onBlur={formik.handleBlur}/>
               <TextField
                  sx={{marginTop: 2}}
                  id="outlined-required"
                  label="Недоліки"
                  name="negative"
                  onChange={formik.handleChange} 
                  value={formik.values.negative} 
                  onBlur={formik.handleBlur}/>
               <TextField
                  error={formik.errors.comment && formik.touched.comment}
                  required
                  sx={{marginTop: 2}}
                  id="outlined-multiline-static"
                  label="Коментар"
                  name="comment"
                  multiline
                  rows={4}
                  onChange={formik.handleChange} 
                  value={formik.values.comment} 
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.comment && formik.touched.comment ? formik.errors.comment : null}/>
               <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 2}}>
                  <Button  onClick={() => handleClose()} sx={{width: "40%"}} color="error" variant="outlined">Скасувати</Button>
                  <Button type="submit" sx={{width: "40%"}} color="success" variant="outlined">Залишити відгук</Button>
               </Box>
            </form>
         </Box>
         </Modal>
   )
}

export default ReviewModal