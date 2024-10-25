import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Estilos/Tablas.module.css";

const TablasStatusEquiposComponent = ({ query }) => {
  const [datos_cre_daas, setDatos_cre_daas] = useState([]);
  const [grafanaData, setGrafanaData] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtener los datos de conexiones RPHY
        const responseConexiones = await axios.get(
          "http://172.31.33.33:5000/datos_cre_daas",
          { params: { query } }
        );
        setDatos_cre_daas(responseConexiones.data);

        // Obtener la IP de Grafana relacionada con el equipo
        const responseGrafana = await axios.get(
          "http://172.31.33.33:5000/equipos_grafana",
          { params: { equipo: query } }
        );

        if (responseGrafana.data.length > 0) {
          setGrafanaData(responseGrafana.data[0]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (query) {
      obtenerDatos();
    }
  }, [query]);

  return (
    <div className={styles.contenedorMainAdmin}>
      {/* {grafanaData && (
        <iframe
          src={`${grafanaData.grafana_ip}&var-EQUIPO=${query}`}
          width="450"
          height="200"
          frameBorder="0"
        ></iframe>
      )} */}

      {datos_cre_daas.length === 0 ? (
        <p>No se encontraron datos.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
        <th></th>
              <th>Equipo</th>
              <th>Puerto</th>
              <th>BW</th>
              <th>Puerto equipo Destino</th>
              <th>Equipo de llegada</th>
              <th>Utilización Output</th>
              <th>Utilización Input</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datos_cre_daas.map((conexion) => (
              <tr key={conexion.cre}>
                       <td>
                  <button
                    className="btn"
                    
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
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
