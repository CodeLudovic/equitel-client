/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import style from "./CreateProduct.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validationProduct } from "../../utils/validators";
import { getProviders, isValidStock } from "../../utils/helpers";
import { Loader } from "../../components/Loader/Loader";
import Productos from "../../components/Productos/Productos";

export const CreateProduct = ({ updateContextUser }) => {
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [providers, setProviders] = useState([]);
	const [product, setProduct] = useState({
		nombre: "",
		stock: 0,
		descripcion: "",
		modelo: "",
		precio: 0,
		proveedorId: 0,
	});

	const [errors, setErrors] = useState({
		nombre: "",
		password: "",
		email: "",
	});
	const fetchDataProviders = async () => {
		const providers = await getProviders();
		setProviders(providers.data.providers.sort((a, b) => a.id - b.id));
	};

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	useEffect(() => {
		fetchDataProviders();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "stock" || name === "precio") {
			if (!isValidStock(value)) {
				return;
			}
		}
		setProduct({ ...product, [name]: value });
		const newErrors = validationProduct({
			...product,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const clearForm = () => {
		setProduct({
			nombre: "",
			stock: 0,
			descripcion: "",
			modelo: "",
			precio: 0,
			proveedorId: 0,
		});
	};

	const onSubmit = async () => {
		try {
			if (Object.keys(errors).length > 0) {
				throw new Error("Existen errores en el formulario");
			}

			setLoading(true);
			const response = await axios.post("/products/product/create", {
				nombre: product.nombre,
				stock: +product.stock,
				descripcion: product.descripcion,
				modelo: product.modelo,
				precio: +product.precio,
				proveedorId: +product.proveedorId,
				userId: session.id,
			});

			if (response.data) {
				Swal.fire({
					title: "El producto se creo correctamente!",
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
						return navigate(`/products/product/create`);
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
						<h1> Gestion de Productos</h1>
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
								<span className={style.modal__title}>Nuevo Producto</span>
							</div>
							<div className={style.modal__body}>
								<div className={style.input}>
									<label className={style.input__label}>
										Nombre del producto
									</label>
									<input
										className={style.input__field}
										type="text"
										id="nombre"
										name="nombre"
										value={product.nombre}
										onInput={handleChange}
										maxLength={31}
									/>
									<p className={style.input__description}>{errors.nombre}</p>
									<label className={style.input__label}>Stock</label>
									<input
										type="number"
										id="stock"
										name="stock"
										value={product.stock}
										className={style.input__field}
										onInput={handleChange}
										min="0"
									/>
									<p className={style.input__description}>{errors.stock}</p>
									<label className={style.input__label}>Descripcion</label>
									<input
										type="text"
										id="descripcion"
										name="descripcion"
										value={product.descripcion}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>
										{errors.descripcion}
									</p>
									<label className={style.input__label}>Modelo</label>
									<input
										type="text"
										id="modelo"
										name="modelo"
										value={product.modelo}
										className={style.input__field}
										onInput={handleChange}
										maxLength={90}
									/>
									<p className={style.input__description}>{errors.modelo}</p>
									<label className={style.input__label}>Precio</label>
									<input
										type="number"
										id="precio"
										name="precio"
										value={product.precio}
										className={style.input__field}
										onInput={handleChange}
										min="0"
									/>
									<p className={style.input__description}>{errors.precio}</p>
									<label className={style.input__label}>Proveedor ID</label>
									<select
										className={style.input__field}
										id="proveedorId"
										name="proveedorId"
										onInput={handleChange}>
										<option name="proveedores" value="proveedor" selected>
											Seleccione un proveedor
										</option>
										{providers?.map((proveedor, index) => {
											return (
												<option key={index} value={proveedor.id}>
													{proveedor.id} - {proveedor.nombre}
												</option>
											);
										})}
									</select>
									<p className={style.input__description}>
										{errors.proveedorId}
									</p>
									<button
										className={style.button_submit}
										onClick={() => onSubmit(product)}>
										Crear Producto{" "}
									</button>
								</div>
							</div>
						</div>
						<div>
							<Productos
								updateContextUser={updateContextUser}
								setLoading={setLoading}
								loading={loading}
								providers={providers}
								control={false}
							/>
						</div>
					</div>
				</div>
			)}
			{loading && <Loader />}
		</>
	);
};
