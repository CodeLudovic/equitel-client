/* eslint-disable */
import React, { useState } from "react";
import style from "./InformeDiario.module.css";
import Informes from "../../components/Informes/Informes";

export const InformeDiario = ({ updateContextUser }) => {
	const [informeDiario, setInformeDiario] = useState(true);
	return (
		<div className={style.divInformes}>
			<Informes updateContextUser={updateContextUser} informe={informeDiario} />
		</div>
	);
};
