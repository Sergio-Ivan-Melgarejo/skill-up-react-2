import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Components
import Header from "../../Header/Header";
import TaskForm from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";

// Hooks
import { useResize } from "../../../hooks/useResize";

// Style
import "./tasks.css";

const { REACT_APP_API_ENPOINT: API_ENPOINT } = process.env;

const limitString = (str) => {
  if (str.length > 300) {
    return { string: str.slice(0, 300).concat("..."), addButton: true };
  }
  return { string: str, addButton: false };
};

function Tasks() {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    fetch(`${API_ENPOINT}task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status_code < 300 && data.status_code >= 200) {
          setList(data.result);
        }
        // setTimeout(()=>{
        //   setloading(false);
        // },3000)
      });
  }, []);

  const renderAllCards = () => {
    return list?.map((data) => <Card key={data._id} data={data} />);
  };
  const renderNewCards = () => {
    return list
      ?.filter((ele) => ele.status === "NEW")
      .map((data) => <Card key={data._id} data={data} />);
  };
  const renderInProgressCards = () => {
    return list
      ?.filter((ele) => ele.status === "IN PROGRESS")
      .map((data) => <Card key={data._id} data={data} />);
  };
  const renderFinishedCards = () => {
    return list
      ?.filter((ele) => ele.status === "FINISHED")
      .map((data) => <Card key={data._id} data={data} />);
  };

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            loading ? (
              <>
                <Skeleton height={120} />
                <Skeleton height={120} />
                <Skeleton height={120} />
              </>
            ) : !list?.length ? (
              <div>No hay tareas creadas</div>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : loading ? (
            <div className="container-skeleton">
              <Skeleton height={"100%"}/>
              <Skeleton height={"100%"}/>
              <Skeleton height={"100%"}/>
            </div>
          ) : (
            <div className="list_group">
              {!list?.length ? (
                <div>No hay tareas creadas</div>
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderNewCards()}
                  </div>
                  <div className="list">
                    <h4>En Proceso</h4>
                    {renderInProgressCards()}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderFinishedCards()}
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