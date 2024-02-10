/* eslint-disable */

import styles from "./layout.module.css";
import ventas from "../assets/ventas.jpg";
import { useEffect } from "react";

export const Layout = ({ updateContextUser }) => {
	useEffect(() => {
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);
	return (
		<div className={styles.layoutContent}>
			<div className={styles.layoutContentItem}>
				<h2>Bienvenido a Equitel</h2>
			</div>
			<img className={styles.imageHero} src={ventas} />
			<div className={styles.registroBannerContainer}>
				<h3>Sistema de Gestion de Ventas y Reportes </h3>
			</div>
		</div>
	);
};
