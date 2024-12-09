import { useOutletContext, useLoaderData } from "react-router-dom";
// import axios from "axios";

const AccountPage = ({  }) => {

  const { user } = useOutletContext(useLoaderData());
  console.log(user)

  return(
      <>
        <h1>{user}'s Account</h1>
        <h2>Welcome {user}</h2>
      </>
  )
}

export default AccountPage;