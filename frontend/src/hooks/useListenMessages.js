// // // // // import { useEffect } from "react";
// // // // // import { useSocketContext } from "../context/SocketContext";
// // // // // import useConversation from "../zustand/useConversation";
// // // // // import notificationSound from "../assets/sounds/notification.mp3";

// // // // // const useListenMessages = () => {
// // // // // 	const { socket } = useSocketContext();
// // // // // 	const { setMessages, selectedConversation } = useConversation(); // ✅ added selectedConversation

// // // // // 	useEffect(() => {
// // // // // 		if (!socket) return;

// // // // // 		const handleNewMessage = (newMessage) => {
// // // // // 			// ✅ ignore messages not related to current chat
// // // // // 			if (
// // // // // 				newMessage.senderId !== selectedConversation?._id &&
// // // // // 				newMessage.receiverId !== selectedConversation?._id
// // // // // 			) {
// // // // // 				return;
// // // // // 			}

// // // // // 			newMessage.shouldShake = true;

// // // // // 			const sound = new Audio(notificationSound);
// // // // // 			sound.play();

// // // // // 			setMessages((prevMessages) => [...prevMessages, newMessage]);

// // // // // 			setTimeout(() => {
// // // // // 				newMessage.shouldShake = false;
// // // // // 			}, 300);
// // // // // 		};

// // // // // 		socket.on("newMessage", handleNewMessage);

// // // // // 		return () => socket.off("newMessage", handleNewMessage);
// // // // // 	}, [socket, setMessages, selectedConversation]); // ✅ added dependency
// // // // // };

// // // // // export default useListenMessages;
// // // // // import { useEffect } from "react";
// // // // // import { useSocketContext } from "../context/SocketContext";
// // // // // import useConversation from "../zustand/useConversation";
// // // // // import notificationSound from "../assets/sounds/notification.mp3";

// // // // // const useListenMessages = () => {
// // // // // 	const { socket } = useSocketContext();
// // // // // 	const { setMessages, selectedConversation } = useConversation();

// // // // // 	useEffect(() => {
// // // // // 		if (!socket || !selectedConversation?._id) return;

// // // // // 		const handleNewMessage = (newMessage) => {
// // // // // 			// ✅ SAFE ID comparison
// // // // // 			const senderId = newMessage.senderId?.toString();
// // // // // 			const receiverId = newMessage.receiverId?.toString();
// // // // // 			const currentChatId = selectedConversation._id.toString();

// // // // // 			if (senderId !== currentChatId && receiverId !== currentChatId) {
// // // // // 				return;
// // // // // 			}

// // // // // 			const messageWithShake = {
// // // // // 				...newMessage,
// // // // // 				shouldShake: true,
// // // // // 			};

// // // // // 			// ✅ SAFE audio play (no silent failure)
// // // // // 			const sound = new Audio(notificationSound);
// // // // // 			sound.play().catch(() => {});

// // // // // 			setMessages((prev) => [...prev, messageWithShake]);
// // // // // 		};

// // // // // 		socket.on("newMessage", handleNewMessage);

// // // // // 		return () => socket.off("newMessage", handleNewMessage);
// // // // // 	}, [socket, selectedConversation, setMessages]);
// // // // // };

// // // // // export default useListenMessages;
// // // // import { useEffect } from "react";
// // // // import { useSocketContext } from "../context/SocketContext";
// // // // import useConversation from "../zustand/useConversation";
// // // // import notificationSound from "../assets/sounds/notification.mp3";

// // // // const useListenMessages = () => {
// // // // 	const { socket } = useSocketContext();
// // // // 	const { setMessages, selectedConversation } = useConversation();

// // // // 	useEffect(() => {
// // // // 		if (!socket) return;

// // // // 		const handleNewMessage = (newMessage) => {
// // // // 			console.log("📩 REALTIME MESSAGE:", newMessage);

// // // // 			// if no chat selected yet, do nothing
// // // // 			if (!selectedConversation?._id) return;

