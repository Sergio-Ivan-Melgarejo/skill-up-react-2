import "./footer.css"

const Footer = () => {
  return <footer>
      ID de equipo: <span>{localStorage.getItem("teamID")}</span>
  </footer>;
};

export default Footer;
