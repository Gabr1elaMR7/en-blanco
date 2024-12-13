// app.js backend
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Topologia = require("./models/topologia");
const Usuario = require("./models/usuario");
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

///middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://172.31.33.33:27017/Claro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//////////////////////////////////////////CRUD TOPOLOGIAS Y DIAGRAMA//////////////////////////////////////////////
app.get("/topologias", async (req, res) => {
  let { query, tecnologia } = req.query;
  let filter = {};
  if (query) {
    // Si query tiene más de 10 caracteres, usamos una expresión regular
    if (query.length > 12) {
      query = new RegExp(query, "i");
    }
    filter.EquipoDestino = query;
  }

  if (tecnologia) {
    tecnologia = new RegExp(tecnologia, "i");
  }

  try {
    const nodes = await Topologia.find({
      EquipoDestino: query,
      Tecnologia: tecnologia,
    });

    res.json(nodes);
  } catch (error) {
    console.error("Error al obtener los nodos:", error);
    res.status(500).json({ error: "Error al obtener los nodos" });
  }
});

app.post("/topologias", async (req, res) => {
  const {
    IpEquipoDestino,
    EquipoDestino,
    UbicacionEquipoDestino,
    TrunkDest,
    Tecnologia,
    TrkRx1,
    EquipoTx1,
    TrkTx1,
    TrkRx2,
    EquipoTx2,
    TrkTx2,
    TrkRx3,
    EquipoTx3,
    TrkTx3,
    TrkRx4,
    EquipoTx4,
    TrkTx4,
    TrkRx5,
    EquipoTx5,
    TrkTx5,
    TrkRx6,
    EquipoTx6,
    TrkTx6,
    TrkRx7,
    EquipoTx7,
    TrkTx7,
    TrkRx8,
    EquipoTx8,
    TrkTx8,
    TrkROU,
    EquipoROU,
    UbicacionEquipoROU,
    IpEquipoROU,
  } = req.body;

  // Validación de campos requeridos
  if (!EquipoDestino || !TrunkDest ||! TrkROU || !Tecnologia || !EquipoROU) {
    return res.status(400).json({ error: "Por favor, completa todos los campos requeridos." });
  }

  try {
    // Verifica si ya existe un documento con estos campos
    const existeTopologia = await Topologia.findOne({
      IpEquipoDestino,
      EquipoDestino,
      UbicacionEquipoDestino,
      TrunkDest,
      Tecnologia,
      TrkRx1,
      EquipoTx1,
      TrkTx1,
      TrkRx2,
      EquipoTx2,
      TrkTx2,
      TrkRx3,
      EquipoTx3,
      TrkTx3,
      TrkRx4,
      EquipoTx4,
      TrkTx4,
      TrkRx5,
      EquipoTx5,
      TrkTx5,
      TrkRx6,
      EquipoTx6,
      TrkTx6,
      TrkRx7,
      EquipoTx7,
      TrkTx7,
      TrkRx8,
      EquipoTx8,
      TrkTx8,
      TrkROU,
      EquipoROU,
      UbicacionEquipoROU,
      IpEquipoROU,
    });

    if (existeTopologia) {
      return res.status(409).json({ error: "La topología ya existe con estos mismos valores." });
    }

    const nuevaTopologia = new Topologia({
      IpEquipoDestino,
      EquipoDestino,
      UbicacionEquipoDestino,
      TrunkDest,
      Tecnologia,
      TrkRx1,
      EquipoTx1,
      TrkTx1,
      TrkRx2,
      EquipoTx2,
      TrkTx2,
      TrkRx3,
      EquipoTx3,
      TrkTx3,
      TrkRx4,
      EquipoTx4,
      TrkTx4,
      TrkRx5,
      EquipoTx5,
      TrkTx5,
      TrkRx6,
      EquipoTx6,
      TrkTx6,
      TrkRx7,
      EquipoTx7,
      TrkTx7,
      TrkRx8,
      EquipoTx8,
      TrkTx8,
      TrkROU,
      EquipoROU,
      UbicacionEquipoROU,
      IpEquipoROU,
    });

    await nuevaTopologia.save();
    res.status(201).json({ message: "Topología creada con éxito!" });
  } catch (error) {
    console.error("Error al crear la topologia:", error);
    res.status(500).json({ error: "Topología ya existente en la base de datos" });
  }
});


