import Styles from "./Footer.module.css";

const Footer = () => {
	return (
		<div className={Styles.footerContainer}>
			<div className={Styles.subFooter}>
				<div className={Styles.footerBottom}>
					<div className={Styles.footerBottomItem}>
						<p>
							{new Date().getFullYear()} CodeLudovic @ Equitel, Todos los
							derechos reservados.
						</p>
					</div>
					<div className={Styles.footerBottomItem}>
						<a href="/">Términos & Condiciones</a>
						<a href="/">Privacidad</a>
						<a href="/">Seguridad</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
