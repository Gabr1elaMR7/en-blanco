// src/TableComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TableComponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.31.33.33:5000/topologias",
          {
            params: { query, tecnologia },
          }
        );

        // Filtrar para eliminar duplicados según 'EquipoDestino'
        const uniqueData = response.data.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.EquipoDestino === current.EquipoDestino
          );
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setData(uniqueData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, tecnologia]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Ip Equipo Origen</th>
            <th>Ubicacion Origen</th>
            <th>Equipo Destino</th>
            <th>Ubicacion Equipo Destino</th>
            <th>IpEquipo ROU</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.IpEquipoDestino}</td>
              <td>{item.UbicacionEquipoDestino}</td>
              
              <td>{item.EquipoROU}</td>
              <td>{item.UbicacionEquipoROU}</td>
              <td>{item.IpEquipoROU}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
