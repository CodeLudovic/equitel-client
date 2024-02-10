/* eslint-disable */

import React, { useState } from "react";
import style from "./ControlStock.module.css";
import Productos from "../../components/Productos/Productos";
import { BotonIr } from "../../components/BotonIr/BotonIr";

export const ControlStock = ({ updateContextUser }) => {
	const [loading, setLoading] = useState(false);

	return (
		<div className={style.controlContainer}>
			<div>
				<h1>Control de Inventario y Stock</h1>
			</div>
			<div className={style.contentTable}>
				<Productos
					updateContextUser={updateContextUser}
					setLoading={setLoading}
					loading={loading}
					control={true}
				/>
			</div>
			<div>
				<BotonIr
					styles={style.button_submit}
					url={"/products/create"}
					texto={"Ir a Productos"}
				/>
			</div>
		</div>
	);
};
