import { Pagination } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

import { setPage } from "../../store/slices/deviceSlice";

const Pages = () => {
   const dispatch = useDispatch(); 

   const { totalCount, limit, page } = useSelector(state => state.device)

   const pageCount = Math.ceil(totalCount / limit)

   const pages = []

   for(let i = 0; i < pageCount; i++){
      pages.push(i + 1)
   }

   return(
      <Pagination className="mt-5">
         {pages.length === 1 ? null : pages.map(item => 
            <Pagination.Item
               key={item}
               active={page === item}
               onClick={() => dispatch(setPage(item))}>
               {item}
               </Pagination.Item>
            )}
      </Pagination>
   )
}

export default Pages