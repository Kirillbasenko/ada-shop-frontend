import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { fetchBrand, setSelectedBrand } from "../../store/slices/deviceSlice";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BrandBar = () => {
   const dispatch = useDispatch(); 

   let selected = []

   const {brands, selectedType, selectedBrand} = useSelector(state => state.device)

   useEffect(() => {
      dispatch(fetchBrand())
      dispatch(setSelectedBrand(null))
   }, [])

   switch (selectedType) {
      case "63fc64579009550788d61d21":
         selected = []
         selected.push(brands.items[4])
         selected.push(brands.items[0])
         break;
      case "63fc64659009550788d61d23":
         selected = []
         selected.push(brands.items[0])
         selected.push(brands.items[1])
         break;
      case "63fc64719009550788d61d25":
         selected = []
         selected.push(brands.items[5])
         selected.push(brands.items[0])
         break;
      case "63fc64779009550788d61d27":
         selected = []
         selected.push(brands.items[2])
         selected.push(brands.items[1])
         selected.push(brands.items[3])
         break;
      default:
         selected = brands.items
         break;
   }

   return(
      <ButtonGroup 
         sx={{display: "flex", flexWrap: "wrap"}} 
         variant="text" 
         aria-label="outlined primary button group">
         <Button 
            color={selectedBrand === null ? "success" : 'primary'}
            onClick={() => {
               dispatch(setSelectedBrand(null))
            }}>
            Все
         </Button>
         {selected.map(brand => {
            return(
               <div key={brand._id}>
                  <Button 
                     color={selectedBrand === brand._id ? "success" : 'primary'}
                     onClick={() => {
                        dispatch(setSelectedBrand(brand._id))
                     }}>
                     {brand.name}
                  </Button>
               </div>
               )
         })}
      </ButtonGroup>
   )
}

export default BrandBar