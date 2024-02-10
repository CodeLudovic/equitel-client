import axios from "axios";

export const doLogin = async (email, password) => {
	try {
		const response = await axios("auth/login", {
			params: {
				email: email,
				password: password,
			},
		});
		return response;
	} catch (error) {
		console.error("Error en la solicitud de inicio de sesión", error);
		throw error;
	}
};
