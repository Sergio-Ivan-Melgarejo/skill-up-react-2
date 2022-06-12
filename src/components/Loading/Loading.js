import React from "react";
import "./loading.css"

const Loading = () => {
  return <div className="lds-spinner">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      <p className="text">Cargando</p>
      </div>;
};

export default Loading;
