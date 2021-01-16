import './PersonalPage.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	Link
  } from "react-router-dom";

function PersonalPage(prop){
	return(
		<section className = "PersonalPage">
			<div className="Topic">
				Posted
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
		</section>
	)
}

export default PersonalPage;