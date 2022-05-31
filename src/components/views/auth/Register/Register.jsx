import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const msg = {
  reduired: "* Este campor obligatorio",
  "userName-min": "* Tiene que contener al menos 4 caracteres",
  email: "* Tiene que ser un email valido",
};

const Register = () => {
  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamId: "",
    role: "",
    continent: "",
    region: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required(msg["reduired"])
      .min(4, msg["userName-min"]),
    password: Yup.string().required(msg["reduired"]),
    email: Yup.string().email(msg.email).required(msg["reduired"]),
    teamId: Yup.string().required(msg["reduired"]),
    role: Yup.string().required(msg["reduired"]),
    continent: Yup.string().required(msg["reduired"]),
    region: Yup.string().required(msg["reduired"]),
  });

  const onSubmit = () => {
    alert("dfad");
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleChange, handleSubmit, errors, touched, handleBlur, values } = formik;

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
            <span className="error-message">{errors.userName}</span>
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
            <span className="error-message">{errors.password}</span>
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
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <input
          value="das9d9asd-3123-4123-1231-312fas213"
          type="hidden"
          name="teamID"
        />
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
            <option value="">Seleccionar Rol</option>
            <option value="team Menber">Team Member</option>
            <option value="team Leader">Team Leader</option>
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label htmlFor="continent">Continente</label>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.continent}
            name="continent"
            id="continent"
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccionar Continente</option>
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
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
            <option value="Latam">Latam</option>
            <option value="Brazil">Brazil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && touched.region && (
            <span className="error-message">{errors.region}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <p>
            <span>¿Y tienes una cuenta? </span>
            <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
