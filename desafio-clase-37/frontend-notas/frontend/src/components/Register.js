import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3900/api/register", {
        username,
        password,
      });

      if (response.data.status === "success") {
        console.log("Usuario registrado exitosamente");
      } else {
        console.log("Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
