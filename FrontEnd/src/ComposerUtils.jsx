import axios from "axios";


export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/"
});

export const getComposer = async (id) => {
  let token = localStorage.getItem('token')
  if (token){
    let response = await api.get(`composer/${id}`)
    if (response.status === 200){
      console.log(response.data)
      return response.data
    }
    return null
  }
  return null
}

// export const getFavComposers = async (user) => {
//   let token = localStorage.getItem('token')
//   if (token){
//     let response = await api.get('users/info/')
//     return response
//   }
// }