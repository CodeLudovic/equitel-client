/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Productos.module.css";
import { Loader } from "../Loader/Loader";
import { Producto } from "../Producto/Producto";

const Productos = ({ updateContextUser, providers, control }) => {
	const [dataProducts, setDataProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const updateDataAfterChanges = () => {
		fetchData();
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/products/all`);
			setDataProducts((prevState) => ({
				...prevState,
				data: response.data,
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
							{dataProducts?.data?.rows &&
							dataProducts?.data?.rows?.length !== 0 ? (
								!control ? (
									<table>
										<tbody>
											<tr>
												<th>ID</th>
												<th>Nombre</th>
												<th>Stock</th>
												<th>Descripcion</th>
												<th>Modelo</th>
												<th>Precio</th>
												<th>Proveedor</th>
												<th>Acciones</th>
											</tr>
											{dataProducts.data?.rows?.map((product, index) => (
												<tr key={index}>
													<Producto
														id={product.id}
														key={index}
														product={product}
														providers={providers}
														index={index}
														setLoading={setLoading}
														updateDataAfterChanges={updateDataAfterChanges}
													/>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<table>
										<tbody>
											<tr>
												<th>ID</th>
												<th>Nombre</th>
												<th>Stock</th>
												<th>Descripcion</th>
												<th>Modelo</th>
												<th>Precio</th>
												<th>Proveedor</th>
												<th>Acciones</th>
											</tr>
											{dataProducts.data?.rows?.map((product, index) => (
												<tr key={index}>
													<Producto
														id={product.id}
														key={index}
														product={product}
														providers={providers}
														index={index}
														setLoading={setLoading}
														updateDataAfterChanges={updateDataAfterChanges}
														control={control}
													/>
												</tr>
											))}
										</tbody>
									</table>
								)
							) : (
								<div>No hay Productos Disponibles</div>
							)}
						</div>
					</section>
				</div>
			)}
			{loading && <Loader />}
		</div>
	);
};
export default Productos;
