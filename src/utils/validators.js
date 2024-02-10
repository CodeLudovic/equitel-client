export const validationUser = (props) => {
	let errors = {};
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!props.nombre) {
		errors.nombre = "El nombre es obligatorio.";
	} else if (props.nombre.length < 3) {
		errors.nombre = "Debe tener al menos 3 caracteres.";
	} else if (props.nombre.length > 30) {
		errors.nombre = "Debe tener menos de 31 caracteres.";
	}
	if (!props.email) {
		errors.email = "Debe ingresar el correo del usuario.";
	} else if (!emailRegex.test(props.email)) {
		errors.email = "El correo debe estar bien formateado";
	}
	if (!props.type) {
		errors.type = "Debe ingresar el rol del usuario a crear";
	}
	if (props.type === "Seleccione un usuario") {
		errors.type = "Debe seleccionar una opcion del selector diferente a esta";
	}

	return errors;
};

export const validationProduct = (props) => {
	let errors = {};

	if (!props.nombre) {
		errors.nombre = "El nombre es obligatorio.";
	} else if (props.nombre.length < 3) {
		errors.nombre = "Debe tener al menos 3 caracteres.";
	} else if (props.nombre.length > 30) {
		errors.nombre = "Debe tener menos de 31 caracteres.";
	}

	if (!props.stock) {
		errors.stock = "Debe ingresar el stock del producto.";
	} else if (!props.stock > 0) {
		errors.stock = "Debe tener al menos 3 caracteres.";
	} else if (props.stock < 0) {
		errors.stock =
			"El stock debe ser mayor a 0, no se aceptan valores negativos.";
	}

	if (!props.descripcion) {
		errors.descripcion = "Debe ingresar una breve descripción del producto.";
	} else if (props.descripcion.length < 10) {
		errors.descripcion = "La descripción debe tener al menos 10 caracteres.";
	} else if (props.descripcion.length > 50) {
		errors.descripcion = "La descripción debe tener menos de 50 caracteres.";
	}

	if (!props.modelo) {
		errors.modelo = "Debe ingresar el modelo del producto";
	} else if (props.modelo.length < 3) {
		errors.modelo = "El modelo ebe tener al menos 3 caracteres.";
	}

	if (!props.precio) {
		errors.precio = "Debe ingresar el precio del producto.";
	} else if (props.precio < 0) {
		errors.precio =
			"El precio debe ser mayor a 0, no se aceptan valores negativos.";
	}

	if (!props.proveedorId) {
		errors.proveedorId = "Debe ingresar el proveedor del producto.";
	} else if (props.proveedorId === "Seleccione un proveedor") {
		errors.proveedorId =
			"Debe seleccionar una opcion del selector diferente a esta.";
	}

	return errors;
};

export const validationProvider = (props) => {
	let errors = {};
	const regexRut = /^(\d{3}\.){2}\d{3}-\d{1}$/;
	if (!props.nombre) {
		errors.nombre = "El nombre es obligatorio.";
	} else if (props.nombre.length < 3) {
		errors.nombre = "Debe tener al menos 3 caracteres.";
	} else if (props.nombre.length > 30) {
		errors.nombre = "Debe tener menos de 31 caracteres.";
	}

	if (!props.direccion) {
		errors.direccion = "Debe ingresar el direccion del proveedor.";
	} else if (props.direccion < 8) {
		errors.direccion = "Debe tener al menos 8 caracteres.";
	}

	if (!props.telefono) {
		errors.telefono = "Debe ingresar el telefono del proveedor.";
	} else if (props.telefono.length < 10) {
		errors.telefono =
			"El telefono proveedor debe tener al menos 10 caracteres.";
	}

	if (!props.rut) {
		errors.rut = "Debe ingresar el rut del producto";
	} else if (!regexRut.test(props.rut)) {
		errors.rut = "El rut debe estar bien formateado";
	}

	return errors;
};

export const validationVenta = (props) => {
	let errors = {};
	const regexRut = /^(\d{3}\.){2}\d{3}-\d{1}$/;
	if (!props.nombre) {
		errors.nombre = "El nombre es obligatorio.";
	} else if (props.nombre.length < 3) {
		errors.nombre = "Debe tener al menos 3 caracteres.";
	} else if (props.nombre.length > 30) {
		errors.nombre = "Debe tener menos de 31 caracteres.";
	}

	if (!props.cantidad) {
		errors.cantidad = "Debe ingresar la cantidad del producto a vender";
	} else if (!props.cantidad > 0) {
		errors.cantidad =
			"La cantidad debe ser mayor a 0, no se aceptan valores negativos.";
	}

	if (!props.id_producto) {
		errors.id_producto = "Debe seleccionar el producto a vender";
	}

	if (!props.identificacion) {
		errors.identificacion = "Debe ingresar el rut/nit del producto";
	} else if (!regexRut.test(props.identificacion)) {
		errors.identificacion = "El rut debe estar bien formateado";
	}

	return errors;
};
