import Swal2 from "sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default function toast() {
	const Toast = Swal2.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 1200,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	return Toast;
}
