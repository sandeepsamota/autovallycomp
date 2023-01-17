import app from "./server.js";

const PORT = process.env.BC_PORT || 8000;
app.listen(PORT, console.log(`server is running in ${PORT}`));
