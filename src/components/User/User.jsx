/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import styles from "./User.module.css";
import Swal from "sweetalert2/dist/sweetalert2";
import axios from "axios";
import { rolDataSelector } from "../../utils/helpers";
import { encrypt } from "../../utils/encode";

export const User = ({ user, updateDataAfterChanges, setLoading }) => {
	const userData = useContext(userContext);
	const deleteUser = async (id) => {
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
						.delete("/users/user/delete", {
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
	const editUser = async (id) => {
		try {
			let { value: formValues } = await Swal.fire({
				title: "Modificar Usuario",
				html: `
					<form style="display: flex; flex-direction: column; align-items: center; font-family: 'Roboto', sans-serif; height: 525px;">
					<label for="swal-input1" class="swal2-label">Nombre:</label>
					<input id="swal-input1" class="swal2-input" value='${user.nombre}'>

					<label for="swal-input2" class="swal2-label">Email:</label>
					<input id="swal-input2" class="swal2-input" value='${user.email}'>

					<label for="swal-input3" class="swal2-label">Password:</label>
					<input id="swal-input3" class="swal2-input" type="password" value='${
						user.password
					}'>

					<label for="swal-input4" class="swal2-label">Rol de Usuario:</label>
					<select id="swal-input4" class="swal2-select swal2-input">
						<option value="Tipo de usuario">Seleccione un usuario</option>
						${rolDataSelector
							.map(
								(rol, index) => `
							<option id="rol-${index}" class="swal2-select swal2-input" value="${rol}" ${
									rol === user.type ? "selected" : ""
								}>
								${rol === "admin" ? "Administrador" : rol === "seller" ? "Vendedor" : ""}
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
							.put("/users/user/edit", {
								nombre: formValues[0],
								email: formValues[1],
								password: encrypt(formValues[2]) || user.password,
								type: formValues[3],
								id: id,
								id_admin: userData.id,
							})
							.then((res) => {
								updateDataAfterChanges();
								Swal.fire({
									icon: "success",
									title: "Se ha modificado el usuario",
									customClass: {
										popup: "mySwal",
									},
								});
							})
							.catch(() => {
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
			console.log(error);
		}
	};
	return (
		<>
			<td>{user?.id}</td>
			<td>{user?.nombre}</td>
			<td>{user?.email}</td>
			<td>{user?.type}</td>
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
						onClick={() => deleteUser(user.id)}>
						❌
					</button>
				) : (
					""
				)}
				{userData?.type === "admin" ? (
					<button
						className={styles.button_action}
						onClick={() => editUser(user.id)}>
						✏️
					</button>
				) : (
					""
				)}
			</td>
		</>
	);
};
