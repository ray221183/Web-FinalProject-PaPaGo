import './Home.css'
import React, { useEffect, useRef, useState } from 'react'
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
				<div className="Topic">
					Trending on PaPaGo
				</div>
				<div className="Stories">
					<button className="StoryTitle">Hakuna Matata</button>
					<p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
					<div className="DateAndTag">
						<div className="Tag">#台中</div>
						<div className="Tag">#新社花海</div>
						<div className="Tag">#一日遊一日遊一日遊一日遊一日遊</div>
						<div className="Date">2021/2/3</div>
					</div>
				</div>
				<div className="Stories">
					<button className="StoryTitle">Enter 2021</button>
					<p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
					<div className="DateAndTag">
						<div className="Tag">#台南</div>
						<div className="Tag">#安平古堡</div>
						<div className="Tag">#一日遊一日遊一日遊一日遊一日遊</div>
						<div className="Date">2021/1/1</div>
					</div>
				</div>
				<button className="Readmore">Read more...</button>
				<div className="Topic">
					Draft
				</div>
				<div className="Stories">
					<button className="StoryTitle">Yeeeeeeeee</button>
					<p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
					<div className="DateAndTag">
						<div className="Tag">#宜蘭</div>
						<div className="Tag">#礁溪</div>
						<div className="Tag">#二日遊二日遊二日遊二日遊二日遊</div>
						<div className="Date">2020/12/31</div>
					</div>
				</div>
				<div className="Stories">
					<button className="StoryTitle">You are short</button>
					<p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
					<div className="DateAndTag">
						<div className="Tag">#澎湖</div>
						<div className="Tag">#吉貝嶼</div>
						<div className="Tag">#二日遊二日遊二日遊二日遊二日遊</div>
						<div className="Date">2020/12/31</div>
					</div>
				</div>
				<button className="Readmore">Read more...</button>
			</div>
		</section>
	)
}

export default Home;