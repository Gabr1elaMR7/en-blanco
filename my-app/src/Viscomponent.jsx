import { Network } from "vis-network";
import "./Estilos/Viscomponent.css";
import { useEffect, useState } from "react";
import { getTopologias } from "./services/apiService";
import { crearMatriz } from "./helpers/matrizDataVis";
import html2canvas from "html2canvas";



export const Viscomponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);
  const [matrizDataVis, setMatrizDataVis] = useState([]);
  

  const getData = async () => {
    try {
      const datos = await getTopologias(query, tecnologia);
      setData(datos);
      const visMatriz = crearMatriz(datos);
      setMatrizDataVis(visMatriz);
    } catch (err) {
      console.log("Error al obtener los datos:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [query, tecnologia]);

  useEffect(() => {
    if (matrizDataVis.length > 0) {
      const container = document.getElementById("network");

      const options = {
        autoResize: true,
        height: "100%",
        width: "100%",
        physics: {
          enabled: true,
          forceAtlas2Based: {
            gravitationalConstant: -400, // Ajusta la intensidad de repulsión
            centralGravity: 0.005,
            springLength: 100, // Distancia preferida entre los nodos conectados
            springConstant: 0.08,
          },
          maxVelocity: 50,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: { iterations: 150 },
        },
        layout: {
          randomSeed: 0,
          improvedLayout: false,
        },
        nodes: {
          borderWidth: 7,
          borderWidthSelected: 1,
          shape: "dot",
          color: {
            border: "#0d1b2a",
            background: "#c1121f",  
          },
          font: {
            size: 10,
            color: "c1121f",

          },
        },
        edges: {
          arrows: {
            to: {
              type: "arrow",
              enabled: true,
              scaleFactor: 0.3,
            },
          },
          font: {
            size: 10,
            color: "#c1121f",
          },
        },
      };
      
      

      var nodes = [];
      var nodeIds = {};
      let nodeIdCounter = 1;
      let firstNodeId = null;
      let lastNodeId = null;

      matrizDataVis.forEach((row, index) => {
        // Verifica el primer nodo
        if (!nodeIds[row[0]]) {
          const isException = ["FOL"].some((keyword) =>
            row[0].toUpperCase().includes(keyword)
          );
          nodeIds[row[0]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[0]],
            label: row[0],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[0]),
            color: isException
              ? { background: "black", border: "white" }
              : undefined,
            font: {
              color: "black",
              align: isException ? "center" : "top",
            },
          });
          if (index === 0) {
            firstNodeId = nodeIds[row[0]]; // Establece el primer nodo
          }
        }

        // Verifica el último nodo

        if (row[3] && !nodeIds[row[3]]) {
          const isException = ["FOL"].some((keyword) =>
            row[3].toUpperCase().includes(keyword)
          );

          // Condición para verificar si el nodo contiene BNG, NGW o THBH
          const shouldFixNode = ["BNG", "NGW", "THBH","A9K"].some((keyword) =>
            row[3].toUpperCase().includes(keyword)
          );

          nodeIds[row[3]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[3]],
            label: row[3],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[3]),
            fixed: shouldFixNode, // Se fija solo si cumple con las palabras clave
          });

          // Si se cumple la condición de ser el último nodo
          if (shouldFixNode) {
            lastNodeId = nodeIds[row[3]]; // Establece el último nodo solo si contiene BNG, NGW o THBH
          }
        }
      });

      // Supongamos que tienes un array `data` y otro `nodes`
      let totalLinkLength = 0;
      data.forEach((item) => {
        // Ajusta el cálculo de la longitud del enlace según sea necesario
        let linkLength = item.length || 100; // Valor predeterminado si 'length' no está definido
        totalLinkLength += linkLength;
      });

      // Especifica una distancia que quieres aplicar entre nodos
      const distanceBetweenNodes = 180; // Cambia este valor según tu necesidad
      const nodeSpacing = nodes.length * distanceBetweenNodes;

      // Reposiciona los nodos
      nodes = nodes.map((node) => {
        if (node.id === firstNodeId) {
          return { ...node, fixed: true, x: 0, y: 0,size: 30 };
        }
        if (node.id === lastNodeId && node.fixed) { // Solo si el nodo es fijo
          return { ...node, x: nodeSpacing, y: 0,size: 30 };
        }
        return node;
      });
      

      var minRoundness = 0.1; // Valor mínimo de roundness
      var maxRoundness = 0.8; // Valor máximo de roundness

      var edges = matrizDataVis
        .map((row, index) => {
          if (row[3]) {
            var fromNode = nodeIds[row[0]];
            var toNode = nodeIds[row[3]];
            var salPort = row[1];
            var llegPort = row[2];
            var path = `${salPort} → ${llegPort}`;

            // Calcular roundness basado en el índice
            var roundness =
              minRoundness +
              (maxRoundness - minRoundness) *
                (index / (matrizDataVis.length - 1));

            return {
              from: fromNode,
              to: toNode,
              label: path,
              font: {
                align: "bottom",
                color: "#6a040f",
                size: 10,
                strokeColor: "#e0e1dd",
              },
              smooth: {
                type: "curvedCW",
                roundness: roundness,
              },
            };
          }
          return null;
        })
        .filter((edge) => edge !== null);

      const networkData = {
        nodes: nodes,
        edges: edges,
      };
      new Network(container, networkData, options);
    }
  }, [matrizDataVis]);

  function gimag(label) {
    if (!label) {
      return;
    }
    const upperLabel = label.toUpperCase();
    switch (true) {
      case upperLabel.includes("ZAC"):
        return "/imagenes/zte.png";
      case upperLabel.includes("HAC"):
        return "/imagenes/huawei.png";
      case upperLabel.includes("NAC"):
        return "/imagenes/nokia.png";
      case upperLabel.includes("NGW"):
        return "/imagenes/alcatel.jpg";
      case upperLabel.includes("AAG"):
        return "/imagenes/AAG.png";
      case upperLabel.includes("THBH"):
        return "/imagenes/thbh (1).png";
      case upperLabel.includes("A9K","BNG"):
        return "/imagenes/A9K.png"; // No image for exceptions
   

      case ["FOL", "ODF", "CAJA", "RACK"].some((keyword) =>
        upperLabel.includes(keyword)
      ):

      case upperLabel.includes("IPRAN"):
        return "/imagenes/ipran.jfif"; // No image for exceptions
      default:
        return "/imagenes/OLT 2.png";
    }
  }

  return (
    <div
      id="network"
      style={{
        width: "100%",
        minHeight: "400px",
        border: "1px solid lightgray", // Borde gris suave
        borderRadius: "10px", // Opcional, redondear las esquinas
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto", // Centrar en pantalla
      }}
    ></div>
  );
};
