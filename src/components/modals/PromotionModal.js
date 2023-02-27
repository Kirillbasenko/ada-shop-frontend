import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import { stylePromotion } from '../../halpers/style';

const PromotionModal = ({open, handleClose }) => {
   return(
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={open}
         onClose={handleClose }
         closeAfterTransition>
         <Fade in={open}>
            <Box sx={stylePromotion}>
               <Typography id="transition-modal-title" variant="h6" component="h2">
               Спеціальна пропозиція! При взятті мене на роботу ви отримуєте надійного та працелюбного співробітника!
               </Typography>
               <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Найкращий співробітник в оплату на 12 платежів на рік
                     <br /><br />
                  Період проведення акції: перший мітинг - forever
                     <br /><br />
                  Поспішайте, я у мами лише один такий!
               </Typography>
            </Box>
         </Fade>
      </Modal>
   )
}

export default PromotionModal