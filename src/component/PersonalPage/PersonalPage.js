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
	let { who } = props.match.params;		// who is the account of someone
	console.log('who = ' + who);

	const [public_0_id, setPublic_0_id] = useState('');
	const [public_0_title, setPublic_0_title] = useState('');
	const [public_0_author, setPublic_0_author] = useState('');
	const [public_0_intro, setPublic_0_intro] = useState('');
	const [public_0_date, setPublic_0_date] = useState('');
	const [public_0_like, setPublic_0_like] = useState(0);

	const [public_1_id, setPublic_1_id] = useState('');
	const [public_1_title, setPublic_1_title] = useState('');
	const [public_1_author, setPublic_1_author] = useState('');
	const [public_1_intro, setPublic_1_intro] = useState('');
	const [public_1_date, setPublic_1_date] = useState('');
	const [public_1_like, setPublic_1_like] = useState(0);

	const [draft_0_id, setDraft_0_id] = useState('');
	const [draft_0_title, setDraft_0_title] = useState('');
	const [draft_0_author, setDraft_0_author] = useState('');
	const [draft_0_intro, setDraft_0_intro] = useState('');
	const [draft_0_date, setDraft_0_date] = useState('');
	const [draft_0_like, setDraft_0_like] = useState(0);

	const [draft_1_id, setDraft_1_id] = useState('');
	const [draft_1_title, setDraft_1_title] = useState('');
	const [draft_1_author, setDraft_1_author] = useState('');
	const [draft_1_intro, setDraft_1_intro] = useState('');
	const [draft_1_date, setDraft_1_date] = useState('');
	const [draft_1_like, setDraft_1_like] = useState(0);

	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: who,
			search_type: 'get pair',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [''],
			uuid: ''
	}});

	useEffect(
		()=>{
			refetch()
		}, []
	)
	useEffect(() => {
		if(typeof data !== 'undefined'){
			console.log('In personal page, data = ', data.multi_post.multiposts[1].posts)
			setPublic_0_id(data.multi_post.multiposts[0].posts[0].uuid);
			setPublic_0_title(data.multi_post.multiposts[0].posts[0].title);
			setPublic_0_author(data.multi_post.multiposts[0].posts[0].name);
			setPublic_0_intro(data.multi_post.multiposts[0].posts[0].introduction);
			setPublic_0_date(data.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
			setPublic_0_like(data.multi_post.multiposts[0].posts[0].great_num);
			setPublic_1_id(data.multi_post.multiposts[0].posts[1].uuid);
			setPublic_1_title(data.multi_post.multiposts[0].posts[1].title);
			setPublic_1_author(data.multi_post.multiposts[0].posts[1].name);
			setPublic_1_intro(data.multi_post.multiposts[0].posts[1].introduction);
			setPublic_1_date(data.multi_post.multiposts[0].posts[1].date.split(' ')[0]);
			setPublic_1_like(data.multi_post.multiposts[0].posts[1].great_num);
			setDraft_0_id(data.multi_post.multiposts[1].posts[0].uuid);
			setDraft_0_title(data.multi_post.multiposts[1].posts[0].title);
			setDraft_0_author(data.multi_post.multiposts[1].posts[0].name);
			setDraft_0_intro(data.multi_post.multiposts[1].posts[0].introduction);
			setDraft_0_date(data.multi_post.multiposts[1].posts[0].date.split(' ')[0]);
			setDraft_0_like(data.multi_post.multiposts[1].posts[0].great_num);
			setDraft_1_id(data.multi_post.multiposts[1].posts[1].uuid);
			setDraft_1_title(data.multi_post.multiposts[1].posts[1].title);
			setDraft_1_author(data.multi_post.multiposts[1].posts[1].name);
			setDraft_1_intro(data.multi_post.multiposts[1].posts[1].introduction);
			setDraft_1_date(data.multi_post.multiposts[1].posts[1].date.split(' ')[0]);
			setDraft_1_like(data.multi_post.multiposts[1].posts[1].great_num);
		}
	}, [data])

	return(
		<section className = "PersonalPage">
			<div className="Published">
				Posted
			</div>
			<hr id='PPhr' />
			<div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${public_0_id}`}><button className="PPStoryTitle">{public_0_title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{public_0_intro}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台中</div>
					<div className="PPTag">#新社花海</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">{public_0_date}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{public_0_like} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${public_1_id}`}><button className="PPStoryTitle">{public_1_title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{public_1_intro}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#台南</div>
					<div className="PPTag">#安平古堡</div>
					<div className="PPTag">#一日遊一日遊一日遊一日遊一日遊</div>
					<div className="PPDate">{public_1_date}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{public_1_like} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<Link to={"/personalpage/" + `${who}` + "/posted"}><button className="PPReadmore">More...</button></Link>
			<div className="Published">
				Draft
			</div>
			<hr id='PPhr' />
			<div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${draft_0_id}`}><button className="PPStoryTitle">{draft_0_title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{draft_0_intro}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#宜蘭</div>
					<div className="PPTag">#礁溪</div>
					<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PPDate">{draft_0_date}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{draft_0_like} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${draft_1_id}`}><button className="PPStoryTitle">{draft_1_title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton">
							<AiFillEdit />
						</button>
						<button id="PPIconButton">
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{draft_1_intro}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#澎湖</div>
					<div className="PPTag">#吉貝嶼</div>
					<div className="PPTag">#二日遊</div>
					<div className="PPDate">{draft_1_date}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{draft_1_like} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
			<Link to={"/personalpage/" + `${who}` + "/draft"}><button className="PPReadmore">More...</button></Link>
		</section>
	)
}

export default PersonalPage;