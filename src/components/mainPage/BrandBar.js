import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { fetchBrand, setSelectedBrand } from "../../store/slices/deviceSlice";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BrandBar = () => {
   const dispatch = useDispatch(); 

   let selected = []

   const {brands, selectedType, selectedBrand} = useSelector(state => state.device)

   console.log(selectedBrand);

   useEffect(() => {
      dispatch(fetchBrand())
      dispatch(setSelectedBrand(null))
   }, [])

   switch (selectedType) {
      case "63fe3ff2e6dda62ac59ebb33":
         selected = []
         selected.push(brands.items[4])
         selected.push(brands.items[0])
         break;
      case "63fe4008e6dda62ac59ebb3b":
         selected = []
         selected.push(brands.items[0])
         selected.push(brands.items[1])
         break;
      case "63fe4012e6dda62ac59ebb43":
         selected = []
         selected.push(brands.items[5])
         selected.push(brands.items[0])
         break;
      case "63fe401ce6dda62ac59ebb46":
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