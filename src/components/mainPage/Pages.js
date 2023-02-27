import { Pagination } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { fetchParamsDevices } from "../../http/deviceApi";
import { setTotalCount } from "../../store/slices/deviceSlice";

import { setPage } from "../../store/slices/deviceSlice";

const Pages = () => {
   const dispatch = useDispatch(); 

   const { totalCount, limit, page, selectedType, selectedBrand } = useSelector(state => state.device)

   const pageCount = Math.ceil(totalCount / limit)

   useEffect(() => {
      fetchParamsDevices(selectedType, selectedBrand, null, null).then(data => {
         dispatch(setTotalCount(data.length))
      })
   }, [selectedType, selectedBrand])

   const pages = []

   for(let i = 0; i < pageCount; i++){
      pages.push(i + 1)
   }

   return(
      <Pagination className="mt-5">
         {pages.map(item => 
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