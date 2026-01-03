import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const { authUser } = useAuthContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;

        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }

        if (!conversations || conversations.length === 0) {
            return toast.error("Users not loaded yet");
        }

        const conversation = conversations.find((c) => {
            if (c._id === authUser._id) return false;
            const name =
                c.fullName ||
                `${c.firstName || ""} ${c.lastName || ""}`.trim() ||
                c.username;

            return name.toLowerCase().includes(search.toLowerCase().trim());
        });

        
        // console.log("FOUND USER:", conversation);
        console.log("SELECTED:", conversation);


        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("No such user found!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input
                type='text'
                placeholder='  Search…'
                className='input input-bordered rounded-full
                bg-gray-900 text-white placeholder-gray-400
                border-gray-600 focus:outline-none focus:border-gray-500'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button
                type='submit'
                className='btn btn-circle
                bg-blue-500 hover:bg-gray-700
                border border-gray-600 text-white'
            >
                <IoSearchSharp className='w-6 h-6' />
            </button>
        </form>
    );
};

export default SearchInput;
