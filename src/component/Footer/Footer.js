import './Footer.css'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from "react-router-dom";


function Footer(){
	// footer style
	const curLocation = useLocation();
	const footerDisabled = ( curLocation.pathname === '/editor' ) ? "disable" : ""

    return( 
        <footer className = {`Footer ${footerDisabled}`}>
			<div className="FooterLeft">
				<div id="footerLogo"></div>
				<p id="papago2021">PaPaGo 2021</p>
				<p id="arr">ALL RIGHTS RESERVED</p>
			</div>
			<div className="FooterRight">
				<Link to="/about"><button id="footerButton">About</button></Link>
			</div>
        </footer>
    )
}

export default Footer;