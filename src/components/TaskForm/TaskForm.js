// Library
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

// Style
import "./task-form.css";

const msg = {
  reduired: "* Este campor obligatorio",
  "title-min": "* Tiene que contener al menos 6 caracteres",
};

function TaskForm() {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = () => {
    alert("paso");
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(msg["reduired"]).min(6, msg["title-min"]),

    status: Yup.string().required(msg["reduired"]),

    priority: Yup.string().required(msg["reduired"]),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleChange, handleSubmit, errors, touched, handleBlur } = formik;

  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="titulo ..."
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title ? "error" : ""}
          />
          {errors.title && touched.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div>
          <select
            name="status"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.status ? "error" : ""}
          >
            <option value="">Seleccionar opción</option>
            <option value="new">Nueva</option>
            <option value="inProcess">En proceso</option>
            <option value="finished">Terminada</option>
          </select>
          {errors.status && touched.status && <span className="error-message">{errors.status}</span>}
        </div>

        <div>
          <select
            name="priority"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.priority ? "error" : ""}
          >
            <option value="">Seleccionar opción</option>
            <option value="low">Baja</option>
            <option value="midium">Media</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && touched.priority && (
            <span className="error-message">{errors.priority}</span>
          )}
        </div>

        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción ..."
          />
        </div>

        <button type="submit">Crear</button>
      </form>
    </section>
  );
}

export default TaskForm;