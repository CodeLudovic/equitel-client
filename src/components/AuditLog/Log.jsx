/* eslint-disable */
import { motion } from "framer-motion";
export const Log = ({ log }) => {
	return (
		<>
			<motion.td
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				{log?.id}
			</motion.td>
			<motion.td
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				{log?.accion}
			</motion.td>
			<motion.td
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				{log?.fecha}
			</motion.td>
			<motion.td
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				{log?.UserId}
			</motion.td>
		</>
	);
};
