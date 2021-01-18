import './Home.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillFire} from 'react-icons/ai';
import {IconContext} from 'react-icons';


function Home(prop){
	const pic = useRef();
	const [city, setCity] = useState('');
	const [trend_0_title, setTrend_0_title] = useState('');
	const [trend_0_author, setTrend_0_author] = useState('');
	const [trend_0_intro, setTrend_0_intro] = useState('');
	const [trend_0_date, setTrend_0_date] = useState('');
	const [trend_0_like, setTrend_0_like] = useState(0);

	const [trend_1_title, setTrend_1_title] = useState('');
	const [trend_1_author, setTrend_1_author] = useState('');
	const [trend_1_intro, setTrend_1_intro] = useState('');
	const [trend_1_date, setTrend_1_date] = useState('');
	const [trend_1_like, setTrend_1_like] = useState(0);

	const [trend_2_title, setTrend_2_title] = useState('');
	const [trend_2_author, setTrend_2_author] = useState('');
	const [trend_2_intro, setTrend_2_intro] = useState('');
	const [trend_2_date, setTrend_2_date] = useState('');
	const [trend_2_like, setTrend_2_like] = useState(0);

	const [trend_3_title, setTrend_3_title] = useState('');
	const [trend_3_author, setTrend_3_author] = useState('');
	const [trend_3_intro, setTrend_3_intro] = useState('');
	const [trend_3_date, setTrend_3_date] = useState('');
	const [trend_3_like, setTrend_3_like] = useState(0);

	const [recommend_0_title, setRecommend_0_title] = useState('');
	const [recommend_0_author, setRecommend_0_author] = useState('');
	const [recommend_0_intro, setRecommend_0_intro] = useState('');
	const [recommend_0_date, setRecommend_0_date] = useState('');
	const [recommend_0_like, setRecommend_0_like] = useState(0);

	const [recommend_1_title, setRecommend_1_title] = useState('');
	const [recommend_1_author, setRecommend_1_author] = useState('');
	const [recommend_1_intro, setRecommend_1_intro] = useState('');
	const [recommend_1_date, setRecommend_1_date] = useState('');
	const [recommend_1_like, setRecommend_1_like] = useState(0);

	const [recommend_2_title, setRecommend_2_title] = useState('');
	const [recommend_2_author, setRecommend_2_author] = useState('');
	const [recommend_2_intro, setRecommend_2_intro] = useState('');
	const [recommend_2_date, setRecommend_2_date] = useState('');
	const [recommend_2_like, setRecommend_2_like] = useState(0);
	
	const [recommend_3_title, setRecommend_3_title] = useState('');
	const [recommend_3_author, setRecommend_3_author] = useState('');
	const [recommend_3_intro, setRecommend_3_intro] = useState('');
	const [recommend_3_date, setRecommend_3_date] = useState('');
	const [recommend_3_like, setRecommend_3_like] = useState(0);

	const clickCity = (event) => {
		const name = event.target.name;
		setCity(name);
	}
	
	const { data: data_t, refetch: refetch_t } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: ['trending'],
			uuid: ''
	}});
	const { data: data_r, refetch: refetch_r } = useQuery(MULTIPOST_QUERY, 
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
		if(typeof data_t !== 'undefined'){
			//console.log('data_t = ', data_t.multi_post.multiposts[0].posts)
			setTrend_0_title(data_t.multi_post.multiposts[0].posts[0].title);
			setTrend_0_author(data_t.multi_post.multiposts[0].posts[0].name);
			setTrend_0_intro(data_t.multi_post.multiposts[0].posts[0].introduction);
			setTrend_0_date(data_t.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setTrend_0_like(data_t.multi_post.multiposts[0].posts[0].great_num);
			setTrend_1_title(data_t.multi_post.multiposts[0].posts[1].title);
			setTrend_1_author(data_t.multi_post.multiposts[0].posts[1].name);
			setTrend_1_intro(data_t.multi_post.multiposts[0].posts[1].introduction);
			setTrend_1_date(data_t.multi_post.multiposts[0].posts[1].date.split(' ')[0]);
			setTrend_1_like(data_t.multi_post.multiposts[0].posts[1].great_num);
			setTrend_2_title(data_t.multi_post.multiposts[0].posts[2].title);
			setTrend_2_author(data_t.multi_post.multiposts[0].posts[2].name);
			setTrend_2_intro(data_t.multi_post.multiposts[0].posts[2].introduction);
			setTrend_2_date(data_t.multi_post.multiposts[0].posts[2].date.split(' ')[0]);
			setTrend_2_like(data_t.multi_post.multiposts[0].posts[2].great_num);
			setTrend_3_title(data_t.multi_post.multiposts[0].posts[3].title);
			setTrend_3_author(data_t.multi_post.multiposts[0].posts[3].name);
			setTrend_3_intro(data_t.multi_post.multiposts[0].posts[3].introduction);
			setTrend_3_date(data_t.multi_post.multiposts[0].posts[3].date.split(' ')[0]);
			setTrend_3_like(data_t.multi_post.multiposts[0].posts[3].great_num);
		}
		if(typeof data_r !== 'undefined'){
			//console.log('data_r = ', data_r.multi_post.multiposts[0].posts);
			setRecommend_0_title(data_r.multi_post.multiposts[0].posts[0].title);
			setRecommend_0_author(data_r.multi_post.multiposts[0].posts[0].name);
			setRecommend_0_intro(data_r.multi_post.multiposts[0].posts[0].introduction);
			setRecommend_0_date(data_r.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setRecommend_0_like(data_r.multi_post.multiposts[0].posts[0].great_num);
			setRecommend_1_title(data_r.multi_post.multiposts[0].posts[1].title);
			setRecommend_1_author(data_r.multi_post.multiposts[0].posts[1].name);
			setRecommend_1_intro(data_r.multi_post.multiposts[0].posts[1].introduction);
			setRecommend_1_date(data_r.multi_post.multiposts[0].posts[1].date.split(' ')[0]);
			setRecommend_1_like(data_r.multi_post.multiposts[0].posts[1].great_num);
			setRecommend_2_title(data_r.multi_post.multiposts[0].posts[2].title);
			setRecommend_2_author(data_r.multi_post.multiposts[0].posts[2].name);
			setRecommend_2_intro(data_r.multi_post.multiposts[0].posts[2].introduction);
			setRecommend_2_date(data_r.multi_post.multiposts[0].posts[2].date.split(' ')[0]);
			setRecommend_2_like(data_r.multi_post.multiposts[0].posts[2].great_num);
			setRecommend_3_title(data_r.multi_post.multiposts[0].posts[3].title);
			setRecommend_3_author(data_r.multi_post.multiposts[0].posts[3].name);
			setRecommend_3_intro(data_r.multi_post.multiposts[0].posts[3].introduction);
			setRecommend_3_date(data_r.multi_post.multiposts[0].posts[3].date.split(' ')[0]);
			setRecommend_3_like(data_r.multi_post.multiposts[0].posts[3].great_num);
		}
	}, [data_t, data_r])

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
				<div>
					<Link to="/postsenum/台北"><button className="button" name="taipei" onClick={clickCity}>台北</button></Link>
					<Link to="/postsenum/桃園"><button className="button" name="taoyuan" onClick={clickCity}>桃園</button></Link>
					<Link to="/postsenum/新竹"><button className="button" name="hsinchu" onClick={clickCity}>新竹</button></Link>
					<Link to="/postsenum/台中"><button className="button" name="taichung" onClick={clickCity}>台中</button></Link>
					<Link to="/postsenum/高雄"><button className="button" name="kaohsiung" onClick={clickCity}>高雄</button></Link>
					<Link to="/postsenum/台南"><button className="button" name="tainan" onClick={clickCity}>台南</button></Link>
				</div>
				<div>
					<Link to="/postsenum/宜蘭"><button className="button" name="yilang" onClick={clickCity}>宜蘭</button></Link>
					<Link to="/postsenum/台東"><button className="button" name="taitung" onClick={clickCity}>台東</button></Link>
					<Link to="/postsenum/花蓮"><button className="button" name="hualien" onClick={clickCity}>花蓮</button></Link>
					<Link to="/postsenum/澎湖"><button className="button" name="penghu" onClick={clickCity}>澎湖</button></Link>
					<Link to="/postsenum/綠島"><button className="button" name="green island" onClick={clickCity}>綠島</button></Link>
					<Link to="/postsenum/嘉義"><button className="button" name="chiayi" onClick={clickCity}>嘉義</button></Link>
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
							<button className="HomeStoryTitle">{trend_0_title}</button>
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
							<button className="HomeStoryTitle">{trend_1_title}</button>
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
							<button className="HomeStoryTitle">{trend_2_title}</button>
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
							<button className="HomeStoryTitle">{trend_3_title}</button>
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
							<button className="HomeStoryTitle">{recommend_0_title}</button>
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
							<button className="HomeStoryTitle">{recommend_1_title}</button>
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
							<button className="HomeStoryTitle">{recommend_2_title}</button>
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
							<button className="HomeStoryTitle">{recommend_3_title}</button>
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
	)
}

export default Home;