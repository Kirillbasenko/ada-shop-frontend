import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   isAuth: false,
   user: {},
   role: localStorage.getItem("role")
} 

const userSlice = createSlice({ 
   name: 'user', 
   initialState, 
   reducers: { 
      setIsAuth: (state, action) => { 
         state.isAuth = action.payload 
      }, 
      setUser: (state, action) => { 
         state.user = action.payload 
      },
      setRole: (state, action) => { 
         state.role = action.payload 
      }
   } 
}) 

export const {setIsAuth, setUser, setRole} = userSlice.actions 

export default userSlice.reducer