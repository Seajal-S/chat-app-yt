// // // // import { Server } from "socket.io";
// // // // import http from "http";
// // // // import express from "express";

// // // // const app = express();

// // // // const server = http.createServer(app);
// // // // const io = new Server(server, {
// // // // 	cors: {
// // // // 		origin: ["http://localhost:5173"],
// // // // 		methods: ["GET", "POST"],
// // // // 	},
// // // // });

// // // // export const getReceiverSocketId = (receiverId) => {
// // // // 	return userSocketMap[receiverId];
// // // // };

// // // // const userSocketMap = {}; // {userId: socketId}

// // // // io.on("connection", (socket) => {
// // // // 	console.log("a user connected", socket.id);

// // // // 	const userId = socket.handshake.query.userId;
// // // // 	if (userId != "undefined") userSocketMap[userId] = socket.id;

// // // // 	// io.emit() is used to send events to all the connected clients
// // // // 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// // // // 	// socket.on() is used to listen to the events. can be used both on client and server side
// // // // 	socket.on("disconnect", () => {
// // // // 		console.log("user disconnected", socket.id);
// // // // 		delete userSocketMap[userId];
// // // // 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// // // // 	});
// // // // });

// // // // export { app, io, server };
// // // import { Server } from "socket.io";
// // // import http from "http";
// // // import express from "express";

// // // const app = express();
// // // const server = http.createServer(app);

// // // const io = new Server(server, {
// // // 	cors: {
// // // 		origin: ["http://localhost:5173"],
// // // 		methods: ["GET", "POST"],
// // // 	},
// // // });

// // // const userSocketMap = {}; // userId -> socketId

// // // export const getReceiverSocketId = (receiverId) => {
// // // 	return userSocketMap[receiverId];
// // // };

// // // io.on("connection", (socket) => {
// // // 	console.log("a user connected", socket.id);

// // // 	const userId = socket.handshake.query.userId;
// // // 	if (userId && userId !== "undefined") {
// // // 		userSocketMap[userId] = socket.id;
// // // 	}

// // // 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// // // 	socket.on("disconnect", () => {
// // // 		console.log("user disconnected", socket.id);
// // // 		delete userSocketMap[userId];
// // // 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// // // 	});
// // // });

// // // export { app, io, server };
// // import { Server } from "socket.io";
// // import http from "http";
// // import express from "express";

// // const app = express();
// // const server = http.createServer(app);

// // const io = new Server(server, {
// // 	cors: {
// // 		origin: ["http://localhost:3000"],
// // 		methods: ["GET", "POST"],
// // 	},
// // });

// // const userSocketMap = {}; // userId -> socketId

// // export const getReceiverSocketId = (receiverId) => {
// // 	return userSocketMap[receiverId];
// // };

// // io.on("connection", (socket) => {
// // 	const userId = socket.handshake.query.userId;

// // 	if (!userId || userId === "undefined") return;

// // 	// ✅ ALWAYS overwrite with latest socket
// // 	userSocketMap[userId] = socket.id;
// // 	console.log("🟢 user connected:", userId, socket.id);

// // 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// // 	socket.on("disconnect", () => {
// // 		console.log("🔴 user disconnected:", userId, socket.id);

// // 		// ✅ delete ONLY if the same socket disconnects
// // 		if (userSocketMap[userId] === socket.id) {
// // 			delete userSocketMap[userId];
// // 		}

// // 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// // 	});
// // });

// // export { app, io, server };
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
// 	cors: {
// 		origin: ["http://localhost:3000"],
// 		methods: ["GET", "POST"],
// 	},
// });

// // 🔒 ALWAYS store userIds as STRINGS
// const userSocketMap = {}; // userId (string) -> socketId

// export const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId?.toString()];
// };

// io.on("connection", (socket) => {
// 	const userId = socket.handshake.query.userId?.toString();

// 	if (!userId) {
// 		console.log("❌ socket connected without userId");
// 		return;
// 	}

// 	// ✅ register / overwrite socket
// 	userSocketMap[userId] = socket.id;
// 	console.log("🟢 user connected:", userId, socket.id);

// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// 	socket.on("disconnect", () => {
// 		console.log("🔴 user disconnected:", userId);

// 		if (userSocketMap[userId] === socket.id) {
// 			delete userSocketMap[userId];
// 		}

// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { app, io, server };
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

// 🔒 ALWAYS store userIds as STRINGS
const userSocketMap = {}; // userId (string) -> socketId

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId?.toString()];
};

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId?.toString();

	if (!userId) {
		console.log("❌ socket connected without userId");
		return;
	}

	userSocketMap[userId] = socket.id;
	console.log("🟢 user connected:", userId, socket.id);

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		if (userSocketMap[userId] === socket.id) {
			delete userSocketMap[userId];
		}
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
