/* eslint-disable */
import style from "./Login.module.css";

import ver from "../../assets/ver.png";
import nover from "../../assets/nover.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import { doLogin } from "../../utils/doLogin";
import toast from "../../utils/toast.js";
import { encrypt } from "../../utils/encode.js";

const Login = ({ updateContextUser, setLogged }) => {
	const nav = useNavigate();
	const logged2 = localStorage.getItem("logged");
	const [showPassword, setShowPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState({
		email: null,
		name: null,
		password: null,
		repassword: null,
	});

	useEffect(() => {
		if (logged2) nav("/");
	}, []);

	const Toast = toast();

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handlerUser = (email) => {
		if (!email) {
			return Promise.resolve({ message: "Email no proporcionado" });
		}

		return getUser(email);
	};

	const simpleLogin = async () => {
		const email = document.getElementById("email")?.value;
		const pass = document.getElementById("password")?.value;

		try {
			if (!email || !pass) {
				throw new Error("Ingrese correctamente los campos");
			}
			const password = encrypt(pass);
			const user = await handlerUser(email);

			if (user.message === "Usuario no encontrado") {
				throw new Error("Usuario no encontrado");
			}

			const loggin = await doLogin(email, password);

			if (loggin.success) {
				throw new Error("Usuario no encontrado");
			}
			setLogged(true);

			const { data } = loggin.data;
			updateContextUser(data);
			localStorage.setItem("userOnSession", JSON.stringify(data));
			localStorage.setItem("logged", true);

			nav("/");
		} catch (error) {
			Toast.fire({
				title: `Error en el inicio de sesión: ${
					error.response?.data?.message
						? error.response?.data?.message
						: error.message
				}`,
				text: "Contraseña incorrecta o usuario incorrectos, porfavor diligenciar los campos correctamente",
				icon: "error",
				timer: 4000,
				confirmButtonText: "Entiendo",
				customClass: {
					popup: "mySwal",
				},
			}).then(() => nav(`/login`));
		}
	};

	return (
		<div className={style.form_container}>
			<div className={style.form}>
				<div className={style.flex_column}>
					<label>Email </label>
				</div>
				<div className={style.inputForm}>
					<input
						type="text"
						className={style.input}
						id="email"
						name="email"
						placeholder="Ingresa email"
						defaultValue=""
					/>
				</div>
				{validationErrors.email && (
					<p className={style.error}>{validationErrors.email}</p>
				)}

				<div className={style.flex_column}>
					<label>Contraseña </label>
				</div>
				<div className={style.inputForm}>
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						name="password"
						className={style.input}
						placeholder="Ingresa contraseña"
						defaultValue=""
					/>
					<div>
						{showPassword ? (
							<button
								className={style.button_show}
								type="button"
								onClick={togglePasswordVisibility}>
								<img src={ver} width="25px" />
							</button>
						) : (
							<button
								className={style.button_show}
								type="button"
								onClick={togglePasswordVisibility}>
								<img src={nover} width="25px" />
							</button>
						)}
					</div>
				</div>
				{validationErrors.password && (
					<p className={style.error}>{validationErrors.password}</p>
				)}

				<div className={style.flex_row}></div>
				<button className={style.button_submit} onClick={(e) => simpleLogin()}>
					{"Inicia sesión"}
				</button>
			</div>
		</div>
	);
};

export default Login;