// // // // 			const senderId = newMessage.senderId?.toString();
// // // // 			const receiverId = newMessage.receiverId?.toString();
// // // // 			const currentChatId = selectedConversation._id.toString();

// // // // 			// ✅ only ignore messages that are NOT part of this chat
// // // // 			if (
// // // // 				senderId !== currentChatId &&
// // // // 				receiverId !== currentChatId
// // // // 			) {
// // // // 				return;
// // // // 			}

// // // // 			const messageWithShake = {
// // // // 				...newMessage,
// // // // 				shouldShake: true,
// // // // 			};

// // // // 			const sound = new Audio(notificationSound);
// // // // 			sound.play().catch(() => {});

// // // // 			// setMessages((prev) => [...prev, messageWithShake]);
// // // // 			setMessages((prev) =>
// // // // 			Array.isArray(prev) ? [...prev, newMessage] : [newMessage]
// // // // );

// // // // 		};

// // // // 		socket.on("newMessage", handleNewMessage);

// // // // 		return () => {
// // // // 			socket.off("newMessage", handleNewMessage);
// // // // 		};
// // // // 	}, [socket, selectedConversation, setMessages]);
// // // // };

// // // // export default useListenMessages;
// // // import { useEffect } from "react";
// // // import { useSocketContext } from "../context/SocketContext";
// // // import useConversation from "../zustand/useConversation";
// // // import notificationSound from "../assets/sounds/notification.mp3";

// // // const useListenMessages = () => {
// // // 	const { socket } = useSocketContext();
// // // 	const { setMessages, selectedConversation } = useConversation();

// // // 	useEffect(() => {
// // // 		if (!socket) return;

// // // 		const handleNewMessage = (newMessage) => {
// // // 			// 🔔 play notification
// // // 			const sound = new Audio(notificationSound);
// // // 			sound.play().catch(() => {});

// // // 			// ✅ ALWAYS append message
// // // 			setMessages((prev) =>
// // // 				Array.isArray(prev) ? [...prev, newMessage] : [newMessage]
// // // 			);
// // // 		};

// // // 		socket.on("newMessage", handleNewMessage);

// // // 		return () => socket.off("newMessage", handleNewMessage);
// // // 	}, [socket, setMessages]);
// // // };

// // // export default useListenMessages;
// // import { useEffect } from "react";
// // import { useSocketContext } from "../context/SocketContext";
// // import useConversation from "../zustand/useConversation";
// // import notificationSound from "../assets/sounds/notification.mp3";

// // const useListenMessages = () => {
// // 	const { socket } = useSocketContext();
// // 	const { setMessages } = useConversation();

// // 	useEffect(() => {
// // 		if (!socket) return;

// // 		const handleNewMessage = (newMessage) => {
// // 			const sound = new Audio(notificationSound);
// // 			sound.play().catch(() => {});

// // 			setMessages((prev) =>
// // 				Array.isArray(prev) ? [...prev, newMessage] : [newMessage]
// // 			);
// // 		};

// // 		socket.on("newMessage", handleNewMessage);

// // 		return () => socket.off("newMessage", handleNewMessage);
// // 	}, [socket, setMessages]);
// // };

// // export default useListenMessages;
// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { setMessages } = useConversation();

// 	useEffect(() => {
// 		if (!socket) return;

// 		const handleNewMessage = (newMessage) => {
// 			const sound = new Audio(notificationSound);
// 			sound.play().catch(() => {});

// 			setMessages((prev) =>
// 				Array.isArray(prev) ? [...prev, newMessage] : [newMessage]
// 			);
// 		};

// 		socket.on("newMessage", handleNewMessage);
// 		return () => socket.off("newMessage", handleNewMessage);
// 	}, [socket, setMessages]);
// };

// export default useListenMessages;
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { addMessage } = useConversation();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			const sound = new Audio(notificationSound);
			sound.play().catch(() => {});

			addMessage(newMessage);
		};

		socket.on("newMessage", handleNewMessage);
		return () => socket.off("newMessage", handleNewMessage);
	}, [socket, addMessage]);
};

export default useListenMessages;
