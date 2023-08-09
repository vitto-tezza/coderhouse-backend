import React, { useState, useEffect } from "react";
import axios from "axios";
import Global from "../Global";
import Article from "./Article";

const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const url = Global.url;

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    axios.get(url + "articles").then((res) => {
      setArticleList(res.data.articles);
    });
  };

  const deleteArticle = (id) => {
    const idArticle = articleList[id]._id;
    axios.delete(url + "delete/" + idArticle).then((res) => {
      getArticles();
    });
  };

  return (
    <div className="publicaciones">
      <h1 className="mt-5">Articulos</h1>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
          {articleList.length > 0 ? (
            articleList.map((article, i) => {
              return (
                <Article
                  key={i}
                  id={i}
                  articleData={article}
                  delArticle={deleteArticle}
                />
              );
            })
          ) : (
            <h3 className="mx-auto"> No hay articulos que mostrar</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
