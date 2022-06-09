// Library
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Style
import "../auth.css";

// utils
import swalAlert from "../../../../utils/swalAlert";

const {REACT_APP_API_ENDPOINT : API_ENPOINT } = process.env;

const msg = {
  reduired: "*Campo obligatorio",
  "userName-min": "* Tiene que contener al menos 4 caracteres",
  userName: "* Tiene que ser un nombre valido",
};

const initialValues = {
  userName: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();


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
        if(data.status_code >= 200 && data.status_code < 300) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user?.userName);
          navigate("/", { replace: true });
        } else {
          swalAlert({
            title: 'Credenciales invalidas',
            text: `El servidor respondió "${data.message}", por favor introduce credenciales válidas.`
          })
        }
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
            {/* <span>¿No tienes una cuenta? </span> */}
            <Link to="/register">Registrarme</Link>
      </form>
    </div>
  );
};

export default Login;
