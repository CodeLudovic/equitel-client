export const clear = () => {
	localStorage.removeItem("userOnSession");
	localStorage.removeItem("logged");
	window.location.reload();
};
