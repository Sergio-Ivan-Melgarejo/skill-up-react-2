import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Componens
import Loading from "../../../Loading/Loading";

// Style
import "../auth.css";

// utils
import swalAlert from "../../../../utils/swalAlert";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required(msg["reduired"])
      .min(4, msg["userName-min"]),
    password: Yup.string().required(msg["reduired"]),
  });

  const onSubmit = () => {
    setLoading(true)
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
        if(data.status_code >= 200 && data.status_code < 300) {
          localStorage.setItem("teamID", data?.result?.user?.teamID);
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user?.userName);
          navigate("/", { replace: true });
          setLoading(false)
        } else {
          swalAlert({
            title: 'Credenciales invalidas',
            text: `El servidor respondió "${data.message}", por favor introduce credenciales válidas.`
          })
          setLoading(false)
        }
      })
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
            disabled={loading}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div className="relative">
          <label htmlFor="password">Contraseña</label>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                name="password"
                id="password"
                className={errors.password && touched.password ? "error" : ""}
                disabled={loading}
              />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button className={loading ? "relative loading" : "relative "} type="submit">
            {   
              loading 
              ? <Loading />
              : "Enviar"
            }
          </button>
        </div>
            {/* <span>¿No tienes una cuenta? </span> */}
            { loading 
            ? null
            : <Link to="/register">Registrarme</Link>}
      </form>
      {    
        
      }
  
    </div>
  );
};

export default Login;
