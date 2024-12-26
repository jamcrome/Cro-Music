import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUpPage';
import LogIn from './pages/LogInPage';
import { getInfo } from './utilities';
import AccountPage from './pages/AccountPage';
import ComposerDetails from './pages/ComposerDetailsPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';

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
      },
      {
        path: "composer-details/:id/",
        element: <ComposerDetails/>
      },
      {
        path: "composer-search/:strg/",
        element: <SearchResultsPage />
      }
      
    ]
  }
])

export default router;