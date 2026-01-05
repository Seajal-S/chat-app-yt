import { Server } from "socket.io";

let ioInstance = null;
const userSocketMap = {};

export const initSocket = (server) => {
	ioInstance = new Server(server, {
		cors: {
			origin: ["http://localhost:3000"],
			methods: ["GET", "POST"],
		},
	});

	ioInstance.on("connection", (socket) => {
		const userId = socket.handshake.query.userId?.toString();
		if (!userId) return;

		userSocketMap[userId] = socket.id;
		console.log("🟢 user connected:", userId, socket.id);

		ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));

		socket.on("disconnect", () => {
			if (userSocketMap[userId] === socket.id) {
				delete userSocketMap[userId];
			}
			ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));
		});
	});

	return ioInstance;
};

export const getIO = () => ioInstance;

export const getReceiverSocketId = (receiverId) =>
	userSocketMap[receiverId?.toString()];
