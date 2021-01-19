import './Footer.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";

function Footer(){
    return( 
        <footer className = "Footer">
			<div className="FooterLeft">
				<div id="footerLogo"></div>
				{/*<img  alt="PaPaGo Logo"/>*/}
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