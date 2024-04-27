import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
console.log("hello");

const app = express();
dotenv.config();
const supabase = createClient(
  process.env.SUPABASEURL,
  process.env.SUPABASEAPIKEY
);
export default supabase;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
