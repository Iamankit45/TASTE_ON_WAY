import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from './hooks/useRefreshToken'
import { useAuth } from "../Context/Auth"


function PersistLogin() {

  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useAuth();

  useEffect(() => {

    async function verifyRefreshToken() {
      try {
        await refresh();
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    !user?.accessToken ? verifyRefreshToken() : setLoading(false);

  }, [])

  return (
    <div>
      {isLoading ? <p>Loading</p> : <Outlet />}
    </div>
  )
}

export default PersistLogin
