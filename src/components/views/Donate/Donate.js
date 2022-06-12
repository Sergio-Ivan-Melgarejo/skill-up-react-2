import { Link } from "react-router-dom";
import "./Donate.css";

function Donate() {
  return (
    <main className="donate">
      <section>
        <h1>Colaborá con el proyecto</h1>
        <a
          href="https://mpago.la/1pkJ26p"
          target="_blank"
          rel="noreferrer"
        >
          Donar
        </a>
        <Link to="/" >No lo hare!, Volver</Link>
      </section>
    </main>
  );
}
export default Donate;
