import './RelatedStory.css'
import React from "react";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

export default ({ related_post }) => {
    return (
        <div className="RelatedStory">
			<div className="RelatedStoryImage">An image</div>
			<div className="RelatedStoryAuthor">
				<Link to={"/post/" + `${related_post.uuid}`}>
					<button className="RelatedStoryTitle">{related_post.title}<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '5px'}}>by</span><span style={{border:'0px solid green', fontSize:'20px', marginLeft: '5px' }}>{related_post.name}</span>
					</button>
				</Link>
			</div>
			<div className="RelatedStoryDateAndTag">
				<div className="RelatedStoryDate">{related_post.date.split(' ')[0]}</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px', border: '0px solid green' } }}>
						<FaThumbsUp />
						<span id="RelatedStoryLike">{related_post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );
};
