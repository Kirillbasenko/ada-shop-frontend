import { $host, $authHost} from "./index";

export const createReview = async (review, id) => {
   const {data} = await $authHost.post("api/review/" + id, review)
   return data
}

export const fetchReview = async (deviceId) => {
   const {data} = await $host.get("api/review/:id", {params: {
      deviceId
   }})
   console.log(data);
   return data
}