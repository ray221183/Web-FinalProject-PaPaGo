import './PersonalPageStory.css'
import React from "react";
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IconContext} from 'react-icons';

export default ({ post, editEssay, deleteP, isPublic }) => {
	if (isPublic) {
		return (
	        <div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${post.uuid}`}><button className="PPStoryTitle">{post.title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton" onClick={() => deleteP(post.uuid)}>
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{post.introduction}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#宜蘭</div>
					<div className="PPTag">#礁溪</div>
					<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PPDate">{post.date.split(' ')[0]}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{post.great_num} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div> 
	    );
	}
	else {
		return (
	        <div className="PPStories">
				<div className="PPStoryTitle">
					<Link to={"/post/" + `${post.uuid}`}><button className="PPStoryTitle">{post.title}</button></Link>
					<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
						<button id="PPIconButton" onClick={ () => {editEssay(post)} }>
							<AiFillEdit />
						</button>
						<button id="PPIconButton" onClick={() => deleteP(post.uuid)}>
							<AiFillDelete />
						</button>		
					</IconContext.Provider>
				</div>
				<p className="PPStoryIntro">{post.introduction}</p>
				<div className="PPDateAndTag">
					<div className="PPTag">#宜蘭</div>
					<div className="PPTag">#礁溪</div>
					<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
					<div className="PPDate">{post.date.split(' ')[0]}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PPLike">{post.great_num} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div> 
	    );
	}
    /*return (
        <div className="PPStories">
			<div className="PPStoryTitle">
				<Link to={"/post/" + `${post.uuid}`}><button className="PPStoryTitle">{post.title}</button></Link>
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
					<button id="PPIconButton" onClick={ () => {editEssay(post)} }>
						<AiFillEdit />
					</button>
					<button id="PPIconButton" onClick={() => deleteP(post.uuid)}>
						<AiFillDelete />
					</button>		
				</IconContext.Provider>
			</div>
			<p className="PPStoryIntro">{post.introduction}</p>
			<div className="PPDateAndTag">
				<div className="PPTag">#宜蘭</div>
				<div className="PPTag">#礁溪</div>
				<div className="PPTag">#二日遊二日遊二日遊二日遊二日遊</div>
				<div className="PPDate">{post.date.split(' ')[0]}</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '10px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="PPLike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div> 
    );*/
};
