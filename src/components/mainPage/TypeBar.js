import { useSelector, useDispatch } from "react-redux"

import { setSelectedType } from "../../store/slices/deviceSlice";
import { fetchType } from "../../store/slices/deviceSlice";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TvIcon from '@mui/icons-material/Tv';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { useEffect } from "react";


const TypeBar = () => {
   const dispatch = useDispatch(); 

   const { types, selectedType } = useSelector(state => state.device)

   console.log(selectedType);

   const icons = [<KitchenIcon/>, <PhoneIphoneIcon/>, <TvIcon/>, <LaptopMacIcon/> ]

   useEffect(() => {
      dispatch(fetchType())
   }, [])

   return(
      <nav aria-label="main mailbox folders">
         <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
               selected={selectedType === null}
               onClick={() => {
                  dispatch(setSelectedType(null))
               }}
            >
               <ListItemIcon>
                  <DataUsageIcon />
               </ListItemIcon>
               <ListItemText primary="Все" />
            </ListItemButton>
            {types.items.map((type, index) => {
               return(
                     <ListItemButton
                        key={type._id}
                        selected={selectedType === type._id}
                        onClick={() => {
                           dispatch(setSelectedType(type._id))
                        }}>
                        <ListItemIcon>
                           {icons[index]}
                        </ListItemIcon>
                        <ListItemText primary={type.name} />
                     </ListItemButton>
                  
               )
            })}
         </List>
      </nav>
   )
}

export default TypeBar