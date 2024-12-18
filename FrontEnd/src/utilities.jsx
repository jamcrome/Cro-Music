import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/"
});

export const userRegistration = async (formData) => {
  const { first_name, last_name, email, password } = formData;
  
  try {
    let response = await api.post(
      'users/signup/',
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
    );
    if (response.status === 201) {
      let {token, user} = response.data
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      return user
    }
  } catch (error) {
    if (error.response.status === 500) {
      console.log(error.response.request.response)
      return alert(error.response.request.response)
    }
  }
}

export const userLogIn = async (formData) => {
  const { email, password } = formData;

  let response = await api.post(
    'users/login/',
    {
      email: email,
      password: password
    }
  );
  if (response.status === 200) {
    let {token, user} = response.data
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Token ${token}`
    console.log("user logged in")
    return user
  }
  alert(response.data)
  return null
} 

export const userLogOut = async (user) => {

  let response = await api.post('users/logout/');
  if (response.status === 204) {
    localStorage.removeItem("token")
    localStorage.removeItem('spotify_access_token')
    delete api.defaults.headers.common['Authorization']
    console.log("user logged out")
    window.location.reload('/')
    return null
  }
  alert("failure to log out")
  return user
}

export const getInfo = async() => {
  let token = localStorage.getItem('token')
  if (token){
    api.defaults.headers.common['Authorization'] = `Token ${token}`
    let response = await api.get("users/info/")
    if (response.status === 200){
      return response.data
    }
    return null
  }
  else {
    return null
  }
}



// export const loginWithSpotify = async (user) => {
//   console.log(user)
//   const email = user.email
//   const response = await axios.get(`http://localhost:8000/api/v1/spotify/login?user=${email}`, {
//     withCredentials: true,
//   });
//   return response
// };