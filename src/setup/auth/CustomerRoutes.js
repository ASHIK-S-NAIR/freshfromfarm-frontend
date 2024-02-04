import {useNavigate} from "react-router-dom";
import {isAuthenticated} from "../../api/auth/index";

const CustomerRoutes = ({children}) => {

    const navigate = useNavigate();

  if(!(isAuthenticated() && isAuthenticated().user.role === 0)){
    return navigate("/");
  }

  return children
}

export default CustomerRoutes