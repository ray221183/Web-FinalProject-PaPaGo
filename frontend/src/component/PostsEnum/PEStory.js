import './PEStory.css'
import React from "react";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

export default ({ post }) => {
    return (
        <div className="PEStories">
			<div className="PEAuthor">
				<button className="PEStoryTitle">{post.title}</button>
				<span style={{marginLeft: '5px', marginRight: '5px', marginTop: '8px', border:'0px solid black'}}>by</span>
				<h3 style={{ marginTop: '10px',border:'0px solid green', fontSize:'20px' }}>{post.name}</h3>
			</div>
			<p className="PEStoryIntro">{post.introduction}</p>
			<div className="PEDateAndTag">
				<div className="PEDate">{post.date}</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="PELike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );
};
