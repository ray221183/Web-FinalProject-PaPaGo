import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Switch,
	Route,
  } from "react-router-dom";
// import { createBrowserHistory } from 'history'

import Home from './component/Home/Home'
import TopBanner from './component/TopBanner/TopBanner'
import Footer from './component/Footer/Footer'
import LogPage from './component/LogPage/LogPage'
import PostsEnum from './component/PostsEnum/PostsEnum'
import Editor from './component/Editor/Editor'

function App() {
	const scrollYTop = useRef();
	const [picHeight, setPicHeight] = useState(0);
	const [topBannerHeight, setTopBannerHeight] = useState(0);
	const [scrollToTop, setScrollToTop] = useState(true);

	const [loginLogup, setLoginLogup] = useState(0); //0:normal page | 1: log in | 2: log up
	const [loginState, setLoginState] = useState(true)
	

	const scrollTop = () => {
		scrollYTop.current.scrollTo(0, 0)
	}
	const scrolling = () => {
		const yPosition = scrollYTop.current.scrollTop
		console.log(picHeight, topBannerHeight)
		if( yPosition <= picHeight - topBannerHeight) setScrollToTop(true)
		else setScrollToTop(false)
	}

	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<div className = "TopElement">
				<LogPage 
					setLoginState={setLoginState}
					loginLogup={loginLogup} 
					setLoginLogup={setLoginLogup} />
				<TopBanner 
					setLoginState={setLoginState} 
					loginState={loginState} 
					scrollToTop={scrollToTop} 
					setLoginLogup={setLoginLogup} 
					scrollTop={scrollTop} 
					setTopBannerHeight={setTopBannerHeight}/>
			</div>
			<Switch>
				<Route exact path="/" render={() => (
					<Home 
						setLoginLogup={setLoginLogup} 
						setPicHeight={setPicHeight}/>)} 
				/>
				<Route path="/postsenum" render={() => (
					<PostsEnum />)} 
				/>
				<Route path="/editor" render={() => (
					<Editor />)} 
				/>
			</Switch>
			<Footer />
		</div>
	);
}

export default App
