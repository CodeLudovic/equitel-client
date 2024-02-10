/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Informes.module.css";
import { Loader } from "../Loader/Loader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";

const Informes = ({ updateContextUser, informe }) => {
	const [dataSales, setDataSales] = useState();
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState(false);
	const session = JSON.parse(localStorage.getItem("userOnSession"));

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/sales/informe-ventas`);
			setDataSales(response.data.ventas);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchDataDialyReport = async (fechaInicio, fechaFinal) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`/sales/informe-ventas?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`
			);
			setDataSales(response.data.ventas);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handlerCalcSales = () => {
		let datas = dataSales;
		let totalUserSales = 0;
		if (datas && datas.length) {
			for (let i = 0; i < datas.length; i++) {
				if (session?.id === datas[i].id_usuario) {
					totalUserSales += datas[i].precio_unidad * datas[i].cantidad;
				}
			}
		}
		return totalUserSales;
	};

	const handlerCalcSalesGlobal = () => {
		let datas = dataSales;
		let totalUserSales = 0;
		if (datas && datas.length) {
			for (let i = 0; i < datas.length; i++) {
				totalUserSales += datas[i].precio_unidad * datas[i].cantidad;
			}
		}
		return totalUserSales;
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			fetchData();
		}, 1500);
	}, []);

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
		handlerCalcSales();
	}, []);

	const generarInforme = async (e) => {
		e.preventDefault();

		const inicio = document.getElementById("inicio").value;
		const fin = document.getElementById("final").value;

		if (inicio !== "" && fin !== "") {
			await fetchDataDialyReport(inicio, fin);
			return setSearch(true);
		}

		Swal.fire({
			title: "Informe Diario",
			icon: "info",
			text: "debe ingresar la fecha inicio y la fecha fin para generar el informe",
			showConfirmButton: true,
			confirmButtonText: "Confirmar",
			customClass: {
				popup: "mySwal",
			},
		})
			.then(() => {})
			.finally(() => {});
	};

	const generarPdf = () => {
		setLoading(true);
		const totalSales = handlerCalcSalesGlobal();
		axios
			.post("/crear-pdf", { dataSales, totalSales })
			.then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
			.then((res) => {
				const pdfBlob = new Blob([res.data], {
					type: "application/pdf",
				});
				saveAs(pdfBlob, "InformeDiario.pdf");
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center",
			}}>
			{!loading &&
				(!informe ? (
					<div className={Styles.informsContainer}>
						<div>
							<h1>Historial de Ventas</h1>
						</div>
						<section>
							<div>
								{dataSales?.length !== 0 ? (
									<table>
										<tbody>
											<tr>
												<th>ID</th>
												<th>Producto</th>
												<th>Cantidad</th>
												<th>Valor Unitario</th>
												<th>Valor Monto</th>
											</tr>
											{dataSales
												?.filter((element) => element.id_usuario === session.id)
												?.map((sale, index) => (
													<tr key={index}>
														<td>{sale?.id}</td>
														<td>{sale?.producto}</td>
														<td>{sale?.cantidad}</td>
														<td>$ {sale?.precio_unidad}</td>
														<td>$ {sale?.precio_unidad * sale?.cantidad}</td>
													</tr>
												))}
											<tr>
												<th>Total Ventas:</th>
												<th></th>
												<th></th>
												<th></th>
												<th>$ {handlerCalcSales()}</th>
											</tr>
										</tbody>
									</table>
								) : (
									<div>No hay ventas disponibles para este usuario.</div>
								)}
							</div>
						</section>
					</div>
				) : (
					<div className={Styles.informsContainer}>
						<div className={Styles.divInformeDiario}>
							<div>
								<h1>Informe Diario</h1>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "30px",
									marginTop: "30px",
								}}>
								<label>Fecha de Inicio</label>
								<input
									type="date"
									name="inicio"
									id="inicio"
									disabled={search ? true : false}
								/>

								<label>Fecha de Final</label>
								<input
									type="date"
									name="final"
									id="final"
									disabled={search ? true : false}
								/>
							</div>
						</div>
						<section>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "25px",
								}}>
								{search &&
									(dataSales?.length !== 0 ? (
										<motion.table>
											<tbody>
												<tr>
													<th>ID</th>
													<th>Producto</th>
													<th>Cantidad</th>
													<th>Valor Unitario</th>
													<th>Valor Monto</th>
												</tr>
												{dataSales?.map((sale, index) => (
													<tr key={index}>
														<td>{sale?.id}</td>
														<td>{sale?.producto}</td>
														<td>{sale?.cantidad}</td>
														<td>$ {sale?.precio_unidad}</td>
														<td>$ {sale?.precio_unidad * sale?.cantidad}</td>
													</tr>
												))}
												<tr>
													<th>Total Ventas:</th>
													<th></th>
													<th></th>
													<th></th>
													<th>$ {handlerCalcSalesGlobal()}</th>
												</tr>
											</tbody>
										</motion.table>
									) : (
										<div>No hay ventas disponibles para este usuario.</div>
									))}
								{!search && (
									<button
										className={Styles.button_submit}
										onClick={(e) => generarInforme(e)}
										disabled={search ? true : false}>
										Generar Informe
									</button>
								)}
								{search && (
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											gap: "20px",
										}}>
										<button
											className={Styles.button_submit}
											onClick={() => generarPdf()}>
											Descargar Informe
										</button>
										<button
											className={Styles.button_submit}
											onClick={() => setSearch(!search)}>
											Reiniciar Informe
										</button>
									</div>
								)}
							</div>
						</section>
					</div>
				))}
			{loading && <Loader />}
		</div>
	);
};

export default Informes;
