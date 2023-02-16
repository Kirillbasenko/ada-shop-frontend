import DeviceItem from "./DeviceItem";

import Box from '@mui/material/Box';

const DeviceList = ({devices, recommendations}) => {
   return(
      <Box component="div"
         sx={{ display: 'flex', mx: '2px', flexWrap: "wrap" }}>
         {devices && devices.map((device, index) => 
            <DeviceItem recommendations={recommendations} key={device.id} device={device}/>
         )}
      </Box>
   )
}

export default DeviceList