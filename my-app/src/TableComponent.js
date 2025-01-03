// src/TableComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TableComponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.31.33.33:5000/topologias",
          {
            params: { query, tecnologia },
          }
        );
        setOriginalData(response.data);
        console.log(response.data);

        // Filtrar para eliminar duplicados según 'EquipoDestino'
        const uniqueData = Array.from(
          new Map(
            response.data.map((item) => [item.EquipoDestino, item])
          ).values()
        );

        setData(uniqueData);

        // Determinar columnas visibles
        const columns = [
          "TrunkDest",
          "TrkRx1",
          "EquipoTx1",
          "TrkTx1",
          "TrkRx2",
          "EquipoTx2",
          "TrkTx2",
          "TrkRx3",
          "EquipoTx3",
          "TrkTx3",
          "TrkRx4",
          "EquipoTx4",
          "TrkTx4",
          "TrkRx5",
          "EquipoTx5",
          "TrkTx5",
          "TrkRx6",
          "EquipoTx6",
          "TrkTx6",
          "TrkRx7",
          "EquipoTx7",
          "TrkTx7",
          "TrkRx8",
          "EquipoTx8",
          "TrkTx8",
          "TrkROU",
        ];
        const visible = columns.filter((column) =>
          response.data.some((item) => item[column])
        );
        setVisibleColumns(visible);
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
    <div>
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
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {data.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`flush-heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${index}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${index}`}
              >
                {item.UbicacionEquipoDestino}
              </button>
            </h2>
            <div
              id={`flush-collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`flush-heading${index}`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <table className="table table-striped table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      {visibleColumns.includes("TrunkDest") && <th>Puerto</th>}
                      {visibleColumns.includes('TrkRx1') && <th>Puerto RX1</th>}
                      {visibleColumns.includes('EquipoTx1') && <th>Equipo TX1</th>}
                      {visibleColumns.includes('TrkTx1') && <th>Puerto TX1</th>}
                      {visibleColumns.includes('TrkRx2') && <th>Puerto RX2</th>}
                      {visibleColumns.includes('EquipoTx2') && < th>Equipo TX2</th>}
                      {visibleColumns.includes('TrkTx2') && <th>Puerto TX2</th>}
                      {visibleColumns.includes('TrkRx3') && <th>Puerto RX3</th>}
                      {visibleColumns.includes('EquipoTx3') && <th>Equipo TX3</th>}
                      {visibleColumns.includes('TrkTx3') && <th>Puerto TX3</th>}
                      {visibleColumns.includes('TrkRx4') && <th>Puerto RX4</th>}
                      {visibleColumns.includes('EquipoTx4') && <th>Equipo TX4</th>}
                      {visibleColumns.includes('TrkTx4') && <th>Puerto TX4</th>}
                      {visibleColumns.includes('TrkRx5') && <th>Puerto RX5</th>}
                      {visibleColumns.includes('EquipoTx5') && <th>Equipo TX5</th>}
                      {visibleColumns.includes('TrkTx5') && <th>Puerto TX5</th>}
                      {visibleColumns.includes('TrkRx6') && <th>Puerto RX6</th>}
                      {visibleColumns.includes('EquipoTx6') && <th>Equipo TX6</th>}
                      {visibleColumns.includes('TrkTx6') && <th>Puerto TX6</th>}
                      {visibleColumns.includes('TrkRx7') && <th>Puerto RX7</th>}
                      {visibleColumns.includes('EquipoTx7') && <th>Equipo TX7</th>}
                      {visibleColumns.includes('TrkTx7') && <th>Puerto TX7</th>}
                      {visibleColumns.includes('TrkRx8') && <th>Puerto RX8</th>}
                      {visibleColumns.includes('EquipoTx8') && <th>Equipo TX8</th>}
                      {visibleColumns.includes('TrkTx8') && <th>Puerto TX8</th>}
                      {visibleColumns.includes('TrkROU') && <th>Puerto ROU</th>}
                   
                    </tr>
                  </thead>
                  <tbody>
                    {originalData.map((originalItem, idx) => (  
                      <tr key={idx}>
                        {visibleColumns.includes("TrunkDest") && (
                          <td>{originalItem.TrunkDest || ""}</td>
                        )}
                         {visibleColumns.includes('TrkRx1') && <td>{originalItem.TrkRx1 || ""}</td>}
                        {visibleColumns.includes('EquipoTx1') && <td>{originalItem.EquipoTx1 || ""}</td>}
                        {visibleColumns.includes('TrkTx1') && <td>{originalItem.TrkTx1 || ""}</td>}
                        {visibleColumns.includes('TrkRx2') && <td>{originalItem.TrkRx2 || ""}</td>}
                        {visibleColumns.includes('EquipoTx2') && <td>{originalItem.EquipoTx2 || ""}</td>}
                        {visibleColumns.includes('TrkTx2') && <td>{originalItem.TrkTx2 || ""}</td>}
                        {visibleColumns.includes('TrkRx3') && <td>{originalItem.TrkRx3 || ""}</td>}
                        {visibleColumns.includes('EquipoTx3') && <td>{originalItem.EquipoTx3 || ""}</td>}
                        {visibleColumns.includes('TrkTx3') && <td>{originalItem.TrkTx3 || ""}</td>}
                        {visibleColumns.includes('TrkRx4') && <td>{originalItem.TrkRx4 || ""}</td>}
                        {visibleColumns.includes('EquipoTx4') && <td>{originalItem.EquipoTx4 || ""}</td>}
                        {visibleColumns.includes('TrkTx4') && <td>{originalItem.TrkTx4 || ""}</td>}
                        {visibleColumns.includes('TrkRx5') && <td>{originalItem.TrkRx5 || ""}</td>}
                        {visibleColumns.includes('EquipoTx5') && <td>{originalItem.EquipoTx5 || ""}</td>}
                        {visibleColumns.includes('TrkTx5') && <td>{originalItem.TrkTx5 || ""}</td>}
                        {visibleColumns.includes('TrkRx6') && <td>{originalItem.TrkRx6 || ""}</td>}
                        {visibleColumns.includes('EquipoTx6') && <td>{originalItem.EquipoTx6 || ""}</td>}
                        {visibleColumns.includes('TrkTx6') && <td>{originalItem.TrkTx6 || ""}</td>}
                        {visibleColumns.includes('TrkRx7') && <td>{originalItem.TrkRx7 || ""}</td>}
                        {visibleColumns.includes('EquipoTx7') && <td>{originalItem.EquipoTx7 || ""}</td>}
                        {visibleColumns.includes('TrkTx7') && <td>{originalItem.TrkTx7 || ""}</td>}
                        {visibleColumns.includes('Tr kRx8') && <td>{originalItem.TrkRx8 || ""}</td>}
                        {visibleColumns.includes('EquipoTx8') && <td>{originalItem.EquipoTx8 || ""}</td>}
                        {visibleColumns.includes('TrkTx8') && <td>{originalItem.TrkTx8 || ""}</td>}
                        {visibleColumns.includes('TrkROU') && <td>{originalItem.TrkROU || ""}</td>}
                     
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <p>
                  Información adicional de: {item.EquipoDestino || "Sin datos"}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
