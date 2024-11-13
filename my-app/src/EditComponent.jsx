import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/EditComponent.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const EditComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTechnology, setSearchTechnology] = useState("FTTO");
  const [editingData, setEditingData] = useState([]);

  const [topologiaCreada, setTopologiaCreada] = useState(false); // Nuevo estado para el mensaje

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://172.31.33.33:5000/topologias", {
        params: { query: searchQuery, tecnologia: searchTechnology },
      });

      setEditingData(response.data); // Aquí se guarda el array completo de resultados
    } catch (error) {
      console.error("Error al buscar los datos:", error);
    }
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://172.31.33.33:5000/topologias/${id}`,
        updatedData
      );
      console.log("Datos actualizados correctamente:", response.data);
      setTopologiaCreada(true); // Se establece en true al guardar correctamente
      alert("La topología se Actualizo exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setTopologiaCreada(false); // En caso de error, se asegura de no mostrar el mensaje de éxito
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este elemento?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://172.31.33.33:5000/topologias/${id}`);
        setEditingData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
        alert("Elemento eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el elemento:", error);
        alert("Hubo un error al eliminar el elemento.");
      }
    }
  };

  const handleCopyData = (item) => {
    // Concatenate form data into a string
    const dataToCopy = [
      item.IpEquipoDestino,
      item.EquipoDestino,
      item.UbicacionEquipoDestino,
      "", // TrunkDest (empty field)
      "", // TrkROU (empty field)
      item.EquipoROU, // EquipoROU (empty field)
      item.UbicacionEquipoROU,
      item.IpEquipoROU,
      "", // TrkROU (empty field)
      "", // TrkRx1 (empty field)
      item.EquipoTx1,
      "", // TrkTx1 (empty field)
      "", // TrkRx2 (empty field)
      item.EquipoTx2,
      "", // TrkTx2 (empty field)
      "", // TrkRx3 (empty field)
      item.EquipoTx3,
      "", // TrkTx3 (empty field)
      "", // TrkRx4 (empty field)
      item.EquipoTx4,
      "", // TrkTx4 (empty field)
      "", // TrkRx5 (empty field)
      item.EquipoTx5,
      "", // TrkTx5 (empty field)
    ];

    return dataToCopy; // Devuelve el texto a copiar
  };

  return (
    <main>
      <div className={styles.contenedorEncabezadoEditar}>
        <h1>EDITAR TOPOLOGÍA</h1>
        <p className={styles.ingreseOlt}>
          Ingrese el nombre del Equipo a buscar y la tecnología
        </p>
        <input
          className={styles.inputBusquedaEditar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ingrese el equipo"
        />

        <select
          id="tecnologia"
          className={styles.selectBusquedaEditar}
          value={searchTechnology}
          onChange={(e) => setSearchTechnology(e.target.value)}
        >
          <option value="CMTS">CMTS</option>
          <option value="FTTH">FTTH</option>
          <option value="FTTO">FTTO</option>
        </select>
        <button className={styles.botonBuscarEditar} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Mensaje de éxito */}
      {topologiaCreada && (
        <div className={styles.cuadroExito}>
          La topología se edito exitosamente.
        </div>
      )}

      {/* Renderiza un formulario por cada resultado */}
      {editingData.map((item, index) => (
        <div key={item._id} className={styles.formContainer}>
          <form className={styles.formularioEditar}>
            <svg
              className={styles.borrarBoton}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              onClick={() => handleDelete(item._id)}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>

            <br></br>
            <label>IP OLT/CMTS:</label>
            <input
              type="text"
              value={item.IpEquipoDestino || ""}
              onChange={(e) => {
                const updated = { ...item, IpEquipoDestino: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OLT/CMTS(*)</label>
            <input
              type="text"
              value={item.EquipoDestino || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoDestino: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>UBICACIÓN OLT/CMTS</label>
            <input
              type="text"
              value={item.UbicacionEquipoDestino || ""}
              onChange={(e) => {
                const updated = {
                  ...item,
                  UbicacionEquipoDestino: e.target.value,
                };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>PUERTO OLT/CMTS(*)</label>
            <input
              type="text"
              value={item.TrunkDest || ""}
              onChange={(e) => {
                const updated = { ...item, TrunkDest: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>PUERTO DESTINO(*)</label>
            <input
              type="text"
              value={item.TrkROU || ""}
              onChange={(e) => {
                const updated = { ...item, TrkROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO DESTINO(*)</label>
            <input
              type="text"
              value={item.EquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>UBICACIÓN EQUIPO DESTINO</label>
            <input
              type="text"
              value={item.UbicacionEquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, UbicacionEquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IP EQUIPO DESTINO</label>
            <input
              type="text"
              value={item.IpEquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, IpEquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>TECNOLOGÍA(*)</label>
            <select
              value={item.Tecnologia || ""}
              onChange={(e) => {
                const updated = { ...item, Tecnologia: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            >
              <option value="FTTO">FTTO</option>
              <option value="FTTH">FTTH</option>
              <option value="CMTS">CMTS</option>
            </select>

            <label>IN EQUIPO TX1</label>
            <input
              type="text"
              value={item.TrkRx1 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX1</label>
            <input
              type="text"
              value={item.EquipoTx1 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX1</label>
            <input
              type="text"
              value={item.TrkTx1 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX2</label>
            <input
              type="text"
              value={item.TrkRx2 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX2</label>
            <input
              type="text"
              value={item.EquipoTx2 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX2</label>
            <input
              type="text"
              value={item.TrkTx2 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX3</label>
            <input
              type="text"
              value={item.TrkRx3 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX3</label>
            <input
              type="text"
              value={item.EquipoTx3 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX3</label>
            <input
              type="text"
              value={item.TrkTx3 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX4</label>
            <input
              type="text"
              value={item.TrkRx4 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX4</label>
            <input
              type="text"
              value={item.EquipoTx4 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX4</label>
            <input
              type="text"
              value={item.TrkTx4 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX5</label>
            <input
              type="text"
              value={item.TrkRx5 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX5</label>
            <input
              type="text"
              value={item.EquipoTx5 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX5</label>
            <input
              type="text"
              value={item.TrkTx5 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <button
              type="button"
              className={styles.botonguardarEditar}
              onClick={() =>
                handleSave(item._id, {
                  IpEquipoDestino: item.IpEquipoDestino,
                  EquipoDestino: item.EquipoDestino,
                  UbicacionEquipoDestino: item.UbicacionEquipoDestino,
                  TrunkDest: item.TrunkDest,
                  Tecnologia: item.Tecnologia,
                  TrkRx1: item.TrkRx1,
                  EquipoTx1: item.EquipoTx1,
                  TrkTx1: item.TrkTx1,
                  TrkRx2: item.TrkRx2,
                  EquipoTx2: item.EquipoTx2,
                  TrkTx2: item.TrkTx2,
                  TrkRx3: item.TrkRx3,
                  EquipoTx3: item.EquipoTx3,
                  TrkTx3: item.TrkTx3,
                  TrkRx4: item.TrkRx4,
                  EquipoTx4: item.EquipoTx4,
                  TrkTx4: item.TrkTx4,
                  TrkRx5: item.TrkRx5,
                  EquipoTx5: item.EquipoTx5,
                  TrkTx5: item.TrkTx5,
                  TrkROU: item.TrkROU,
                  EquipoROU: item.EquipoROU,
                  UbicacionEquipoROU: item.UbicacionEquipoROU,
                  IpEquipoROU: item.IpEquipoROU,
                })
              }
            >
              Guardar
            </button>
            {index === editingData.length - 1 && (
              <CopyToClipboard
                text={handleCopyData(item)}
                onCopy={() => alert("Datos copiados al portapapeles")}
              >
                <button type="button" className={styles.botonPortapelesEditar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-clipboard2-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                    <path d="M3.5 1h.585A1.5 1.5 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5q-.001-.264-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1" />
                  </svg>
                </button>
              </CopyToClipboard>
            )}
          </form>
        </div>
      ))}
    </main>
  );
};

export default EditComponent;
