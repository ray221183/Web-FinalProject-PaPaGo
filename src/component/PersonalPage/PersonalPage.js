import './PersonalPage.css'
import React, { useEffect, useRef, useState } from 'react'
import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
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
				<div className="PPStoryTitle">
					<button className="PPStoryTitle">Hakuna Matata</button>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台中</div>
					<div className="PPTag">#新社花海</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">2021/2/3</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<div className="PPStoryTitle">
					<button className="PPStoryTitle">Enter 2021</button>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台南</div>
					<div className="PPTag">#安平古堡</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">2021/1/1</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PPReadmore">More...</button>
			<div className="Published">
				Draft
			</div>
			<hr id='PPhr' />
			<div className="PPStories">
				<div className="PPStoryTitle">
					<button className="PPStoryTitle">Yeeeeeeeee</button>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#宜蘭</div>
					<div className="PPTag">#礁溪</div>
					<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PPDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<div className="PPStoryTitle">
					<button className="PPStoryTitle">You are short</button>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">A brief introduction to the story.</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#澎湖</div>
					<div className="PPTag">#吉貝嶼</div>
					<div className="PPTag">#二日遊</div>
					<div className="PPDate">2020/12/31</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">17400 Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<button className="PPReadmore">More...</button>
		</section>
	)
}

export default PersonalPage;