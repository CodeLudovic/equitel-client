/* eslint-disable */
import React, { useEffect, useState } from "react";
import Styles from "./App.module.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "../src/views/Layout";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./views/Login/Login.jsx";
import { CreateUser } from "./views/User/CreateUser.jsx";
import { CreateProduct } from "./views/Product/CreateProduct.jsx";
import { CreateProvider } from "./views/Provider/CreateProvider.jsx";
import { ControlStock } from "./views/ControlStock/ControlStock.jsx";
import { CreateVenta } from "./views/Venta/CreateVenta.jsx";
import { Informe } from "./views/Informe/Informe.jsx";
import axios from "axios";
import { InformeDiario } from "./views/InformeDiario/InformeDiario.jsx";

export const userContext = React.createContext();
function App() {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [logged, setLogged] = useState(null);
	const [registering, setRegistering] = useState(false);
	const shouldShowFooter = () => {
		return ![
			"/users/create",
			"/login",
			"/products/create",
			"/providers/create",
			"/sales/create",
		].includes(location.pathname);
	};

	const [user, setUser] = useState({});

	const updateContextUser = (newUser) => {
		setUser(newUser);
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(`/sales/informe-ventas`);
			setData(response.data.ventas);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const session = JSON.parse(localStorage.getItem("userOnSession"));

	useEffect(() => {
		if (session) {
			setLogged(!logged);
		}
		fetchData();
		setRegistering(false);
	}, []);
	const authenticatedAdminRoutes = (
		<>
			<Route
				path="/products/create"
				element={<CreateProduct updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/users/create"
				element={<CreateUser updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/providers/create"
				element={<CreateProvider updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/control/stock"
				element={<ControlStock updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/sales/create"
				element={
					<CreateVenta
						updateContextUser={updateContextUser}
						setLogged={setLogged}
						registering={registering}
						setRegistering={setRegistering}
						logged={logged}
					/>
				}
			/>
			<Route
				path="/sales/report"
				element={
					<Informe
						updateContextUser={updateContextUser}
						setLogged={setLogged}
						registering={registering}
						setRegistering={setRegistering}
						logged={logged}
						data={data}
					/>
				}
			/>
			<Route
				path="/sales/dialyreport"
				element={
					<InformeDiario
						updateContextUser={updateContextUser}
						setLogged={setLogged}
						registering={registering}
						setRegistering={setRegistering}
						logged={logged}
						data={data}
					/>
				}
			/>
		</>
	);

	const authenticatedRoutes = (
		<>
			<Route
				path="/sales/create"
				element={
					<CreateVenta
						updateContextUser={updateContextUser}
						setLogged={setLogged}
						registering={registering}
						setRegistering={setRegistering}
						logged={logged}
					/>
				}
			/>
			<Route
				path="/sales/report"
				element={
					<Informe
						updateContextUser={updateContextUser}
						setLogged={setLogged}
						registering={registering}
						setRegistering={setRegistering}
						logged={logged}
						data={data}
					/>
				}
			/>
		</>
	);

	const unauthenticatedRoutes = (
		<>
			<Route path="/" element={<Navigate to="/login" />} />
		</>
	);

	return (
		<>
			<userContext.Provider value={user}>
				<div className={Styles.appContainer}>
					{location.pathname === "/login" ? (
						""
					) : (
						<NavBar
							registering={registering}
							setRegistering={setRegistering}
							updateContextUser={updateContextUser}
						/>
					)}
					<Routes>
						<Route
							path="/"
							element={
								<Layout
									updateContextUser={updateContextUser}
									registering={registering}
									setRegistering={setRegistering}
									logged={logged}
								/>
							}
						/>
						{logged && user.type === "admin"
							? authenticatedAdminRoutes
							: logged
							? authenticatedRoutes
							: unauthenticatedRoutes}
						<Route
							path="/login/"
							element={
								<Login
									updateContextUser={updateContextUser}
									setLogged={setLogged}
									registering={registering}
									setRegistering={setRegistering}
									logged={logged}
								/>
							}
						/>

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
					{shouldShowFooter() && <Footer />}
				</div>
			</userContext.Provider>
		</>
	);
}

export default App;
