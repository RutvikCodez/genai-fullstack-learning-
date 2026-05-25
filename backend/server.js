import dotenv from "dotenv";
dotenv.config();

import crypto from "crypto";
global.crypto = crypto;

import app from './src/app.js';
import connectToDB from './src/config/database.js';

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});