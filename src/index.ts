import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
