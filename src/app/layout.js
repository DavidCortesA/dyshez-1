import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import './globals.css';

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  title: "Dyshez | Nivel 1",
  description: "Prueba Nivel 1 para Dyshez",
};

export default function RootLayout({ children }) {
  return ( 
    <html lang="es">
      <body className={poppins.className} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}