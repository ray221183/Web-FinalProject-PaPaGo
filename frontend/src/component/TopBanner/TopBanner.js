import './TopBanner.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Link,
	useLocation,
  } from "react-router-dom";

function TopBanner(prop){
	const banner = useRef();
	const curLocation = useLocation();
	const [Menu, setMenu] = useState(false);
	const menuRef = useRef();
	const menuStyle = {
		visibility: (Menu) ? "visible" : "hidden"
	}
	
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
	const useOnClickOutside =  (ref, handler) => {
		useEffect(
		  () => {
			const listener = event => {
			  // Do nothing if clicking ref's element or descendent elements
			  if (!ref.current || ref.current.contains(event.target)) {
				return;
			  }
	  
			  handler(event);
			};
	  
			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
	  
			return () => {
			  document.removeEventListener('mousedown', listener);
			  document.removeEventListener('touchstart', listener);
			};
		  },
		  [ref, handler]
		);
	}
	useOnClickOutside(menuRef, () => {
		setMenu(false)
	})

	const LogoId = (prop.scrollToTop && curLocation.pathname === "/") ? "logo1" : "logo2"
	const expandMenu = () => {
		setMenu(!Menu)
	}
	const Login = () => {
		return(
			<div className = "TopBanner-log-part">
				<div className = "login-state">
					<div className = "Settings">
						<div className = "Settings-icon" onClick={() => {expandMenu()}}>
							<span>
								{prop.username[0]}
							</span>
						</div>
						<div className = "Menu" ref={menuRef} style={menuStyle}>
							<div className="d button-box-shadow">
								<div className = "e" onClick={() => {expandMenu()}}>
									<span>
										{prop.username[0]}
									</span>
								</div>
								<Link id="account-link" to="/personalpage" style={{ textDecoration: 'none' }} onClick={() => {expandMenu()}}>
									<div className="a">
										<span id="username">{prop.username[1]} {prop.username[0]}</span>
										<span id="account">{prop.account}</span>
									</div>
								</Link>
							</div>
							<div className="b button-box-shadow">
								<Link to="/editor" style={{width: "100%"}}>
									<button onClick={() => {expandMenu(); prop.setNewPost(true)}}>分享故事</button>
								</Link>
								<button onClick={() => {expandMenu()}}>文章管理</button>
								<button onClick={() => {expandMenu()}}>出版文章</button>
							</div>
							<div className="c">
								<Link 
									to={{ pathname: (curLocation.pathname !== "/" && curLocation.pathname !== "/postsenum") ? "/" : curLocation.pathname }} 
									style={{width: "100%"}}>
									<button onClick={() => {expandMenu(); prop.setLoginState(false)}}>登出</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>	
		)
	}
	const Logout = () => {
		return(
			<div className = "TopBanner-log-part">
				<span id = "TopBanner-log-in" onClick={() => prop.setLoginLogup(1)}>
					登入
				</span>
				<span id = "TopBanner-sign-up" onClick={() => prop.setLoginLogup(2)}>
					註冊
				</span>
			</div>
		)
	}

    return(
		<div>
			<div className = { (prop.scrollToTop && curLocation.pathname === "/") ? "TopBanner" : "TopBanner TopBanner-not-top"} ref={banner}>
					<div id="b1">
						<Link to="/" style={{ textDecoration: 'none' }}>
							<div className = "TopBanner-logo-part" onClick={() => {prop.scrollTop()}}>
								<img id = {LogoId}/>
								<span id = "logo-name">PaPaGo</span>
							</div>
						</Link>
					</div>
					<div id="b2"></div>
					<div id="b3">
						{ (prop.loginState) ? <Login /> : <Logout /> }
					</div>
			</div>
			<div className = { (curLocation.pathname === "/") ? "" : "White-block" }>
			</div>
		</div>
    )
}

export default TopBanner;