import { useEffect, useState } from 'react';
import { formatDistance, subDays } from 'date-fns'

import ReviewModal from '../modals/create/ReviewModal';
import { fetchReview } from '../../http/reviewApi';

import { Card, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Rating from '@mui/material/Rating';

const ReviewsDecive = ({device}) => {
   const [open, setOpen] = useState(false);
   const [reviews, setReviews] = useState(null)

   useEffect(() => {
      fetchReview(device._id)
         .then(data => setReviews(data))
   }, [open])

   return(
      <Box>
         <Card sx={{padding: 2, display: "flex", justifyContent: "space-between", marginBottom: 2}}>
            <Typography>Залиште свій відгук про цей товар</Typography>
            <Button disabled={!localStorage.getItem("role")} onClick={() => setOpen(true)} sx={{fontSize: 12}} variant="outlined">Залишити відгук</Button>
            <ReviewModal deviceId={device._id} open={open} handleClose={() => setOpen(false)}/>
         </Card>
         {reviews ? reviews.sort((a, b) => b._id - a._id).map(review => {
            return(
               <Card key={review._id} sx={{marginBottom: 2}}>
                  <Box sx={{display: "flex", padding: 1, justifyContent: "space-between", alignItems: "center"}}>
                     <Box sx={{display: "flex",}}>
                        <AccountCircleIcon/>
                        <Typography sx={{fontWeight: 500, marginLeft: 2}}>{review.userName ? review.userName : "Anonymous"}</Typography>
                     </Box>
                     <Typography 
                        sx={{fontSize: 12}}>
                        {formatDistance(subDays(new Date(review.createdAt), 0), new Date(), { addSuffix: true })}
                     </Typography>
                  </Box>
                  <Card sx={{borderRadius: "0px 0px 0px 0px", padding: 1}}>
                     <Rating value={review.rate} name="read-only" readOnly sx={{marginTop: 1}}/>
                     <Typography sx={{marginTop: 2}}>{review.comment}</Typography>
                     <Typography sx={{marginTop: 2, fontWeight: 500,}}>Переваги:</Typography>
                     <Typography>{review.positive}</Typography>
                     <Typography sx={{marginTop: 2, fontWeight: 500,}}>Недоліки:</Typography>
                     <Typography>{review.negative}</Typography>
                  </Card>
               </Card>
            )
         }) : null}
      </Box>
   )
}

export default ReviewsDecive