// "use client"
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
//config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export const metadata = {
  title: 'ExamIt ',
  description: 'Secured and Effictive Online Exam Center',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body style={{minHeight: "100vh"}}>
        {children}
      </body>
    </html>
  )
}
