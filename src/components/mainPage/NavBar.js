import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

import { setIsAuth, setUser } from "../../store/slices/userSlice";
import BasketModal from "../modals/BasketModal";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, FAVORITE_ROUTE } from '../../utils/consts';

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import OutputIcon from '@mui/icons-material/Output';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';

const NavBar = () => {
   const dispatch = useDispatch(); 
   const navigate = useNavigate() 

   const [basketVisible, setBasketVisible] = useState(false)
   const [successVisible, setSuccessVisible] = useState(false)

   const navigatePage = () => navigate(`${ADMIN_ROUTE}`)

   const { basket } = useSelector(state => state.basket)
   const { favorite } = useSelector(state => state.favorite)
   const {role} = useSelector(state => state.user)

   const logOut = () => {
      dispatch(setIsAuth(false))
      dispatch(setUser({}))
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      localStorage.removeItem("userName")
   }

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar sx={{backgroundColor: "#e9e9e9"}} color='transparent' position="static">
         <Toolbar style={{display: "flex", justifyContent: "space-between" }}>
            <Link 
               style={{ textDecoration: "none", fontSize: 23}} 
               component="div" 
               to={SHOP_ROUTE}>
                  ADASHOP
            </Link>
               {localStorage.getItem("role") ? 
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                     {localStorage.getItem("role") === "KIRILLADMIN" ?
                        <IconButton 
                           color='primary'
                           sx={{ marginRight: 1 }}
                           onClick={() => navigatePage()}>
                           <AdminPanelSettingsIcon/>
                        </IconButton>
                        : 
                        null}
                     <IconButton 
                        color='secondary'
                        sx={{ marginRight: 1 }}
                        onClick={() => setBasketVisible(true)}>
                        <Badge badgeContent={basket.length} color="success">
                           <ShoppingBasketIcon/>
                        </Badge>
                     </IconButton>
                     {favorite.length ? <IconButton 
                        sx={{ color: "red", marginRight: 1 }}
                        onClick={() => navigate(`${FAVORITE_ROUTE}`)}>
                        <Badge badgeContent={favorite.length} color="success">
                           <FavoriteBorderIcon/>
                        </Badge>
                     </IconButton>: null}
                     <BasketModal 
                        showSuccess={successVisible} 
                        onHideSuccess={() => setSuccessVisible(false)} 
                        show={basketVisible} 
                        onHide={() => setBasketVisible(false)}/>
                     <IconButton color='error' onClick={logOut}>
                        <OutputIcon/>
                     </IconButton>
                  </div>
                  : 
                  <IconButton 
                     color='primary'
                     onClick={() => {
                        navigate(`${LOGIN_ROUTE}`)
                     }}>
                     <PersonIcon/>
                  </IconButton> }
         </Toolbar>
         </AppBar>
      </Box>
   );
}

export default NavBar