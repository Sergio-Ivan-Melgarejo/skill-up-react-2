// Components
import Header from "../../Header/Header";

// Style
import "./tasks.css";

function Tasks () {
  return (
    <>
      <Header />
      <main id="tasks">
        <section className="wrapper_list">
            <div className="list_header">
              <h2>Mis tareas</h2>
            </div>
            <div className="card">
              <div className="close">X</div>
              <h3>Tarea 1</h3>
              <h6>25-1-2022 16:50 hs</h6>
              <h5>Dark Vader</h5>
              <button type="button">Nueva</button>
              <button type="button">Alta</button>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.</p>
            </div>
            <div className="card">
              <div className="close">X</div>
              <h3>Tarea 1</h3>
              <h6>25-1-2022 16:50 hs</h6>
              <h5>Dark Vader</h5>
              <button type="button">Nueva</button>
              <button type="button">Alta</button>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.</p>
            </div>
            <div className="card">
              <div className="close">X</div>
              <h3>Tarea 1</h3>
              <h6>25-1-2022 16:50 hs</h6>
              <h5>Dark Vader</h5>
              <button type="button">Nueva</button>
              <button type="button">Alta</button>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.</p>
            </div>
        </section>
      </main>
    </>
  )
};

export default Tasks;
