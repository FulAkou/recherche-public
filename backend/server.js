const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectToDB = require("./connect-to-DB/connectToDB");
const dataSeed = require("./dataSeed");
const router = require("./routes/allRoutes");
const routerDonnees = require("./routes/donnees");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
connectToDB();

// Routes pour les données de l'économie
app.use("/api", dataSeed);

// Routes pour les matières premières
app.use("/api", router);

// Routes pour les données
app.use("/api", routerDonnees);

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
});
