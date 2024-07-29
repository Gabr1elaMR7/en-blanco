import React, { useEffect, useRef, useState } from 'react';
import * as go from 'gojs';
import axios from 'axios';

const DiagramComponent = ({ consulta }) => {
  const diagramRef = useRef(null);
  const diagramInstance = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [nodesConection, setNodesConection] = useState([]);

  const equiposDestino = [];
  const equiposROU = [];
  const equipos1Tx = [];
  let nodosConexion = [];

  const conexionesNodos = () => {
    if (equiposDestino.length > 0 && equiposROU.length > 0 && equipos1Tx.length > 0) {
      const cnFrom = equiposDestino[0];

      // Conectar equiposDestino a equipos1Tx
      nodosConexion = equipos1Tx.map((equipoTx) => {
        return { from: cnFrom, to: equipoTx }
      });

      // Conectar equipos1Tx a equiposROU
      equipos1Tx.forEach((equipoTx) => {
        equiposROU.forEach((equipoRou) => {
          nodosConexion.push({ from: equipoTx, to: equipoRou });
        });
      });
    }
    console.log(nodosConexion);
  }

  const estructurar = (topologias = []) => {
    console.log(topologias);
    if (topologias.length > 0) {
      equiposDestino.push(topologias[0].EquipoDestino);
      equiposROU.push(topologias[0].EquipoROU);
      equipos1Tx.push(topologias[0].EquipoTx1);
      topologias.forEach(topologia => {
        if (!equiposDestino.includes(topologia.EquipoDestino)) {
          equiposDestino.push(topologia.EquipoDestino);
        }
        if (!equiposROU.includes(topologia.EquipoROU)) {
          equiposROU.push(topologia.EquipoROU);
        }
        if (!equipos1Tx.includes(topologia.EquipoTx1)){
          equipos1Tx.push(topologia.EquipoTx1);
        }
      });
      console.log(equiposDestino);
      console.log(equiposROU);
      console.log(equipos1Tx);
    }
  }
//logica para puertos, verificar funcionalidad 
  // const linkDataArray = [
  //   { from: 'Products', to: 'Suppliers', text: '0..N', toText: '1' },
  //   { from: 'Products', to: 'Categories', text: '0..N', toText: '1' },
  //   { from: 'Order Details', to: 'Products', text: '0..N', toText: '1' },
  //   { from: 'Categories', to: 'Suppliers', text: '0..N', toText: '1' },
  // ];
  // DiagramComponent.model = new go.GraphLinksModel({
  //   copiesArrays: true,
  //   copiesArrayObjects: true,
  //   nodeDataArray: nodeDataArray,
  //   linkDataArray: linkDataArray,
  // });

  const actualizarGrafica = () => {
    const ObjEquiposDestino = equiposDestino.map((equipo) => {
      return { key: equipo, color: 'lightgreen' }
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, color: 'pink' }
    });
    const ObjEquipos1Tx = equipos1Tx.map((equipo) => {
      return { key: equipo, color: 'lightblue' }
    });

    const nodosTemp = [...ObjEquiposDestino, ...ObjEquiposROU, ...ObjEquipos1Tx];
    setNodes(nodosTemp);
    setNodesConection(nodosConexion);
  }


  ////tomar los datos de la barra de datos y buscarlos en la base de datos 
  useEffect(() => {
    console.log(consulta);

    if (consulta === "") {
      consulta = "";
    }
    // Obtener los nodos desde el backend
    axios.get('http://localhost:5000/topologias', {
      params: { query: consulta }
    })
      .then(response => {
        console.log(response.data);
        estructurar(response.data);
        conexionesNodos();
        actualizarGrafica();
      })
      .catch(error => {
        console.error('There was an error fetching the nodes!', error);
      });
  }, [consulta]);


useEffect(() => {
  if (nodes.length === 0) return;

  const $ = go.GraphObject.make;

  if (diagramInstance.current) {
    diagramInstance.current.div = null;
  }

  //tipo de diagrama
  const myDiagram = $(go.Diagram, diagramRef.current, {
      allowDelete: false,
      allowCopy: false,
      'layout': $(go.TreeLayout, { isInitial: true }),
      'undoManager.isEnabled': true,
    });
  
    //estilo de nodos y texto
  myDiagram.nodeTemplate = $(
    go.Node,
    'Auto',
    {
      row: 1,
      column: 1,
      name: 'BODY',
      stretch: go.Stretch.Fill,
    },
    $(
      go.Shape,
      'RoundedRectangle',
      { strokeWidth: 2 },
      new go.Binding('fill', 'color')
    ),
    $(
      go.TextBlock,
      { margin: 8 , textAlign: 'center', font: '14px ARIAL'},
      new go.Binding('text', 'key')
    )
    );

  // myDiagram.linkTemplate = $(
  //   go.Link,
  //   { routing: go.Link.AvoidsNodes, corner: 10 },
  //   $(
  //     go.Shape,
  //     { strokeWidth: 2, stroke: '#333' }
  //   )
  // );


  ////-----Ejemplo libreria
  myDiagram.linkTemplate = $(go.Link, // the whole link panel
  {
    selectionAdorned: true,
    layerName: 'Background',
    reshapable: true,
    routing: go.Routing.AvoidsNodes,
    corner: 5,
    // curve: go.Curve.JumpOver,
  },
  $(go.Shape, // the link shape
    { stroke: '#ffffff', strokeWidth: 2 },//////color del enlace 
    // new go.ThemeBinding('stroke', 'link')////saltico entre lineas
  ),


  ///puertos de cada nodo-----------
  $(go.TextBlock, // the "from" label
    {
      textAlign: 'center',
      font: 'bold 14px sans-serif',
      stroke: 'black',
      segmentIndex: 0,
      segmentOffset: new go.Point(NaN, NaN),
      segmentOrientation: go.Orientation.Upright,
    },
    new go.Binding('text', 'text'),
    new go.ThemeBinding('stroke', 'text')
  ),
  $(go.TextBlock, // the "to" label
    {
      textAlign: 'center',
      font: 'bold 14px sans-serif',
      stroke: 'black',
      segmentIndex: -1,
      segmentOffset: new go.Point(NaN, NaN),
      segmentOrientation: go.Orientation.Upright,
    },
    new go.Binding('text', 'toText'),
    new go.ThemeBinding('stroke', 'text')
  )//--------------
);//-----------------
  
  myDiagram.model = new go.GraphLinksModel(
    nodes,
    nodesConection
  );

  diagramInstance.current = myDiagram;

  return () => {
    myDiagram.div = null;
  };
}, [nodes, nodesConection]);


return     <div
ref={diagramRef}
style={{
  width: '100%',
  height: '350px',
  border: '1px solid black',
  backgroundColor: 'rgb(17, 24, 39)',
}}
></div>
};

export default DiagramComponent;