app.put("/topologias/:id", async (req, res) => {
  const { id } = req.params;
  const {
    IpEquipoDestino,
    EquipoDestino,
    UbicacionEquipoDestino,
    TrunkDest,
    Tecnologia,
    TrkRx1,
    EquipoTx1,
    TrkTx1,
    TrkRx2,
    EquipoTx2,
    TrkTx2,
    TrkRx3,
    EquipoTx3,
    TrkTx3,
    TrkRx4,
    EquipoTx4,
    TrkTx4,
    TrkRx5,
    EquipoTx5,
    TrkTx5,
    TrkRx6,
    EquipoTx6,
    TrkTx6,
    TrkRx7,
    EquipoTx7,
    TrkTx7,
    TrkRx8,
    EquipoTx8,
    TrkTx8,
    TrkROU,
    EquipoROU,
    UbicacionEquipoROU,
    IpEquipoROU,
  } = req.body;

  try {
    // Verifica si ya existe otro documento con estos campos y un id diferente
    const existeTopologia = await Topologia.findOne({
      _id: { $ne: id }, // Excluye el documento actual
      IpEquipoDestino,
      EquipoDestino,
      UbicacionEquipoDestino,
      TrunkDest,
      Tecnologia,
      TrkRx1,
      EquipoTx1,
      TrkTx1,
      TrkRx2,
      EquipoTx2,
      TrkTx2,
      TrkRx3,
      EquipoTx3,
      TrkTx3,
      TrkRx4,
      EquipoTx4,
      TrkTx4,
      TrkRx5,
      EquipoTx5,
      TrkTx5,
      TrkRx6,
      EquipoTx6,
      TrkTx6,
      TrkRx7,
      EquipoTx7,
      TrkTx7,
      TrkRx8,
      EquipoTx8,
      TrkTx8,
      TrkROU,
      EquipoROU,
      UbicacionEquipoROU,
      IpEquipoROU,
    });

    if (existeTopologia) {
      return res.status(409).json({ error: "Ya existe otra topología con estos mismos valores." });
    }

    const updatedNode = await Topologia.findByIdAndUpdate(
      id,
      {
        IpEquipoDestino,
        EquipoDestino,
        UbicacionEquipoDestino,
        TrunkDest,
        Tecnologia,
        TrkRx1,
        EquipoTx1,
        TrkTx1,
        TrkRx2,
        EquipoTx2,
        TrkTx2,
        TrkRx3,
        EquipoTx3,
        TrkTx3,
        TrkRx4,
        EquipoTx4,
        TrkTx4,
        TrkRx5,
        EquipoTx5,
        TrkTx5,
        TrkRx6,
        EquipoTx6,
        TrkTx6,
        TrkRx7,
        EquipoTx7,
        TrkTx7,
        TrkRx8,
        EquipoTx8,
        TrkTx8,
        TrkROU,
        EquipoROU,
        UbicacionEquipoROU,
        IpEquipoROU,
      },
      { new: true, runValidators: true }
    );

    if (!updatedNode) {
      return res.status(404).json({ error: "Nodo no encontrado" });
    }

    res.json(updatedNode);
  } catch (error) {
    console.error("Error al actualizar el nodo:", error);
    res.status(500).json({ error: "Error al actualizar el nodo" });
  }
});

app.delete("/topologias/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNode = await Topologia.findByIdAndDelete(id);

    if (!deletedNode) {
      return res.status(404).json({ error: "Topología no encontrada" });
    }

    res.json({ message: "Topología eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la topología:", error);
    res.status(500).json({ error: "Error al eliminar la topología" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////USUARIOS///////////////////////////////////////////////////////////

app.post("/usuarios", async (req, res) => {
  const { usser, Password, Rol } = req.body;

  try {
    let usuarioEncontrado = await Usuario.findOne({ usser });
   

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario incorrecto" });
    }

    const esValida = await bcrypt.compare(Password, usuarioEncontrado.Password);

    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrectos" });
    }

    res.status(200).json({ mensaje: "Usuario OK",Rol: usuarioEncontrado.Rol });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "NombreUsuario usser Rol"); // Solo devolver los campos necesarios
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.post("/usuarios/nuevo", async (req, res) => {
  const { NombreUsuario, usser, Rol, Password } = req.body;

  try {
    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Crea un nuevo usuario con todos los campos
    const nuevoUsuario = new Usuario({
      NombreUsuario,
      usser,
      Rol,
      Password: hashedPassword, 
    });

    // Guarda el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario); // Envía el nuevo usuario como respuesta
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});

// Solicitud para obtener un archivo JSON de toda la colección `Topologias`
app.get("/topologias/download", async (req, res) => {
  try {
    const nodes = await Topologia.find(); // Obtén todos los documentos de la colección

    // Configura el encabezado para descargar como un archivo JSON
    res.setHeader("Content-Disposition", "attachment; filename=topologias.json");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(nodes); // Envía el JSON como respuesta
  } catch (error) {
    console.error("Error al descargar los nodos:", error);
    res.status(500).json({ error: "Error al descargar los nodos" });
  }
});

app.get('/conexiones_rphy', (req, res) => {
  db.query('SELECT * FROM conexiones_rphy', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});


app.get('/datos_cre_daas', (req, res) => {
  const { query } = req.query;

  let sqlQuery = 'SELECT * FROM datos_cre_daas';
  if (query) {
    // Filtra la consulta según el parámetro de búsqueda, ajusta el campo según tus necesidades
    sqlQuery += ` WHERE cre LIKE '%${query}%'`; 
  }

  // Elimina el límite para que la consulta no esté restringida a 10 resultados
  db.query(sqlQuery, (error, results) => {
  
    if (error) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});


app.get('/equipos_grafana_conjunto', (req, res) => {
  const { query } = req.query;

  let sqlQuery = 'SELECT * FROM vista_conjunto_datos_cre';
  if (query) {
    // Filtra la consulta según el parámetro de búsqueda, ajusta el campo según tus necesidades
    sqlQuery += ` WHERE cre LIKE '%${query}%'`; 
  }

  // Elimina el límite para que la consulta no esté restringida a 10 resultados
  db.query(sqlQuery, (error, results) => {
  
    if (error) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`EL servicio se esta ejecutando sobre el puerto: ${port}`);
});
