/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import style from "./CreateUser.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validationUser } from "../../utils/validators";
import { getUser } from "../../utils/getUser";
import { encrypt } from "../../utils/encode";
import Users from "../../components/Users/Users";
import { rolDataSelector } from "../../utils/helpers";
import { Loader } from "../../components/Loader/Loader";

export const CreateUser = ({ updateContextUser }) => {
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [usersDB, setUsersDb] = useState([]);
	const [user, setUser] = useState({
		nombre: "",
		password: "Temporal.124*",
		email: "",
	});

	const [errors, setErrors] = useState({
		nombre: "",
		password: "",
		email: "",
	});

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });

		const newErrors = validationUser({
			...user,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const handlerChargeUsers = async () => {
		const data = await getUser(null, "All");
		setUsersDb(data.users);
	};
	useEffect(() => {
		handlerChargeUsers();
	}, []);

	const clearForm = () => {
		setUser({
			nombre: "",
			password: "Temporal.124*",
			email: "",
		});
	};

	const onSubmit = async () => {
		try {
			const user1 = await getUser(user.email).then((data) => {
				return data;
			});
			if (!user1.users && user1 && user1.message === "Usuario encontrado") {
				throw new Error("El usuario ya existe");
			}

			if (Object.keys(errors).length > 0) {
				throw new Error("Existen errores en el formulario");
			}

			setLoading(true);
			const response = await axios.post("/users/create", {
				nombre: user.nombre,
				email: user.email,
				password: encrypt(user.password),
				type: user.type,
				id_admin: session.id,
			});

			if (response.data) {
				Swal.fire({
					title: "El usuario se creo correctamente!",
					icon: "success",
					showConfirmButton: true,
					confirmButtonText: "Confirmar",
					customClass: {
						popup: "mySwal",
					},
				})
					.then(() => {
						setLoading(false);
						clearForm();
					})
					.finally(() => {
						return navigate(`/users/create`);
					});
			}
		} catch (error) {
			Swal.fire({
				title: "¡Falta información importante!",
				text: `Por favor revisa y completa todos los campos del form. ${error.message}`,
				icon: "warning",
				confirmButtonText: "Completar formulario",
				customClass: {
					popup: "mySwal",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{!loading && (
				<div className={style.container}>
					<div>
						<h1> Gestion de Usuarios</h1>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "space-between",
							width: "90vw",
						}}>
						<div className={style.modal}>
							<div className={style.modal__header}>
								<span className={style.modal__title}>Nuevo Usuario</span>
							</div>
							<div className={style.modal__body}>
								<div className={style.input}>
									<label className={style.input__label}>
										Nombre de usuario
									</label>
									<input
										className={style.input__field}
										type="text"
										id="nombre"
										name="nombre"
										value={user.nombre}
										onInput={handleChange}
										maxLength={31}
									/>
									<p className={style.input__description}>{errors.nombre}</p>
									<label className={style.input__label}>Email</label>
									<input
										type="email"
										id="email"
										name="email"
										value={user.email}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>{errors.email}</p>
									<label className={style.input__label}>
										Tipo o Roles de Usuario
									</label>
									<select
										className={style.input__field}
										id="type"
										name="type"
										onInput={handleChange}>
										<option name="users" value="Tipo de usuario" selected>
											Seleccione un usuario
										</option>
										{rolDataSelector?.map((item, index) => {
											return (
												<option key={index} value={item}>
													{item === "admin"
														? "Administrador"
														: item === "seller"
														? "Vendedor"
														: ""}
												</option>
											);
										})}
									</select>
									<p className={style.input__description}>{errors.type}</p>
									<button
										className={style.button_submit}
										onClick={() => onSubmit(user)}>
										Crear Usuario{" "}
									</button>
								</div>
							</div>
						</div>
						<div>
							<Users
								updateContextUser={updateContextUser}
								setLoading={setLoading}
								loading={loading}
							/>
						</div>
					</div>
				</div>
			)}
			{loading && <Loader />}
		</>
	);
};
