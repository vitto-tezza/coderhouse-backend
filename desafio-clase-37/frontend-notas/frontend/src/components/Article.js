import React from "react";

const Article = ({ id, articleData, delArticle }) => {
  const { name, date, description, price } = articleData;

  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(4, 8);
    const year = date.substring(0, 4);
    return day + month + year;
  };

  const del = () => {
    delArticle(id);
  };

  return (
    <div className="col">
      <div className="card mx-auto mb-3">
        <div className="card-header">
          <h3 className="card-title">{name}</h3>
        </div>
        <div className="card-body">
          <label className="card-text text-start">{description}</label>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-pub list-group-item">
            Publicado el: {formatDate(date)}
          </li>
          <li className="list-pub list-group-item">$ {price}</li>
        </ul>
        <div className="card-footer">
          <button className="btn btn-danger btn-sm" type="button" onClick={del}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
