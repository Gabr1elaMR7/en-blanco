import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Estilos/Tablas.module.css";
import * as XLSX from "xlsx";

const TablasStatusEquiposComponent = ({ query }) => {
  const [datos_cre_daas, setDatos_cre_daas] = useState([]);

  const [equiposGrafanaConjunto, setEquiposGrafanaConjunto] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Limpiar los datos antes de realizar una nueva consulta
        setDatos_cre_daas([]);
        setEquiposGrafanaConjunto([]);

        // Obtener los datos de conexiones RPHY
        const responseConexiones = await axios.get(
          "http://172.31.33.33:5000/datos_cre_daas",
          { params: { query } }
        );
        setDatos_cre_daas(responseConexiones.data);

        // Obtener la IP de Grafana relacionada con el equipo
        const responseGrafana = await axios.get(
          "http://172.31.33.33:5000/equipos_grafana_conjunto",
          { params: { equipo: query } }
        );
        if (responseGrafana.data.length > 0) {
          setEquiposGrafanaConjunto(responseGrafana.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (query) {
      obtenerDatos();
    }
  }, [query]);

  const handleGrafanaClick = (equipo, cre) => {
    const url = `http://172.31.33.33:3000/d-solo/fdzo2y31g6k8wd/trafico-y-puertos-cre-daas?orgId=1&var-EQUIPO=${encodeURIComponent(
      equipo
    )}&var-CRE=${encodeURIComponent(cre)}&refresh=1m&theme=light&panelId=3`;

    window.open(url, "_blank", "width=600,height=400");
  };

  const handleEyeClick = (equipo, cre, puerto) => {
    const url = `http://172.31.33.33:3000/d-solo/fdzo2y31g6k8wd/trafico-y-puertos-cre-daas?orgId=1&var-EQUIPO=${encodeURIComponent(
      equipo
    )}&var-CRE=${encodeURIComponent(cre)}&var-PUERTO=${encodeURIComponent(
      puerto
    )}&refresh=1m&theme=light&panelId=2`;

    window.open(url, "_blank", "width=600,height=400");
  };

  const exportToExcel = () => {
    // Mostrar la ventana de confirmación
    if (!window.confirm("¿Desea exportar los datos a un archivo Excel?")) {
      return;
    }

    // Preparar los datos para la exportación
    const data = datos_cre_daas.map((row) => ({
      EQUIPO: row.cre,
      "PUERTO CRE": row.puerto_cre,
      BW: row.bw,
      "PUERTO EQUIPO DESTINO": row.puerto,
      "EQUIPO DE LLEGADA": row.equipo,
      "UTILIZACIÓN OUTPUT": row.utilizacion_output,
      "UTILIZACIÓN INPUT": row.utilizacion_input,
      ESTADO: row.estado,
    }));

    // Crear una hoja de trabajo (worksheet) y un libro de trabajo (workbook)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    const fechaHora = new Date();
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const fechaFormateada = fechaHora.toLocaleString('es-CO', opciones).replace(/[\/:]/g, '-');
  
    // Crear el nombre del archivo
    const nombreArchivo = `${query}_${fechaFormateada}.xlsx`;
    // Exportar el libro de trabajo a un archivo Excel
    XLSX.writeFile(workbook, nombreArchivo);
  };

  return (
    <div className={styles.contenedorMainAdmin}>
      {/* Tabla de datos de equipos_grafana_conjunto */}
      {equiposGrafanaConjunto.length === 0 ? (
        <p></p>
      ) : (
        <table className="table table-striped table-hover mt-4 table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>
              </th>
              <th>EQUIPO</th>
              <th>EQUIPO DESTINO</th>
              <th>BW</th>
              {/* Agrega más encabezados según los datos disponibles */}
            </tr>
          </thead>
          <tbody>
            {equiposGrafanaConjunto.map((equipo) => (
              <tr key={equipo.cre}>
                {" "}
                {/* Asume que cada equipo tiene un 'id' único */}
                <td>
                  <button
                    className="btn"
                    onClick={
                      () => handleGrafanaClick(equipo.equipo, equipo.cre) // Usar la nueva función
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </button>
                </td>
                <td>{equipo.cre}</td> {/* Ajusta según el campo correcto */}
                <td>{equipo.equipo}</td> {/* Ajusta según el campo correcto */}
                <td>{equipo.total_bw}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {datos_cre_daas.length === 0 ? (
        <p></p>
      ) : (
        <table className="table table-striped table-hover table-bordered text-center vertical-align: middle;">
          <thead className="table-dark">
            <tr>
              <th>
                <button onClick={exportToExcel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
                    />
                  </svg>
                </button>
              </th>
              <th>EQUIPO</th>
              <th>PUERTO</th>
              <th>BW</th>
              <th>PUERTO EQUIPO DESTINO</th>
              <th>EQUIPO DE LLEGADA</th>
              <th>UTILIZACIÓN OUTPUT</th>
              <th>UTILIZACIÓN INPUT</th>
              <th>ESTADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datos_cre_daas.map((conexion) => (
              <tr key={conexion.cre}>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      handleEyeClick(
                        conexion.equipo,
                        conexion.cre,
                        conexion.puerto_cre
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </button>
                </td>
                <td>{conexion.cre}</td>
                <td>{conexion.puerto_cre}</td>
                <td>{conexion.bw}</td>
                <td>{conexion.puerto}</td>
                <td>{conexion.equipo}</td>
                <td>{conexion.utilizacion_output}</td>
                <td>{conexion.utilizacion_input}</td>
                <td>{conexion.estado}</td>
                <td>
                  {conexion.estado === "active" ? (
                    <span
                      className={styles.indicadorActivo}
                      style={{ backgroundColor: "green" }}
                    />
                  ) : conexion.estado === "inactive" ? (
                    <span
                      className={styles.indicadorActivo}
                      style={{ backgroundColor: "red" }}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablasStatusEquiposComponent;
