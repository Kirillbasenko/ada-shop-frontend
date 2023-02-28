import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   favorite: JSON.parse(localStorage.getItem("favorite")) || [],
} 

const favoriveSlice = createSlice({ 
   name: 'favorite', 
   initialState, 
   reducers: { 
      setFavorite: (state, action) => {
         let arr = state.favorite.filter(item => item._id === action.payload._id)
         state.favorite = arr.length === 1 ? state.favorite.filter(item => item._id !== action.payload._id) : [...state.favorite, action.payload]
         localStorage.setItem("favorite", JSON.stringify(state.favorite))
      },
   } 
}) 

export const { 
   setFavorite,
} = favoriveSlice.actions 

export default favoriveSlice.reducer