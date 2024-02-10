/* eslint-disable */
import React from "react";
import style from "./Informe.module.css";
import Informes from "../../components/Informes/Informes";

export const Informe = ({ updateContextUser }) => {
	return (
		<div className={style.divInformes}>
			<Informes updateContextUser={updateContextUser} />
		</div>
	);
};
