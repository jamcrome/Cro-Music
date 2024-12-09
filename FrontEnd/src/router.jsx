import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUpPage';
import LogIn from './pages/LogInPage';
import { getInfo } from './utilities';
import AccountPage from './pages/AccountPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: getInfo,
    children:[
      {
        index:true,
        element:<HomePage/>,
        
      },
      {
        path: "signup/",
        element:<SignUp/>
      },
      {
        path: "login/",
        element:<LogIn/>
      },
      {
        path: "account/",
        element:<AccountPage/>
      }
    ]
  }
])

export default router;