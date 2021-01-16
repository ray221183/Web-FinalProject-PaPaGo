import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Switch,
	Route,
  } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { POST_QUERY, ADD_POST, UPDATE_POST } from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'


import Home from './component/Home/Home'
import TopBanner from './component/TopBanner/TopBanner'
import Footer from './component/Footer/Footer'
import LogPage from './component/LogPage/LogPage'
import PostsEnum from './component/PostsEnum/PostsEnum'
import PersonalPage from './component/PersonalPage/PersonalPage'
import { PublishCheck, Editor} from './component/Editor/Editor'

function App() {
	const [loginLogup, setLoginLogup] = useState(0); // 0: normal page | 1: log in | 2: log up
	const [loginState, setLoginState] = useState(false);
	const [username, setUsername] = useState(['', '']); // [first name, last name]
	const [account, setAccount] = useState('');

	const scrollYTop = useRef();
	const [picHeight, setPicHeight] = useState(0);
	const [topBannerHeight, setTopBannerHeight] = useState(0);
	const [scrollToTop, setScrollToTop] = useState(true);

	const [editorState, setEditorState] = useState( ()=>EditorState.createEmpty() );
	const [prePublishScale, setPrePublishScale] = useState(0);
	const [newPost, setNewPost] = useState(true);
	const [postInfo, setPostInfo] = useState([]); //[tags, date, writer, is_sketch, uuid]
	const [addPost] = useMutation(ADD_POST);
	const [updatePost] = useMutation(UPDATE_POST)

	const scrollTop = () => {
		scrollYTop.current.scrollTo(0, 0)
	}
	const scrolling = () => {
		const yPosition = scrollYTop.current.scrollTop
		//console.log(picHeight, topBannerHeight)
		if( yPosition <= picHeight - topBannerHeight) setScrollToTop(true)
		else setScrollToTop(false)
	}
	const savefile = async (editorState, tags, published) => {
        const contentState = editorState.getCurrentContent()
		const jsonRawData = JSON.stringify(convertToRaw(contentState))
		let tagList = ( tags.length>0 ) ? tags.map((item)=>{ return item[0] }) : ['']
		let time = new Date()
		let saveDate = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
		let saveTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
		let dateTime = saveDate + ' ' + saveTime
		//console.log(jsonRawData, '    data type: ', typeof jsonRawData)
		//console.log(tagList)
		//console.log(dateTime)
		//console.log(!published)
		console.log(newPost)
		if(newPost){
			console.log("add post")
			// let postId = await addPost({
			// 	variables: {
			// 		content: jsonRawData,
			// 		writer: account,
			// 		tags: [''],
			// 		date: dateTime,
			// 		is_sketch: !published
			// 	}
			// })
			// console.log(postId)
		}
		else{
			console.log("update post")
			// updatePost({
			// 	variables: {
			// 		uuid: ,
			// 		content: jsonRawData,
			// 		tags: tagList,
			// 		date: dateTime,
			// 		is_sketch: !published,
			// 	}
			// })
		}
		setNewPost(false)
	}
	
	
	return(
    	<div className = "body" ref={scrollYTop} onScroll = {() => {scrolling()}}>
			<div className = "TopElement">
				<LogPage 
					setLoginState={setLoginState}
					loginLogup={loginLogup} 
					setLoginLogup={setLoginLogup}
					setUsername={setUsername}
					setAccount={setAccount}	
				/>
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
					setTopBannerHeight={setTopBannerHeight}
					username={username}
					account={account}
					setNewPost={setNewPost}
				/>
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
