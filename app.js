import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import notesRoutes from "./routes/notes.routes.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "Clinic Scheduler API" }));

app.use("/api/users", usersRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/notes", notesRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
