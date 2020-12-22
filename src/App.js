import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

import Home from './component/Home/Home'
import TopBanner from './component/TopBanner/TopBanner'
import Footer from './component/Footer/Footer'
import LogPage from './component/LogPage/LogPage'

function App() {
	const scrollYTop = useRef();
	const [scrollToTop, setScrollToTop] = useState(true);
	const [loginLogup, setLoginLogup] = useState(0); //0:normal page | 1: log in | 2: log up

	const scrolling = () => {
		const yPosition = scrollYTop.current.scrollTop
		if( yPosition === 0 ) setScrollToTop(true)
		else setScrollToTop(false)
	}

	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<div className = "TopElement">
				<LogPage loginLogup={loginLogup} setLoginLogup={setLoginLogup} />
				<TopBanner scrollToTop={scrollToTop} setLoginLogup={setLoginLogup} />
			</div>
			<Home />
			<Footer />
		</div>
	);
}

export default App
