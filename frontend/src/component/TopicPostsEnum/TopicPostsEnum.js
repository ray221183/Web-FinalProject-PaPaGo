import './TopicPostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'
import { MULTIPOST_QUERY } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import PEStory from "../PostsEnum/PEStory";

function TopicPostsEnum(props) {
	let type = props.match.params.type;
	let topic = props.match.params.topic;
	console.log('In topicpostsenum, type = ', type);
	console.log('In topicpostsenum, topic = ', topic);
	const cities = ["台北", "桃園", "新竹", "台中", "高雄", "台南", "宜蘭", "台東", "花蓮", "澎湖", "綠島", "嘉義"];
	//console.log(cities.includes(type));

	const [multiposts, setMultiposts] = useState([]);
	const topics = ['一日遊', '二日遊', '熱門景點', '最夯美食']

	const { loading, error, data, refetch } = useQuery(MULTIPOST_QUERY, 
		{variables: { 
			writer: '',
			search_type: '',
			get_sketch: false,
			get_non_sketch: true,
			keyword: [type + ' #一日遊', type + ' #二日遊', type + ' trending', type + ' 美食'],
			uuid: ''
	}});

	useEffect(
		()=>{
			refetch()
		}, []
	)

	useEffect(() => {
		//console.log('data = ', data)
		if(typeof(data) !== 'undefined'){
			console.log('data = ', data)
			setMultiposts(data.multi_post.multiposts);
		}
	}, [data])

	const OneDay_map = () => {
		let front_0 = [];
		if (multiposts.length !== 0) {
			front_0 = [multiposts[0]]
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
		if (multiposts.length !== 0) {
			front_0 = [multiposts[1]]
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
		if (multiposts.length !== 0) {
			trend = [multiposts[2]]
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
		if (multiposts.length !== 0) {
			food = [multiposts[3]]
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
	/*const tags = data.tags.map((tag) => (
		return <div className="PETag">{tag}</div>;
	))*/
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
    else {
    	alert('error in PostsEnum.js');
    	return
    }
}

export default TopicPostsEnum;