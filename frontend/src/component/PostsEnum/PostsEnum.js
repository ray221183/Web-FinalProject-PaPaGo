import './PostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function PostsEnum(props) {
	let { type } = props.match.params;
	console.log('type = ' + type);
	const cities = ["台北", "桃園", "新竹", "台中", "高雄", "台南", "宜蘭", "台東", "花蓮", "澎湖", "綠島", "嘉義"];
	console.log(cities.includes(type));

	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #一日遊', type + ' #二日遊', type + ' 熱門景點', type + ' 美食', 'trending', 'recommended'],
			uuid: ''
	}});
	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #一日遊'],
			uuid: ''
	}});*/
	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #二日遊'],


			uuid: ''
	}});*/
	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' 熱門景點'],
			uuid: ''
	}});*/
	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: type + ' 美食',
			uuid: ''
	}});*/

	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: 'trending',
			uuid: ''
	}});*/
	/*const { loading, error, data } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: 'recommended',
			uuid: ''
	}});*/

	useEffect(
		()=>{
			refetch()
		}, []
	)

	useEffect(() => {
		if(typeof data !== 'undefined'){
			console.log('data = ', data.multi_post.multiposts[0].posts)
			//only_date0 = data.multi_post.multiposts[0].posts[0].date.split(' ');
			//only_date1 = data.multi_post.multiposts[0].posts[1].date.split(' ');
			//only_date2 = data.multi_post.multiposts[0].posts[2].date.split(' ');
			//only_date3 = data.multi_post.multiposts[0].posts[3].date.split(' ');
		}
	}, [data])

	/*const tags = data.tags.map((tag) => (
		return <div className="PETag">{tag}</div>;
	))*/
	/*const list = data.posts.map((article) => (
		return(
	        <div className="PEStories" key={article.uuid}>
	        	<div className="PEAuthor">
					<button className="PEStoryTitle">{article.title}</button>
					<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
					<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{article.name}</h3>
				</div>
				<p className="PEStoryIntro">article.introduction</p>
				<div className="PEDateAndTag">
					{tags}
					<div className="PEDate">{article.date}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">{article.great_num} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
		)
    ));*/
    /*if (cities.includes(type)) {
    	return (
			<div className="PostsEnum">
				<div className="Topic">
					一日遊
				</div>
				<hr id='PEhr' />
				<div className="PEStories">
					<div className="PEAuthor">
						<button className="PEStoryTitle">Hakuna Matata</button>
						<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
						<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>A author</h3>
					</div>
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
					<div className="PEAuthor">
						<button className="PEStoryTitle">Enter 2021</button>
						<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
						<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>H author</h3>
					</div>
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
					<div className="PEAuthor">
						<button className="PEStoryTitle">Yeeeeeeeeeeeeeeeeeeeeeeeee</button>
						<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
						<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>Y author</h3>
					</div>
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
					<div className="PEAuthor">
						<button className="PEStoryTitle">You are short!</button>
						<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
						<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>T author</h3>
					</div>
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
		)
    }
    else if(type === 'trending') {
    	return (
    		<div className="PostsEnum">
				<div className="Topic">
					Trending
				</div>
				<hr id='PEhr' />
				{list}
				<button className="PEReadmore">Read more...</button>
			</div>
    	)
    }
    else if(type === 'recommended') {
    	return (
    		<div className="PostsEnum">
				<div className="Topic">
					Recommended
				</div>
				<hr id='PEhr' />
				{list}
				<button className="PEReadmore">Read more...</button>
			</div>
    	)
    }
    else {
    	alert('error in PostsEnum.js');
    	return
    }
	*/

	return (
		<div className="PostsEnum">
			<div className="Topic">
				一日遊
			</div>
			<hr id='PEhr' />
			<div className="PEStories">
				<div className="PEAuthor">
					<button className="PEStoryTitle">Hakuna Matata</button>
					<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
					<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>A author</h3>
				</div>
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
				<div className="PEAuthor">
					<button className="PEStoryTitle">Enter 2021</button>
					<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
					<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>H author</h3>
				</div>
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
				<div className="PEAuthor">
					<button className="PEStoryTitle">Yeeeeeeeeeeeeeeeeeeeeeeeee</button>
					<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
					<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>Y author</h3>
				</div>
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
				<div className="PEAuthor">
					<button className="PEStoryTitle">You are short!</button>
					<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
					<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>T author</h3>
				</div>
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