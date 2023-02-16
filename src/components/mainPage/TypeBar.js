import { useSelector, useDispatch } from "react-redux"

import { setSelectedType } from "../../store/slices/deviceSlice";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TvIcon from '@mui/icons-material/Tv';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';


const TypeBar = () => {
   const dispatch = useDispatch(); 

   const { types, selectedType } = useSelector(state => state.device)

   const icons = [<KitchenIcon/>, <PhoneIphoneIcon/>, <TvIcon/>, <LaptopMacIcon/>]

   return(
      <nav aria-label="main mailbox folders">
         <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
               selected={selectedType == null}
               onClick={() => {
                  dispatch(setSelectedType(null))
               }}
            >
               <ListItemIcon>
                  <DataUsageIcon />
               </ListItemIcon>
               <ListItemText primary="Все" />
            </ListItemButton>
            {types.map((type, index) => {
               return(
                  
                     <ListItemButton
                        key={type.id}
                        selected={selectedType === type.id}
                        onClick={() => {
                           dispatch(setSelectedType(type.id))
                        }}
                     >
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