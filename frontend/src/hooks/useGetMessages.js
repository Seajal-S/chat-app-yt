// // // // import { useEffect, useState } from "react";
// // // // import useConversation from "../zustand/useConversation";
// // // // import toast from "react-hot-toast";

// // // // const useGetMessages = () => {
// // // // 	const [loading, setLoading] = useState(false);
// // // // 	const { messages, setMessages, selectedConversation } = useConversation();

// // // // 	useEffect(() => {
// // // // 		const getMessages = async () => {
// // // // 			setLoading(true);
// // // // 			setMessages([]);
// // // // 			try {
// // // // 				const res = await fetch(`/api/messages/${selectedConversation._id}`);
// // // // 				const data = await res.json();
// // // // 				if (data.error) throw new Error(data.error);
// // // // 				// setMessages(data);
// // // // 				setMessages(Array.isArray(data) ? data : []);

// // // // 			} catch (error) {
// // // // 				toast.error(error.message);
// // // // 			} finally {
// // // // 				setLoading(false);
// // // // 			}
// // // // 		};

// // // // 		if (selectedConversation?._id) getMessages();
// // // // 	}, [selectedConversation?._id, setMessages]);

// // // // 	return { messages, loading };
// // // // };
// // // // export default useGetMessages;
// // // import { useEffect, useState } from "react";
// // // import useConversation from "../zustand/useConversation";
// // // import toast from "react-hot-toast";

// // // const useGetMessages = () => {
// // // 	const [loading, setLoading] = useState(false);
// // // 	const { messages, setMessages, selectedConversation } = useConversation();

// // // 	useEffect(() => {
// // // 		const getMessages = async () => {
// // // 			setLoading(true);
// // // 			try {
// // // 				const res = await fetch(
// // // 					`/api/messages/${selectedConversation._id}`
// // // 				);
// // // 				const data = await res.json();

// // // 				if (data.error) throw new Error(data.error);

// // // 				// ✅ ALWAYS SET ARRAY
// // // 				setMessages(Array.isArray(data) ? data : []);
// // // 			} catch (error) {
// // // 				toast.error(error.message);
// // // 				setMessages([]); // safe fallback
// // // 			} finally {
// // // 				setLoading(false);
// // // 			}
// // // 		};

// // // 		if (selectedConversation?._id) getMessages();
// // // 	}, [selectedConversation?._id, setMessages]);

// // // 	return { messages, loading };
// // // };

// // // export default useGetMessages;
// // import { useEffect, useState, useRef } from "react";
// // import useConversation from "../zustand/useConversation";
// // import toast from "react-hot-toast";

// // const useGetMessages = () => {
// // 	const [loading, setLoading] = useState(false);
// // 	const { setMessages, selectedConversation } = useConversation();

// // 	// 🔒 prevents overwrite after socket update
// // 	const hasFetchedRef = useRef(false);

// // 	useEffect(() => {
// // 		if (!selectedConversation?._id) return;

// // 		const getMessages = async () => {
// // 			setLoading(true);
// // 			try {
// // 				const res = await fetch(
// // 					`/api/messages/${selectedConversation._id}`
// // 				);
// // 				const data = await res.json();
// // 				if (data.error) throw new Error(data.error);

// // 				setMessages(Array.isArray(data) ? data : []);
// // 				hasFetchedRef.current = true;
// // 			} catch (error) {
// // 				toast.error(error.message);
// // 				setMessages([]);
// // 			} finally {
// // 				setLoading(false);
// // 			}
// // 		};

// // 		// ✅ fetch ONLY once per conversation
// // 		if (!hasFetchedRef.current) {
// // 			getMessages();
// // 		}

// // 		// reset when conversation changes
// // 		return () => {
// // 			hasFetchedRef.current = false;
// // 		};
// // 	}, [selectedConversation?._id, setMessages]);

// // 	return { loading };
// // };

// // export default useGetMessages;
// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		if (!selectedConversation?._id) return;

// 		const getMessages = async () => {
// 			setLoading(true);
// 			try {
// 				const res = await fetch(
// 					`/api/messages/${selectedConversation._id}`
// 				);
// 				const data = await res.json();

// 				if (data.error) throw new Error(data.error);

// 				setMessages(Array.isArray(data) ? data : []);
// 			} catch (error) {
// 				toast.error(error.message);
// 				setMessages([]);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };

// export default useGetMessages;
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		if (!selectedConversation?._id) return;

		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`, {
	credentials: "include",
});

				const data = await res.json();

				if (data.error) throw new Error(data.error);

				setMessages(data);
			} catch (error) {
				toast.error(error.message);
				setMessages([]);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
