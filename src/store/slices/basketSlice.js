import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   basket: JSON.parse(localStorage.getItem("basket")) || [],
} 


const basketSlice = createSlice({ 
   name: 'basket', 
   initialState, 
   reducers: { 
      setBasket: (state, action) => {
         let arr = state.basket.filter(item => item._id === action.payload._id)
         state.basket = arr.length === 1 ? state.basket.filter(item => item._id !== action.payload._id) : [...state.basket, action.payload]
         localStorage.setItem("basket", JSON.stringify(state.basket))
      },
      removeBasket: state => {
         state.basket = []
      },
      deleteDevice: (state, action) => {
         state.basket = state.basket.filter(item => item._id !== action.payload)
      },
      setPlusCurrent: (state, action) => {
         let arr = state.basket.filter(item => item._id === action.payload._id)
         let a = state.basket.filter(item => item._id !== action.payload._id)
         arr.forEach(item =>  item.current++)
         a.push(arr[0])
         localStorage.setItem("basket", JSON.stringify(a))
      },
      setMinusCurrent: (state, action) => {
         let arr = state.basket.filter(item => item._id === action.payload._id)
         let a = state.basket.filter(item => item._id !== action.payload._id)
         arr.forEach(item => {
            if(item.current > 0){
               item.current--
               a.push(arr[0])
               localStorage.setItem("basket", JSON.stringify(a))
            }
         }) 
      }
   } 
}) 


export const { 
   setBasket,
   setPlusCurrent,
   setMinusCurrent,
   deleteDevice,
   removeBasket
} = basketSlice.actions 

export default basketSlice.reducer