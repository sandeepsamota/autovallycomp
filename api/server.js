import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import compression from "compression";
import helmet from "helmet";
import nocache from "nocache";
import strings from "./config/app.config.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const DB_HOST = process.env.BC_DB_HOST;
const DB_PORT = process.env.BC_DB_PORT;
// const DB_SSL = process.env.BC_DB_SSL.toLowerCase() === "true";

const DB_USERNAME = process.env.BC_DB_USERNAME;
const DB_PASSWORD = process.env.BC_DB_PASSWORD;
const DB_NAME = process.env.BC_DB_NAME;
// const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}.${DB_PORT}/${DB_NAME}`;
const DB_URI = `mongodb+srv://sandeepsamota:sandeepsamota@cluster0.e0hzusm.mongodb.net/autovally`;
let options = {};
// if (DB_SSL) {
//   options = {
//     useUnifiedTpology: true,
//     useNewUrlParser: true,
//   };
// }

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.error("Cannot connect to the database:", err);
    }
  );

const app = express();
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(helmet.originAgentCluster());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.crossOriginOpenerPolicy());
app.use(nocache());
app.use(compression({ threshold: 0 }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
// strings.setLanguage(process.env.BC_DEFAULT_LANGUAGE);

app.use(cors());
app.use("/", userRoutes);
app.use("/", companyRoutes);
app.use("/", locationRoutes);
app.use("/", carRoutes);
app.use("/", bookingRoutes);
app.use("/", notificationRoutes);

export default app;
