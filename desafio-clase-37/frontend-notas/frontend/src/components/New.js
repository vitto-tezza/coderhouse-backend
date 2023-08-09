import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Global from "../Global";

const New = () => {
  const url = Global.url;

  const [article, setArticle] = useState({
    name: null,
    description: null,
    price: null,
  });

  const [redirect, setRedirect] = useState(false);

  let nameRef = React.createRef();
  let descriptionRef = React.createRef();
  let priceRef = React.createRef();

  const changeState = () => {
    setArticle({
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
    });
    console.log(article);
  };

  const sendData = (e) => {
    e.preventDefault();
    changeState();
    axios.post(url + "save", article).then((res) => {
      setRedirect(true);
      console.log(res.data);
    });
  };

  if (redirect) {
    return <Navigate to="articles" />;
  }

  return (
    <div className="nueva-publicacion">
      <div
        id="formulario"
        className="card mx-auto mb-3 mt-5"
        style={{ width: "30em" }}
      >
        <div className="cart-header text-dark">
          <h4>Publicar nuevo articulo</h4>
        </div>
        <div className="card-body">
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                ref={nameRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="6"
                cols="30"
                ref={descriptionRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                ref={priceRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control btn btn-primary"
                type="submit"
                value="Publicar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
