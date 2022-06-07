import { useState } from "react";
import "./Card.css";

const limitString = (str) => {
  if (str.length > 170) {
    return { string: str.slice(0, 167).concat("..."), addButton: true };
  }
  return { string: str, addButton: false };
};

function Card({
  deleteCard,
  data: {
    _id,
    title,
    createdAt,
    description,
    status,
    importance,
    user: { userName },
  },
}) {
  const [showMore, setShowMore] = useState(false);
  const dataTime = new Date(createdAt).toLocaleString() + " hr.";
  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>x</div>
      <h3>{title}</h3>
      <h6>{dataTime}</h6>
      <h5>{userName}</h5>
      <button className={status.toLowerCase()} type="button">
        {status.toLowerCase()}
      </button>
      <button className={importance.toLowerCase()} type="button">
        {importance.toLowerCase()}
      </button>
      <p>{showMore ? description : limitString(description).string}</p>
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
      {showMore && (
        <button type="button" onClick={() => setShowMore(false)}>
          Ver menos
        </button>
      )}
    </div>
  );
}

export default Card;
