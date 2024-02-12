/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import styles from "./Proveedor.module.css";
import Swal from "sweetalert2/dist/sweetalert2";
import axios from "axios";

export const Proveedor = ({ provider, updateDataAfterChanges, setLoading }) => {
	const userData = useContext(userContext);
	const deleteProvider = async (id) => {
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
						.delete("/providers/provider/delete", {
							data: {
								id_proveedor: id,
								id_user: userData.id,
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
	const editProvider = async (id) => {
		try {
			let { value: formValues } = await Swal.fire({
				title: "Modificar Usuario",
				html: `
					<form style="display: flex; flex-direction: column; align-items: center; font-family: 'Roboto', sans-serif; height: 542px;">
					<label for="swal-input1" class="swal2-label">Nombre:</label>
					<input id="swal-input1" class="swal2-input" value='${provider.nombre}'>

					<label for="swal-input2" class="swal2-label">Direccion:</label>
					<input id="swal-input2" class="swal2-input" value='${provider.direccion}'>

					<label for="swal-input3" class="swal2-label">Telefono:</label>
					<input id="swal-input3" class="swal2-input" type="text" value='${provider.telefono}'>

					<label for="swal-input4" class="swal2-label">RUT - NIT:</label>
					<input id="swal-input4" class="swal2-input" type="text" value='${provider.rut}'>
					</form>
					
				`,
				focusConfirm: false,
				preConfirm: () => {
					const input1 = document.getElementById("swal-input1");
					const input2 = document.getElementById("swal-input2");
					const input3 = document.getElementById("swal-input3");
					const input4 = document.getElementById("swal-input4");
					if (input1 && input2 && input3 && input4) {
						return [input1.value, input2.value, input3.value, input4.value];
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
						axios
							.put("/providers/provider/edit", {
								nombre: formValues[0] || provider.nombre,
								direccion: formValues[1] || provider.direccion,
								telefono: formValues[2] || provider.telefono,
								rut: formValues[3] || provider.rut,
								id: id,
								id_admin: userData.id,
							})
							.then((res) => {
								updateDataAfterChanges();
								Swal.fire({
									icon: "success",
									title: "Se ha modificado el proveedor",
									customClass: {
										popup: "mySwal",
									},
								});
							})
							.catch(() => {
								Swal.fire({
									icon: "error",
									title: "No se pudo modificar el proveedor",
									customClass: {
										popup: "mySwal",
									},
								});
							})
							.finally(() => {
								setLoading(false);
							});
					} else if (result.isDenied) {
						Swal.fire({
							icon: "info",
							title: "Se cancelo la modificación",
							customClass: {
								popup: "mySwal",
							},
						});
					}
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: `No se pudo modificar el proveedor ${error.message}`,
				customClass: {
					popup: "mySwal",
				},
			});
		}
	};
	return (
		<>
			<td>{provider?.id}</td>
			<td>{provider?.nombre}</td>
			<td>{provider?.direccion}</td>
			<td>{provider?.telefono}</td>
			<td>{provider?.rut}</td>
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
						onClick={() => deleteProvider(provider.id)}>
						❌
					</button>
				) : (
					""
				)}
				{userData?.type === "admin" ? (
					<button
						className={styles.button_action}
						onClick={() => editProvider(provider.id)}>
						✏️
					</button>
				) : (
					""
				)}
			</td>
		</>
	);
};
