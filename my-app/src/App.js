//App.js front

import React, { useState, useEffect } from "react";
import AutoComplete from "@tarekraafat/autocomplete.js";
import axios from "axios";
import Login from "./Login";
import DiagramComponent from "./DiagramComponent";
import { Viscomponent } from "./Viscomponent";
import TableComponent from "./TableComponent";
import TablasStatusEquiposComponent from "./TablasStatusEquiposComponent";
import EditComponent from "./EditComponent";
import CrearComponent from "./CrearComponent";
import AdminComponent from "./AdminComponent";
import ProtectedRoute from "./ProtectedRoute";
import DashboardComponent from "./DashboarComponent";

import {
  useNavigate,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import styles from "./Estilos/App.module.css";
import "./Estilos/estilosGlobales.css";

const App = () => {
  const [consulta, setConsulta] = useState("");
  const [consultaGuardada, setConsultaGuardada] = useState("");
  const [tec, setTecnologia] = useState("FTTH");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [userRole, setUserRole] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation(); // Para obtener la ruta actual
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    if (storedToken) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (rol) => {
    setIsAuthenticated(true);
    navigate("/");
    setUserRole(rol);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cambiar el estado de autenticación
    navigate("/login"); // Redirigir al login
  };

  const admin = () => {
    navigate("/gestion");
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setConsulta(value);

    if (value.length >= 10) {
      try {
        const response = await axios.get(
          `http://172.31.33.33:5000/topologias?query=${value}`
        );
        if (response.data) {
          setSuggestions(response.data.map((item) => item.EquipoDestino));
        }
      } catch (error) {
        console.error("Error al obtener la búsqueda:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectChange = (event) => {
    setTecnologia(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConsultaGuardada(consulta); // Guarda la consulta actual
  };

  const handleRefresh = () => {
    setConsultaGuardada(consulta); // Refresca usando la última consulta ingresada
  };

  return (
    <div>
      {isAuthenticated ? ( // Renderizar el contenido si está autenticado
        <div className="App">
          <div className="mainContainer">
            <div className="banderaContainer">
              <img
                src="/imagenes/flag-colombia.png"
                alt="Bandera"
                className="bandera"
              />
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={admin}>
                      Gestión{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-people"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <li>
                      <Link to="/dashboard" className="dropdown-item">
                        Dashboard{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bar-chart-line"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 0h1v15h15v1H0V0zm10 11h2v3h-2v-3zM4 4h2v10H4V4zm6 7h2v6h-2v-6z" />
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Salir ↩ <i className="bi bi-escape"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                      <a class="nav-link active" aria-current="page" href="#">
                        <Link to="/" className="cuadroBotones">
                          Inicio
                        </Link>
                      </a>
                      <a class="nav-link active" href="#">
                        <Link to="/crear" className="cuadroBotones">
                          Crear
                        </Link>
                      </a>
                      <a class="nav-link active" href="#">
                        <Link to="/edit" className="cuadroBotones">
                          Editar
                        </Link>
                      </a>
                    </div>
                    <div className="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Relacionado
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="https://claromovilco.sharepoint.com/sites/PROYECTOSCERTIFICACIONUNIDADHOGARES"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint Certificación
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="https://claromovilco.sharepoint.com/sites/JEFATURABACKOFFICEALAMBRICO/Documentos%20compartidos/Forms/AllItems.aspx?id=%2Fsites%2FJEFATURABACKOFFICEALAMBRICO%2FDocumentos%20compartidos%2FBITACORA%2FFTTH%2F3%2E%20ATPs&amp;p=true&amp;ga=1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint OLT's Back Office
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://172.31.33.21/index.php#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            BackOffice Alambrico
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="http://172.31.33.33:3000/dashboards"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DASHBOARD CABLE
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <header>
            <h1>TOPOLOGÍAS DE RED CLARO</h1>
            <img
              src={`${process.env.PUBLIC_URL}/imagenes/claro-logo.png`}
              alt="Claro Logo"
            />
          </header>

          {location.pathname !== "/edit" &&
            location.pathname !== "/crear" &&
            location.pathname !== "/login" &&
            location.pathname !== "/gestion" &&
            location.pathname !== "/dashboard" && (
              <>
                <main>
                  <nav>
                    <form onSubmit={handleSubmit}>
                      <div className={styles.contenedorBusqueda}>
                        <input
                          className={styles.barraBusqueda}
                          type="text"
                          id="buscador"
                          placeholder="Ingrese el Nombre del equipo"
                          value={consulta}
                          onChange={handleInputChange}
                        />
                        <button className={styles.botonBuscar} type="submit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </button>
                        <select
                          className={styles.tecnologiaBusqueda}
                          id="tecnologia"
                          value={tec}
                          onChange={handleSelectChange}
                        >
                          <option value="CMTS">CMTS</option>
                          <option value="FTTH">FTTH</option>
                          <option value="FTTO">FTTO</option>
                        </select>
                      </div>
                      <aside className={styles.ultimaConsulta}>
                        {consultaGuardada && (
                          <p>Última consulta: {consultaGuardada}</p>
                        )}
                      </aside>
                    </form>
                  </nav>

                  <article className={styles.diagramaContainer}>
                    <TableComponent query={consultaGuardada} tecnologia={tec} />
                    <DiagramComponent
                      consulta={consultaGuardada}
                      tecnologia={tec}
                    />
                    <Viscomponent query={consultaGuardada} tecnologia={tec} />
                    {tec === "CMTS" && (
                      <TablasStatusEquiposComponent query={consultaGuardada} />
                    )}
                  </article>
                </main>
                <footer>
                  <p>&copy; Claro Colombia</p>
                </footer>
              </>
            )}
          <Routes>
            {!isAuthenticated ? (
              // Si no está autenticado, redirigir al login
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : (
              // Si está autenticado, renderiza el contenido normalmente
              <>
                <Route path="/" element={<DiagramComponent />} />
                <Route path="/crear" element={<CrearComponent />} />
                <Route path="/edit" element={<EditComponent />} />
                <Route
                  path="/gestion"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      userRole={userRole}
                    >
                      <AdminComponent />
                    </ProtectedRoute>
                  }
                />
                <Route path="/dashboard" element={<DashboardComponent />} />
              </>
            )}
          </Routes>
        </div>
      ) : (
        // Si no está autenticado, mostrar el componente de login
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
