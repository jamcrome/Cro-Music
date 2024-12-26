import axios from "axios";


export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getComposer = async (id) => {
  try {
    const response = await api.get(`composer/${id}`)
    if (response.status === 200){
      console.log(response.data)
      return response.data
    }
    return null
  } catch (error) {
    console.error("Error fetching composer details", error)
  }
  return null
}

export const getFavComposers = async () => {

}

export const addFavComposer = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      const response = await api.post(`composer/${id}/favorite/`)
      if (response.status === 201) {
        console.log(response)
        return response.data
      }
    }     
  } catch (error) {
    console.log("Error adding composer to favorites", error)
  }
  return null
}

export const removeFavComposer = async (id) => {
  try {
    const token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      const response = await api.delete(`composer/${id}/favorite/`);
      if (response.status === 200) {
        console.log("Composer removed from favorites");
        return response.data
      }
    }
  } catch (error) {
    console.log("Error removing composer from favorites", error)
  }
}

// export const getFavComposers = async (user) => {
//   let token = localStorage.getItem('token')
//   if (token){
//     let response = await api.get('users/info/')
//     return response
//   }
// }