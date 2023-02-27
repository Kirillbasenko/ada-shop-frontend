import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { $host, $authHost} from "../../http/index.js"

export const fetchType = createAsyncThunk("api/fetchType", async () => {
   const {data} = await $host.get("api/type")
   return data
})

export const fetchBrand = createAsyncThunk("api/fetchBrand", async () => {
   const {data} = await $host.get("api/brand")
   return data
})

export const fetchDevice = createAsyncThunk("api/fetchDevice", async (arg) => {
   const {selectedType, selectedBrand, page, limit} = arg
   const {data} = await $host.get("api/device", {params: {
      selectedType, selectedBrand, page, limit
   }})
   return data
})

const initialState = { 
   types: {
      items: [],
      status: "idle"
   },
   brands: {
      items: [],
      status: "idle"
   },
   devices: {
      allItems: [],
      items: [],
      status: "idle"
   },
   selectedType:  null,
   selectedBrand: null,
   page: 1,
   totalCount: 0,
   limit: 6,
   count: 1
} 


const deviceSlice = createSlice({ 
   name: 'device', 
   initialState, 
   reducers: { 
      setDevices: (state, action) => { 
         state.devices.items = action.payload 
      },
      setSelectedType: (state, action) => { 
         state.page = 1
         state.selectedType = action.payload
         state.selectedBrand = null
         localStorage.setItem("type", action.payload)
      },
      setSelectedBrand: (state, action) => { 
         state.page = 1
         state.selectedBrand = action.payload
      },
      setPage: (state, action) => { 
         state.page = action.payload 
      },
      setTotalCount: (state, action) => { 
         state.totalCount = action.payload 
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchType.pending, state => {state.types.status = 'loading'})
         .addCase(fetchBrand.pending, state => {state.brands.status = 'loading'})
         .addCase(fetchDevice.pending, state => {state.devices.status = 'loading'})
         .addCase(fetchType.fulfilled, (state, action) => {
               state.types.status = 'idle';
               state.types.items = action.payload
            })
         .addCase(fetchBrand.fulfilled, (state, action) => {
               state.brands.status = 'idle';
               state.brands.items = action.payload
            })
         .addCase(fetchDevice.fulfilled, (state, action) => {
               state.devices.status = 'idle';
               state.devices.items = action.payload 
               state.totalCount = action.payload.length
            })
         .addCase(fetchType.rejected, state => {state.types.status = 'error'})
         .addCase(fetchBrand.rejected, state => {state.brands.status = 'error'})
         .addCase(fetchDevice.rejected, state => {state.devices.status = 'error'})
         .addDefaultCase(() => {})
   },
}) 


export const {
   setTypes, 
   setBrands, 
   setDevices, 
   setSelectedType, 
   setSelectedBrand, 
   setPage, 
   setTotalCount, 
} = deviceSlice.actions 

export default deviceSlice.reducer