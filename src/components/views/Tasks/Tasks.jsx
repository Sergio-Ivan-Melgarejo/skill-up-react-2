import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import debounce from "lodash.debounce";

// Components
import Header from "../../Header/Header";
import TaskForm from "../../TaskForm/TaskForm";
import Card from "../../Card/Card";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { 
  getTasks,
  deleteTask,
  editTaskStatus
} from "../../../store/actions/tasksActions";

// Hooks
import { useResize } from "../../../hooks/useResize";

// Style
import "./tasks.css";
import Footer from "../../Footer/Footer";

function Tasks() {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [renderList, setRenderList] = useState(null);
  const [filter, setFilter] = useState({
    importance:"ALL",
    search:"",
  });
  

  // para renderizar los items
  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />);
  };
  
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((ele) => ele.status === text)
      .map((data) => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />);
  };

  useEffect(() => {
    let toRender = list;
    
    if (filter.search !== "") {
      toRender = toRender.filter((data) => data.title.toLowerCase().startsWith(filter.search.toLowerCase()))
    } else toRender = list

    if (filter.importance !== "ALL") {
      toRender = toRender.filter((data) => data.importance === filter.importance) 
    }

    setRenderList(toRender)
  }, [filter,list]);

  const handleSearch = debounce((e) => {
    setFilter(prev => {return {...prev, search: e?.target?.value}});
  }, 1000);


  // para manejar la data por redux
  const dispatch = useDispatch();

  const handleDelete = (id) => dispatch(deleteTask(id,tasksFromWho === "ME" ? "me" : ""))
  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data,tasksFromWho === "ME" ? "me" : ""))
  const handleGetCarts = () => dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""))

  useEffect(() => {
    handleGetCarts()
  }, [tasksFromWho, dispatch]);

  const { tasks, error, loading } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    if (tasks?.length){
      setList(tasks)
      setRenderList(tasks)
    }
  }, [tasks]);

  if (error) return <div>Hay un error</div>

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm handleGetCarts={handleGetCarts} />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl  >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksFromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio sx={{
                    color: "#8B8B8B",
                    '&.Mui-checked': {
                      color: "#FF452B",
                    },
                  }} />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio sx={{
                    color: "#8B8B8B",
                    '&.Mui-checked': {
                      color: "#FF452B",
                    },
                  }}/>}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={(e) => setFilter(prev => {return {...prev, importance:e.target.value}})}>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            loading ? (
              <>
                <Skeleton height={120} />
                <Skeleton height={120} />
                <Skeleton height={120} />
              </>
            ) : !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : loading ? (
            <div className="container-skeleton">
              <Skeleton height={"100%"} />
              <Skeleton height={"100%"} />
              <Skeleton height={"100%"} />
            </div>
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En Proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default Tasks;
