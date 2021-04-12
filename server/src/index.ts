import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";

import * as socketIo from "socket.io";

import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

// Configuring App
const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Setting up Middleware
app.use(cors());

// Setting up Listener
const server = app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

// Setting up Socket
const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const users: { socketId: string; userId: string }[] = [];
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.emit("Welcome", users);

  socket.on("Joined", (data) => {
    socket.join("Users");
    users.push({
      socketId: socket.id,
      userId: data,
    });

    io.sockets.in("Users").emit("Someone Connected", data);
  });

  socket.on("disconnect", () => {
    socket.leave("Users");

    const ind = users.findIndex((obj) => obj.socketId === socket.id);
    if (users[ind]) {
      io.sockets.in("Users").emit("Someone Disconnected", users[ind].userId);
      users.splice(ind, 1);
    }

    console.log("User Disconnected");
  });
});

// Configuring Mongo DB
const mongoURI: string = process.env.URI as string;
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");

  const changeStream = mongoose.connection.collection("posts").watch();
  changeStream.on("change", (change) => {
    if (
      change.operationType === "insert" ||
      change.operationType === "delete"
    ) {
      io.sockets.emit("refresh", { body: "DB Changed" });
    }
  });

  const changeStream1 = mongoose.connection.collection("rooms").watch();
  changeStream1.on("change", (change) => {
    if (change.operationType == "insert") {
      io.sockets.emit("New Room Created", change.fullDocument);
    }

    if (change.operationType == "delete") {
      io.sockets.emit("Room Deleted", change.documentKey);
    }

    if (change.operationType == "update") {
      for (let x in change.updateDescription.updatedFields) {
        if (x.substring(0, 13) == "messagesArray") {
          io.sockets.emit("message", change.documentKey._id);
        }
        if (x.substring(0, 10) == "usersArray") {
          const data = {
            roomId: change.documentKey._id,
            usersArray: change.updateDescription.updatedFields[x],
          };
          io.sockets.emit("users", data);
        }
      }
    }
  });
});

// Configuring Graph QL API
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
