import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_PUBLIC } from '../../services/constants';
import defaultAvatar from '../../assets/image/defaultAvatar.png';
import DropdownUser from '../../Forms/DropdownUser';

function Avatar() {
	const authReducer = useSelector((state) => state.authReducer);
	const [isDropdownUser, setDropdownUser] = useState(false);
	const ref = useRef();
	const toggleDropdownUser = () => {
		setDropdownUser(!isDropdownUser);
	};

	useEffect(() => {
		const clickOutSide = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setDropdownUser(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, [isDropdownUser]);
	return (
		<div ref={ref} className="flex flex-row items-center relative cursor-pointer" onClick={toggleDropdownUser} aria-hidden>
			<img src={authReducer.profile?.imageAvatar ? API_PUBLIC + authReducer.profile.imageAvatar : defaultAvatar} alt="" className="w-10 h-10 rounded-[50%]" />
			<span>{authReducer.profile.fullname}</span>
			{
				isDropdownUser ? <DropdownUser /> : <> </>
			}
		</div>
	);
}

export default Avatar;
