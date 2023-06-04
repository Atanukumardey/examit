// "use client"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from "./(default)/home/page";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import './globals.css';



export default function App() {
  return (
      <Home />
  );
}
