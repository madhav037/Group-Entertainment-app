import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import cors from 'cors';
import { Server } from "socket.io";
console.log("hello");

const server = new Server()

server.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  })
});
server.listen(4000)


const app = express();
dotenv.config();
const supabase = createClient(
  process.env.SUPABASEURL,
  process.env.SUPABASESERVICEKEY
);
export default supabase;


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use("/api/auth", authRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
