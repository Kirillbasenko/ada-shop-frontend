import user from "./slices/userSlice"
import device from "./slices/deviceSlice";
import basket from "./slices/basketSlice"
import favorite from "./slices/favoriteSlice"
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
   if(typeof action === "string"){
      return next({
         type: action
      })
   }
   return next(action)
}

const store = configureStore({
   reducer: { user, device, basket, favorite },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})

export default store;