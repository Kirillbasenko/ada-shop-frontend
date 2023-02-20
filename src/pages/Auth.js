import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from 'react';
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { useDispatch } from "react-redux"

import { setIsAuth, setUser } from "../store/slices/userSlice";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userApi';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

const Auth = () => {
   const location = useLocation()
   const error = useRef("")
   const isLogin = location.pathname === LOGIN_ROUTE
   let navigate = useNavigate() 
   const dispatch = useDispatch(); 

   const click = async () => {
      try{
         let data
         if(isLogin){
            data = await login(formik.values.email, formik.values.password)
         }else{
            data = await registration(formik.values.email, formik.values.password, formik.values.name)
         }
         dispatch(setIsAuth(true))
         localStorage.setItem("role", data.role)
         dispatch(setUser(data))
         navigate(`${SHOP_ROUTE}`, { replace: true })
      }catch(e){
         error.current.style.display = "block"
      }
   }

   console.log(localStorage.getItem("role"));

   const formik = useFormik({
      initialValues:{
         email: "",
         password: "",
         name: ""
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Неправильна адреса")
                  .required("Обов'язкове поле"),
         password: Yup.string()
                  .required("Обов'язкове поле"),
      }),
      onSubmit: click
   })

   return(
      <Container  
         className='d-flex justify-content-center align-items-center'
         style={{marginTop: 200}}>
         <Card style={{width: 600}} className="p-5">
            <h2 className='m-auto'>{isLogin ? "Авторизація" : "Реєстрація"}</h2>
            <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
               {!isLogin ? 
                  <TextField
                     className='mt-3'
                     id="outlined-required"
                     label="Name"
                     placeholder="Введіть ваше ім'я..."
                     onChange={formik.handleChange} 
                     value={formik.values.name} 
                     name="name"
                     type="name"
                     onBlur={formik.handleBlur}/> : null}
               <TextField
                  error={formik.errors.email && formik.touched.email}
                  className='mt-3'
                  required
                  id="outlined-required"
                  label="Email"
                  placeholder='Введіть ваш email...'
                  onChange={formik.handleChange} 
                  value={formik.values.email} 
                  name="email"
                  type='email'
                  helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                  onBlur={formik.handleBlur}/>
               <TextField
                  error={formik.errors.password && formik.touched.password}
                  className='mt-3'
                  id="outlined-password-input"
                  label="Password"
                  required
                  placeholder='Введіть ваш пароль...'
                  onChange={formik.handleChange} 
                  value={formik.values.password} 
                  name="password" 
                  type="password"
                  helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                  onBlur={formik.handleBlur}
                  />
               {isLogin ? 
                  <div 
                     className='mt-3'>
                     Нема акаунту? 
                     <Link style={{marginLeft: 10, textDecoration: "none"}} to={REGISTRATION_ROUTE}>Зареєструйся!</Link>
                  </div> : 
                  <div 
                     className='mt-3'>
                     Есть аккаунт? 
                     <Link style={{marginLeft: 10, textDecoration: "none"}} to={LOGIN_ROUTE}>Увійдіть!</Link>
                  </div>}
               <Button
                  type='submit'
                  variant="outlined"
                  color="success"
                  className='mt-3 align-self-start'>
                  {isLogin ? "Увійти" : "Зареєструватись"}
               </Button>
               <div 
                  style={{display: "none", color: "red"}} 
                  ref={error} 
                  className="not-user">
                  {isLogin ? "Користувач не знайдений" : "Користувач із таким Email вже зареєстрований"}
               </div>
            </form>
         </Card>
      </Container>
   )
}

export default Auth