/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Users.module.css";
import { User } from "../User/User";
import { Loader } from "../Loader/Loader";

const Users = ({ updateContextUser }) => {
	const [dataUsers, setDataUsers] = useState({});
	const [loading, setLoading] = useState(false);
	const session = JSON.parse(localStorage.getItem("userOnSession"));

	const updateDataAfterChanges = () => {
		fetchData();
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`/users`);
			setDataUsers((prevState) => ({
				...prevState,
				data: response.data.users,
			}));
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center",
			}}>
			{!loading && (
				<div className={Styles.usersContainer}>
					<section>
						<div>
							{dataUsers?.data && dataUsers?.data?.length !== 0 ? (
								<table>
									<tbody>
										<tr>
											<th>ID</th>
											<th>Nombre</th>
											<th>Email</th>
											<th>Rol</th>
											<th>Acciones</th>
										</tr>
										{dataUsers.data?.map((user, index) => (
											<tr key={index}>
												<User
													id={user.id}
													key={index}
													user={user}
													index={index}
													setLoading={setLoading}
													updateDataAfterChanges={updateDataAfterChanges}
												/>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<div>No hay usuarios disponibles</div>
							)}
						</div>
					</section>
				</div>
			)}
			{loading && <Loader />}
		</div>
	);
};

export default Users;
