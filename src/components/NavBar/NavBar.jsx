/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Styles from "../NavBar/NavBar.module.css";
import nonuser from "../../assets/nonuser.png";
import user from "../../assets/user.png";
import { clear } from "../../utils/clear";
import { motion } from "framer-motion";

const Navbar = ({ updateContextUser }) => {
	const userData = useContext(userContext);
	useEffect(() => {
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleNavigateToProviders = () => {
		navigate(`/providers/create`);
	};

	const handleNavigateToInformDialy = () => {
		navigate(`/sales/dialyreport`);
	};

	const handleNavigateToUsers = () => {
		navigate(`/users/create`);
	};

	const handleNavigateToProducts = () => {
		navigate(`/products/create`);
	};

	const handleNavigateToControl = () => {
		navigate(`/control/stock`);
	};

	const handleNavigateToVentas = () => {
		navigate(`/sales/create`);
	};

	const handleNavigateToReporte = () => {
		navigate(`/sales/report`);
	};

	const handleNavigateToLogsAudit = () => {
		navigate(`/auditlogs/logs`);
	};

	const signOutFn = () => {
		if (userData) {
			clear();
			setuserOnSession({});
		} else {
			alert("No hay ningún usuario en sesión, por favor recargue la página");
		}
	};
	const handleMouseEnter = () => {
		setIsModalOpen(true);
	};

	const handleMouseLeave = () => {
		setIsModalOpen(false);
	};

	const handleClick = () => {
		if (window.innerWidth < 768) {
			setOpen(!open);
		}
	};

	const spring = {
		type: "spring",
		damping: 125,
		stiffness: 500,
	};

	return (
		<div className={Styles.navbarContainer}>
			<nav>
				<div className={Styles.navbarLogo}>
					<h1 style={{ fontFamily: "fantasy" }}>Equitel</h1>
				</div>
				<div className={Styles.navbarAssets}>
					<div className={`${Styles.navbarLinks} ${open ? Styles.active : ""}`}>
						<div>
							<ul>
								<li>
									<NavLink to={"/"}>Inicio</NavLink>
								</li>
								<li
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}>
									<div className={Styles.imgProfile}>
										<img src={userData ? user : nonuser} />
									</div>
									{isModalOpen &&
										(!userData ? (
											<motion.div
												className={Styles.modal}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={spring}>
												<div className={Styles.modalContent}>
													<NavLink to={"/login"}>Iniciar Sesion</NavLink>
												</div>
											</motion.div>
										) : (
											<motion.div
												className={Styles.modal}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={spring}>
												<div className={Styles.modalContent}>
													<h2>Hola, {userData.nombre}</h2>
													<button onClick={() => handleNavigateToVentas()}>
														Realizar Venta
													</button>
													<button onClick={() => handleNavigateToReporte()}>
														Informe de Ventas
													</button>
													{userData.type === "admin" && (
														<>
															<hr />
															<button onClick={() => handleNavigateToUsers()}>
																Gestion De Usuarios
															</button>
															<button
																onClick={() => handleNavigateToProducts()}>
																Gestion de Productos
															</button>
															<button
																onClick={() => handleNavigateToProviders()}>
																Gestion De Proveedores
															</button>
															<hr />
															<button onClick={() => handleNavigateToControl()}>
																Control de Stock
															</button>
															<button
																onClick={() => handleNavigateToInformDialy()}>
																Informe Diario de Ventas
															</button>
															<hr />
															<button
																onClick={() => handleNavigateToLogsAudit()}>
																Logs de Auditoria
															</button>
														</>
													)}
													<hr />
													<button onClick={signOutFn}>Log Out</button>
												</div>
											</motion.div>
										))}
								</li>
							</ul>
						</div>
					</div>
					<div className={Styles.navbarToggle} onClick={handleClick}>
						{open ? (
							<svg
								className={Styles.menuClose}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke="currentColor"
								fill="none">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M18 6l-12 12"></path>
								<path d="M6 6l12 12"></path>
							</svg>
						) : (
							<svg
								className={Styles.menuOpen}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke="currentColor"
								fill="none">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M4 6h16"></path>
								<path d="M7 12h13"></path>
								<path d="M10 18h10"></path>
							</svg>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
