import './Article.css';
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link, useLocation } from "react-router-dom";
import { EditorState , convertFromRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function Article(props) {
	let { id } = props.match.params;
	console.log('id = ' + id);
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const [trend_0_title, setTrend_0_title] = useState('');
	const [trend_0_author, setTrend_0_author] = useState('');
	const [trend_0_intro, setTrend_0_intro] = useState('');
	const [trend_0_date, setTrend_0_date] = useState('');
	const [trend_0_like, setTrend_0_like] = useState(0);

	const [related_0, setRelated_0] = useState(null);
	console.log('related_0 = ', related_0);
	console.log('related_0 type = ', typeof(related_0));
	console.log('related_0 === null -> ', related_0===null)

	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: 'related post',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [''],
			uuid: id
	}});
	useEffect(
		()=>{
			refetch()
		}, []
	)

	useEffect(() => {
		if(typeof data !== 'undefined'){
			console.log('In Article.js, data = ', data.multi_post.multiposts);
			setTrend_0_title(data.multi_post.multiposts[0].posts[0].title);
			setTrend_0_author(data.multi_post.multiposts[0].posts[0].name);
			setTrend_0_intro(data.multi_post.multiposts[0].posts[0].introduction);
			setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(data.multi_post.multiposts[0].posts[0].content))));
			setTrend_0_date(data.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setTrend_0_like(data.multi_post.multiposts[0].posts[0].great_num);

			setRelated_0(data.multi_post.multiposts[1].posts[0]);
		}
	}, [data])

	if(typeof data !== 'undefined') {
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
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'black' } }}>
						<button id='LikePost'>
							<FaThumbsUp />
							<span id="likeNum">{trend_0_like} Like</span>
						</button>
					</IconContext.Provider>
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
					<div className="RelatedStory">
						<div className="RelatedStoryImage">An image</div>
						<div className="RelatedStoryAuthor">
							<Link to={"/post/"}>
								<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
								</button>
							</Link>
						</div>
						<div className="RelatedStoryDateAndTag">
							<div className="RelatedStoryDate">2021/12/21</div>
							<div>
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
									<FaThumbsUp />
									<span id="RelatedStoryLike">2189982 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="RelatedStory">
						<div className="RelatedStoryImage">An image</div>
						<div className="RelatedStoryAuthor">
							<Link to={"/post/"}>
								<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
								</button>
							</Link>
						</div>
						<div className="RelatedStoryDateAndTag">
							<div className="RelatedStoryDate">2021/12/21</div>
							<div>
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
									<FaThumbsUp />
									<span id="RelatedStoryLike">2189982 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="RelatedStory">
						<div className="RelatedStoryImage">An image</div>
						<div className="RelatedStoryAuthor">
							<Link to={"/post/"}>
								<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
								</button>
							</Link>
						</div>
						<div className="RelatedStoryDateAndTag">
							<div className="RelatedStoryDate">2021/12/21</div>
							<div>
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
									<FaThumbsUp />
									<span id="RelatedStoryLike">2189982 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
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
				<div className="ArticleBottom">
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'black' } }}>
						<button id='LikePost'>
							<FaThumbsUp />
							<span id="likeNum">{trend_0_like} Like</span>
						</button>
					</IconContext.Provider>
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
					<div className="RelatedStory">
					</div>
					<div className="RelatedStory">
					</div>
					<div className="RelatedStory">
					</div>
				</div>
			</div>
		)
	}

	return (
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
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'black' } }}>
					<button id='LikePost'>
						<FaThumbsUp />
						<span id="likeNum">{trend_0_like} Like</span>
					</button>
				</IconContext.Provider>
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
				<div className="RelatedStory">
					<div className="RelatedStoryImage">An image</div>
					<div className="RelatedStoryAuthor">
						<Link to={"/post/"}>
							<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
							</button>
						</Link>
					</div>
					<div className="RelatedStoryDateAndTag">
						<div className="RelatedStoryDate">2021/12/21</div>
						<div>
							<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
								<FaThumbsUp />
								<span id="RelatedStoryLike">2189982 Like</span>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<div className="RelatedStory">
					<div className="RelatedStoryImage">An image</div>
					<div className="RelatedStoryAuthor">
						<Link to={"/post/"}>
							<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
							</button>
						</Link>
					</div>
					<div className="RelatedStoryDateAndTag">
						<div className="RelatedStoryDate">2021/12/21</div>
						<div>
							<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
								<FaThumbsUp />
								<span id="RelatedStoryLike">2189982 Like</span>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<div className="RelatedStory">
					<div className="RelatedStoryImage">An image</div>
					<div className="RelatedStoryAuthor">
						<Link to={"/post/"}>
							<button className="RelatedStoryTitle">Related Story Title Related Story Title Related Story Title Related Story Title Related Story Title<span style={{border:'2px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'2px solid green', fontSize:'20px', marginLeft: '5px' }}>Related Story Author Name</span>
							</button>
						</Link>
					</div>
					<div className="RelatedStoryDateAndTag">
						<div className="RelatedStoryDate">2021/12/21</div>
						<div>
							<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '2px solid green' } }}>
								<FaThumbsUp />
								<span id="RelatedStoryLike">2189982 Like</span>
							</IconContext.Provider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	/*
	return (
		<div className="Article">
			<h1 id="title">Hard Written</h1>
			<div className="ArticleImage">
				A image about this story.
			</div>
			<p className="Paragraph">
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
			</p>
			<p className="Paragraph">
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
			</p>
			<p className="Paragraph">
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
			</p>
			<div className="ArticleBottom">
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'black' } }}>
					<button id='LikePost'>
						<FaThumbsUp />
						<span id="likeNum">Hard Written Like</span>
					</button>
				</IconContext.Provider>
			</div>
			<div className="Author">
				<div id='WrittenBy'>
					Written By
				</div>
				<div id='author'>
					An image about the author
					<button id="AuthorButton">Hard Written</button>
				</div>
			</div>
			<h3 id="MoreStories">More Interesting Stories</h3>
			<hr id='hr' />
			<div className="RelatedStories">
				<div className="Story">
					<h3>A related story</h3>
				</div>
				<div className="Story">
					<h3>A related story</h3>
				</div>
				<div className="Story">
					<h3>A related story</h3>
				</div>
			</div>
		</div>
	);*/
}

export default Article;
