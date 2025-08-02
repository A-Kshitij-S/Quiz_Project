import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    // Assuming your user object has a role or username field
    if (!user || user.role !== "admin") {
      navigate("/")
    }
  }, [user, navigate])

  return <>{children}</>
}

export default ProtectedRoutes
