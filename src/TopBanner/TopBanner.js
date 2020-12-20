import './TopBanner.css'
import React, { useEffect, useRef, useState } from 'react'

function TopBanner(prop){
	const LogoId = (prop.scrollToTop) ? "logo1" : "logo2"
	// const TopBannerStyle = (prop.scrollToTop === 0 ) ? "TopBanner" : (prop.scrollToTop === 1 ) ? "TopBanner TopBanner-top" : "TopBanner TopBanner-not-top"

    return(
        <div className = {(prop.scrollToTop) ? "TopBanner" : "TopBanner TopBanner-not-top"}>
				<div className = "TopBanner-logo-part">
					<img id = {LogoId}/>
					<span id = "logo-name-1">Pa</span>
					<span id = "logo-name-2">Pa</span>
					<span id = "logo-name-3">Go</span>
				</div>
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
    )
}

export default TopBanner;