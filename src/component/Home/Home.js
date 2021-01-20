import './Home.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import { Button } from '@material-ui/core';
import {FaThumbsUp} from 'react-icons/fa';
import {AiFillFire} from 'react-icons/ai';
import {IconContext} from 'react-icons';

import HomeStory from './HomeStory'


function Home(prop){
	const pic = useRef();
	const [city, setCity] = useState('');

	const [trend_0, setTrend_0] = useState(null);
	const [trend_1, setTrend_1] = useState(null);
	const [trend_2, setTrend_2] = useState(null);
	const [trend_3, setTrend_3] = useState(null);
	const [recommend_0, setRecommend_0] = useState(null);
	const [recommend_1, setRecommend_1] = useState(null);
	const [recommend_2, setRecommend_2] = useState(null);	
	const [recommend_3, setRecommend_3] = useState(null);

	const clickCity = (event) => {
		const name = event.target.name;
		console.log('name = ', name);
		setCity(name);
	}
	
	const { loading: loading_t, data: data_t, refetch: refetch_t } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: ['trending'],
			uuid: ''
	}});
	const { loading: loading_r, data: data_r, refetch: refetch_r } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [''],
			uuid: ''
	}});

	useEffect(
		()=>{
			prop.setPicHeight(pic.current.offsetHeight)
			refetch_t()
			refetch_r()
		}, []
	)

	useEffect(() => {
		if(typeof data_t !== 'undefined') {
			console.log('data_t = ', data_t.multi_post.multiposts[0].posts)
			if(data_t.multi_post.multiposts[0].posts.length >= 1) {
				setTrend_0(data_t.multi_post.multiposts[0].posts[0]);
				if(data_t.multi_post.multiposts[0].posts.length >= 2) {
					setTrend_1(data_t.multi_post.multiposts[0].posts[1])
					if(data_t.multi_post.multiposts[0].posts.length >= 3) {
						setTrend_2(data_t.multi_post.multiposts[0].posts[2])
						if(data_t.multi_post.multiposts[0].posts.length >= 4) {
							setTrend_3(data_t.multi_post.multiposts[0].posts[3])
						}
					}
				}
			}
		}
		if(typeof data_r !== 'undefined') {
			//console.log('data_r = ', data_r.multi_post.multiposts[0].posts);
			if(data_r.multi_post.multiposts[0].posts.length >= 1) {
				setRecommend_0(data_r.multi_post.multiposts[0].posts[0]);
				if(data_r.multi_post.multiposts[0].posts.length >= 2) {
					setRecommend_1(data_r.multi_post.multiposts[0].posts[1]);
					if(data_r.multi_post.multiposts[0].posts.length >= 3) {
						setRecommend_2(data_r.multi_post.multiposts[0].posts[2]);
						if(data_r.multi_post.multiposts[0].posts.length >= 4) {
							setRecommend_3(data_r.multi_post.multiposts[0].posts[3]);
						}
					}
				}
			}
		}
	}, [data_t, data_r])

	const Trend_map = () => {
		if(typeof data_t !== 'undefined') {
			if(data_t.multi_post.multiposts[0].posts.length == 0) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_t.multi_post.multiposts[0].posts.length == 1 && trend_0 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={trend_0} />
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_t.multi_post.multiposts[0].posts.length == 2 && trend_0 !== null && trend_1 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={trend_0} />
							<HomeStory post={trend_1} />
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_t.multi_post.multiposts[0].posts.length == 3 && trend_0 !== null && trend_1 !== null && trend_2 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={trend_0} />
							<HomeStory post={trend_1} />
						</div>
						<div className='TrendingStories'>
							<HomeStory post={trend_2} />
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_t.multi_post.multiposts[0].posts.length >= 4 && trend_0 !== null && trend_1 !== null && trend_2 !== null && trend_3 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={trend_0} />
							<HomeStory post={trend_1} />
						</div>
						<div className='TrendingStories'>
							<HomeStory post={trend_2} />
							<HomeStory post={trend_3} />
						</div>
					</React.Fragment>
				)
			}
			else {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
		}
		else {
			return(
				<React.Fragment>
					<div className='TrendingStories'>
						<div className="HomeStories">
						</div>
						<div className="HomeStories">
						</div>
					</div>
					<div className='TrendingStories'>
						<div className="HomeStories">
						</div>
						<div className="HomeStories">
						</div>
					</div>
				</React.Fragment>
			)
		}
	}
	const Recommend_map = () => {
		if(typeof data_r !== 'undefined') {
			if(data_r.multi_post.multiposts[0].posts.length == 0) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_r.multi_post.multiposts[0].posts.length == 1 && recommend_0 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={recommend_0} />
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_r.multi_post.multiposts[0].posts.length == 2 && recommend_0 !== null && recommend_1 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={recommend_0} />
							<HomeStory post={recommend_1} />
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_r.multi_post.multiposts[0].posts.length == 3 && recommend_0 !== null && recommend_1 !== null && recommend_2 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={recommend_0} />
							<HomeStory post={recommend_1} />
						</div>
						<div className='TrendingStories'>
							<HomeStory post={recommend_2} />
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
			else if(data_r.multi_post.multiposts[0].posts.length >= 4 && recommend_0 !== null && recommend_1 !== null && recommend_2 !== null && recommend_3 !== null) {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<HomeStory post={recommend_0} />
							<HomeStory post={recommend_1} />
						</div>
						<div className='TrendingStories'>
							<HomeStory post={recommend_2} />
							<HomeStory post={recommend_3} />
						</div>
					</React.Fragment>
				)
			}
			else {
				return(
					<React.Fragment>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
						<div className='TrendingStories'>
							<div className="HomeStories">
							</div>
							<div className="HomeStories">
							</div>
						</div>
					</React.Fragment>
				)
			}
		}
		else {
			return(
				<React.Fragment>
					<div className='TrendingStories'>
						<div className="HomeStories">
						</div>
						<div className="HomeStories">
						</div>
					</div>
					<div className='TrendingStories'>
						<div className="HomeStories">
						</div>
						<div className="HomeStories">
						</div>
					</div>
				</React.Fragment>
			)
		}
	}

	if(loading_t === true || loading_r === true) {
		console.log('loading_p = ', loading_t);
		console.log('loading_r = ', loading_r);
		return(
			<section className = "Home">
				<div className = "Introduction">
					<div title="introduction content">
						<span id="content-part">PaPaPaPaPa</span>
						<button id="get-start-part" onClick={() => prop.setLoginLogup(2)}>Start Your Trip</button>
					</div>
				</div>
				<div className = "Home-main-picture" ref={pic}>
				</div>
			</section>
		)
	}
	if((typeof data_t !== 'undefined') && (typeof data_r !== 'undefined')){
		return(
			<section className = "Home">
				<div className = "Introduction">
					<div title="introduction content">
						<span id="content-part">PaPaPaPaPa</span>
						<button id="get-start-part" onClick={() => prop.setLoginLogup(2)}>Start Your Trip</button>
					</div>
				</div>
				<div className = "Home-main-picture" ref={pic}>
				</div>
				<div className="MainContent">
					<h1>你想去什麼地方</h1>
					<div className="CitiesList">
						<Link to="/postsenum/台北"><Button variant="outlined" size="large" name="taipei" onClick={clickCity}>台北</Button></Link>
						<Link to="/postsenum/桃園"><Button variant="outlined" size="large" name="taoyuang" onClick={clickCity}>桃園</Button></Link>
						<Link to="/postsenum/新竹"><Button variant="outlined" size="large" name="hsinchu" onClick={clickCity}>新竹</Button></Link>
						<Link to="/postsenum/台中"><Button variant="outlined" size="large" name="taichung" onClick={clickCity}>台中</Button></Link>
						<Link to="/postsenum/高雄"><Button variant="outlined" size="large" name="kaohsiung" onClick={clickCity}>高雄</Button></Link>
						<Link to="/postsenum/台南"><Button variant="outlined" size="large" name="tainan" onClick={clickCity}>台南</Button></Link>
						<Link to="/postsenum/宜蘭"><Button variant="outlined" size="large" name="yilang" onClick={clickCity}>宜蘭</Button></Link>
						<Link to="/postsenum/台東"><Button variant="outlined" size="large" name="taitung" onClick={clickCity}>台東</Button></Link>
						<Link to="/postsenum/花蓮"><Button variant="outlined" size="large" name="hualien" onClick={clickCity}>花蓮</Button></Link>
						<Link to="/postsenum/澎湖"><Button variant="outlined" size="large" name="penghu" onClick={clickCity}>澎湖</Button></Link>
						<Link to="/postsenum/綠島"><Button variant="outlined" size="large" name="green island" onClick={clickCity}>綠島</Button></Link>
						<Link to="/postsenum/嘉義"><Button variant="outlined" size="large" name="chiayi" onClick={clickCity}>嘉義</Button></Link>
					</div>
					<div className = "google-map">
						<iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
					</div>
					<div className="Trending">
						<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
							<AiFillFire />
						</IconContext.Provider>
						激推文章
					</div>
					<hr id='homehr' />
					<Trend_map />
					<Link to="/postsenum/trending"><button className="HomeReadmore">Find more...</button></Link>
					<div className="Trending">
						<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
							<AiFillFire />
						</IconContext.Provider>
						小編精選
					</div>
					<hr id='homehr' />
					<Recommend_map />
					<Link to="/postsenum/recommended"><button className="HomeReadmore">Find more...</button></Link>
				</div>
			</section>
		)
	}
	else {
		return(
			<section className = "Home">
				<div className = "Introduction">
					<div title="introduction content">
						<span id="content-part">PaPaPaPaPa</span>
						<button id="get-start-part" onClick={() => prop.setLoginLogup(2)}>Start Your Trip</button>
					</div>
				</div>
				<div className = "Home-main-picture" ref={pic}>
				</div>
				<div className="MainContent">
					<h1>你想去什麼地方</h1>
					<div className="CitiesList">
						<Link to="/postsenum/台北"><Button variant="outlined" size="large" name="taipei" onClick={clickCity}>台北</Button></Link>
						<Link to="/postsenum/桃園"><Button variant="outlined" size="large" name="taoyuang" onClick={clickCity}>桃園</Button></Link>
						<Link to="/postsenum/新竹"><Button variant="outlined" size="large" name="hsinchu" onClick={clickCity}>新竹</Button></Link>
						<Link to="/postsenum/台中"><Button variant="outlined" size="large" name="taichung" onClick={clickCity}>台中</Button></Link>
						<Link to="/postsenum/高雄"><Button variant="outlined" size="large" name="kaohsiung" onClick={clickCity}>高雄</Button></Link>
						<Link to="/postsenum/台南"><Button variant="outlined" size="large" name="tainan" onClick={clickCity}>台南</Button></Link>
						<Link to="/postsenum/宜蘭"><Button variant="outlined" size="large" name="yilang" onClick={clickCity}>宜蘭</Button></Link>
						<Link to="/postsenum/台東"><Button variant="outlined" size="large" name="taitung" onClick={clickCity}>台東</Button></Link>
						<Link to="/postsenum/花蓮"><Button variant="outlined" size="large" name="hualien" onClick={clickCity}>花蓮</Button></Link>
						<Link to="/postsenum/澎湖"><Button variant="outlined" size="large" name="penghu" onClick={clickCity}>澎湖</Button></Link>
						<Link to="/postsenum/綠島"><Button variant="outlined" size="large" name="green island" onClick={clickCity}>綠島</Button></Link>
						<Link to="/postsenum/嘉義"><Button variant="outlined" size="large" name="chiayi" onClick={clickCity}>嘉義</Button></Link>
					</div>
					<div className = "google-map">
						<iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
					</div>
					<div className="Trending">
						<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
							<AiFillFire />
						</IconContext.Provider>
						激推文章
					</div>
					<hr id='homehr' />
					<div className='TrendingStories'>
					</div>
					<div className="Trending">
						<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
							<AiFillFire />
						</IconContext.Provider>
						小編精選
					</div>
					<hr id='homehr' />
					<div className='TrendingStories'>
					</div>
				</div>
			</section>
		)
	}
	/*
	return(
		<section className = "Home">
			<div className = "Introduction">
				<div title="introduction content">
					<span id="content-part">PaPaPaPaPa</span>
					<button id="get-start-part" onClick={() => prop.setLoginLogup(2)}>Start Your Trip</button>
				</div>
			</div>
			<div className = "Home-main-picture" ref={pic}>
			</div>
			<div className="MainContent">
				<h1>你想去什麼地方</h1>
				<div className="CitiesList">
					<Link to="/postsenum/台北"><Button variant="outlined" size="large" name="taipei" onClick={clickCity}>台北</Button></Link>
					<Link to="/postsenum/桃園"><Button variant="outlined" size="large" name="taoyuang" onClick={clickCity}>桃園</Button></Link>
					<Link to="/postsenum/新竹"><Button variant="outlined" size="large" name="hsinchu" onClick={clickCity}>新竹</Button></Link>
					<Link to="/postsenum/台中"><Button variant="outlined" size="large" name="taichung" onClick={clickCity}>台中</Button></Link>
					<Link to="/postsenum/高雄"><Button variant="outlined" size="large" name="kaohsiung" onClick={clickCity}>高雄</Button></Link>
					<Link to="/postsenum/台南"><Button variant="outlined" size="large" name="tainan" onClick={clickCity}>台南</Button></Link>
					<Link to="/postsenum/宜蘭"><Button variant="outlined" size="large" name="yilang" onClick={clickCity}>宜蘭</Button></Link>
					<Link to="/postsenum/台東"><Button variant="outlined" size="large" name="taitung" onClick={clickCity}>台東</Button></Link>
					<Link to="/postsenum/花蓮"><Button variant="outlined" size="large" name="hualien" onClick={clickCity}>花蓮</Button></Link>
					<Link to="/postsenum/澎湖"><Button variant="outlined" size="large" name="penghu" onClick={clickCity}>澎湖</Button></Link>
					<Link to="/postsenum/綠島"><Button variant="outlined" size="large" name="green island" onClick={clickCity}>綠島</Button></Link>
					<Link to="/postsenum/嘉義"><Button variant="outlined" size="large" name="chiayi" onClick={clickCity}>嘉義</Button></Link>
				</div>
				<div className = "google-map">
					<iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
				</div>
				<div className="Trending">
					<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
						<AiFillFire />
					</IconContext.Provider>
					Trending on PaPaGo
				</div>
				<hr id='homehr' />
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${trend_0_id}`}><button className="HomeStoryTitle">{trend_0_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{trend_0_author}</h3>
						</div>
						<p className="HomeStoryIntro">{trend_0_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{trend_0_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{trend_0_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${trend_1_id}`}><button className="HomeStoryTitle">{trend_1_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{trend_1_author}</h3>
						</div>
						<p className="HomeStoryIntro">{trend_1_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{trend_1_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{trend_1_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${trend_2_id}`}><button className="HomeStoryTitle">{trend_2_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{trend_2_author}</h3>
						</div>
						<p className="HomeStoryIntro">{trend_2_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{trend_2_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{trend_2_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${trend_3_id}`}><button className="HomeStoryTitle">{trend_3_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{trend_3_author}</h3>
						</div>
						<p className="HomeStoryIntro">{trend_3_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{trend_3_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{trend_3_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<Link to="/postsenum/trending"><button className="HomeReadmore">Find more...</button></Link>

				<div className="Trending">
					<IconContext.Provider value={{ size: '35px', style:{ fill: 'red' } }}>
						<AiFillFire />
					</IconContext.Provider>
					Recommended
				</div>
				<hr id='homehr' />
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${recommend_0_id}`}><button className="HomeStoryTitle">{recommend_0_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{recommend_0_author}</h3>
						</div>
						<p className="HomeStoryIntro">{recommend_0_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{recommend_0_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{recommend_0_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${recommend_1_id}`}><button className="HomeStoryTitle">{recommend_1_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{recommend_1_author}</h3>
						</div>
						<p className="HomeStoryIntro">{recommend_1_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{recommend_1_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{recommend_1_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${recommend_2_id}`}><button className="HomeStoryTitle">{recommend_2_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{recommend_2_author}</h3>
						</div>
						<p className="HomeStoryIntro">{recommend_2_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{recommend_2_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{recommend_2_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<Link to={"/post/" + `${recommend_3_id}`}><button className="HomeStoryTitle">{recommend_3_title}</button></Link>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{recommend_3_author}</h3>
						</div>
						<p className="HomeStoryIntro">{recommend_3_intro}</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">{recommend_3_date}</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">{recommend_3_like} Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<Link to="/postsenum/recommended"><button className="HomeReadmore">Find more...</button></Link>
			</div>
		</section>
	)*/
}

export default Home;