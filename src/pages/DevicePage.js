import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import { fetchOneDevice, fetchParamsDevices } from "../http/deviceApi"
import AboutDevice from '../components/devicePage/AboutDevice';
import CharacteristicsDecive from '../components/devicePage/CharacteristicsDecive';
import ReviewsDecive from '../components/devicePage/ReviewsDevice';
import { fetchReview } from '../http/reviewApi';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const DevicePage1 = () => {
   const [device, setDevice] = useState({info: []})
   const [actButton, setActButton] = useState(0)
   const [rating, setRating] = useState(0)
   const [devices, setDevices] = useState([])
   const {id} = useParams()
   const dispatch = useDispatch(); 

   const button = ["Все про товар", "Характеристики", "Відгуки"]

   useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
      fetchParamsDevices(null, null, 1, 100)
         .then(data => {
            dispatch(setDevices(data.rows))
         })
   }, [id])

   useEffect(() => {
      fetchReview()
         .then(data => data.filter(review => review.deviceId === device.id))
         .then(res => res.reduce((summ, current) => {
            return summ + Number(current.rate)
         }, 0) / res.length)
         .then(arr => setRating(arr))
   }, [rating])

   return(
      <Box>
         <Container style={{marginTop: 15}}>
            <Typography variant="h4" component="div">{device.name}</Typography>
            <Rating 
               precision={0.5} 
               value={rating ? rating : null} 
               name="read-only" 
               readOnly 
               style={{marginTop: 5}}/>
            <div>
               {button.map((item, index) => {
                  return (
                     <Button
                        key={index}
                        onClick={() => setActButton(index)}
                        color={actButton === index ? "success" : 'primary'}
                        variant="text">{item}</Button>
                  )
               }) }
            </div>
            {actButton === 0 ? <AboutDevice deviceInfo={device.info} device={device}/> : null}
            {actButton === 1 ? <CharacteristicsDecive deviceInfo={device.info}/> : null}
            {actButton === 2 ? <ReviewsDecive  device={device}/> : null}
         </Container>
      </Box>
   )
}

export default DevicePage1