import './Article.css';
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function Article(props) {
	let { id } = props.match.params;
	console.log('id = ' + id);
	const [trend_0_title, setTrend_0_title] = useState('');
	const [trend_0_author, setTrend_0_author] = useState('');
	const [trend_0_intro, setTrend_0_intro] = useState('');
	const [trend_0_content, setTrend_0_content] = useState('');
	const [trend_0_date, setTrend_0_date] = useState('');
	const [trend_0_like, setTrend_0_like] = useState(0);

	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
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
			console.log('data = ', data.multi_post.multiposts[0].posts)
			setTrend_0_title(data.multi_post.multiposts[0].posts[0].title);
			setTrend_0_author(data.multi_post.multiposts[0].posts[0].name);
			setTrend_0_intro(data.multi_post.multiposts[0].posts[0].introduction);
			setTrend_0_content(data.multi_post.multiposts[0].posts[0].content);
			setTrend_0_date(data.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setTrend_0_like(data.multi_post.multiposts[0].posts[0].great_num);
		}
	}, [data])

	return (
		<div className="Article">
			<h1 id="title">{trend_0_title}</h1>
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
	);
}

export default Article;
