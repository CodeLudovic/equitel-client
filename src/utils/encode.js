import CryptoJS from "crypto-js";

export const encrypt = (password = null) => {
	const repassword = document.getElementById("re_password")?.value;
	if (password) {
		if (!password || password === "") {
			throw new Error("No existe la contraseña");
		}
		const hashedPassword = CryptoJS.SHA256(password).toString();
		return hashedPassword;
	}
	const email = document.getElementById("email")?.value;
	const name = document.getElementById("name")?.value;
	const pass = document.getElementById("password")?.value;

	if (!email || !pass || !name || !repassword) {
		throw new Error("Faltan datos");
	}

	if (pass !== repassword) {
		throw new Error("Las contraseñas no coinciden");
	}

	const hashedPassword = CryptoJS.SHA256(pass).toString();

	const usuario = {
		email: email,
		password: hashedPassword,
		name: name,
		enabled: true,
	};

	return usuario;
};
