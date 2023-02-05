import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();
const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
