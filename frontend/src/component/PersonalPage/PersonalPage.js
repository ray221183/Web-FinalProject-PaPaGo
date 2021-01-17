import './PersonalPage.css'
import React, { useEffect, useRef, useState } from 'react'
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import {
	Link
  } from "react-router-dom";

function PersonalPage(prop){
	return(
		<section className = "PersonalPage">
			<div className="Published">
				Posted
			</div>
			<hr id='PPhr' />
			<div className="PPStories">
				<button className="PPStoryTitle">Hakuna Matata</button>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台中</div>
					<div className="PPTag">#新社花海</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">2021/2/3</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<button className="PPStoryTitle">Enter 2021</button>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台南</div>
					<div className="PPTag">#安平古堡</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">2021/1/1</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PPReadmore">Read more...</button>
			<div className="Published">
				Draft
			</div>
			<hr id='PPhr' />
			<div className="PPStories">
				<button className="PPStoryTitle">Yeeeeeeeee</button>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#宜蘭</div>
					<div className="PPTag">#礁溪</div>
					<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PPDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<button className="PPStoryTitle">You are short</button>
				<p className="PPStoryIntro">A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#澎湖</div>
					<div className="PPTag">#吉貝嶼</div>
					<div className="PPTag">#二日遊</div>
					<div className="PPDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PPReadmore">Read more...</button>
		</section>
	)
}

export default PersonalPage;