/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router";
export const BotonIr = ({ url, texto, styles }) => {
	const navigate = useNavigate();

	const handleGoProducts = (url) => {
		navigate(url);
	};
	return (
		<button className={styles} onClick={() => handleGoProducts(url)}>
			{texto}
		</button>
	);
};
