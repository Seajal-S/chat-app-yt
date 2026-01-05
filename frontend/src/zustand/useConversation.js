// // import { create } from "zustand";

// // const useConversation = create((set) => ({
// // 	selectedConversation: null,
// // 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// // 	messages: [],
// // 	setMessages: (messages) => set({ messages }),
// // }));

// // export default useConversation;
// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,

// 	messages: [],

// 	setSelectedConversation: (selectedConversation) =>
// 		set({ selectedConversation }),

// 	setMessages: (messages) =>
// 		set({
// 			messages: Array.isArray(messages) ? messages : [],
// 		}),

// 	addMessage: (message) =>
// 		set((state) => ({
// 			messages: Array.isArray(state.messages)
// 				? [...state.messages, message]
// 				: [message],
// 		})),
// }));

// export default useConversation;
import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	messages: [],

	setSelectedConversation: (selectedConversation) =>
		set({ selectedConversation }),

	// 🔒 always sanitize
	setMessages: (messages) =>
		set({
			messages: Array.isArray(messages) ? messages : [],
		}),

	// 🔥 ONLY way to append
	addMessage: (message) =>
		set((state) => ({
			messages: [...state.messages, message],
		})),
}));

export default useConversation;
