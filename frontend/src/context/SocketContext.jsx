// // import { createContext, useState, useEffect, useContext } from "react";
// // import { useAuthContext } from "./AuthContext";
// // import io from "socket.io-client";

// // const SocketContext = createContext();

// // export const useSocketContext = () => {
// // 	return useContext(SocketContext);
// // };

// // export const SocketContextProvider = ({ children }) => {
// // 	const [socket, setSocket] = useState(null);
// // 	const [onlineUsers, setOnlineUsers] = useState([]);
// // 	const { authUser } = useAuthContext();

// // 	useEffect(() => {
// // 		if (authUser) {
// // 			const socket = io("http://localhost:5000", {
// // 				withCredentials: true,
// // 				query: {
// // 					userId: authUser._id,
// // 				},
// // 			});

// // 			setSocket(socket);

// // 			// socket.on() is used to listen to the events. can be used both on client and server side
// // 			socket.on("getOnlineUsers", (users) => {
// // 				setOnlineUsers(users);
// // 			});

// // 			return () => socket.close();
// // 		} else {
// // 			if (socket) {
// // 				socket.close();
// // 				setSocket(null);
// // 			}
// // 		}
// // 	}, [authUser]);

// // 	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
// // };
// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	const { authUser } = useAuthContext();

// 	useEffect(() => {
// 		if (authUser) {
// 			const socketInstance = io("http://localhost:5000", {
// 				withCredentials: true,
// 				query: {
// 					userId: authUser._id,
// 				},
// 			});

// 			setSocket(socketInstance);

// 			socketInstance.on("getOnlineUsers", (users) => {
// 				setOnlineUsers(users);
// 			});

// 			return () => socketInstance.close();
// 		} else {
// 			if (socket) {
// 				socket.close();
// 				setSocket(null);
// 			}
// 		}
// 	}, [authUser]);

// 	return (
// 		<SocketContext.Provider value={{ socket, onlineUsers }}>
// 			{children}
// 		</SocketContext.Provider>
// 	);
// };
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (!authUser?._id) return;

		const socketInstance = io("http://localhost:5000", {
			transports: ["websocket"], // 🔥 IMPORTANT
			query: {
				userId: authUser._id.toString(), // 🔥 MUST be string
			},
		});

		socketInstance.on("connect", () => {
			console.log("✅ SOCKET CONNECTED:", socketInstance.id);
		});

		socketInstance.on("connect_error", (err) => {
			console.log("❌ SOCKET CONNECT ERROR:", err.message);
		});

		socketInstance.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
