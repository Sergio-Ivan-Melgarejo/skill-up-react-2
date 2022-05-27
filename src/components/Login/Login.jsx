import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      alert("Es indespensable para que aprendeas cosas interesanter que compretes");
    } else {
      window.location = "https://cybermap.kaspersky.com"
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" value={email} />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" value={password} />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default Login;
