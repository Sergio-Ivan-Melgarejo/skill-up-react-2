import "./header.css";
import img from "../../img/logo/logo_small.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  
  const handleLogOut = () => {
    localStorage.removeItem("logged");
    navigate("/login",{replace:true});
  }
  
  return (
    <header>
      <img src={img} alt="Go Scrum" />
      <div onClick={handleLogOut}>x</div>
    </header>
  );
};

export default Header;
