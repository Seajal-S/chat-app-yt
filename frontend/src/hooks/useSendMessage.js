import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
// import { useState } from "react";
// import toast from "react-hot-toast";
// import useConversation from "../zustand/useConversation";
// import { useAuthContext } from "../context/AuthContext";

// const useSendMessage = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();
// 	const { authUser } = useAuthContext();

// 	const sendMessage = async (message) => {
// 		if (!selectedConversation?._id) return;

// 		// 🔥 OPTIMISTIC MESSAGE (instant UI)
// 		const optimisticMessage = {
// 			_id: Date.now(),
// 			senderId: authUser._id,
// 			receiverId: selectedConversation._id,
// 			message,
// 			createdAt: new Date().toISOString(),
// 		};

// 		setMessages((prev) => [...prev, optimisticMessage]);

// 		setLoading(true);
// 		try {
// 			const res = await fetch(`/api/messages/${selectedConversation._id}`, {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ message }),
// 			});

// 			// const data = await res.json();
// 			let data;
// 			if (res.ok) {
// 				data = await res.json();
// 			} else {
// 				const text = await res.text();
// 				throw new Error(text);
// 			}

// 			if (data.error) throw new Error(data.error);

// 			// optional: replace temp message with real one
// 		} catch (error) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { sendMessage, loading };
// };

// export default useSendMessage;
