import './App.css';

export default function App () {
  return (
    <div className='container'>
      <form>
        <h1>Iniciar sesión</h1>
        <label htmlFor='email'>Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor='password'>Contraseña</label>
        <input type="password" name="password" id="password" />
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
} 