// "use client"
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { Inter } from 'next/font/google';
import './globals.css';
//config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ExamIt ',
  description: 'Secured and Effictive Online Exam Center',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} style={{minHeight: "100"}}>
        {children}
      </body>
    </html>
  )
}
