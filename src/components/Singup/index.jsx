import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: ""
	});
	const[response,setresponse]=useState("");
	const [error, setError] = useState("");
    const reset =()=>{
		setData({firstName: "",
		lastName: "",
		email: ""});
	}
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			localStorage.setItem("email",data.email)
			console.log(data)
			const { data: res } = await axios.post(url, data);
			console.log(res.message);
			setresponse(res.message);
			window.setTimeout(function(){window.location.reload()},2000);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div >
			<nav className={styles.navbar}>
				<h3>Registeration page</h3>
			</nav>
			<div className={styles.signup_container}>

			<div className={styles.signup_form_container}>
				<div className={styles.left}>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create a Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{response && <div className={styles.response_msg}>{data.firstName}{ response}</div>}
						<div className="btn-con">
						<button type="submit" className={styles.green_btn}>
						   Sign Up
						</button>
						<button type="submit" className={styles.green_btn} onClick={reset}>
						   Clear
						</button>
						</div>
					</form>
				</div>
			</div>

			</div>
		</div>
	);
};

export default Signup;
