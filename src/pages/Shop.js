import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import { setDevices, setTotalCount, fetchType, fetchDevice } from "../store/slices/deviceSlice"
import { fetchBrands, fetchParamsDevices } from "../http/deviceApi"
import Pages from "../components/mainPage/Pages"
import { setUser, setIsAuth } from "../store/slices/userSlice"
import TypeBar from "../components/mainPage/TypeBar"
import BrandBar from "../components/mainPage/BrandBar"

import DeviceList from "../components/DeviceList"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Shop = () => {
   const dispatch = useDispatch(); 
   const { page, selectedType, selectedBrand, limit, devices } = useSelector(state => state.device)

   useEffect(() => {
      dispatch(fetchDevice({selectedType, selectedBrand, page, limit}))
   }, [])

   useEffect(() => {
      fetchParamsDevices(selectedType, selectedBrand, page, limit).then(data => {
         dispatch(setDevices(data))
      })
   }, [page, selectedType, selectedBrand])

   if(devices.status === "loading"){
      return (
         <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
            <CircularProgress />
         </Box>
      );
   }

   return(
      <Container >
         <Grid  container spacing={2}>
            <Grid item>
               <TypeBar/>
            </Grid>
            <Grid item xs>
               <BrandBar/>
               <DeviceList devices={devices.items}/>
               <Pages/>
            </Grid>
         </Grid>
      </Container>
   )
}

export default Shop