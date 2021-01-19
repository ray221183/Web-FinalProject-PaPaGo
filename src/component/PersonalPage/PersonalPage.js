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

import PersonalPageStory from './PersonalPageStory'

function PersonalPage(props){
	let who = props.who
	console.log('who = ' + who);

	const [public_0, setPublic_0] = useState(null);
	const [public_1, setPublic_1] = useState(null);
	const [draft_0, setDraft_0] = useState(null);
	const [draft_1, setDraft_1] = useState(null);

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
		props.setCurPostInfo(post_info)
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
				if(data.multi_post.multiposts[1].posts.length >= 2) {
					setPublic_1(data.multi_post.multiposts[1].posts[1])
				}
			}
			if(data.multi_post.multiposts[0].posts.length >= 1) {
				setDraft_0(data.multi_post.multiposts[0].posts[0])
				if(data.multi_post.multiposts[0].posts.length >= 2) {
					setDraft_1(data.multi_post.multiposts[0].posts[1])
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
			if(data.multi_post.multiposts[1].posts.length == 1 && public_0 !== null) {
				return(
					<PersonalPageStory post={public_0} editEssay={editEssay} deleteP={deleteP}/>
				)
			}
			else if(data.multi_post.multiposts[1].posts.length >= 2 && public_0 !== null && public_1 !== null) {
				return(
					<React.Fragment>
						<PersonalPageStory post={public_0} editEssay={editEssay} deleteP={deleteP}/>
						<PersonalPageStory post={public_1} editEssay={editEssay} deleteP={deleteP}/>
					</React.Fragment>
				)
			}
			else {
				console.log('In PersonalPage.js, data = ', data.multi_post.multiposts[1].posts.length);
				return(
					<div className="PPStories"></div>
				)
			}
		}
	}
	const Draft_map = () => {
		if(typeof data !== 'undefined') {
			if(data.multi_post.multiposts[0].posts.length == 1 && draft_0 !== null) {
				return(
					<PersonalPageStory post={draft_0} editEssay={editEssay} deleteP={deleteP}/>
				)
			}
			else if(data.multi_post.multiposts[0].posts.length >= 2 && draft_0 !== null && draft_1 !== null) {
				console.log('draft_map here, length >= 2');
				return(
					<React.Fragment>
						<PersonalPageStory post={draft_0} editEssay={editEssay} deleteP={deleteP}/>
						<PersonalPageStory post={draft_1} editEssay={editEssay} deleteP={deleteP}/>
					</React.Fragment>
				)
			}
			else {
				console.log('In PersonalPage.js, data = ', data.multi_post.multiposts[0].posts.length);
				return(
					<div className="PPStories"></div>
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