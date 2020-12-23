import './TopBanner.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Link,
	useLocation,
	useHistory,
  } from "react-router-dom";

function TopBanner(prop){
	const banner = useRef();
	const curLocation = useLocation()
	useEffect(
		() => {
			prop.scrollTop()
		}, [curLocation.pathname]
	)
	useEffect(
		() => {
			prop.setTopBannerHeight(banner.current.offsetHeight)
		}, []
	)
	const LogoId = (prop.scrollToTop && curLocation.pathname === "/") ? "logo1" : "logo2"

    return(
		<div>
			<div className = { (prop.scrollToTop && curLocation.pathname === "/") ? "TopBanner" : "TopBanner TopBanner-not-top"} ref={banner}>
					<Link to="/">
						<div className = "TopBanner-logo-part" onClick={() => {prop.scrollTop()}}>
							<img id = {LogoId}/>
							<span id = "logo-name">PaPaGo</span>
						</div>
					</Link>
					<span></span>
					<div className = "TopBanner-log-part">
						<span id = "TopBanner-log-in" onClick={() => prop.setLoginLogup(1)}>
							登入
						</span>
						<span id = "TopBanner-sign-up" onClick={() => prop.setLoginLogup(2)}>
							註冊
						</span>
					</div>
			</div>
			<div className = { (curLocation.pathname === "/") ? "" : "White-block" }>
			</div>
		</div>
    )
}

export default TopBanner;