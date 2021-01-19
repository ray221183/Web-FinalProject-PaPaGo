import './PersonalPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY, DELETE_POST } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link, useLocation } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IconContext} from 'react-icons';
import { async } from 'q';

function PersonalPage(props){
	let who = props.who
	console.log('who = ' + who);

	const [public_0, setPublic_0] = useState(null);
	const [public_0_id, setPublic_0_id] = useState('');
	const [public_0_title, setPublic_0_title] = useState('');
	const [public_0_author, setPublic_0_author] = useState('');
	const [public_0_intro, setPublic_0_intro] = useState('');
	const [public_0_date, setPublic_0_date] = useState('');
	const [public_0_like, setPublic_0_like] = useState(0);

	const [public_1, setPublic_1] = useState(null);
	const [public_1_id, setPublic_1_id] = useState('');
	const [public_1_title, setPublic_1_title] = useState('');
	const [public_1_author, setPublic_1_author] = useState('');
	const [public_1_intro, setPublic_1_intro] = useState('');
	const [public_1_date, setPublic_1_date] = useState('');
	const [public_1_like, setPublic_1_like] = useState(0);

	const [draft_0, setDraft_0] = useState(null);
	const [draft_0_id, setDraft_0_id] = useState('');
	const [draft_0_title, setDraft_0_title] = useState('');
	const [draft_0_author, setDraft_0_author] = useState('');
	const [draft_0_intro, setDraft_0_intro] = useState('');
	const [draft_0_date, setDraft_0_date] = useState('');
	const [draft_0_like, setDraft_0_like] = useState(0);

	const [draft_1, setDraft_1] = useState(null);
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
	const [deletePost] = useMutation(DELETE_POST);
	const editEssay = ( post_info ) => {
		console.log("Post Info Post InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost Info")
		console.log("Post Info: ", post_info)
		if(!post_info.is_sketch){
			props.setIsPublished(true)
			props.setNewPost(true)
			console.log("related_uuid: ", post_info.related_uuid)
			if(post_info.related_uuid === ""){
				props.setCurPostInfo(post_info)
			}
			else{
				props.setCurUuid(post_info.related_uuid)
			}
		}
		else{
			props.setCurPostInfo(post_info)
		}
	}

	useEffect(
		()=>{
			refetch()
		}, []
	)
	useEffect(() => {
		if(typeof data !== 'undefined'){
			console.log('In personal page, data = ', data.multi_post.multiposts[0])
			if(data.multi_post.multiposts[1].posts.length >= 1) {
				setPublic_0(data.multi_post.multiposts[1].posts[0])
				setPublic_0_id(data.multi_post.multiposts[1].posts[0].uuid);
				setPublic_0_title(data.multi_post.multiposts[1].posts[0].title);
				setPublic_0_author(data.multi_post.multiposts[1].posts[0].name);
				setPublic_0_intro(data.multi_post.multiposts[1].posts[0].introduction);
				setPublic_0_date(data.multi_post.multiposts[1].posts[0].date.split(' ')[0]);
				setPublic_0_like(data.multi_post.multiposts[1].posts[0].great_num);
				if(data.multi_post.multiposts[1].posts.length >= 2) {
					setPublic_1(data.multi_post.multiposts[1].posts[1])
					setPublic_1_id(data.multi_post.multiposts[1].posts[1].uuid);
					setPublic_1_title(data.multi_post.multiposts[1].posts[1].title);
					setPublic_1_author(data.multi_post.multiposts[1].posts[1].name);
					setPublic_1_intro(data.multi_post.multiposts[1].posts[1].introduction);
					setPublic_1_date(data.multi_post.multiposts[1].posts[1].date.split(' ')[0]);
					setPublic_1_like(data.multi_post.multiposts[1].posts[1].great_num);
				}
			}
			if(data.multi_post.multiposts[0].posts.length >= 1) {
				setDraft_0(data.multi_post.multiposts[0].posts[0])
				setDraft_0_id(data.multi_post.multiposts[0].posts[0].uuid);
				setDraft_0_title(data.multi_post.multiposts[0].posts[0].title);
				setDraft_0_author(data.multi_post.multiposts[0].posts[0].name);
				setDraft_0_intro(data.multi_post.multiposts[0].posts[0].introduction);
				setDraft_0_date(data.multi_post.multiposts[0].posts[0].date.split(' ')[0]);
				setDraft_0_like(data.multi_post.multiposts[0].posts[0].great_num);
				if(data.multi_post.multiposts[0].posts.length >= 2) {
					setDraft_1(data.multi_post.multiposts[0].posts[1])
					setDraft_1_id(data.multi_post.multiposts[0].posts[1].uuid);
					setDraft_1_title(data.multi_post.multiposts[0].posts[1].title);
					setDraft_1_author(data.multi_post.multiposts[0].posts[1].name);
					setDraft_1_intro(data.multi_post.multiposts[0].posts[1].introduction);
					setDraft_1_date(data.multi_post.multiposts[0].posts[1].date.split(' ')[0]);
					setDraft_1_like(data.multi_post.multiposts[0].posts[1].great_num);
				}
			}
		}
	}, [data])

	const deleteP = async (id) => {
		await deletePost({
			variables: {
				uuid: id
		}})
		refetch()
	}



	const Public_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[1].posts.length == 0) {
				return(
					<div className="PPStories"></div>
				)
			}
			else if(data.multi_post.multiposts[1].posts.length == 1) {
				return(
					<div className="PPStories">
						<div className="PPStoryTitle">
							<Link to={"/post/" + `${public_0_id}`}><button className="PPStoryTitle">{public_0_title}</button></Link>
							<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
								<Link to="/editor">
									<button id="PPIconButton" onClick={ () => {console.log("#1");editEssay(public_0)} }>
										<AiFillEdit />
									</button>
								</Link>
								<button id="PPIconButton" onClick={() => deleteP(public_0_id)}>
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
				)
			}
			else if(data.multi_post.multiposts[1].posts.length >= 2) {
				return(
					<React.Fragment>
						<div className="PPStories">
							<div className="PPStoryTitle">
								<Link to={"/post/" + `${public_0_id}`}><button className="PPStoryTitle">{public_0_title}</button></Link>
								<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
									<Link to="/editor">
										<button id="PPIconButton" onClick={ () => {console.log("#2");editEssay(public_0)} }>
											<AiFillEdit />
										</button>
									</Link>
									<button id="PPIconButton" onClick={() => deleteP(public_0_id)}>
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
									<Link to="/editor">
										<button id="PPIconButton" onClick={ () => {console.log("#3");editEssay(public_1)} }>
											<AiFillEdit />
										</button>
									</Link>
									<button id="PPIconButton" onClick={() => deleteP(public_1_id)}>
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
					</React.Fragment>
				)
			}
		}
	}
	const Draft_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[0].posts.length == 0) {
				return(
					<div className="PPStories"></div>
				)
			}
			else if(data.multi_post.multiposts[0].posts.length == 1) {
				return(
					<div className="PPStories">
						<div className="PPStoryTitle">
							<Link to={"/post/" + `${draft_0_id}`}><button className="PPStoryTitle">{draft_0_title}</button></Link>
							<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
								<Link to="/editor">
									<button id="PPIconButton" onClick={ () => {console.log("#4");editEssay(draft_0)} }>
										<AiFillEdit />
									</button>
								</Link>
								<button id="PPIconButton" onClick={() => deleteP(draft_0_id)}>
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
				)
			}
			else if(data.multi_post.multiposts[0].posts.length >= 2) {
				return(
					<React.Fragment>
						<div className="PPStories">
							<div className="PPStoryTitle">
								<Link to={"/post/" + `${draft_0_id}`}><button className="PPStoryTitle">{draft_0_title}</button></Link>
								<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
									<Link to="/editor">
										<button id="PPIconButton" onClick={ () => {console.log("#5");editEssay(draft_0)} }>
											<AiFillEdit />
										</button>
									</Link>
									<button id="PPIconButton" onClick={() => deleteP(draft_0_id)}>
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
									<Link to="/editor">
										<button id="PPIconButton" onClick={ () => {console.log("#6");editEssay(draft_1)} }>
											<AiFillEdit />
										</button>
									</Link>
									<button id="PPIconButton" onClick={() => deleteP(draft_1_id)}>
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
					</React.Fragment>
				)
			}
		}
	}

	if(typeof data !== 'undefined') {
		return(
			<section className = "PersonalPage">
				<div className="Published">
					已發佈
				</div>
				<hr id='PPhr' />
				<Public_map />
				<Link to={"/personalpage/" + `${who}` + "/posted"}><button className="PPReadmore">More...</button></Link>
				<div className="Published">
					草稿
				</div>
				<hr id='PPhr' />
				<Draft_map />
				<Link to={"/personalpage/" + `${who}` + "/draft"}><button className="PPReadmore">More...</button></Link>
			</section>
		)
	}
	else {
		return(
			<section className = "PersonalPage">
				<div className="Published">
					已發佈
				</div>
				<hr id='PPhr' />
				<div className="PPStories"></div>
				<div className="Published">
					草稿
				</div>
				<hr id='PPhr' />
				<div className="PPStories"></div>
			</section>
		)
	}
}

export default PersonalPage;