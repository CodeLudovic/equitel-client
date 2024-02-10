import axios from "axios";

export const rolDataSelector = ["seller", "admin"];

export const getProviders = async () => {
	const response = await axios.get("/providers/all");
	return response;
};

export const getProducts = async () => {
	const response = await axios.get("/products/all");
	return response;
};

export const isValidStock = (value) => {
	return !isNaN(value) && parseInt(value) > 0;
};
