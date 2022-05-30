// Library
import { Formik, useFormik } from "formik";

// Style
import "./task-form.css";

function TaskForm () {
    const initialValues = {
      title: "",
      status: "",
      priority: "",
      description: ""
    };

  
    const onSubmit = () => {
        alert()
    };
  
    const formik = useFormik({ initialValues, onSubmit });
    const { handleChange, handleSubmit} = formik;
  
    return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="title" placeholder="titulo ..." onChange={handleChange} />
                </div>
                <div>
                    <select className="status" onChange={handleChange}>
                        <option value={""}>Seleccionar opción</option>
                        <option value={"new"}>Nueva</option>
                        <option value={"inProcess"}>En proceso</option>
                        <option value={"finished"}>Terminada</option>
                    </select>
                </div>
                <div>
                    <select className="priority" onChange={handleChange}>
                        <option value={""}>Seleccionar opción</option>
                        <option value={"low"}>Baja</option>
                        <option value={"midium"}>Media</option>
                        <option value={"high"}>Alta</option>
                    </select>
                </div>
                <div>
                    <textarea name="description" onChange={handleChange} placeholder="Descripción ..." />
                </div>
                <button type="submit" >Crear</button>
            </form>
        </section>
    )
};

export default TaskForm;
