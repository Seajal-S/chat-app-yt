// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";


// import connectToMongoDB from "./db/connectToMongoDB.js";
// dotenv.config();

// const app=express();
// const PORT=process.env.PORT||5000;



// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth",authRoutes);
// app.use("/api/messages",messageRoutes);
// app.use("/api/users",userRoutes);



// app.listen(PORT,()=>{
//     connectToMongoDB();
//     console.log(`Server Running on port ${PORT}`)
//     });
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// 👇 CREATE HTTP SERVER
const server = http.createServer(app);

// 👇 ATTACH SOCKET.IO
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

// ❌ REMOVE app.listen
// ✅ USE server.listen
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
