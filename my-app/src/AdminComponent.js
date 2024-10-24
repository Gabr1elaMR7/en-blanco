import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Estilos/AdminGestion.module.css";

const AdminComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [datos_cre_daas, setDatos_cre_daas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Para mostrar/ocultar formulario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    NombreUsuario: "",
    usser: "",
    Rol: "back",
    Password: "",
  });

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("http://172.31.33.33:5000/usuarios");
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      }
    };

    const obtenerdatos_cre_daas = async () => {
      try {
        const response = await axios.get(
          "http://172.31.33.33:5000/datos_cre_daas"
        );
        setDatos_cre_daas(response.data); // Guardar las conexiones
      } catch (error) {
        console.error("Error al obtener conexiones RPHY:", error);
      }
    };

    obtenerdatos_cre_daas();
    obtenerUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleAgregarUsuario = async (e) => {
    e.preventDefault();
    if (nuevoUsuario.NombreUsuario.length < 8) {
      alert("Debe ingresar un nombre de usuario.");
      return; // Detener la ejecución si el nombre de usuario está vacío
    }
    if (nuevoUsuario.usser.length < 8) {
      alert("El usuario debe tener al menos 8 caracteres.");
      return; // Detener la ejecución si la contraseña es demasiado corta
    }
    if (nuevoUsuario.Password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return; // Detener la ejecución si la contraseña es demasiado corta
    }
    if (nuevoUsuario.Rol === "super") {
      const confirmacion = window.confirm(
        "¿Está seguro de que desea crear un usuario con todos los permisos?"
      );
      if (!confirmacion) {
        return; // Si el usuario cancela, no se procede a agregar
      }
    }
    try {
      const response = await axios.post(
        "http://172.31.33.33:5000/usuarios/nuevo",
        nuevoUsuario
      );
      if (response.status === 201) {
        alert("Usuario agregado exitosamente");
        setUsuarios([...usuarios, response.data]); // Agregar nuevo usuario a la lista
        setNuevoUsuario({
          NombreUsuario: "",
          usser: "",
          Rol: "",
          Password: "",
        }); // Limpiar el formulario
        setMostrarFormulario(false); // Ocultar el formulario después de agregar
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("Error al agregar usuario");
    }
  };
  const handleEliminarUsuario = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?"
    );
    if (!confirmacion) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://172.31.33.33:5000/usuarios/${id}`
      );
      if (response.status === 200) {
        alert("Usuario eliminado exitosamente");
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id)); // Actualiza la lista de usuarios sin el eliminado
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario");
    }
  };

  const handleDescargarJSON = async () => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea generar y descargar el archivo JSON de topologías?"
    );
    if (!confirmacion) {
      return; // Si el usuario cancela, no se procede con la descarga
    }
    try {
      const response = await axios.get(
        "http://172.31.33.33:5000/topologias/download"
      );
      const topologias = response.data;

      // Crear un archivo JSON y disparar la descarga
      const jsonString = JSON.stringify(topologias, null, 2); // `null, 2` para un formato legible
      const blob = new Blob([jsonString], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "topologias.json";
      link.click();
    } catch (error) {
      console.error("Error al descargar JSON:", error);
      alert("Error al descargar los datos de topologías.");
    }
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className={styles.contenedorMainAdmin}>
      <h1 className={styles.tituloAdmin}>Área de Administración</h1>
      <section Gstion usuarios>
        <div className={styles.botonContainer}>
          <button
            className={styles.botonUsuario}
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cancelar" : "Agregar Nuevo Usuario"}
          </button>

          <button className={styles.botonJson} onClick={handleDescargarJSON}>
            Descargar JSON de Topologías
          </button>
        </div>

        {/* Mostrar formulario si se selecciona */}
        {mostrarFormulario && (
          <form className={styles.agregarUsser} onSubmit={handleAgregarUsuario}>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="NombreUsuario"
              value={nuevoUsuario.NombreUsuario}
              onChange={handleInputChange}
              required
            />

            <label>Usuario (usser):</label>
            <input
              type="text"
              name="usser"
              value={nuevoUsuario.usser}
              onChange={handleInputChange}
              required
            />
            <label>Rol:</label>
            <select
              name="Rol"
              value={nuevoUsuario.Rol}
              onChange={handleInputChange}
              required
            >
              <option value="super">Super</option>
              <option value="back">Back</option>
            </select>

            <label>Contraseña:</label>
            <input
              type="password"
              name="Password"
              value={nuevoUsuario.Password}
              onChange={handleInputChange}
              required
            />

            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                <path
                  fill-rule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </button>
          </form>
        )}

        {/* Tabla de usuarios */}
        <table className="table table-light">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Usuario (usser)</th>
              <th>Rol</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.NombreUsuario}</td>
                <td>{usuario.usser}</td>
                <td>{usuario.Rol}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminarUsuario(usuario._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h1>datos_cre_daas</h1>
      {datos_cre_daas.length === 0 ? (
        <p>No hay conexiones RPHY disponibles.</p>
      ) : (
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Puerto</th>
              <th>BW</th>
              <th>Input</th>
              <th>Output</th>
              <th>Equipo de llegada</th>
            </tr>
          </thead>
          <tbody>
            {datos_cre_daas.map((conexion) => (
              <tr key={conexion.cre}>
                <td>{conexion.cre}</td>
                <td>{conexion.puerto_cre}</td>
                <td>{conexion.bw}</td>
                <td>{conexion.input}</td>
                <td>{conexion.output}</td>
                <td>{conexion.equipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminComponent;
