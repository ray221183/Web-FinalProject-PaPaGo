import './App.css'
import React, { useEffect, useRef, useState } from 'react'
// import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

import TopBanner from './TopBanner/TopBanner'
import Footer from './Footer/Footer'
import LogPage from './LogPage/LogPage'

function App() {
	const scrollYTop = useRef();
	const [scrollToTop, setScrollToTop] = useState(true);
	const [loginLogup, setLoginLogup] = useState(0); //0:normal page | 1: log in | 2: log up
	const [city, setCity] = useState('');

	const scrolling = () => {
		console.log(1)
		const yPosition = scrollYTop.current.scrollTop
		if( yPosition === 0 ) setScrollToTop(true)
		else setScrollToTop(false)
	}
	const logPageStyle = (loginLogup === 0) ? "LogPage disable" : "LogPage"
	const TopElement = () => { // we need LogPage and TopBanner on every page
		return(
			<div>
				<LogPage 
					LogPageStyle={logPageStyle}
					setLoginLogup={setLoginLogup}
				/>
				<TopBanner 
					scrollToTop={scrollToTop}
					setLoginLogup={setLoginLogup}
				/>
			</div>
		)
	}

	const clickCity = (event) => {
		const name = event.target.name;
		//console.log('name = ' + name);
		//console.log('typeof(name) = ' + typeof(name))
		setCity(name);
	}


	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<TopElement />
			<section className = "App">
				<div className = "App-main-picture">
				</div>
				<div>
					<h1>你想去什麼地方</h1>
				</div>
				<div>
					<button className="button" name="taipei" onClick={clickCity}>Taipei</button>
					<button className="button" name="taoyuan" onClick={clickCity}>Taoyuan</button>
					<button className="button" name="hsinchu" onClick={clickCity}>Hsinchu</button>
					<button className="button" name="taichung" onClick={clickCity}>Taichung</button>
					<button className="button" name="kaohsiung" onClick={clickCity}>Kaohsiung</button>
					<button className="button" name="tainan" onClick={clickCity}>Tainan</button>
				</div>
				<div>
					<iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default App
