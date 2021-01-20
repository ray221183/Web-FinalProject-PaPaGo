import './TopicPostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY, DELETE_POST } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import PEStory from "../PostsEnum/PEStory";
import TPEStory from "./TPEStory";

// PostsEnum & PersonalPage both lead to here
function TopicPostsEnum(props) {
	let type = props.match.params.type;		// type could be a city name or someone's account
	let topic = props.match.params.topic;	// topic could be an element in the topics below or a string for indicating posted articles
	console.log('In topicpostsenum, type = ', type);
	console.log('In topicpostsenum, topic = ', topic);
	const cities = ["台北", "桃園", "新竹", "台中", "高雄", "台南", "宜蘭", "台東", "花蓮", "澎湖", "綠島", "嘉義"];
	//console.log(cities.includes(type));

	const [multiposts_c, setMultiposts_c] = useState([]);
	const [multiposts_p, setMultiposts_p] = useState([]);
	const topics = ['一日遊', '二日遊', '熱門景點', '最夯美食']

	const { loading: loading_c, error: error_c, data: data_c, refetch: refetch_c } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #一日遊', type + ' #二日遊', type + ' trending', type + ' 美食', type],
			uuid: ''
	}});
	const { loading: loading_p, error: error_p, data: data_p, refetch: refetch_p } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: type,
			search_type: 'get pair',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [''],
			uuid: ''
	}});
	const [deletePost] = useMutation(DELETE_POST);

	useEffect(
		()=>{
			refetch_c()
			refetch_p()
		}, []
	)

	useEffect(() => {
		//console.log('data = ', data)
		if(typeof(data_c) !== 'undefined'){
			console.log('data_c = ', data_c);
			setMultiposts_c(data_c.multi_post.multiposts);
		}
		if(typeof(data_p) !== 'undefined'){
			console.log('data_p = ', data_p);
			setMultiposts_p(data_p.multi_post.multiposts);
		}
	}, [data_c, data_p])

	const deleteP = (id) => {
		deletePost({
			variables: {
				uuid: id
		}})
	}


	const OneDay_map = () => {
		let front_0 = [];
		if (multiposts_c.length !== 0) {
			front_0 = [multiposts_c[0]];
		}
		//let front_4 = [multiposts[0], multiposts[1], multiposts[2], multiposts[3]];
		return (
			<React.Fragment>
				{
					front_0.map( (posts, idx) => {
							return(
								<div className="PostsEnum">
									<div className="Topic">
										{type} 一日遊
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const TwoDay_map = () => {
		let front_0 = [];
		if (multiposts_c.length !== 0) {
			front_0 = [multiposts_c[1]];
		}
		//let front_4 = [multiposts[0], multiposts[1], multiposts[2], multiposts[3]];
		return (
			<React.Fragment>
				{
					front_0.map( (posts, idx) => {
							return(
								<div className="PostsEnum">
									<div className="Topic">
										{type} 二日遊
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const HotView_map = () => {
		let trend = [];
		if (multiposts_c.length !== 0) {
			trend = [multiposts_c[2]];
		}
		//let trend = [multiposts[4]];
		return (
			<React.Fragment>
				{
					trend.map( (posts, idx) => {
						//console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										{type} 熱門景點
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const Food_map = () => {
		let food = [];
		if (multiposts_c.length !== 0) {
			food = [multiposts_c[3]];
		}
		//let recommend = [multiposts[5]];
		return (
			<React.Fragment>
				{
					food.map( (posts, idx) => {
						console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										{type} 最夯美食
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const Searchbar_map = () => {
		let search = [];
		if (multiposts_c.length !== 0) {
			search = [multiposts_c[4]];
		}
		//let recommend = [multiposts[5]];
		return (
			<React.Fragment>
				{
					search.map( (posts, idx) => {
						console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										{type}
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<PEStory post={post} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const Posted_map = () => {
		let posted = [];
		if (multiposts_p.length !== 0) {
			posted = [multiposts_p[1]];
		}
		//let recommend = [multiposts[5]];
		return (
			<React.Fragment>
				{
					posted.map( (posts, idx) => {
						console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										已發佈
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<TPEStory post={post} deleteP={deleteP} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	const Draft_map = () => {
		let draft = [];
		if (multiposts_p.length !== 0) {
			draft = [multiposts_p[0]];
		}
		//let recommend = [multiposts[5]];
		return (
			<React.Fragment>
				{
					draft.map( (posts, idx) => {
						console.log('posts type', typeof(posts), posts);
							return(
								<div className="PostsEnum">
									<div className="Topic">
										草稿
									</div>
									<hr id='PEhr' />
									{
										posts.posts.map( (post) => {
												return(
													<TPEStory post={post} deleteP={deleteP} />
												)
											}
										)
									}
								</div>
							)
						}
					)
				}
			</React.Fragment>
		)
	}
	/*const tags = data.tags.map((tag) => (
		return <div className="PETag">{tag}</div>;
	))*/
	if (loading_p === true || loading_c === true) {
		return(
			<div style={{fontSize: '100px', marginTop: '60px', textAlign: 'center'}}>Loading...</div>
		)
	}
    if (topic === '一日遊') {
    	return (
			<OneDay_map />
		)
    }
    else if(topic === '二日遊') {
    	return (
    		<TwoDay_map />
    	)
    }
    else if(topic === '熱門景點') {
    	return (
    		<HotView_map />
    	)
    }
    else if(topic === '最夯美食') {
    	return (
    		<Food_map />
    	)
    }
    else if(topic === 'all') {
    	return (
    		<Searchbar_map />
    	)
    }
    else if(topic === 'posted') {
    	return (
    		<Posted_map />
    	)
    }
    else if(topic === 'draft') {
    	return (
    		<Draft_map />
    	)
    }
    else {
    	alert('error in TopicPostsEnum.js');
    	return
    }
}

export default TopicPostsEnum;