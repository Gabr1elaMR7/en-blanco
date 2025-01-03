//login.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Estilos/Login.module.css"; 

const Login = ({ onLogin }) => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito/error
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Realiza la solicitud de inicio de sesión
      const response = await axios.post("http://172.31.33.33:5000/usuarios", {
        usser: data.usser,
        Password: data.Password,
        Rol: data.Rol,
      });
      // Verifica que la respuesta sea exitosa
      if (response.status === 200) {
        const { Rol } = response.data;
        onLogin(Rol); // Llama a onLogin para actualizar el estado en el componente padre
        navigate("/"); // Redirige al usuario a la página principal
        setMensaje("Usuario OK");
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado que no está en el rango de 2xx
        if (error.response.status === 404) {
          setMensaje("Usuario o Contraseña incorrecto"); // Usuario no encontrado
        } else if (error.response.status === 401) {
          setMensaje("Usuario o Contraseña incorrecto"); // Contraseña no coincide
        } else {
          setMensaje("Error desconocido"); // Otros errores
        }
      } else if (error.request) {
        // La solicitud fue hecha, pero no se recibió respuesta
        setMensaje("No se pudo conectar al servidor."); // Manejo de errores de conexión
      } else {
        // Algo pasó al configurar la solicitud
        setMensaje("Error en la solicitud: " + error.message);
      }
    }
  };

  return (
    <div className={styles.contenedorBody}>
      <div className={styles.contenedorLogin}>
        <div className={styles.overlay}></div>
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="usser">Usuario</label>
            <input
              className={styles.inputForm}
              name="usser"
              type="text"
              {...register("usser", { required: "Este campo es requerido" })}
            />
            {errors.usser && (
              <p className={styles.error}>{errors.usser.message}</p>
            )}
            <label htmlFor="Password">Contraseña</label>
            <input
              className={styles.inputForm}
              name="Password"
              type="password"
              {...register("Password", { required: "Este campo es requerido" })}
            />
            {errors.Password && (
              <p className={styles.error}>{errors.Password.message}</p>
            )}
            <button type="submit" className={styles.botonLogin}>
              ENTRAR
            </button>
          </form>

          {/* Mostrar el mensaje de resultado (éxito o error) */}
          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
