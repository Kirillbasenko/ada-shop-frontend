import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"

import { setBasket } from "../../store/slices/basketSlice"
import { setFavorite } from '../../store/slices/favoriteSlice';
import PromotionModal from '../modals/PromotionModal';
import { fetchParamsDevices } from '../../http/deviceApi';
import { setDevices, setTotalCount } from "../../store/slices/deviceSlice"
import DeviceList from '../DeviceList';
import CharacteristicsDecive from './CharacteristicsDecive';
import ReviewsDecive from './ReviewsDevice';

import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

const AboutDevice = ({device, deviceInfo}) => {
   const dispatch = useDispatch(); 

   const [open, setOpen] = useState(false);

   const { devices, selectedType, selectedBrand, page, limit } = useSelector(state => state.device)
   const { basket } = useSelector(state => state.basket)
   const { favorite } = useSelector(state => state.favorite)

   useEffect(() => {
      fetchParamsDevices(selectedType, selectedBrand, page, limit).then(data => {
         dispatch(setDevices(data.rows))
         dispatch(setTotalCount(data.count))
      })
   }, [page, selectedType, selectedBrand])

   const checkBasket = basket.filter(item => item.id === device.id)
   const checkFavorite = favorite.filter(item => item.id === device.id)
   const filterDevices = devices.filter(item => item.id !== device.id)

   return(
      <Container sx={{margin: 0, padding: 0}}>
         <Grid sx={{marginTop: 2}} container spacing={2}>
            <Grid item xs>
               <CardMedia component="img" sx={{ height: 400, width: 350, objectFit: "contain" }} src={process.env.REACT_APP_API_URL + device.img}/>
               <CardContent sx={{ display: 'flex', marginBottom: 2, flexWrap: "wrap" }}>
                  {device.info.map(item => {
                     return <Typography key={item.id}>{item.description}/</Typography>
                  })}
               </CardContent>
               
            </Grid>
            <Grid item xs>
               <Card sx={{ maxWidth: 480, padding: 1, display: "flex" }}>
                  <CardContent>
                     <Typography sx={{ color: "red", fontSize: 12, fontWeight: 800 }}>Спеціальна пропозиція! При взятті мене на роботу ви отримуєте надійного та працелюбного співробітника!</Typography>
                     <Typography sx={{fontSize: 10, marginTop: 2, color: "black"}} >З першого мітингу по forever</Typography>
                  </CardContent>
                  <Button onClick={() => setOpen(true)} sx={{ padding: 2, fontSize: 8, height: 30, marginTop: 3, color: "grey" }} variant="outlined">Дізнатися деталі</Button>
                  <PromotionModal open={open} handleClose ={() => setOpen(false)}/>
               </Card>
               <Card sx={{ maxWidth: 480, padding: 1, marginTop: 3 }}>
                  <CardContent>
                     <Typography variant="h5" sx={{ color: "red", marginBottom: 2 }}>{device.price} грн</Typography>
                     <Button 
                        onClick={() => dispatch(setBasket(device))}
                        color={!checkBasket.length ? "success" : "error"} 
                        sx={{fontSize: 12, marginRight: 3}} 
                        variant="contained">
                        {!checkBasket.length ? "Добавить в корзину" : "Удалить из корзины"}
                     </Button>
                     <IconButton onClick={() => dispatch(setFavorite(device))} sx={{ color: "red" }}>
                        {!checkFavorite.length ? <FavoriteBorderIcon />: <FavoriteIcon/>}
                     </IconButton>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
         {filterDevices.length !== 0 ? 
         <div>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Також вас можуть зацікавити</Typography>
            <DeviceList recommendations={true} devices={filterDevices}/>
         </div> : null}
         <Grid sx={{marginTop: 2, paddingBottom: 2}} container spacing={2}>
            <Grid item xs>
               <CharacteristicsDecive deviceInfo={deviceInfo}/>
            </Grid>
            <Grid item xs>
               <ReviewsDecive device={device}/>
            </Grid>
         </Grid>
         
      </Container>
   )
}

export default AboutDevice