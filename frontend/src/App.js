import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Switch,
	Route,
  } from "react-router-dom";
  import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'


import Home from './component/Home/Home'
import TopBanner from './component/TopBanner/TopBanner'
import Footer from './component/Footer/Footer'
import LogPage from './component/LogPage/LogPage'
import PostsEnum from './component/PostsEnum/PostsEnum'
import PersonalPage from './component/PersonalPage/PersonalPage'
import { PublishCheck, Editor} from './component/Editor/Editor'

function App() {
	const scrollYTop = useRef();
	const [picHeight, setPicHeight] = useState(0);
	const [topBannerHeight, setTopBannerHeight] = useState(0);
	const [scrollToTop, setScrollToTop] = useState(true);

	const [loginLogup, setLoginLogup] = useState(0); //0:normal page | 1: log in | 2: log up
	const [loginState, setLoginState] = useState(false);

	const [editorState, setEditorState] = useState( ()=>EditorState.createEmpty() );
	const [prePublishScale, setPrePublishScale] = useState(0);
	
	console.log(window.innerHeight, window.innerWidth)

	const scrollTop = () => {
		scrollYTop.current.scrollTo(0, 0)
	}
	const scrolling = () => {
		const yPosition = scrollYTop.current.scrollTop
		//console.log(picHeight, topBannerHeight)
		if( yPosition <= picHeight - topBannerHeight) setScrollToTop(true)
		else setScrollToTop(false)
	}
	const savefile = (editorState, tags, published) => {
        const contentState = editorState.getCurrentContent()
		const jsonRawData = JSON.stringify(convertToRaw(contentState))
		let tagList = ( tags.length>0 ) ? tags.map((item)=>{ return item[0] }) : ['']
		let time = new Date()
		let saveDate = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
		let saveTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
		let dateTime = saveDate+' '+saveTime
		//console.log(jsonRawData, '    data type: ', typeof jsonRawData)
		//console.log(tagList)
		//console.log(dateTime)
		//console.log(published)
	}
	
	
	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<div className = "TopElement">
				<LogPage 
					setLoginState={setLoginState}
					loginLogup={loginLogup} 
					setLoginLogup={setLoginLogup} />
				<PublishCheck 
					editorState={editorState}
					prePublishScale={prePublishScale}
					setPrePublishScale={setPrePublishScale}
					savefile={savefile}
				/>
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
					<Editor 
						editorState={editorState}
						setEditorState={setEditorState}
						setPrePublishScale={setPrePublishScale}
						savefile={savefile}
					/>)} 
				/>
				<Route path="/personalpage" render={() => (
					<PersonalPage />)} 
				/>
			</Switch>
			<Footer />
		</div>
	);
}

export default App
