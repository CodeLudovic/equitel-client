import axios from "axios";

export const getUser = async (email = null) => {
	try {
		if (email) {
			const response = await axios.get(`/users?email=${email}`);

			if (response.status !== 200) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = response.data;
			return data;
		}

		const response = await axios.get(`/users`);
		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = response.data;

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error.message;
	}
};
