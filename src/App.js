import './App.css'
import React, { useEffect, useRef, useState } from 'react'
// import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

import TopBanner from './TopBanner/TopBanner'

function App() {
	const scrollYTop = useRef()
	const [scrollToTop, setScrollToTop] = useState(false)
	const scrolling = () => {
		console.log(1)
		const yPosition = scrollYTop.current.scrollTop
		if( yPosition === 0 ) setScrollToTop(true)
		else setScrollToTop(false)
	}

	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<TopBanner scrollToTop={scrollToTop}/>
      		<div className = "App">
        		<div>
					<h1>ss</h1>
				</div>
      		</div>
    	</div>
  	)
}

export default App
