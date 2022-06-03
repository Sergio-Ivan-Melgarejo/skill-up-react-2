// Library
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Style
import "../auth.css";

const { REACT_APP_API_ENPOINT : API_ENPOINT } = process.env;

const msg = {
  reduired: "* Este campor obligatorio",
  "userName-min": "* Tiene que contener al menos 4 caracteres",
  userName: "* Tiene que ser un nombre valido",
};

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required(msg["reduired"])
      .min(4, msg["userName-min"]),
    password: Yup.string().required(msg["reduired"]),
  });

  const onSubmit = () => {
    const { userName, password } = values
    
    fetch(`${API_ENPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          userName: userName,
          password: password
        }
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        localStorage.setItem("token", data?.result?.token);
        navigate("/", { replace: true });
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { 
    handleChange, 
    handleSubmit, 
    errors, 
    touched, 
    handleBlur, 
    values 
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            type="text"
            name="userName"
            id="userName"
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            name="password"
            id="password"
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <p>
            {/* <span>¿No tienes una cuenta? </span> */}
            <Link to="/register">Registrarme</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
