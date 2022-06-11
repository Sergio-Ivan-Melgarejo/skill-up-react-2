// Library
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// utils
import swalAlert from "../../utils/swalAlert";

// Style
import "./task-form.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

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
    fetch(`${API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ task: values }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(data?.status_code < 300 && data?.status_code >= 200) {
          resetForm();
          toast("Tarea creada");
        } else {
          swalAlert({
            title: `Ocurrió un error`,
            text: "Ocurrió un error, vuelva a intentarlo más tarde."
          })
        }
      })
      .catch((error) => {
        swalAlert({
          title: `Ocurrió un error`,
          text: "Ocurrió un error, vuelva a intentarlo más tarde."
        })
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
            <div className="error-message">{errors.title}</div>
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
            <option value="IN PROGRESS">En proceso</option>
            <option value="FINISHED">Terminada</option>
          </select>
          {errors.status && touched.status && (
            <div className="error-message">{errors.status}</div>
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
            <div className="error-message">{errors.importance}</div>
          )}
        </div>

        <div className="div-textarea">
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Descripción ..."
            className={errors.description && touched.description ? "error" : ""}
            value={values.description}
          />
          {errors.description && touched.description && (
            <div className="error-message">{errors.description}</div>
          )}
        </div>

        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
}

export default TaskForm;
