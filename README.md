# Prueba Técnica de Dyshez - Nivel 1

Este repositorio contiene la implementación de la prueba técnica Nivel 1 para Dyshez. La prueba implica crear los diseños de las páginas "Order", "Forgot Password", "Reset Password" y "Login" utilizando Next.js versión 14 con valores estáticos y sin conexión a un backend. Se usan notificaciones toast (`react-hot-toast`) en la página de login para mostrar el estado del intento de inicio de sesión antes de redirigir a la página de "Order".

## Estructura del Proyecto

El proyecto sigue una estructura estándar de Next.js con los siguientes directorios y archivos clave:

```
├── public/
│   ├── images/
│   │   ├── icons/
│   │   │   ├── apple-logo.png
│   │   │   ├── facebook-logo.png
│   │   │   ├── google-icon.webp
│   │   ├── avatar.png
│   │   ├── backgroun-logo.png
│   │   ├── log-out.png
│   │   ├── verifiqued-icon.png
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── providers.jsx
│   ├── components/
│   │   ├── LogIn
│   │   │   ├── index.jsx
│   │   ├── Register
│   │   │   ├── index.jsx
│   │   ├── Sidebar
│   │   │   ├── index.jsx
│   │   ├── TableOrders
│   │   │   ├── index.jsx
│   ├── pages/
│   │   ├── forgot-password
│   │   │   ├── index.jsx
│   │   │   ├── forgot.css
│   │   ├── orders
│   │   │   ├── index.jsx
│   │   │   ├── orders.css
│   │   ├── reset-password
│   │   │   ├── index.jsx
│   │   │   ├── reset.css
├── .eslintrc.json
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
```

## Comenzando

Para comenzar con el proyecto, sigue estos pasos:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/DavidCortesA/dyshez-1.git
    cd dyshez-1
    ```

2. **Instala las dependencias**:
    ```bash
    npm install
    ```

3. **Configura Tailwind CSS**:
    - Asegúrate de que `tailwind.config.js` y `postcss.config.js` estén configurados correctamente.
    - Importa los estilos de Tailwind en `src/styles/globals.css`:

    ```css
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    ```

4. **Ejecuta el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Páginas

### Página de Login

- **Ruta**: `/`
- **Descripción**: La página de login permite al usuario ingresar sus credenciales. Se utilizan notificaciones toast para mostrar el estado del intento de inicio de sesión (por ejemplo, éxito o fallo). Al iniciar sesión con éxito, el usuario es redirigido a la página de "Order".

### Página de Order

- **Ruta**: `/order`
- **Descripción**: La página de order muestra una lista de pedidos utilizando valores estáticos. No se usa ninguna conexión a un backend.

### Página de Forgot Password

- **Ruta**: `/forgot-password`
- **Descripción**: La página de forgot password permite al usuario solicitar un enlace para restablecer su contraseña.

### Página de Reset Password

- **Ruta**: `/reset-password`
- **Descripción**: La página de reset password permite al usuario ingresar una nueva contraseña utilizando un enlace proporcionado.

## Dependencias

- **Next.js**: v14
- **React**: v18
- **Notificaciones toast**: [react-hot-toast](https://react-hot-toast.com/)
- **Tailwind CSS**: v3

## Cómo Funciona

1. **Página de Login**:
    - La página de login contiene un formulario simple donde el usuario puede ingresar su nombre de usuario y contraseña.
    - Al enviar el formulario, se muestra una notificación toast para indicar si el inicio de sesión fue exitoso o fallido.
    - Si el inicio de sesión es exitoso, el usuario es redirigido a la página de "Order".

2. **Página de Order**:
    - La página de order muestra una lista de pedidos utilizando datos estáticos.
    - No se utiliza ninguna conexión a un backend y los datos están hardcodeados dentro del componente.

3. **Página de Forgot Password**:
    - La página de forgot password permite al usuario solicitar un enlace para restablecer su contraseña ingresando su dirección de correo electrónico.

4. **Página de Reset Password**:
    - La página de reset password permite al usuario restablecer su contraseña ingresando una nueva contraseña a través de un enlace proporcionado.

## Personalización

- **Componentes**: Los componentes reutilizables están ubicados en el directorio `src/components/`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y crea un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

Si necesitas ajustar algún detalle o agregar información adicional, no dudes en hacerlo.
