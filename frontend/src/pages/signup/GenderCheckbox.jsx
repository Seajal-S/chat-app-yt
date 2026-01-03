const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex gap-6 mt-2'>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer text-gray-300'>
					<span className='text-gray-300'>Male</span>
					<input
						type='checkbox'
						className='checkbox checkbox-sm border-gray-400
						checked:bg-black checked:border-black'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>

			<div className='form-control'>
				<label className='label gap-2 cursor-pointer text-gray-300'>
					<span className='text-gray-300'>Female</span>
					<input
						type='checkbox'
						className='checkbox checkbox-sm border-gray-400
						checked:bg-black checked:border-black'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;

