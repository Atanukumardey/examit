'use client';

import { useEffect, useState } from "react";


function fullScreen(elem){
     // Check for browser compatibility
     //   const requestFullscreen =
     //     elem.requestFullscreen || // Standard API
     //     elem.mozRequestFullScreen || // Firefox
     //     elem.webkitRequestFullscreen || // Chrome, Safari and Opera
     //     elem.msRequestFullscreen; // Internet Explorer
 
     //   if (requestFullscreen) {
     //     requestFullscreen.call(elem);
     //   }
     if (elem?.requestFullscreen) {
         elem.requestFullscreen();
         // history.push("/instructions")
     } else if (elem?.webkitRequestFullscreen) {
         /* Safari */
         elem.webkitRequestFullscreen();
         // history.push("/instructions")
     } else if (elem?.msRequestFullscreen) {
         /* IE11 */
         elem?.msRequestFullscreen();
         // history.push("/instructions")
     }
}

function ValidationPage() {
   // const elem = null;

	//enterFullscreen(); // Request fullscreen when component mounts
    const [elem, setElem] = useState(false);
    //const [calculation, setCalculation] = useState(0);
 
     useEffect(() => {
         if(document){
             setElem(document.documentElement); // Get the document element (HTML element)
         }
     },[]);
     
	return (
		<div>
			<h1>Full Screen Page</h1>
            <button onClick={()=>{
                fullScreen(elem);
            }}>click to full screen</button>
		</div>
	);
}

export default ValidationPage;
