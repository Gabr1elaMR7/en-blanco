//crear una nueva topologia

import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/CrearComponent.module.css";
import "./Estilos/estilosGlobales.css";

function CrearComponent() {
  const [ipEquipoDestino, setIpEquipoDestino] = useState("");
  const [equipoDestino, setEquipoDestino] = useState("");
  const [ubicacionEquipoDestino, setUbicacionEquipoDestino] = useState("");
  const [trunkDest, setTrunkDest] = useState("");
  const [tecnologia, setTecnologia] = useState(" ");
  const [trkROU, setTrkROU] = useState("");
  const [equipoROU, setEquipoROU] = useState("");
  const [ubicacionEquipoROU, setUbicacionEquipoROU] = useState("");
  const [ipEquipoROU, setIpEquipoROU] = useState("");
  const [trkRx1, setTrkRx1] = useState("");
  const [equipoTx1, setEquipoTx1] = useState("");
  const [trkTx1, setTrkTx1] = useState("");
  const [trkRx2, setTrkRx2] = useState("");
  const [equipoTx2, setEquipoTx2] = useState("");
  const [trkTx2, setTrkTx2] = useState("");
  const [trkRx3, setTrkRx3] = useState("");
  const [equipoTx3, setEquipoTx3] = useState("");
  const [trkTx3, setTrkTx3] = useState("");
  const [trkRx4, setTrkRx4] = useState("");
  const [equipoTx4, setEquipoTx4] = useState("");
  const [trkTx4, setTrkTx4] = useState("");
  const [trkRx5, setTrkRx5] = useState("");
  const [equipoTx5, setEquipoTx5] = useState("");
  const [trkTx5, setTrkTx5] = useState("");
  const [trkRx6, setTrkRx6] = useState("");
  const [equipoTx6, setEquipoTx6] = useState("");
  const [trkTx6, setTrkTx6] = useState("");
  const [clipboardContent, setClipboardContent] = useState(""); // Estado para almacenar el contenido del portapapeles
  const [inputText, setInputText] = useState("");
  const [showInputDiv, setShowInputDiv] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleToggleAdditionalFields = () => {
    setShowAdditionalFields((prev) => !prev);
  };

  // Función para manejar el paste desde un campo de entrada oculto
  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que se envíe el formulario

      const values = inputText.split(",");
      if (values.length >= 24) {
        setIpEquipoDestino(values[0] || "");
        setEquipoDestino(values[1] || "");
        setUbicacionEquipoDestino(values[2] || "");
        setTrunkDest(values[3] || "");
        setTecnologia(values[4] || "");
        setTrkROU(values[3] || "");
        setEquipoROU(values[5] || "");
        setUbicacionEquipoROU(values[6] || "");
        setIpEquipoROU(values[7] || "");
        setTrkRx1(values[9] || "");
        setEquipoTx1(values[10] || "");
        setTrkTx1(values[11] || "");
        setTrkRx2(values[12] || "");
        setEquipoTx2(values[13] || "");
        setTrkTx2(values[14] || "");
        setTrkRx3(values[15] || "");
        setEquipoTx3(values[16] || "");
        setTrkTx3(values[17] || "");
        setTrkRx4(values[18] || "");
        setEquipoTx4(values[19] || "");
        setTrkTx4(values[20] || "");
        setTrkRx5(values[21] || "");
        setEquipoTx5(values[22] || "");
        setTrkTx5(values[23] || "");
        setTrkRx6(values[24] || "");
        setEquipoTx6(values[25] || "");
        setTrkTx6(values[26] || "");

        alert("Datos asignados correctamente.");
      } else {
        alert(
          "El contenido ingresado no tiene el formato esperado o faltan valores."
        );
      }
    }
  };

  const handleShowInputDiv = () => {
    setShowInputDiv((prevShow) => !prevShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tecnologia.trim() === "") {
      alert("Por favor llene el campo Obligatorio Tecnología");
      return; // No continúa con la creación de la topología
    }

    // Solo agregar campos que no estén vacíos
    const newTopologia = {};

    // Función para agregar campos no vacíos
    const addIfNotEmpty = (fieldName, value) => {
      if (value.trim() !== "") {
        newTopologia[fieldName] = value;
      }
    };

    // Campos obligatorios
    addIfNotEmpty("IpEquipoDestino", ipEquipoDestino);
    addIfNotEmpty("EquipoDestino", equipoDestino);
    addIfNotEmpty("UbicacionEquipoDestino", ubicacionEquipoDestino);
    addIfNotEmpty("TrunkDest", trunkDest);
    newTopologia.Tecnologia = tecnologia; // Tecnología es obligatorio
    addIfNotEmpty("TrkROU", trkROU);
    addIfNotEmpty("EquipoROU", equipoROU);
    addIfNotEmpty("UbicacionEquipoROU", ubicacionEquipoROU);
    addIfNotEmpty("IpEquipoROU", ipEquipoROU);

    // Nuevos campos opcionales
    addIfNotEmpty("TrkRx1", trkRx1);
    addIfNotEmpty("EquipoTx1", equipoTx1);
    addIfNotEmpty("TrkTx1", trkTx1);
    addIfNotEmpty("TrkRx2", trkRx2);
    addIfNotEmpty("EquipoTx2", equipoTx2);
    addIfNotEmpty("TrkTx2", trkTx2);
    addIfNotEmpty("TrkRx3", trkRx3);
    addIfNotEmpty("EquipoTx3", equipoTx3);
    addIfNotEmpty("TrkTx3", trkTx3);
    addIfNotEmpty("TrkRx4", trkRx4);
    addIfNotEmpty("EquipoTx4", equipoTx4);
    addIfNotEmpty("TrkTx4", trkTx4);
    addIfNotEmpty("TrkRx5", trkRx5);
    addIfNotEmpty("EquipoTx5", equipoTx5);
    addIfNotEmpty("TrkTx5", trkTx5);
    addIfNotEmpty("TrkRx6", trkRx6);
    addIfNotEmpty("EquipoTx6", equipoTx6);
    addIfNotEmpty("TrkTx6", trkTx6);

    try {
      // Verifica si ya existe una topología similar en la base de datos
      const existingResponse = await axios.get(
        "http://172.31.33.33:5000/topologias",
        {
          params: newTopologia,
        }
      );

      if (existingResponse.data && existingResponse.data.length > 0) {
        alert(
          "Una topología con estos datos ya existe en la base de datos. Por favor, verifique los campos."
        );
        return;
      }

      // Si no existe, crea la nueva topología
      await axios.post("http://172.31.33.33:5000/topologias", newTopologia);
      alert("¡Topología creada con éxito!");
    } catch (error) {
      console.error("Error al crear la topología:", error);

      if (error.response && error.response.status === 400) {
        alert("Existen campos obligatorios vacios");
      } else {
        // Error genérico
        alert("Error al crear la topología. Intente nuevamente.");
      }

      // Manejar un error específico de "conflicto" (por ejemplo, código 409)
      if (error.response && error.response.status === 409) {
        alert(
          "Una topología con estos datos ya existe en la base de datos. Por favor, verifique los campos."
        );
      } else {
        // Error genérico
        alert("Error al crear la topología. Intente nuevamente.");
      }
    }
  };

  return (
    <main>
      <div className={styles.contenedorDescripcion}>
        <h1>REGISTRAR NUEVA TOPOLOGÍA</h1>
        <p>
          Por favor llene todos los campos marcados con "*" ya que son
          obligatorios.
        </p>
        <div>
          <button onClick={handleShowInputDiv}>
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
          </button>{" "}
          {showInputDiv && ( // Condicional para mostrar el div solo si showInputDiv es true
            <div>
              <label htmlFor="inputText">
                Ingrese los datos (separados por comas) y presione Enter:
              </label>

              <input
                type="text"
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleInputEnter}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <form className={styles.crearFormulario} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ipEquipoDestino">IP OLT/CMTS</label>
            <input
              type="text"
              id="ipEquipoDestino"
              value={ipEquipoDestino}
              onChange={(e) => setIpEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoDestino">OLT/CMTS(*)</label>
            <input
              type="text"
              id="equipoDestino"
              value={equipoDestino}
              onChange={(e) => setEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoDestino">UBICACIÓN OLT/CMTS</label>
            <input
              type="text"
              id="ubicacionEquipoDestino"
              value={ubicacionEquipoDestino}
              onChange={(e) => setUbicacionEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trunkDest">PUERTO OLT/CMTS(*)</label>
            <input
              type="text"
              id="trunkDest"
              value={trunkDest}
              onChange={(e) => setTrunkDest(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkROU">PUERTO DESTINO(*)</label>
            <input
              type="text"
              id="trkROU"
              value={trkROU}
              onChange={(e) => setTrkROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoROU">EQUIPO DESTINO(*)</label>
            <input
              type="text"
              id="equipoROU"
              value={equipoROU}
              onChange={(e) => setEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoROU">UBICACIÓN EQUIPO DESTINO</label>
            <input
              type="text"
              id="ubicacionEquipoROU"
              value={ubicacionEquipoROU}
              onChange={(e) => setUbicacionEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ipEquipoROU">IP EQUIPO DESTINO</label>
            <input
              type="text"
              id="ipEquipoROU"
              value={ipEquipoROU}
              onChange={(e) => setIpEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tecnologia">TECNOLOGÍA(*)</label>
            <select
              className={styles.tecCrear}
              id="tecnologia"
              value={tecnologia}
              onChange={(e) => setTecnologia(e.target.value)}
            >
              <option value=" "> </option>
              <option value="CMTS">CMTS</option>
              <option value="FTTH">FTTH</option>
              <option value="FTTO">FTTO</option>
            </select>
          </div>

          {/* Nuevos campos opcionales visibles solo si `showAdditionalFields` es true */}
          {showAdditionalFields && (
            <>
              <div>
                <label htmlFor="trkRx1">IN EQUIPO TX1</label>
                <input
                  type="text"
                  id="trkRx1"
                  value={trkRx1}
                  onChange={(e) => setTrkRx1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx1">EQUIPO TX1</label>
                <input
                  type="text"
                  id="equipoTx1"
                  value={equipoTx1}
                  onChange={(e) => setEquipoTx1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx1">OUT EQUIPO TX1</label>
                <input
                  type="text"
                  id="trkTx1"
                  value={trkTx1}
                  onChange={(e) => setTrkTx1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkRx2">IN EQUIPO TX2</label>
                <input
                  type="text"
                  id="trkRx2"
                  value={trkRx2}
                  onChange={(e) => setTrkRx2(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx2">EQUIPO TX2</label>
                <input
                  type="text"
                  id="equipoTx2"
                  value={equipoTx2}
                  onChange={(e) => setEquipoTx2(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx2">OUT EQUIPO TX2</label>
                <input
                  type="text"
                  id="trkTx2"
                  value={trkTx2}
                  onChange={(e) => setTrkTx2(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkRx3">IN EQUIPO TX3</label>
                <input
                  type="text"
                  id="trkRx3"
                  value={trkRx3}
                  onChange={(e) => setTrkRx3(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx3">EQUIPO TX3</label>
                <input
                  type="text"
                  id="equipoTx3"
                  value={equipoTx3}
                  onChange={(e) => setEquipoTx3(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx3">OUT EQUIPO TX3</label>
                <input
                  type="text"
                  id="trkTx3"
                  value={trkTx3}
                  onChange={(e) => setTrkTx3(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkRx4">IN EQUIPO TX4</label>
                <input
                  type="text"
                  id="trkRx4"
                  value={trkRx4}
                  onChange={(e) => setTrkRx4(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx4">EQUIPO TX4</label>
                <input
                  type="text"
                  id="equipoTx4"
                  value={equipoTx4}
                  onChange={(e) => setEquipoTx4(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx4">OUT EQUIPO TX4</label>
                <input
                  type="text"
                  id="trkTx4"
                  value={trkTx4}
                  onChange={(e) => setTrkTx4(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkRx5">IN EQUIPO TX5</label>
                <input
                  type="text"
                  id="trkRx5"
                  value={trkRx5}
                  onChange={(e) => setTrkRx5(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx5">EQUIPO TX5</label>
                <input
                  type="text"
                  id="equipoTx5"
                  value={equipoTx5}
                  onChange={(e) => setEquipoTx5(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx5">OUT EQUIPO TX5</label>
                <input
                  type="text"
                  id="trkTx5"
                  value={trkTx5}
                  onChange={(e) => setTrkTx5(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="trkRx6">IN EQUIPO TX6</label>
                <input
                  type="text"
                  id="trkRx6"
                  value={trkRx6}
                  onChange={(e) => setTrkRx6(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="equipoTx6">EQUIPO TX6</label>
                <input
                  type="text"
                  id="equipoTx6"
                  value={equipoTx6}
                  onChange={(e) => setEquipoTx6(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trkTx6">OUT EQUIPO TX6</label>
                <input
                  type="text"
                  id="trkTx6"
                  value={trkTx6}
                  onChange={(e) => setTrkTx6(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor=""> </label>
          </div>

          <button className={styles.botonCrear} type="submit">
            Crear Topología
          </button>
          <button
            type="button"
            onClick={handleToggleAdditionalFields}
            className={styles.botonExpandirCrear}
          >
            {showAdditionalFields ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            )}
          </button>
          <textarea
            style={{ display: "none" }}
            value={clipboardContent}
            onChange={(e) => setClipboardContent(e.target.value)}
            onPaste={(e) => {
              const pastedContent = e.clipboardData.getData("text");
              setClipboardContent(pastedContent);
            }}
          />
        </form>
      </div>
    </main>
  );
}

export default CrearComponent;
