import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) errors.email = "EL Email es requerido";
    if (!values.password) errors.password = "La Contraseña es requerida";

    return errors;
  };

  const onSubmit = () => {
    localStorage.setItem("logged", true);
    navigate("/",{replace:true});
  };

  const formik = useFormik({ initialValues, validate, onSubmit });
  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={values.email}
            type="email"
            name="email"
            id="email"
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            onChange={handleChange}
            value={values.password}
            type="password"
            name="password"
            id="password"
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;