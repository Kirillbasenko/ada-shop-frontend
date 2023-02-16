import { $host, $authHost} from "./index";

export const createReview = async (review, id) => {
   const {data} = await $authHost.post("api/review/" + id, review)
   return data
}

export const fetchReview = async () => {
   const {data} = await $host.get("api/review/:id")
   return data
}