import { useEffect, useState } from "react";

// Components
import Header from "../../Header/Header";
import TaskForm from "../../TaskForm/TaskForm";

// Style
import "./tasks.css";

const limitString = (str) => {
  if(str.length > 300){ 
    return { string: str.slice(0,300).concat("..."), addButton: true };
  }
  return { string:str, addButton: false }
}

function Tasks () {
  const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true : false);
  
  const handleResize = () => {
    if (window.innerWidth < 900) setIsPhone(true)
    else setIsPhone(false)
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize",handleResize);
    return () => window.removeEventListener("resize",handleResize);
  }, []);

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
            <div className="list_header">
              <h2>Mis tareas</h2>
            </div>
            {
              isPhone
              ? (
                  <div className="list phone">
                    <div className="card">
                      <div className="close">X</div>
                      <h3>Tarea 1 PHONE</h3>
                      <h6>25-1-2022 16:50 hs</h6>
                      <h5>Dark Vader</h5>
                      <button type="button">Nueva</button>
                      <button type="button">Alta</button>
                      <p>
                        {
                          limitString("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.")
                          .string
                        }
                      </p>
                    </div>
                  </div>
                )
              : (
                  <div className="list_group">
                    <div className="list">
                      <h4>Nuevas</h4>
                      <div className="card">
                        <div className="close">X</div>
                        <h3>Tarea 1</h3>
                        <h6>25-1-2022 16:50 hs</h6>
                        <h5>Dark Vader</h5>
                        <button type="button">Nueva</button>
                        <button type="button">Alta</button>
                        <p>
                          {
                            limitString("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.")
                            .string
                          }  
                        </p>
                      </div>
                    </div>
                    <div className="list">
                      <h4>En Proceso</h4>
                      <div className="card">
                        <div className="close">X</div>
                        <h3>Tarea 1</h3>
                        <h6>25-1-2022 16:50 hs</h6>
                        <h5>Dark Vader</h5>
                        <button type="button">Nueva</button>
                        <button type="button">Alta</button>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.</p>
                      </div>
                    </div>
                    <div className="list">
                      <h4>Finalizadas</h4>
                      <div className="card">
                        <div className="close">X</div>
                        <h3>Tarea 1</h3>
                        <h6>25-1-2022 16:50 hs</h6>
                        <h5>Dark Vader</h5>
                        <button type="button">Nueva</button>
                        <button type="button">Alta</button>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum debitis ipsum quaerat minus illum necessitatibus, odit beatae eius nihil eveniet, repellat repudiandae repellendus tempore error unde mollitia, obcaecati vero iste.</p>
                      </div>
                    </div>
                  </div>
                )
            }
        </section>
      </main>
    </>
  )
};

export default Tasks;
