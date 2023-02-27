import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { fetchBrand, setSelectedBrand } from "../../store/slices/deviceSlice";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BrandBar = () => {
   const dispatch = useDispatch(); 

   let selected = []

   const {brands, selectedType, selectedBrand} = useSelector(state => state.device)

   console.log(selectedType);

   useEffect(() => {
      dispatch(fetchBrand())
      dispatch(setSelectedBrand(null))
   }, [])

   switch (selectedType) {
      case "63f87d6936c7a890d9d228f4":
         selected = []
         selected.push(brands.items[2])
         selected.push(brands.items[4])
         break;
      case "63f9ece0a73c3d15c59d3ebe":
         selected = []
         selected.push(brands.items[0])
         selected.push(brands.items[2])
         break;
      case 3:
         selected = []
         selected.push(brands.items[2])
         break;
      case 4:
         selected = []
         selected.push(brands.items[0])
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