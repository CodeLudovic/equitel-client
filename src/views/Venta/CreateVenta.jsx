/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import style from "./CreateVenta.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validationVenta } from "../../utils/validators";
import { Loader } from "../../components/Loader/Loader";
import { getProducts, isValidStock } from "../../utils/helpers";

export const CreateVenta = ({ updateContextUser }) => {
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [productos, setProductos] = useState([]);
	const [venta, setVenta] = useState({
		nombre: "",
		identificacion: "",
		cantidad: 1,
		id_producto: "",
	});

	const [errors, setErrors] = useState({
		nombre: "",
		identificacion: "",
		cantidad: "",
		id_producto: "",
	});

	const fetchDataProductos = async () => {
		const productos = await getProducts();
		setProductos(productos.data.rows.sort((a, b) => a.id - b.id));
	};
	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
		fetchDataProductos();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "cantidad") {
			if (!isValidStock(value)) {
				return;
			}
		}
		setVenta({ ...venta, [name]: value });
		const newErrors = validationVenta({
			...venta,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const clearForm = () => {
		setVenta({
			nombre: "",
			identificacion: "",
			cantidad: 1,
			id_producto: "",
		});
	};
	console.log(errors);
	const prod = productos.filter((p) => p.id === venta.id_producto);
	const onSubmit = async () => {
		try {
			if (Object.keys(errors).length > 0) {
				throw new Error("Existen errores en el formulario");
			}
			if (prod[0].stock < venta.cantidad) {
				throw new Error("No existe stock para la cantidad ingresada");
			}

			setLoading(true);
			const response = await axios.post("/sales/sale", {
				nombre: venta.nombre,
				identificacion: venta.identificacion,
				cantidad: venta.cantidad,
				id_product: venta.id_producto,
				id_user: session.id,
			});

			if (response.data) {
				Swal.fire({
					title: "La venta se registro correctamente!",
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
						//return navigate(`/sales/sale/sucess`);
					});
			}
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Validar Formulario de Venta",
				text: `Por favor revisa y completa todos los campos del form. ${error}`,
				icon: "warning",
				confirmButtonText: "Completar Venta",
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
						<h1> Registro de Venta </h1>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "90vw",
						}}>
						<div className={style.modal}>
							<div className={style.modal__header}>
								<span className={style.modal__title}>Nueva Venta</span>
							</div>
							<div className={style.modal__body}>
								<div className={style.input}>
									<label className={style.input__label}>
										Nombre Comprador:
									</label>
									<input
										className={style.input__field}
										type="text"
										id="nombre"
										name="nombre"
										value={venta.nombre}
										onInput={handleChange}
										maxLength={31}
									/>
									<p className={style.input__description}>{errors.nombre}</p>
									<label className={style.input__label}>
										identificacion Comprador
									</label>
									<input
										type="email"
										id="identificacion"
										name="identificacion"
										value={venta.email}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>
										{errors.identificacion}
									</p>
									<label className={style.input__label}>Producto:</label>
									<select
										className={style.input__field}
										id="id_producto"
										name="id_producto"
										onInput={handleChange}>
										<option name="products" value="Products" selected>
											Seleccione un producto
										</option>
										{productos?.map((producto, index) => {
											return (
												<option key={index} value={producto.id}>
													{producto.nombre}
												</option>
											);
										})}
									</select>
									<p className={style.input__description}>
										{errors.id_producto}
									</p>
									<label className={style.input__label}>Cantidad</label>
									<input
										type="number"
										id="cantidad"
										name="cantidad"
										value={venta.cantidad}
										className={style.input__field}
										onInput={handleChange}
										min="0"
									/>
									<p className={style.input__description}>{errors.cantidad}</p>
									<button
										className={style.button_submit}
										onClick={() => onSubmit(venta)}>
										Registrar Venta{" "}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{loading && <Loader />}
		</>
	);
};
