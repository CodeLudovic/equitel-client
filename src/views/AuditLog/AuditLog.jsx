/* eslint-disable */
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Styles from "./AuditLog.module.css";
import { userContext } from "../../App";
import { Log } from "../../components/AuditLog/Log";
import { Loader } from "../../components/Loader/Loader";
import { motion } from "framer-motion";

const AuditLog = ({ updateContextUser }) => {
	const userData = useContext(userContext);
	const [dataLog, setDataLogs] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const session = JSON.parse(localStorage.getItem("userOnSession"));
	const logsPerPage = 15;
	const timerRef = useRef(null);

	const fetchData = async (page) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`/logs?page=${page - 1}&pagesize=${logsPerPage}`
			);
			setDataLogs((prevState) => ({
				...prevState,
				data: response.data.auditlogs,
			}));
			const calculatedTotal = Math.ceil(response.data.count / logsPerPage);
			setTotalPages(calculatedTotal);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateCurrentPageData = (page) => {
		fetchData(page);
	};

	const handlePrev = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
			updateCurrentPageData(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage <= totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
			updateCurrentPageData(currentPage + 1);
		}
	};

	const handlePageClick = (page) => {
		setCurrentPage(page);
		updateCurrentPageData(page);
	};
	useEffect(() => {
		fetchData(currentPage);
		return () => {
			if (timerRef.timer) {
				clearTimeout(timerRef.timer);
			}
		};
	}, [currentPage]);

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	useEffect(() => {
		updateCurrentPageData(currentPage);
	}, [currentPage]);
	return (
		<>
			<div className={Styles.auditlogsContainer}>
				<h1>Logs de Auditoria</h1>
				{!loading && dataLog ? (
					<table>
						<tbody>
							<tr>
								<th>ID</th>
								<th>Accion</th>
								<th>Fecha</th>
								<th>UserId</th>
							</tr>
							{dataLog.data?.map((log, index) => (
								<motion.tr
									key={index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}>
									<Log log={log} />
								</motion.tr>
							))}
						</tbody>
					</table>
				) : (
					!loading && <div>No hay logs disponibles</div>
				)}
				{dataLog?.data && dataLog.data?.length !== 0 && !loading ? (
					<div className={Styles.paginationContainer}>
						<button
							className={Styles.paginationBotton}
							onClick={handlePrev}
							disabled={currentPage === 1}>
							Anterior
						</button>
						{Array.from({ length: totalPages }, (_, index) => (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								key={index + 1}
								onClick={() => handlePageClick(index + 1)}
								disabled={index + 1 === currentPage}
								className={
									currentPage === index + 1
										? Styles.currentPage
										: Styles.pagePaginationBotton
								}>
								{index + 1}
							</motion.button>
						))}
						<button
							className={Styles.paginationBotton}
							onClick={handleNext}
							disabled={currentPage === totalPages}>
							Siguiente
						</button>
					</div>
				) : null}
			</div>
			{loading && <Loader />}
		</>
	);
};

export default AuditLog;
