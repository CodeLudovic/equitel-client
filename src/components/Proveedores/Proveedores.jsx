/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Proveedores.module.css";
import { Loader } from "../Loader/Loader";
import { Proveedor } from "../Proveedor/Proveedor";

const Proveedores = ({ updateContextUser }) => {
	const [dataProviders, setDataProviders] = useState([]);
	const [loading, setLoading] = useState(false);
	const session = JSON.parse(localStorage.getItem("userOnSession"));

	const updateDataAfterChanges = () => {
		fetchData();
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/providers/all`);
			setDataProviders((prevState) => ({
				...prevState,
				data: response.data.providers,
			}));
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center",
			}}>
			{!loading && (
				<div className={Styles.usersContainer}>
					<section>
						<div>
							{dataProviders?.data && dataProviders?.data?.length !== 0 ? (
								<table>
									<tbody>
										<tr>
											<th>ID</th>
											<th>Nombre</th>
											<th>Direccion</th>
											<th>Telefono</th>
											<th>RUT - NIT</th>
											<th>Acciones</th>
										</tr>
										{dataProviders.data
											?.sort((a, b) => a.id - b.id)
											.map((provider, index) => (
												<tr key={index}>
													<Proveedor
														id={provider.id}
														key={index}
														provider={provider}
														index={index}
														setLoading={setLoading}
														updateDataAfterChanges={updateDataAfterChanges}
													/>
												</tr>
											))}
									</tbody>
								</table>
							) : (
								<div>No hay usuarios disponibles</div>
							)}
						</div>
					</section>
				</div>
			)}
			{loading && <Loader />}
		</div>
	);
};

export default Proveedores;
