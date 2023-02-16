import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import DevicePage from "./pages/DevicePage"
import FavoritePage from "./pages/FavoritePage"
import { 
   ADMIN_ROUTE,  
   SHOP_ROUTE, 
   LOGIN_ROUTE, 
   REGISTRATION_ROUTE, 
   DEVICE_ROUTE,
   FAVORITE_ROUTE } from "./utils/consts"

export const authRoutes = [
   {
      path: ADMIN_ROUTE,
      Component: <Admin/>
   },
]

export const publicRoutes = [
   {
      path: SHOP_ROUTE,
      Component: <Shop/>
   },
   {
      path: LOGIN_ROUTE,
      Component: <Auth/>
   },
   {
      path: REGISTRATION_ROUTE,
      Component: <Auth/>
   },
   {
      path: DEVICE_ROUTE + "/:id",
      Component: <DevicePage/>
   },
   {
      path: FAVORITE_ROUTE,
      Component: <FavoritePage/>
   },
]