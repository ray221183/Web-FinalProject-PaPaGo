import './Footer.css'
import React, { useEffect, useRef, useState } from 'react'

function Footer(){
    return(
        <footer className = "Footer">
        	<div className="FooterDiv">
				<h2 className="FooterH2">Authors</h2>
				<h3 className="FooterItem">賴永玄</h3>
				<h3 className="FooterItem">何承叡</h3>
				<h3 className="FooterItem">李崇嘉</h3>
			</div>
			<div className="FooterMid">
				<img id="FooterLogo" alt="PaPaGo Logo"/>
				<p id="papago2021">PaPaGo 2021</p>
				<p id="ARR">ALL RIGHTS RESERVED</p>
			</div>
			<div className="FooterDiv">
				<h2 className="FooterH2">Contact Us</h2>
				<h3 className="FooterItem">b06901070@ntu.edu.tw</h3>
				<h3 className="FooterItem">b06901071@ntu.edu.tw</h3>
				<h3 className="FooterItem">b06901074@ntu.edu.tw</h3>
			</div>
        </footer>
    )
}

export default Footer;