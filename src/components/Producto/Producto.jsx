/* eslint-disable */
import { useContext, useState } from "react";
import { userContext } from "../../App";
import styles from "./Producto.module.css";
import Swal from "sweetalert2/dist/sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

export const Producto = ({
	product,
	updateDataAfterChanges,
	setLoading,
	providers,
	control,
}) => {
	const userData = useContext(userContext);
	const [changes, setChanges] = useState(false);
	const [producto, setProducto] = useState(product);
	const stocker = document.getElementById("stocker")?.value;
	const nav = useNavigate();
	const deleteProduct = async (id) => {
		try {
			setLoading(true);
			Swal.fire({
				icon: "warning",
				title: "Atencion esta apunto de borrar el usuario, desea continuar?",
				showDenyButton: true,
				confirmButtonText: "Borrar",
				denyButtonText: `Cancelar`,
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete("/products/product/delete", {
							data: {
								id: id,
								id_admin: userData.id,
							},
						})
						.then((res) => {
							updateDataAfterChanges();
							Swal.fire({
								icon: "success",
								title: "Se ha eliminado el usuario",
								customClass: {
									popup: "mySwal",
								},
							});
						})
						.catch(() => {
							Swal.fire({
								icon: "error",
								title: "No se pudo borrar la tarea",
								customClass: {
									popup: "mySwal",
								},
							});
						})
						.finally(() => {
							setLoading(false);
						});
				} else if (result.isDenied) {
					setLoading(false);
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	const editProduct = async (id) => {
		try {
			let { value: formValues } = await Swal.fire({
				title: "Modificar Producto",
				html: `
				<form style="display: flex; flex-direction: column; align-items: center; font-family: 'Roboto', sans-serif; height: 756px;">
					<label for="swal-input1" class="swal2-label">Nombre:</label>
					<input id="swal-input1" class="swal2-input" value='${product.nombre}'>

					<label for="swal-input2" class="swal2-label">Stock:</label>
					<input id="swal-input2" type="number" class="swal2-input" value='${
						product.stock
					}'>

					<label for="swal-input3" class="swal2-label">Descripcion:</label>
					<input id="swal-input3" class="swal2-input" type="text" value='${
						product.descripcion
					}'>
					<label for="swal-input4" class="swal2-label">Modelo:</label>
					<input id="swal-input4" class="swal2-input" type="text" value='${
						product.modelo
					}'>
					<label for="swal-input5" class="swal2-label">Precio:</label>
					<input id="swal-input5" type="number" class="swal2-input" value='${
						product.precio
					}'>
					<label for="swal-input6" class="swal2-label">Proveedor ID:</label>
					<select id="swal-input6" class="swal2-select swal2-input">
						<option value="proveedores">Seleccione un proveedor</option>
						${providers
							.map(
								(provider, index) => `
							<option id="rol-${index}" class="swal2-select swal2-input" value="${
									provider.id
								}" ${provider.id === product.proveedorId ? "selected" : ""}>
								${provider.id} - ${provider.nombre}
							</option>`
							)
							.join("")}
					</select>
					</form>
				`,
				focusConfirm: false,
				preConfirm: () => {
					const input1 = document.getElementById("swal-input1");
					const input2 = document.getElementById("swal-input2");
					const input3 = document.getElementById("swal-input3");
					const input4 = document.getElementById("swal-input4");
					const input5 = document.getElementById("swal-input5");
					const input6 = document.getElementById("swal-input6");
					if (input1 && input2 && input3 && input4 && input5 && input6) {
						return [
							input1.value,
							input2.value,
							input3.value,
							input4.value,
							input5.value,
							input6.value,
						];
					}
					return null;
				},
			});
			if (formValues) {
				Swal.fire({
					title: "Desea guardar los cambios?",
					showDenyButton: true,
					showCancelButton: true,
					confirmButtonText: "Guardar",
					denyButtonText: `Cancelar`,
				}).then((result) => {
					setLoading(true);
					if (result.isConfirmed) {
						if (+formValues[1] <= 0) {
							setLoading(false);
							return Swal.fire({
								icon: "error",
								title: `El stock debe ser mayor a cero`,
								customClass: {
									popup: "mySwal",
								},
							});
						}
						axios
							.put("/products/product/edit", {
								nombre: formValues[0] || product.nombre,
								stock: +formValues[1] || product.stock,
								descripcion: formValues[2] || product.descripcion,
								modelo: formValues[3] || product.modelo,
								precio: +formValues[4] || product.precio,
								ProveedorId: +formValues[5] || product.proveedorId,
								id: id,
								id_admin: userData.id,
							})
							.then((res) => {
								updateDataAfterChanges();
								Swal.fire({
									icon: "success",
									title: "Se ha modificado el producto",
									customClass: {
										popup: "mySwal",
									},
								});
							})
							.catch(() => {
								setLoading(false);
								Swal.fire({
									icon: "error",
									title: "No se pudo modificar la tarea",
									customClass: {
										popup: "mySwal",
									},
								});
							})
							.finally(() => {
								setLoading(false);
							});
					} else if (result.isDenied) {
						Swal.fire("Se cancelo la operación", "", "info");
					}
				});
			}
		} catch (error) {
			setLoading(false);
			Swal.fire({
				icon: "error",
				title: `${error.message}`,
				customClass: {
					popup: "mySwal",
				},
			});
		}
	};

	const editStock = async (id) => {
		try {
			Swal.fire({
				title: "Desea guardar los cambios?",
				showDenyButton: true,
				showCancelButton: true,
				confirmButtonText: "Guardar",
				denyButtonText: `Cancelar`,
			}).then((result) => {
				setLoading(true);
				if (result.isConfirmed) {
					if (stocker <= 0) {
						setLoading(false);
						return Swal.fire({
							icon: "error",
							title: `El stock debe ser mayor a cero`,
							customClass: {
								popup: "mySwal",
							},
						});
					}
					console.log(producto);
					axios
						.put("/products/product/edit", {
							nombre: producto.nombre,
							stock: producto.stock || product.stock,
							descripcion: producto.descripcion,
							modelo: producto.modelo,
							precio: producto.precio,
							ProveedorId: producto.proveedorId || null,
							id: id,
							id_admin: userData.id,
						})
						.then((res) => {
							updateDataAfterChanges();
							Swal.fire({
								icon: "success",
								title: "Se ha modificado el producto",
								customClass: {
									popup: "mySwal",
								},
							});
						})
						.catch(() => {
							setLoading(false);
							Swal.fire({
								icon: "error",
								title: "No se pudo modificar la tarea",
								customClass: {
									popup: "mySwal",
								},
							});
						})
						.finally(() => {
							nav("/products/create");
							setLoading(false);
						});
				} else if (result.isDenied) {
					Swal.fire("Se cancelo la operación", "", "info");
				}
			});
		} catch (error) {
			setLoading(false);
			Swal.fire({
				icon: "error",
				title: `${error.message}`,
				customClass: {
					popup: "mySwal",
				},
			});
		}
	};

	const handleStockChange = (e) => {
		const newStock = e.target.value;
		const preState = parseInt(product.stock);
		if (preState === parseInt(newStock)) {
			console.log("entre aqui");
			setProducto((prevState) => ({ ...prevState, stock: parseInt(newStock) }));
			return setChanges(false);
		}
		setProducto((prevState) => ({ ...prevState, stock: parseInt(newStock) }));
		setChanges(true);
	};

	return (
		<>
			{!control ? (
				<>
					<td>{product?.id}</td>
					<td>{product?.nombre}</td>
					<td>{product?.stock}</td>
					<td>{product?.descripcion}</td>
					<td>{product?.modelo}</td>
					<td>$ {product?.precio}</td>
					<td style={product?.proveedorId === null ? { fontSize: "10px" } : {}}>
						{product?.proveedorId === null
							? "Proveedor Eliminado"
							: `ID: ${product?.proveedorId}`}
					</td>
					<td
						id="acciones"
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "15px",
							justifyContent: "center",
							alignItems: " center",
						}}>
						{userData?.type === "admin" ? (
							<button
								className={styles.button_action}
								onClick={() => deleteProduct(product.id)}>
								❌
							</button>
						) : (
							""
						)}
						{userData?.type === "admin" ? (
							<button
								className={styles.button_action}
								onClick={() => editProduct(product.id)}>
								✏️
							</button>
						) : (
							""
						)}
					</td>
				</>
			) : (
				<>
					<td>{product?.id}</td>
					<td>{product?.nombre}</td>
					<td>
						<input
							type="number"
							id="stocker"
							value={producto.stock}
							onInput={(e) => handleStockChange(e)}
							disabled={producto.proveedorId ? false : true}></input>
					</td>
					<td>{product?.descripcion}</td>
					<td>{product?.modelo}</td>
					<td>$ {product?.precio}</td>
					<td>
						{product?.proveedorId === null
							? "Proveedor Eliminado"
							: `ID: ${product?.proveedorId}`}
					</td>
					<td
						id="acciones"
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "15px",
							justifyContent: "center",
							alignItems: " center",
						}}>
						{userData?.type === "admin" && product.proveedorId ? (
							<button
								className={styles.button_action}
								onClick={() => editStock(product.id)}
								disabled={!changes}>
								✏️ Guardar
							</button>
						) : (
							""
						)}
					</td>
				</>
			)}
		</>
	);
};
