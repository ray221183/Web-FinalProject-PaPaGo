import './TPEStory.css'
import React from 'react'
import { Link } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IconContext} from 'react-icons';

export default ({ post, deleteP }) => { /////////////////////////////////
	const scale = (false) ? "disable" : ""

    return (
        <div className="TPEStories" key={post.uuid}>
			<div className="TPEAuthor">
				<Link to={"/post/" + `${post.uuid}`}><button className="TPEStoryTitle">{post.title}</button></Link>
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
					<Link to={"/editor"}>
						<button id="TPEIconButton" className={scale}>  {/*//////////////////////////////*/}
							<AiFillEdit />
						</button>
					</Link>
					<button id="TPEIconButton" onClick={() => deleteP(post.uuid)}>
						<AiFillDelete />
					</button>		
				</IconContext.Provider>
			</div>
			<p className="TPEStoryIntro">{post.introduction}</p>
			<div className="TPEDateAndTag">
				<div className="TPEDate">{post.date}</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="TPELike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );
};
