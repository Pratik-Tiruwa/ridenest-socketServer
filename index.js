import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
dotenv.config();

const port = process.env.PORT || 6000;
const mongodbUrl = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("db connected");
  } catch (error) {
    console.log("db error");
  }
};

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_BASE_URL,
  },
}); 

io.on("connection", (socket) => {
    console.log(socket.id) 
    socket.on("identity", (data) => {
      console.log(data)
    })
})


server.listen(port, () => {
  connectDb();
  console.log(`server is started ${port}`);
});
