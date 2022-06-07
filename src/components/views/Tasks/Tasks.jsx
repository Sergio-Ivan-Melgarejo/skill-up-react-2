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


function Tasks() {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [renderList, setRenderList] = useState(null);
  
  
  // para renderizar los items
  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />);
  };
  
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((ele) => ele.status === text)
      .map((data) => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />);
  };
 
  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  const handleDelete = (id) => dispatch(deleteTask(id))
  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data))

  // para filtrar por busqueda
  const [search, setSearch] = useState("");

  useEffect(() => {
   if (search) {
    setRenderList(
      list.filter((data) => data.title.toLowerCase().startsWith(search.toLowerCase()))
    );   
  } 
  else setRenderList(list)
  }, [search]);

  const handleSearch = debounce((e) => {
    setSearch(e?.target?.value);
  }, 1000);


  // para manejar la data por redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""));
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
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksFromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
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
            <select name="importance" onChange={handleChangeImportance}>
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
    </>
  );
}

export default Tasks;
