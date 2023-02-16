import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import DeviceList from "../components/DeviceList"
import { SHOP_ROUTE } from "../utils/consts";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Card, Typography } from "@mui/material";



const FavoritePage = () => {
   let navigate = useNavigate() 

   const { favorite } = useSelector(state => state.favorite)

   if(favorite.length === 0){
      navigate(`${SHOP_ROUTE}`)
   }

   return(
      <Container sx={{marginTop: 2}}>
         <Card>
            <Card sx={{borderRadius: "0px 0px 0px 0px", padding: 1}}>
               <Typography variant="h6">Мій список бажань</Typography>
            </Card> 
         <Grid  container spacing={2}>
            <Grid item xs>
               <DeviceList devices={favorite}/>
            </Grid>
         </Grid>
         </Card>
      </Container>
   )
}

export default FavoritePage