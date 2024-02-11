# Equitel Prueba Tecnica - Client

Documentación del Frontend:

1. Introducción:

El Front End está compuesto por 11 Componentes y 8 Vistas. Además, cuenta con 10 funciones helpers, que incluyen validaciones y getters de datos a la API para asegurar la integridad de la información antes de enviarla al backend.

El propósito de este frontend es crear una interfaz para que los usuarios con roles de administrador o vendedor gestionen los diferentes módulos disponibles. Entre estos módulos se encuentran la gestión de productos, usuarios, proveedores, control de stock, informes diarios o periódicos de ventas con generación visual y exportación de datos en formato PDF, historial de ventas y registro de ventas.

2. Tecnologías Utilizadas:

Frameworks:

ReactJS
Vite

Librerías:
Axios
Puppeteer (para la generación de PDFs)
Crypto-js
SweetAlert2
Resend
File-saver
Framer-motion
JsPDF
JsPDF - Autotable

3. Arquitectura:

La arquitectura de esta aplicación se basa en componentes independientes que definen la composición de la interfaz gráfica. Estos componentes tienen un estado que reacciona a la interacción del usuario, permitiendo una manipulación dinámica de la interfaz. Aunque similar a la arquitectura hexagonal, aquí se utilizan componentes reutilizables para modularizar y abordar las preocupaciones de manera más efectiva.


4. Componentes Principales:

Users: Gestiona la información de los usuarios, incluyendo creación, edición y eliminación de usuarios. Disponible solo para administradores.
Productos: Gestiona la información de los productos de manera similar a Users.
Proveedores: Similar a Users, pero para la gestión de proveedores.
Informes: Genera informes diarios, mensuales o anuales de ventas, permitiendo la descarga de un archivo PDF con la información. Disponible solo para administradores.
Informe de ventas (historial): Vista informativa para visualizar ventas realizadas.
Control Stock: Gestiona el abastecimiento y desabastecimiento de existencias, además de mostrar información de productos registrados. Disponible solo para administradores.

5. Enrutamiento:

Se utiliza React Router Dom para la creación de rutas. Estas incluyen:

Login o inicio de sesión (/login)
Gestión de usuarios (/users/create)
Gestión de proveedores (/providers/create)
Gestión de productos (/products/create)
Registro de ventas (/sales/create)
Historial de ventas por usuario (/sales/report)
Control de Stock (/control/stock)
Informe de ventas según fechas estipuladas (/sales/dialyreport)
Es importante destacar que las rutas están activas según los permisos del usuario.

6. Gestión de Estado:

Se emplea un contexto general llamado UserContext para gestionar la información del usuario en sesión. Otros componentes manejan su propio estado, actualizando la información proveniente del backend.

7. Flujo de Trabajo:

Para desarrollar la aplicación, se siguieron las siguientes etapas:

Diseño de la base de datos y modelos.
Creación de rutas en el backend utilizando el patrón de diseño MVC.
Desarrollo de controladores y handlers para gestionar los diferentes modelos.
Diseño y funcionalidades helpers en el servidor para la obtención de información específica.
Parametrización completa del servidor en ExpressJs.
Implementación de la funcionalidad de registro en una tabla de auditoría.
Desarrollo del frontend, incluyendo vistas y lógica para la gestión de usuarios, proveedores, productos, y más.
Realización de pruebas de usuario para validar las acciones de creación, modificación y eliminación.
Deployment en Vercel para el frontend y en Railways para el backend.
URL del proyecto en producción: https://equitel.vercel.app
