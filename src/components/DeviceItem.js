import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import { setBasket } from "../store/slices/basketSlice"
import { setFavorite } from "../store/slices/favoriteSlice";
import { DEVICE_ROUTE } from "../utils/consts";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DeviceItem = ({device, recommendations}) => {
   const navigate = useNavigate()
   const dispatch = useDispatch(); 

   const { basket } = useSelector(state => state.basket)
   const { favorite } = useSelector(state => state.favorite)
   const { isAuth } = useSelector(state => state.user)

   const navigatePage = () => navigate(`${DEVICE_ROUTE}/${device._id}`)

   let checkFavorite = favorite.filter(item => item._id === device._id)
   let arr = basket.filter(item => item._id === device._id)

   return (
      <Card sx={{ width: recommendations ? 150 : 223, margin: 1 }}>
         <CardActionArea>
         <CardMedia
            onClick={() => navigatePage()}
            height={recommendations ? 150 : 220}
            width={recommendations ? 150 : 223}
            sx={{objectFit: "contain"}}
            component="img"
            src={device.img}
            alt="green iguana"
         />
         <CardContent style={{display: "flex", justifyContent: "space-between", cursor: "default", alignItems: "end"}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: recommendations ? 80 : 120}}>
               <Typography onClick={() => navigatePage()} style={{ cursor: "pointer", fontSize: recommendations ? 14 : 20, fontWeight: 500 }} gutterBottom  component="div">
                  {device.name.length < 28 ? device.name : `${device.name.slice(0, 28)}...`}
               </Typography>
               <Typography variant="body2">
                  {device.price} грн
               </Typography>
            </Box>
            {!recommendations && isAuth ? 
            <Box sx={{display: "flex", flexDirection: "column"}}>
               <IconButton onClick={() => dispatch(setFavorite(device))} sx={{ color: "red" }}>
                        {!checkFavorite.length ? <FavoriteBorderIcon />: <FavoriteIcon/>}
                     </IconButton>
               <IconButton onClick={() => dispatch(setBasket(device))}>
                  {arr.length === 0 ? <AddShoppingCartIcon color="primary"/> : <RemoveShoppingCartIcon color="error"/>}
               </IconButton>
            </Box> : null }
         </CardContent>
         </CardActionArea>
      </Card>
   )
}

export default DeviceItem