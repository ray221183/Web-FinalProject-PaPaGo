import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Switch,
	Route,
	useLocation,
	useHistory
  } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { MULTIPOST_QUERY, ADD_POST, UPDATE_POST } from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'


import Home from './component/Home/Home'
import TopBanner from './component/TopBanner/TopBanner'
import Footer from './component/Footer/Footer'
import LogPage from './component/LogPage/LogPage'
import PostsEnum from './component/PostsEnum/PostsEnum'
import TopicPostsEnum from './component/TopicPostsEnum/TopicPostsEnum'
import PersonalPage from './component/PersonalPage/PersonalPage'
import Article from './component/Article/Article'
import PublishCheck from './component/Editor/PublishCheck'
import Editor from './component/Editor/Editor'
import About from './component/About/About'
import { async } from 'q';
import TPEStory from './component/TopicPostsEnum/TPEStory';

function App() {
	// about user
	const [loginLogup, setLoginLogup] = useState(0); // 0: normal page | 1: log in | 2: log up
	const [loginState, setLoginState] = useState(false);
	const [username, setUsername] = useState(['', '']); // [first name, last name]
	const [account, setAccount] = useState('');

	// topbanner animation element
	const scrollYTop = useRef();
	const [picHeight, setPicHeight] = useState(0);
	const [topBannerHeight, setTopBannerHeight] = useState(0);
	const [scrollToTop, setScrollToTop] = useState(true);

	// current essay information
	const [isPublished, setIsPublished] = useState(false);
	const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());
	const [prePublishScale, setPrePublishScale] = useState(0);
	const [newPost, setNewPost] = useState(false);
	const [curPostInfo, setCurPostInfo] = useState(null);

	// search detail // must change all at the same time !!!!!!!!!!!!!!!!
	const [writer, setWriter] = useState('');
	const [specialSearch, setSpecialSearch] = useState('');
	const [searchType, setSearchType] = useState([true, true]); // [get_sketch, get_non_sketch]
	const [tags, setTags] = useState([]);
	const [searchUuid, setSearchUuid] = useState('');
	const [curUuid, setCurUuid] = useState('');
	const [relatedUuid, setRelatedUuid] = useState('');
	// others
	// console.log("search way: ", writer, ":", specialSearch, ":", searchType, ":", tags, ":", searchUuid)
	console.log("CurPostInfo", curPostInfo)
	const curLocation = useLocation();
	const curHistory = useHistory();
	// apollo
	const {data: posts, refetch: rePosts, loading, error} = useQuery(
		MULTIPOST_QUERY, 
		{
			variables: {
				writer: writer,
				search_type: specialSearch,
				get_sketch: searchType[0],
				get_non_sketch: searchType[1],
				keyword: [...tags],
				uuid: searchUuid
			}
		});
	// console.log("loading", loading)
	// console.log("error", error)
	// console.log("search post: ", posts)
	const [addPost] = useMutation(ADD_POST);
	const [updatePost] = useMutation(UPDATE_POST)
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	const scrollTop = () => {
		scrollYTop.current.scrollTo(0, 0)
	}
	const scrolling = () => {
		const yPosition = scrollYTop.current.scrollTop
		//console.log(picHeight, topBannerHeight)
		// if( yPosition <= picHeight - topBannerHeight) setScrollToTop(true)
		if( yPosition <= 3) setScrollToTop(true)
		else setScrollToTop(false)
	}
	const searchPost = (keyword, get_sketch, get_non_sketch, uuid, writer, specialSearch, changeUuid) => {
		console.log(keyword, get_sketch, get_non_sketch, uuid, writer, specialSearch)
		setWriter(writer)
		setSpecialSearch(specialSearch)
		setSearchType([get_sketch, get_non_sketch])
		setTags(keyword)
		setSearchUuid(uuid)
		if(changeUuid) setCurUuid(uuid)
	}
	// console.log('new post: ', newPost)
	const savefile = async (title, introduction, editorState, tags, published) => {
		console.log("=================================================")
		console.log('title: ', title)
		console.log('introduction: ', introduction)
		console.log('content: ', editorState)
		console.log('tags: ', tags, tags.length, tags[tags.length-1])
		console.log('published: ', published)
		console.log("*************************************************")
        const contentState = editorState.getCurrentContent()
		const jsonRawData = JSON.stringify(convertToRaw(contentState))
 		let tagList = (( tags.length>0 ) ? tags.map((item)=>{ return (item==='') ? '' : item[0] }) : [''])
		let time = new Date()
		let saveDate = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
		let saveTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
		let dateTime = saveDate + ' ' + saveTime
		let a = [1,2]
		console.log('title: ', title)
		console.log('introduction: ', introduction)
		console.log('content: ', jsonRawData)
		console.log('writer: ', account)
		console.log('tagList: ', tagList)
		console.log('date: ', dateTime)
		console.log('is sketch: : ', !published)
		console.log("isPublished: ", isPublished)
		console.log("curUuid: ", curUuid)
		console.log("related_uuid: ", relatedUuid)
		console.log('new post: ', newPost)
		console.log("=================================================")
		if(newPost){
			console.log("add post")
			let postId = await addPost({
				variables: {
					title: title,
					introduction: introduction,
					content: jsonRawData,
					writer: account,
					tags: (isPublished) ? (( tags.length>0 ) ? tags.map((item)=>{ return (item==='') ? '' : item[0] }) : ['']) : [''],
					date: dateTime,
					is_sketch: true,
					related_uuid: (isPublished) ? relatedUuid : ''
				}
			})
			console.log("new post id: ", postId.data.addPost)
			searchPost([''], true, true, postId.data.addPost, '', '', true)
		}
		else{
			console.log("update post")
			// console.log('title: ', title)
			// console.log('introduction: ', introduction)
			// console.log('uuid: ', curUuid)
			// console.log('content: ', jsonRawData)
			// console.log('tagList: ', tagList)
			// console.log('date: ', dateTime)
			// console.log('is sketch: ', !published)
			updatePost({
				variables: {
					title: title,
					introduction: introduction,
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
	/////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		console.log("posts", posts)
		if( typeof posts !== "undefined" ){
			if( posts.multi_post.multiposts.length !== 0){
				if( posts.multi_post.multiposts[0].posts.length !== 0 ){
					console.log("/////////////////////////////////////////////////////////////////////////////////////////////")
					console.log("set current post: ", posts.multi_post.multiposts[0].posts[0])
					console.log("/////////////////////////////////////////////////////////////////////////////////////////////")
					setCurPostInfo(posts.multi_post.multiposts[0].posts[0])
					// searchPost([''], false, false, '', '', '', false)
				}
			}
		}
	}, [posts])
	useEffect(()=>{
		if(curLocation.pathname==='/editor'){
			console.log("repost // app.js 183")
			console.log("search way: ", writer, ":", specialSearch, ":", searchType, ":", tags, ":", searchUuid)
			if( typeof posts !== "undefined" ){
				if( posts.multi_post.multiposts.length !== 0){
					if( posts.multi_post.multiposts[0].posts.length !== 0 ){
						console.log("/////////////////////////////////////////////////////////////////////////////////////////////")
						console.log("set current post: ", posts.multi_post.multiposts[0].posts[0])
						console.log("/////////////////////////////////////////////////////////////////////////////////////////////")
						setCurPostInfo(posts.multi_post.multiposts[0].posts[0])
						// searchPost([''], false, false, '', '', '', false)
					}
				}
			}
			rePosts()
		}
	}, [curLocation.pathname])
	useEffect(()=>{
		curHistory.push('/')
	}, [])


	// useEffect(
	// 	async () => {
	// 		console.log("refetch")
	// 		await rePosts()
	// 		console.log("refetch data: ", posts)
	// 	}
	// , [writer, specialSearch, searchType, tags, curUuid])
	/////////////////////////////////////////////////////////////////////////////////////////////
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
								prePublishScale={prePublishScale}
								setPrePublishScale={setPrePublishScale}
								savefile={savefile}
								curPostInfo={curPostInfo}
								editorState={editorState}
								curUuid={curUuid}
								isPublished={isPublished}
								setCurPostInfo={setCurPostInfo}
								setNewPost={setNewPost}
								setIsPublished={setIsPublished}
								setCurUuid={setCurUuid}
								setRelatedUuid={setRelatedUuid}
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
					setUsername={setUsername}
					setAccount={setAccount}
				/>
			</div>
			<div className="section">
				<Switch>
					<Route exact path="/" render={() => (
						<Home 
							setLoginLogup={setLoginLogup} 
							setPicHeight={setPicHeight}/>)} 
					/>
					<Route exact path="/post/:id" render={(props) => (
							<Article 
								id={props.match.params.id}
								account={account}
							/>
						)}
					/>
					<Route path="/postsenum/:type/:topic" component={TopicPostsEnum}
					/>
					<Route path="/postsenum/:type" component={PostsEnum} 
					/>
					<Route path="/editor" render={() => (
							<Editor
								newPost={newPost}
								setPrePublishScale={setPrePublishScale}
								savefile={savefile}
								curPostInfo={curPostInfo}
								editorState={editorState}
								setEditorState={setEditorState}
								setCurPostInfo={setCurPostInfo}
								setNewPost={setNewPost}
								isPublished={isPublished}
								setIsPublished={setIsPublished}
								rePosts={rePosts}
								setCurUuid={setCurUuid}
								setRelatedUuid={setRelatedUuid}
							/>
						)}
					/>
					<Route path="/personalpage/:type/:topic" render={(props) => (
							<TopicPostsEnum
								setCurPostInfo={setCurPostInfo}
								setNewPost={setNewPost}
								setIsPublished={setIsPublished}
								rePosts={rePosts}
								posts={posts}
								searchPost={searchPost}
								setRelatedUuid={setRelatedUuid}
								setCurUuid={setCurUuid}
								setSearchUuid={setSearchUuid}
							/>	
						)}
					/>
					<Route path="/personalpage/:who" render={(props) => (
							<PersonalPage 
								who={props.match.params.who} 

								
								setCurPostInfo={setCurPostInfo}
								setNewPost={setNewPost}
								setIsPublished={setIsPublished}
								rePosts={rePosts}
								posts={posts}
								searchPost={searchPost}
								setRelatedUuid={setRelatedUuid}
								setCurUuid={setCurUuid}
								setSearchUuid={setSearchUuid}
							/>
						)}
					/>
					<Route path="/about" component={About} 
					/>
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App

