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
import TopicPostsEnum from './component/TopicPostsEnum/TopicPostsEnum'
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
	const [postInfo, setPostInfo] = useState([]);

	const [writer, setWriter] = useState('');
	const [specialSearch, setSpecialSearch] = useState('');
	const [searchType, setSearchType] = useState([true, true]); // [get_sketch, get_non_sketch]
	const [tags, setTags] = useState('');
	const [curUuid, setCurUuid] = useState('');

	const {data: posts, refetch: rePost, loading, error} = useQuery(
		POST_QUERY, 
		{
			variables: {
				writer: '1',
				search_type: '1',
				get_sketch: true,
				get_non_sketch: true,
				keyword: '1',
				uuid: '1'
			}
		});
	console.log("error", error)
	console.log(posts)
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
	const searchPost = (keyword, get_sketch, get_non_sketch, uuid, writer, specialSearch) => {
		console.log(keyword, get_sketch, get_non_sketch, uuid, writer, specialSearch)
		setWriter(writer)
		setSpecialSearch(specialSearch)
		setSearchType([get_sketch, get_non_sketch])
		setTags(keyword)
		setCurUuid(uuid)
		console.log("search")
	}

	const resetEditorState = () => {
		setEditorState(()=>EditorState.createEmpty())
	}

	const savefile = async (editorState, tags, published) => {
        const contentState = editorState.getCurrentContent()
		const jsonRawData = JSON.stringify(convertToRaw(contentState))
		let tagList = ( tags.length>0 ) ? tags.map((item)=>{ return item[0] }) : ['']
		let time = new Date()
		let saveDate = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
		let saveTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
		let dateTime = saveDate + ' ' + saveTime
		let a = [1,2]
		console.log(jsonRawData, '    data type: ', typeof jsonRawData)
		console.log(account, '    data type: ', typeof account)
		console.log(tagList, '    data type: ', typeof tagList)
		console.log(dateTime, '    data type: ', typeof dateTime)
		console.log(!published, '    data type: ', typeof !published)
		console.log(newPost)
		if(newPost){
			console.log("add post")
			let postId = await addPost({
				variables: {
					title: '',
					introduction: '',
					content: jsonRawData,
					writer: account,
					tags: [''],
					date: dateTime,
					is_sketch: !published,
					related_uuid: ''
				}
			})
			console.log(postId.data.addPost)
			setCurUuid(postId.data.addPost)
		}
		else{
			console.log("update post")
			console.log(posts)
			updatePost({
				variables: {
					title: 'title',
					introduction: 'introduction',
					uuid: curUuid,
					content: jsonRawData,
					tags: tagList,
					date: dateTime,
					is_sketch: !published,
				}
			})
		}
		setNewPost(false)
	}

	useEffect(
		() => {
			rePost()
		}
	, [writer, specialSearch, searchType, tags, curUuid])
	
	
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
				<Switch>
					<Route path="/editor" render={() => (
							<PublishCheck 
								editorState={editorState}
								prePublishScale={prePublishScale}
								setPrePublishScale={setPrePublishScale}
								savefile={savefile}
							/>
						)}
					/>
				</Switch>
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
					searchPost={searchPost}
				/>
			</div>
			<div className="section">
				<Switch>
					<Route exact path="/" render={() => (
						<Home 
							setLoginLogup={setLoginLogup} 
							setPicHeight={setPicHeight}/>)} 
					/>
					<Route path="/postsenum/:type/:topic" component={TopicPostsEnum} 
					/>
					<Route path="/postsenum/:type" component={PostsEnum} 
					/>
					<Route path="/editor" render={() => (
							<Editor 
								editorState={editorState}
								setEditorState={setEditorState}
								setPrePublishScale={setPrePublishScale}
								savefile={savefile}
								resetEditorState={resetEditorState}
							/>
						)}
					/>
					<Route path="/personalpage" render={() => (
						<PersonalPage />)} 
					/>
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App