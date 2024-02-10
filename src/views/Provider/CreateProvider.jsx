/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import style from "./CreateProvider.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader } from "../../components/Loader/Loader";
import Proveedores from "../../components/Proveedores/Proveedores";
import { validationProvider } from "../../utils/validators";

export const CreateProvider = ({ updateContextUser }) => {
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [provider, setProvider] = useState({
		nombre: "",
		direccion: "",
		telefono: "",
		rut: "",
	});
	const [errors, setErrors] = useState({
		nombre: "",
		direccion: "",
		telefono: "",
		rut: "",
	});

	console.log(errors);
	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProvider({ ...provider, [name]: value });

		const newErrors = validationProvider({
			...provider,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const clearForm = () => {
		setProvider({
			nombre: "",
			direccion: "",
			telefono: "",
			rut: "",
		});
	};

	const onSubmit = async () => {
		try {
			if (Object.keys(errors).length > 0) {
				throw new Error("Existen errores en el formulario");
			}

			setLoading(true);
			const response = await axios.post("/providers/provider/create", {
				nombre: provider.nombre,
				direccion: provider.direccion,
				telefono: provider.telefono,
				rut: provider.rut,
				userId: session.id,
			});

			if (response.data) {
				Swal.fire({
					title: "El proveedor se creo correctamente!",
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
						return navigate(`/providers/create`);
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
						<h1> Gestion de Proveedores</h1>
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
								<span className={style.modal__title}>Nuevo Proveedor</span>
							</div>
							<div className={style.modal__body}>
								<div className={style.input}>
									<label className={style.input__label}>
										Nombre de proveedor
									</label>
									<input
										className={style.input__field}
										type="text"
										id="nombre"
										name="nombre"
										value={provider.nombre}
										onInput={handleChange}
										maxLength={31}
									/>
									<p className={style.input__description}>{errors.nombre}</p>
									<label className={style.input__label}>Dirección</label>
									<input
										type="text"
										id="direccion"
										name="direccion"
										value={provider.direccion}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>{errors.direccion}</p>
									<label className={style.input__label}>Telefono</label>
									<input
										type="text"
										id="telefono"
										name="telefono"
										value={provider.telefono}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>{errors.telefono}</p>
									<label className={style.input__label}>RUT - NIT</label>
									<input
										type="text"
										id="rut"
										name="rut"
										value={provider.rut}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>{errors.rut}</p>
									<button
										className={style.button_submit}
										onClick={() => onSubmit(provider)}>
										Crear Proveedor{" "}
									</button>
								</div>
							</div>
						</div>
						<div>
							<Proveedores
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
