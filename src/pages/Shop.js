import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import { setTypes, setBrands, setDevices, setTotalCount } from "../store/slices/deviceSlice"
import { fetchBrands, fetchTypes, fetchParamsDevices } from "../http/deviceApi"
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
   const [loading, setLoading] = useState(true)
   const { page, selectedType, selectedBrand, limit, devices } = useSelector(state => state.device)

   useEffect(() => {
      fetchTypes().then(data => dispatch(setTypes(data)))
      fetchBrands().then(data => dispatch(setBrands(data)))
      fetchParamsDevices(null, null, 1, 6)
         .then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
            dispatch(setUser(true))
            dispatch(setIsAuth(true))
         })
         .finally(() => setLoading(false))
   }, [])

   useEffect(() => {
      fetchParamsDevices(selectedType, selectedBrand, page, limit).then(data => {
         dispatch(setDevices(data.rows))
         dispatch(setTotalCount(data.count))
      })
   }, [page, selectedType, selectedBrand])

   if(loading){
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
               <DeviceList devices={devices}/>
               <Pages/>
            </Grid>
         </Grid>
      </Container>
   )
}

export default Shop