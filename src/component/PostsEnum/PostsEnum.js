import './PostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import PEStory from "./PEStory";

function PostsEnum(props) {
	let { type } = props.match.params;
	const cities = ["台北", "桃園", "新竹", "台中", "高雄", "台南", "宜蘭", "台東", "花蓮", "澎湖", "綠島", "嘉義"];
	//console.log('type = ' + type);
	//console.log(cities.includes(type));

	const [multiposts, setMultiposts] = useState([]);

	const [oneday0, setOneDay0] = useState(null);
	const [oneday1, setOneDay1] = useState(null);
	const [twoday0, setTwoDay0] = useState(null);
	const [twoday1, setTwoDay1] = useState(null);
	const [hotview0, setHotView0] = useState(null);
	const [hotview1, setHotView1] = useState(null);
	const [food0, setFood0] = useState(null);
	const [food1, setFood1] = useState(null);


	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #一日遊', type + ' #二日遊', type + ' trending', type + ' 美食', 'trending', ''],
			uuid: ''
	}});

	useEffect(
		()=>{
			refetch()
		}, []
	)

	useEffect(() => {
		//console.log('data = ', data)
		if(typeof(data) !== 'undefined'){
			console.log('In PostsEnum useEffect, data = ', data.multi_post.multiposts)
			setMultiposts(data.multi_post.multiposts);
			if(data.multi_post.multiposts[0].posts.length >= 1) {
				setOneDay0(data.multi_post.multiposts[0].posts[0]);
				if(data.multi_post.multiposts[0].posts.length >= 2) {
					setOneDay1(data.multi_post.multiposts[0].posts[1]);
				}
			}
			if(data.multi_post.multiposts[1].posts.length >= 1) {
				setTwoDay0(data.multi_post.multiposts[1].posts[0]);
				if(data.multi_post.multiposts[1].posts.length >= 2) {
					setTwoDay1(data.multi_post.multiposts[1].posts[1]);
				}
			}
			if(data.multi_post.multiposts[2].posts.length >= 1) {
				setHotView0(data.multi_post.multiposts[2].posts[0]);
				if(data.multi_post.multiposts[2].posts.length >= 2) {
					setHotView1(data.multi_post.multiposts[2].posts[1]);
				}
			}
			if(data.multi_post.multiposts[3].posts.length >= 1) {
				setFood0(data.multi_post.multiposts[3].posts[0]);
				if(data.multi_post.multiposts[3].posts.length >= 2) {
					setFood1(data.multi_post.multiposts[3].posts[1]);
				}
			}
		}
	}, [data])

	const OneDay_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[0].posts.length == 1 && oneday0 !== null) {
				return(
					<PEStory post={oneday0} />
				)
			}
			else if(data.multi_post.multiposts[0].posts.length >= 1 && oneday0 !== null && oneday1 !== null) {
				return(
					<React.Fragment>
						<PEStory post={oneday0} />
						<PEStory post={oneday1} />
					</React.Fragment>
				)
			}
			else {
				console.log('In PostsEnum.js, data = ', data.multi_post.multiposts[0].posts.length);
				return(
					<div className="PEStories"></div>
				)
			}
		}
		else {
			console.log('In PostsEnum.js, data is undefined');
			return(
				<div className="PEStories"></div>
			)
		}
	}
	const TwoDay_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[1].posts.length == 1 && twoday0 !== null) {
				return(
					<PEStory post={twoday0} />
				)
			}
			else if(data.multi_post.multiposts[1].posts.length >= 1 && twoday0 !== null && twoday1 !== null) {
				return(
					<React.Fragment>
						<PEStory post={twoday0} />
						<PEStory post={twoday1} />
					</React.Fragment>
				)
			}
			else {
				console.log('In PostsEnum.js, data = ', data.multi_post.multiposts[1].posts.length);
				return(
					<div className="PEStories"></div>
				)
			}
		}
		else {
			console.log('In PostsEnum.js, data is undefined');
			return(
				<div className="PEStories"></div>
			)
		}
	}
	const HotView_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[2].posts.length == 1 && hotview0 !== null) {
				return(
					<PEStory post={hotview0} />
				)
			}
			else if(data.multi_post.multiposts[2].posts.length >= 1 && hotview0 !== null && hotview1 !== null) {
				return(
					<React.Fragment>
						<PEStory post={hotview0} />
						<PEStory post={hotview1} />
					</React.Fragment>
				)
			}
			else {
				console.log('In PostsEnum.js, data = ', data.multi_post.multiposts[2].posts.length);
				return(
					<div className="PEStories"></div>
				)
			}
		}
		else {
			console.log('In PostsEnum.js, data is undefined');
			return(
				<div className="PEStories"></div>
			)
		}
	}
	const Food_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[3].posts.length == 1 && food0 !== null) {
				return(
					<PEStory post={food0} />
				)
			}
			else if(data.multi_post.multiposts[3].posts.length >= 1 && food0 !== null && food1 !== null) {
				return(
					<React.Fragment>
						<PEStory post={food0} />
						<PEStory post={food1} />
					</React.Fragment>
				)
			}
			else {
				console.log('In PostsEnum.js, data = ', data.multi_post.multiposts[3].posts.length);
				return(
					<div className="PEStories"></div>
				)
			}
		}
		else {
			console.log('In PostsEnum.js, data is undefined');
			return(
				<div className="PEStories"></div>
			)
		}
	}
	const Trend_map = () => {
		let trend = [];
		if (multiposts.length !== 0) {
			trend = [multiposts[4]]
		}
		//let trend = [multiposts[4]];
		return (
			<React.Fragment>
				{
					trend.map( (posts, idx) => {
						//console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										Trending
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const Recommend_map = () => {
		let recommend = [];
		if (multiposts.length !== 0) {
			recommend = [multiposts[5]]
		}
		//let recommend = [multiposts[5]];
		return (
			<React.Fragment>
				{
					recommend.map( (posts, idx) => {
						console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										Recommended
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	/*const tags = data.tags.map((tag) => (
		return <div className="PETag">{tag}</div>;
	))*/
    if (cities.includes(type)) {
    	return (
			<div className="PostsEnum">
				<div className="Topic">
					一日遊
				</div>
				<hr id='PEhr' />
				<OneDay_map />
				<Link to={"/postsenum/" + `${type}` + "/一日遊"}><button className="PEReadmore">Read more...</button></Link>
				<div className="Topic">
					二日遊
				</div>
				<hr id='PEhr' />
				<TwoDay_map />
				<Link to={"/postsenum/" + `${type}` + "/二日遊"}><button className="PEReadmore">Read more...</button></Link>
				<div className="Topic">
					熱門景點
				</div>
				<hr id='PEhr' />
				<HotView_map />
				<Link to={"/postsenum/" + `${type}` + "/熱門景點"}><button className="PEReadmore">Read more...</button></Link>
				<div className="Topic">
					最夯美食
				</div>
				<hr id='PEhr' />
				<Food_map />
				<Link to={"/postsenum/" + `${type}` + "/最夯美食"}><button className="PEReadmore">Read more...</button></Link>
			</div>
		)
    }
    else if(type === 'trending') {
    	return (
    		<Trend_map />
    	)
    }
    else if(type === 'recommended') {
    	return (
    		<Recommend_map />
    	)
    }
    else {
    	alert('error in PostsEnum.js');
    	return
    }
	
    /*
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
	);*/
}

export default PostsEnum;