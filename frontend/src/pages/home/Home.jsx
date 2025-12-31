// import Sidebar from "../../components/Sidebar.jsx";
// import MessageContainer from "../../components/messages/MessageContainer.jsx";

// const Home = () => {
// 	return (
// 		// <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-visible bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 			<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-visible bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

// 		 {/* <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>  */}
// 			<Sidebar />
// 			<MessageContainer /> 
// 		</div>
// 	);
// };
// export default Home;
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-visible bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
