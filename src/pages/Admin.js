import { useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CreateBrand from '../components/modals/create/CreateBrand';
import CreateDevice from '../components/modals/create/CreateDevice';
import CreateType from '../components/modals/create/CreateType';

const Admin = () => {
   const navigate = useNavigate() 

   const [openDevice, setOpenDevice] = useState(false)
   const [openBrand, setOpenBrand] = useState(false)
   const [openType, setOpenType] = useState(false)
   

   if(!localStorage.getItem("role") === "KIRILLADMIN"){
      navigate("/")
   }

   return(
      <Container className='d-flex flex-column'>
         <Button onClick={() => setOpenType(true)} variant={"outline-dark"} className="mt-4 p-2">Добавити тип</Button>
         <Button onClick={() => setOpenBrand(true)} variant={"outline-dark"} className="mt-4 p-2">Добавити бренд</Button>
         <Button onClick={() => setOpenDevice(true)} variant={"outline-dark"} className="mt-4 p-2">Добавити пристрій</Button>
         <CreateBrand open={openBrand} handleClose={() => setOpenBrand(false)}/>
         <CreateType open={openType} handleClose={() => setOpenType(false)}/>
         <CreateDevice open={openDevice} handleClose={() => setOpenDevice(false)}/>
      </Container>
   )
}

export default Admin