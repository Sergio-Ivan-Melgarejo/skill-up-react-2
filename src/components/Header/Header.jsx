import "./header.css";
import img from "../../img/logo/logo_small.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login",{replace:true});
  }
  
  return (
    <header>
      <img src={img} alt="Go Scrum" />
      <div className="wrapper_right_header">
        <div>{localStorage.getItem("userName")}</div>
        <div className="close" onClick={handleLogOut}>x</div>
      </div>
    </header>
  );
};

export default Header;
