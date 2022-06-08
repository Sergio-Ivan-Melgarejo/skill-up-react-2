import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import img from "../../img/logo/logo_small.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate()
  
  const { tasks } = useSelector( state => state.tasksReducer)

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login",{replace:true});
  }
  
  return (
    <header>
      <img src={img} alt="Go Scrum" />
      <span>Estamos en {process.env.NODE_ENV} en el puerto: {process.env.REACT_APP_PORT}</span>
      <div className="wrapper_right_header">
        <div>
          <button onClick={()=> navigate("/donate",{replace:true})} >Donar</button>
        </div>
        <div className="back">Tareas creadas: {tasks.length}</div>
        <div className="back">{localStorage.getItem("userName")}</div>
        <div className="close" onClick={handleLogOut}>x</div>
      </div>
    </header>
  );
};

export default Header;
