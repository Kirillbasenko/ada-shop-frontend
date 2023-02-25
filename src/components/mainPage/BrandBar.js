import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { setSelectedBrand } from "../../store/slices/deviceSlice";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BrandBar = () => {
   const dispatch = useDispatch(); 

   let selected = []

   const {brands, selectedType, selectedBrand} = useSelector(state => state.device)

   useEffect(() => {
      dispatch(setSelectedBrand(null))
   }, [])

   switch (selectedType) {
      case 1:
         selected = []
         selected.push(brands[2])
         selected.push(brands[4])
         break;
      case 2:
         selected = []
         selected.push(brands[0])
         selected.push(brands[2])
         break;
      case 3:
         selected = []
         selected.push(brands[2])
         break;
      case 4:
         selected = []
         selected.push(brands[0])
         selected.push(brands[1])
         selected.push(brands[3])
         break;
   
      default:
         selected = brands
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
               localStorage.setItem("brand", null)
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