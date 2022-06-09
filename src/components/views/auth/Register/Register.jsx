import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

import "../auth.css";

const { REACT_APP_API_ENDPOINT : API_ENPOINT } = process.env;

const msg = {
  reduired: "*Campo obligatorio",
  "userName-min": "* Tiene que contener al menos 4 caracteres",
  email: "* Tiene que ser un email valido",
};

const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // get data for selects
    fetch(`${API_ENPOINT}auth/data`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data.result);
      });
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required(msg["reduired"])
      .min(4, msg["userName-min"]),
    password: Yup.string().required(msg["reduired"]),
    email: Yup.string().email(msg.email).required(msg["reduired"]),
    //teamID: Yup.string().required(msg["reduired"]),
    role: Yup.string().required(msg["reduired"]),
    continent: Yup.string().required(msg["reduired"]),
    region: Yup.string().required(msg["reduired"]),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    const teamID = values.teamID || uuidv4();

    fetch(`${API_ENPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          role: values.role,
          continent: values.continent,
          region: values.region,
          teamID,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data?.status_code < 300 && data?.status_code >= 200) {
          navigate(`/registered/${data?.result?.user?.teamID}`, {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label htmlFor="useName">Nombre de usuario</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            type="text"
            name="userName"
            id="userName"
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <div className="error-message">{errors.userName}</div>
          )}
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
          {errors.password && touched.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            name="email"
            id="email"
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={validationSchema.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="error"
            />
          }
          className="switch"
          label="¿Pertenecés a un equipo ya creado?"
          
        />
        {values.switch && (
          <div>
            <label htmlFor="teamID">
              Por favor, introduce el identificador de equipo
            </label>
            <input
              type="text"
              name="teamID"
              id="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="role">Rol</label>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            name="role"
            id="role"
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Seleccionar rol...</option>
            {data?.Rol?.map((ele) => (
              <option key={ele} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <div className="error-message">{errors.role}</div>
          )}
        </div>
        <div>
          <label htmlFor="continent">Continente</label>
          <select
            onChange={(e) => handleChangeContinent(e.target.value)}
            onBlur={handleBlur}
            value={values.continent}
            name="continent"
            id="continent"
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccionar continente...</option>
            {data?.continente?.map((ele) => (
              <option key={ele} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <div className="error-message">{errors.continent}</div>
          )}
        </div>
        {values.continent === "America" ? (
          <div>
            <label htmlFor="region">Región</label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              name="region"
              id="region"
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccionar Región</option>
              {data?.region.sort()?.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <div className="error-message">{errors.region}</div>
            )}
          </div>
        ) : null}
        <div>
          <button type="submit">Enviar</button>
        </div>
          <Link to="/login">Ir a iniciar sesión</Link>
      </form>
    </div>
  );
};

export default Register;
