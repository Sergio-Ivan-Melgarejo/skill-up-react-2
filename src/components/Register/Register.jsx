import { useFormik } from "formik";

const Register = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = () => {
    alert("");
  };

  const formik = useFormik({ initialValues, onSubmit });
  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <div>
        <label htmlFor="useName">Nombre de usuario</label>
        <input
          onChange={handleChange}
          value={values.email}
          type="text"
          name="userName"
          id="userName"
        />
        {errors.userName && <div>{errors.userName}</div>}
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
      <input 
        value="das9d9asd-3123-4123-1231-312fas213"
        type="hidden"
        name="teamID"
      />
      <div>
        <label htmlFor="role">Rol</label>
        <select onChange={handleChange} value={values.role} name="rol" id="role">
          <option value="team Menber">Team Member</option>
          <option value="team Leader">Team Leader</option>
        </select>
        {errors.role && <div>{errors.role}</div>}
      </div>
      <div>
        <label htmlFor="continent">Continente</label>
        <select onChange={handleChange} value={values.continent} name="continent" id="continent">
          <option value="America">America</option>
          <option value="Europa">Europa</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.continent && <div>{errors.continent}</div>}
      </div>
      <div>
        <label htmlFor="region">Región</label>
        <select onChange={handleChange} value={values.region} name="region" id="region">
          <option value="Latam">Latam</option>
          <option value="Brazil">Brazil</option>
          <option value="America del Norte">America del Norte</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.region && <div>{errors.region}</div>}
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default Register;
