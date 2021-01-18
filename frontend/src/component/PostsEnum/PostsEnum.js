import './PostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'
import { POST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function PostsEnum(props) {
	let { type } = props.match.params;
	console.log('type = ' + type);

	//const [loginLogup, setLoginLogup] = useState(0);
	/*const { loading, error, data } = useQuery(POST_QUERY, 
		{variables: { 
			writer: '',
			reader: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: type,
			uuid: ''
	}});*/
	/*const lists = data.map((article) => (
        <div className="PEStories">
			<button className="PEStoryTitle">article.title</button>
			<p className="PEStoryIntro">article.introduction</p>
			<div className="PEDateAndTag">
				<div className="PETag">#台中</div>
				<div className="PETag">#新社花海</div>
				<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
				<div className="PEDate">article.date</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="PELike">17400 Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    ));*/
	return (
		<div className="PostsEnum">
			<div className="Topic">
				一日遊
			</div>
			<hr id='PEhr' />
			<div className="PEStories">
				<button className="PEStoryTitle">Hakuna Matata</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台中</div>
					<div className="PETag">#新社花海</div>
					<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PEDate">2021/2/3</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PEStories">
				<button className="PEStoryTitle">Enter 2021</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台南</div>
					<div className="PETag">#安平古堡</div>
					<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PEDate">2021/1/1</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PEReadmore">Read more...</button>
			<div className="Topic">
				二日遊
			</div>
			<hr id='PEhr' />
			<div className="PEStories">
				<button className="PEStoryTitle">Yeeeeeeeee</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#宜蘭</div>
					<div className="PETag">#礁溪</div>
					<div className="PETag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PEDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PEStories">
				<button className="PEStoryTitle">You are short</button>
				<p className="PEStoryIntro">A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#澎湖</div>
					<div className="PETag">#吉貝嶼</div>
					<div className="PETag">#二日遊</div>
					<div className="PEDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PEReadmore">Read more...</button>
			<div className="Topic">
				熱門景點
			</div>
			<hr id='PEhr' />
			<div className="PEStories">
				<button className="PEStoryTitle">Hakuna Matata</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台中</div>
					<div className="PETag">#新社花海</div>
					<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PEDate">2021/2/3</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">9999999 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PEStories">
				<button className="PEStoryTitle">Enter 2021</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台南</div>
					<div className="PETag">#安平古堡</div>
					<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PEDate">2021/1/1</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">9931845 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PEReadmore">Read more...</button>
			<div className="Topic">
				最夯美食
			</div>
			<hr id='PEhr' />
			<div className="PEStories">
				<button className="PEStoryTitle">好吃好吃好吃好吃好吃好吃好吃</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台中</div>
					<div className="PETag">#新天地</div>
					<div className="PETag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PEDate">2021/2/3</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">100 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PEStories">
				<button className="PEStoryTitle">你想被做成棺材板嗎?</button>
				<p className="PEStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PEDateAndTag">
					<div className="PETag">#台南</div>
					<div className="PETag">#棺材板</div>
					<div className="PETag">#美食</div>
					<div className="PEDate">2021/1/1</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">3000 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PEReadmore">Read more...</button>
		</div>
	);
}

export default PostsEnum;