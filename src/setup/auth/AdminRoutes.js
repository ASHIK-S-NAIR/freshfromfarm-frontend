import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/auth/index";

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  if (!(isAuthenticated() && isAuthenticated().user.role === 2)) {
    return navigate("/");
  }

  return children;
};

export default AdminRoutes;
