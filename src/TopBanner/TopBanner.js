import './TopBanner.css'
import React, { useEffect, useRef, useState } from 'react'

function TopBanner(){
    return(
        <div className = "TopBanner">
				<span>PaPaGo</span>
				<span>Logo圖示</span>
				<div>
					<span>登入</span>
					<span>註冊</span>
				</div>
		</div>
    )
}

export default TopBanner;