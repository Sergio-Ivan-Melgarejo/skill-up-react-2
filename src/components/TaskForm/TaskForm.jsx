// Library
import { useFormik } from "formik";
import * as Yup from "yup";

// Style
import "./task-form.css";

const { REACT_APP_API_ENPOINT: API_ENPOINT } = process.env;

const msg = {
  reduired: "* Este campor obligatorio",
  "title-min": "* Tiene que contener al menos 6 caracteres",
};

const initialValues = {
  title: "",
  status: "",
  importance: "",
  description: "",
};

function TaskForm() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(msg["reduired"]).min(6, msg["title-min"]),
    status: Yup.string().required(msg["reduired"]),
    importance: Yup.string().required(msg["reduired"]),
    description: Yup.string().required(msg["reduired"]),
  });

  const onSubmit = () => {
    fetch(`${API_ENPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ task: values }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("tarea echa");
        resetForm();
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

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
            className={errors.title && touched.title ? "error" : ""}
            value={values.title}
          />
          {errors.title && touched.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div>
          <select
            name="status"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.status && touched.status ? "error" : ""}
            value={values.status}
          >
            <option value="">Seleccionar opción</option>
            <option value="NEW">Nueva</option>
            <option value="INPROGRESS">En proceso</option>
            <option value="FINISHED">Terminada</option>
          </select>
          {errors.status && touched.status && (
            <span className="error-message">{errors.status}</span>
          )}
        </div>

        <div>
          <select
            name="importance"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.importance && touched.importance ? "error" : ""}
            value={values.importance}
          >
            <option value="">Seleccionar opción</option>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
          {errors.importance && touched.importance && (
            <span className="error-message">{errors.importance}</span>
          )}
        </div>

        <div>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Descripción ..."
            className={errors.description && touched.description ? "error" : ""}
            value={values.description}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <button type="submit">Crear</button>
      </form>
    </section>
  );
}

export default TaskForm;
