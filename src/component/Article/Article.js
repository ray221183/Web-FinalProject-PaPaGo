import './Article.css';
import React, { useEffect, useState } from 'react'
import { MULTIPOST_QUERY, GREATOFPOST_QUERY, UPDATE_GREAT } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";
import { EditorState , convertFromRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import RelatedStory from "./RelatedStory";

function Article(props) {
	let id = props.id;
	let account = props.account;
	console.log('id = ', id);
	console.log('account = ', account);

	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const [trend_0_title, setTrend_0_title] = useState('');
	const [trend_0_author, setTrend_0_author] = useState('');
	const [trend_0_intro, setTrend_0_intro] = useState('');
	const [trend_0_date, setTrend_0_date] = useState('');
	const [trend_0_like, setTrend_0_like] = useState(0);
	const [trend_0_img, setTrend_0_img] = useState('');

	const [related_0, setRelated_0] = useState(null);
	const [related_1, setRelated_1] = useState(null);
	const [related_2, setRelated_2] = useState(null);

	const [userLike, setUserLike] = useState(false);

	const { loading: loading_p, data: data_p, refetch: refetch_p } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: 'related post',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [''],
			uuid: id
	}});
	const { loading: loading_like, data: data_like, refetch: refetch_like } = useQuery(GREATOFPOST_QUERY, 
		{variables: { 
			uuid: id
	}});
	const [clickLike] = useMutation(UPDATE_GREAT);
	const handleClickLike = async (id, account, userLike) => {
		await clickLike({
			variables: {
				uuid: id,
				account: account,
				is_push: !userLike
		}})
		//console.log('In handleClickLike');
		refetch_p();
		refetch_like();
	}

	useEffect(
		()=>{
			refetch_p()
			refetch_like()
		}, []
	)
	useEffect(() => {
		console.log('In Article.js useEffect()');
		if(typeof data_p !== 'undefined'){
			console.log('In Article.js, data_p = ', data_p.multi_post.multiposts[0].posts[0].image);
			setTrend_0_title(data_p.multi_post.multiposts[0].posts[0].title);
			setTrend_0_author(data_p.multi_post.multiposts[0].posts[0].name);
			setTrend_0_intro(data_p.multi_post.multiposts[0].posts[0].introduction);
			setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(data_p.multi_post.multiposts[0].posts[0].content))));
			setTrend_0_date(data_p.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setTrend_0_like(data_p.multi_post.multiposts[0].posts[0].great_num);
			setTrend_0_img(data_p.multi_post.multiposts[0].posts[0].image);

			setRelated_0(data_p.multi_post.multiposts[1].posts[0]);
			setRelated_1(data_p.multi_post.multiposts[1].posts[1]);
			setRelated_2(data_p.multi_post.multiposts[1].posts[2]);
		}
		if(typeof data_like !== 'undefined'){
			let flag = false;
			//console.log('In Article.js, data_like = ', data_like.greatOfpost.users);
			//console.log('account = ', account);
			//console.log('account in data_like.greatOfpost.users = ', data_like.greatOfpost.users.includes(account));
			for (var i = 0; i < data_like.greatOfpost.users.length; i++) {
				if (data_like.greatOfpost.users[i].account === account) {
					flag = true;
				}
			}
			//console.log('flag = ', flag);
			if (flag) {
				setUserLike(true);
			}
			else {
				setUserLike(false);
			}
		}
	}, [data_p, data_like, userLike])

	const LikeStyle = () => {
		if (typeof data_p !== 'undefined' && account !== '') {
			if (userLike === true) {
				return(
					<div style={{border: '0px solid green'}}>
						<IconContext.Provider value={{ size: '25px', style:{ fill: 'red', border: '0px solid black', margin: '4px' } }}>
							<button id='LikePost' onClick={() => handleClickLike(id, account, userLike)}>
								<FaThumbsUp />
								<span id="likeNum">{trend_0_like} Like</span>
							</button>
						</IconContext.Provider>
					</div>
				)
			}
			else {
				return(
					<div style={{border: '0px solid green'}}>
						<IconContext.Provider value={{ size: '25px', style:{ fill: 'black', border: '0px solid black', margin: '4px' } }}>
							<button id='LikePost' onClick={() => handleClickLike(id, account, userLike)}>
								<FaThumbsUp />
								<span id="likeNum">{trend_0_like} Like</span>
							</button>
						</IconContext.Provider>
					</div>
				)
			}
		}
		else {
			console.log('In LikeStyle, data_p is undefined or account is empty');
			return(
				<div style={{border: '0px solid green'}}>
					<IconContext.Provider value={{ size: '25px', style:{ fill: 'black', border: '0px solid black', margin: '4px' } }}>
						<FaThumbsUp />
						<span id="likeNum">{trend_0_like} Like</span>
					</IconContext.Provider>
				</div>
			)
		}
	}

	if (loading_p === true || loading_like === true) {
		console.log('loading_p = ', loading_p);
		console.log('loading_like = ', loading_like);
		return(
			<div style={{fontSize: '100px', marginTop: '60px', textAlign: 'center'}}>Loading...</div>
		)
	}
	if(typeof data_p !== 'undefined' && related_0 !== null && related_1 !== null && related_2 !== null) {
		//console.log('loading_p = ', loading_p);
		if (trend_0_img === '') {
			return(
				<div className="Article">
					{/* <h1 id="title">{trend_0_title}</h1> */}
					{/* <div className="ArticleImage">
						A image about this story.
					</div> */}
					<div className="editor-part" name = "editor-part">
						<div className="article-content">
							<Editor
								editorState={editorState}
								// plugins={plugins}
								readOnly={true}
							/>
						</div>
					</div>
					<div className="ArticleBottom">
						<LikeStyle />
						<div id="articleDate">{trend_0_date}</div>
					</div>
					<div className="Author">
						<div id='WrittenBy'>
							Written By
						</div>
						<div id='author'>
							<button id="AuthorButton">{trend_0_author}</button>
						</div>
					</div>
					<h3 id="MoreStories">More Interesting Stories</h3>
					<hr id='hr' />
					<div className="RelatedStories">
						<RelatedStory related_post={related_0} />
						<RelatedStory related_post={related_1} />
						<RelatedStory related_post={related_2} />
					</div>
				</div>
			)
		}
		else {
			return(
				<div className="Article">
					{/* <h1 id="title">{trend_0_title}</h1> */}
					{/* <div className="ArticleImage">
						A image about this story.
					</div> */}
					<div className="editor-part" name = "editor-part">
						<div className="article-content">
							<Editor
								editorState={editorState}
								// plugins={plugins}
								readOnly={true}
							/>
						</div>
					</div>
					<div>
						<img id="articleImg" src={trend_0_img} />
					</div>
					<div className="ArticleBottom">
						<LikeStyle />
						<div id="articleDate">{trend_0_date}</div>
					</div>
					<div className="Author">
						<div id='WrittenBy'>
							Written By
						</div>
						<div id='author'>
							<button id="AuthorButton">{trend_0_author}</button>
						</div>
					</div>
					<h3 id="MoreStories">More Interesting Stories</h3>
					<hr id='hr' />
					<div className="RelatedStories">
						<RelatedStory related_post={related_0} />
						<RelatedStory related_post={related_1} />
						<RelatedStory related_post={related_2} />
					</div>
				</div>
			)
		}
		/*return(
			<div className="Article">
				<div className="editor-part" name = "editor-part">
					<div className="article-content">
						<Editor
							editorState={editorState}
							// plugins={plugins}
							readOnly={true}
						/>
					</div>
				</div>
				<div>
					<img id="articleImg" src={trend_0_img} />
				</div>
				<div className="ArticleBottom">
					<LikeStyle />
					<div id="articleDate">{trend_0_date}</div>
				</div>
				<div className="Author">
					<div id='WrittenBy'>
						Written By
					</div>
					<div id='author'>
						<button id="AuthorButton">{trend_0_author}</button>
					</div>
				</div>
				<h3 id="MoreStories">More Interesting Stories</h3>
				<hr id='hr' />
				<div className="RelatedStories">
					<RelatedStory related_post={related_0} />
					<RelatedStory related_post={related_1} />
					<RelatedStory related_post={related_2} />
				</div>
			</div>
		)*/
	}
	else {
		return(
			<div className="Article">
				{/* <h1 id="title">{trend_0_title}</h1> */}
				{/* <div className="ArticleImage">
					A image about this story.
				</div> */}
				<div className="editor-part" name = "editor-part">
					<div className="article-content">
						<Editor
							editorState={editorState}
							// plugins={plugins}
							readOnly={true}
						/>
					</div>
				</div>
				<div className="ArticleBottom">
					<LikeStyle />
					<div id="articleDate">{trend_0_date}</div>
				</div>
				<div className="Author">
					<div id='WrittenBy'>
						Written By
					</div>
					<div id='author'>
						An image about the author
						<button id="AuthorButton">{trend_0_author}</button>
					</div>
				</div>
				<h3 id="MoreStories">More Interesting Stories</h3>
				<hr id='hr' />
				<div className="RelatedStories">
					<div className="RelatedStory">	{/*class RelatedStory defined in RelatedStory.css*/}
					</div>
					<div className="RelatedStory">
					</div>
					<div className="RelatedStory">
					</div>
				</div>
			</div>
		)
	}
}

export default Article;
