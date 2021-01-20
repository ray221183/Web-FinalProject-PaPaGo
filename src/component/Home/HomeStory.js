import './HomeStory.css'
import React from "react";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

export default ({ post }) => {
    return (
        <div className="HomeStories">
			<div className="HomeAuthor">
				<Link to={"/post/" + `${post.uuid}`}>
					<button className="HomeStoryTitle">{post.title}
						<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '10px'}}>by</span>
						<span style={{border:'0px solid green', fontSize:'20px', marginLeft: '10px', position:'relative', bottom: '3px'}}>{post.name}</span>
					</button>
				</Link>
			</div>
			<p className="HomeStoryIntro">{post.introduction}</p>
			<div className="HomeDateAndTag">
				<div className="HomeDate">{post.date.split(' ')[0]}</div>
				<div className="HomeLike">
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="homeLike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );
};
