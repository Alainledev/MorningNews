import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { Modal } from 'antd';
import Link from 'next/link';
import user, { connected, noConnected } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

function Header() {

	const userConnected = useSelector((state) => state.user.value.username);
	console.log(userConnected);
	const dispatch = useDispatch()
	const [date, setDate] = useState('2050-11-22T23:59:59');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [signinUser, setSigninUser] = useState('');
	const [signinPass, setSigninPass] = useState('');
	const [signupUser, setSignupUser] = useState('');
	const [signupPass, setSignupPass] = useState('');

	const handleSubmitSignup = () => {
			fetch('http://localhost:3000/users/signup', {
			method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
				username: signupUser,
				password: signupPass,
				}),
			})
			  .then(response => response.json())
			  .then(data => {
				if (data.result === true)
				dispatch(connected(signupUser))
				setSignupUser("")
				setSignupPass("")
				console.log(data)
			  });
	};

	  const handleSubmitSignin = () => {
		fetch('http://localhost:3000/users/signin', {
			method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
				username: signinUser,
				password: signinPass,
				}),
			})
			  .then(response => response.json())
			  .then(
				data => {
					if (data.result === true)
					dispatch(connected(signinUser))
					setSigninUser("")
					setSigninPass("")
					console.log(data)
				});

	  };

	  const handleSubmitLogOut = () => {
		dispatch(noConnected())
	  }

	useEffect(() => {
		setDate(new Date());
	}, []);

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const modalContent = (
		<div className={styles.registerContainer}>
			<div className={styles.registerSection}>
				<p>Sign-up</p>
				<input onChange={(e) => setSignupUser(e.target.value)} value = {signupUser} type="text" placeholder="Username" id="signUpUsername" />
				<input onChange={(e) => setSignupPass(e.target.value)} value = {signupPass} type="password" placeholder="Password" id="signUpPassword" />
				<button onClick={() => handleSubmitSignup()} id="register">Register</button>
			</div>
			<div className={styles.registerSection}>
				<p>Sign-in</p>
				<input onChange={(e) => setSigninUser(e.target.value)} value = {signinUser} type="text" placeholder="Username" id="signInUsername" />
				<input onChange={(e) => setSigninPass(e.target.value)} value = {signinPass} type="password" placeholder="Password" id="signInPassword" />
				<button onClick={() => handleSubmitSignin()} id="connection">Connect</button>
			</div>
		</div>
	);

	let userSection;
	if (isModalVisible) {
		userSection = <FontAwesomeIcon icon={faXmark} onClick={() => showModal()} className={styles.userSection} />;
	} else {
		userSection = <FontAwesomeIcon icon={faUser} onClick={() => showModal()} className={styles.userSection} />;
	}

	return (
		<div>
		<header className={styles.header}>
			
			{userConnected ?

		<div className={styles.logoDate} >
			<div className={styles.logoContainer}>
					<Moment className={styles.date} date={date} format="MMM Do YYYY" />
					<h1 className={styles.title}>Morning News</h1>
					<span>Welcome {userConnected} </span>
					<button onClick={() => handleSubmitLogOut()}>LOGOUT</button>
			</div>
			<div className={styles.linkContainer}>
					<Link href="/"><span className={styles.link}>Articles</span></Link>
					<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
			</div>
		</div>

		:

		<div>
			<div >
				<div className={styles.titleContainer}>
					<span className={styles.title}>Morning News</span>
				</div>
				<div className={styles.dateContainer}>
					<Moment date={date} format="MMM Do YYYY" />
				</div>
						
						{/* {userSection} */}
			</div>
			

			<div className={styles.linkContainer}>
					<Link href="/"><span className={styles.link}>Articles</span></Link>
					<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
			</div>

				{ isModalVisible  &&  <div id="react-modals">
					<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
						{modalContent}
					</Modal>
									  </div>
				}
		</div>
		}
		</header >
		</div>

	);
}

export default Header;
