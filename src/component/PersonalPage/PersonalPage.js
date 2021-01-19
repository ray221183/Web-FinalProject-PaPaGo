import './PersonalPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IconContext} from 'react-icons';

function PersonalPage(props){
	let { who } = props.match.params;
	console.log('who = ' + who);

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