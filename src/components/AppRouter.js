import {Routes, Route} from 'react-router-dom'
import { useSelector } from "react-redux";

import Shop from '../pages/Shop'
import { authRoutes, publicRoutes } from '../routes'

const AppRouter = () => {
   const {isAuth} = useSelector(state => state.user)

   return(
      <Routes>
         {isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component}/>
         )}
         {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component}/>
         )}
         <Route key="*" path="*" element={<Shop/>}/>
      </Routes>
   )
}

export default AppRouter