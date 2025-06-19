const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectToDB = require("./connect-to-DB/connectToDB");
const dataSeed = require("./dataSeed");
const router = require("./routes/allRoutes");
const routerDonnees = require("./routes/donnees");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = ["http://localhost:5173", "https://iviz-3.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Origin not allowed"));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     "https://iviz-3.vercel.app": true,
//     credentials: true,
//   })
// );
app.use(express.json());

// Connexion à la base de données MongoDB
connectToDB();

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Routes d'administration
app.use("/api/admin", adminRoutes);

// Routes pour les données de l'économie
app.use("/api", dataSeed);

// Routes pour les matières premières
app.use("/api", router);

// Routes pour les données
app.use("/api", routerDonnees);

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
});
