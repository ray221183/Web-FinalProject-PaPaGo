import './Home.css'
import React, { useEffect, useRef, useState } from 'react'
import {FaThumbsUp} from 'react-icons/fa';
import {AiFillFire} from 'react-icons/ai';
import {IconContext} from 'react-icons';
import {
	Link
  } from "react-router-dom";

function Home(prop){
	const pic = useRef();
	const [city, setCity] = useState('');
	const clickCity = (event) => {
		const name = event.target.name;
		setCity(name);
	}
	useEffect(
		()=>{
			prop.setPicHeight(pic.current.offsetHeight)
		}, []
	)

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
					<Link to="/postsenum">
						<button className="button" name="taipei" onClick={clickCity}>Taipei</button>
						<button className="button" name="taoyuan" onClick={clickCity}>Taoyuan</button>
						<button className="button" name="hsinchu" onClick={clickCity}>Hsinchu</button>
						<button className="button" name="taichung" onClick={clickCity}>Taichung</button>
						<button className="button" name="kaohsiung" onClick={clickCity}>Kaohsiung</button>
						<button className="button" name="tainan" onClick={clickCity}>Tainan</button>
					</Link>
				</div>
				<div>
					<Link to="/postsenum">
						<button className="button" name="yilang" onClick={clickCity}>Yilang</button>
						<button className="button" name="taitung" onClick={clickCity}>Taitung</button>
						<button className="button" name="hualien" onClick={clickCity}>Hualien</button>
						<button className="button" name="penghu" onClick={clickCity}>Penghu</button>
						<button className="button" name="green island" onClick={clickCity}>Green Island</button>
						<button className="button" name="chiayi" onClick={clickCity}>Chiayi</button>
					</Link>
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
							<button className="HomeStoryTitle">Hakuna Matata</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>A author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2021/2/3</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">87000 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">Enter 2021</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>B author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2021/1/1</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">17400 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">Yeeeeeeeee</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>C author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2020/12/31</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">8787 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">You are short</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>D author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2020/12/31</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">1987 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<button className="HomeReadmore">Find more...</button>

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
							<button className="HomeStoryTitle">Bald is short</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>A author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2021/1/1</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">174 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">Goodbye 2020</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>B author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2020/12/31</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">69 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<div className='TrendingStories'>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">Fuck your girl friend</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>C author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2021/2/14</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">187 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="HomeStories">
						<div className="HomeAuthor">
							<button className="HomeStoryTitle">Bzhe is ugly</button>
							<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
							<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>D author</h3>
						</div>
						<p className="HomeStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
						<div className="HomeDateAndTag">
							<div className="HomeDate">2020/1/17</div>
							<div className="HomeLike">
								<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
									<FaThumbsUp />
									<span id="homeLike">1987 Like</span>
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
				<button className="HomeReadmore">Find more...</button>
			</div>
		</section>
	)
}

export default Home;