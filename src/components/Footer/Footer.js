import { useState } from "react";
import "./footer.css"

const Footer = () => {
  const [click, setClick] = useState(false);
  return <footer className={click ? "open" : ""}>
      <div onClick={()=>setClick(prev => !prev)} className="footer__button">
        <div className="button__line"></div>
        <div className="button__line"></div>
        <div className="button__line"></div>
      </div>
      ID de equipo: <span>{localStorage.getItem("teamID")}</span>
  </footer>;
};

export default Footer;
