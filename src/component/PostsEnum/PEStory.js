import './PEStory.css'
import React from "react";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import Tags from '../Tags/Tags';

export default ({ post }) => {
	if(post.image === '' || post.image === null) {
		return (
	        <div className="PEStories" key={post.uuid}>
				<div className="PEAuthor">
					<Link to={"/post/" + `${post.uuid}`}>
						<button className="PEStoryTitle">{post.title}
							<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '10px'}}>by</span>
							<span style={{border:'0px solid green', fontSize:'20px', marginLeft: '10px', position:'relative', bottom: '3px'}}>{post.name}</span>
						</button>
					</Link>
				</div>
				<p className="PEStoryIntro">{post.introduction}</p>
				<div className="PEDateAndTag">
					<Tags tags={post.tags} />
					<div className="PEDate">{post.date.split(' ')[0]}</div>
					<div>
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="PELike">{post.great_num} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
	    );
	}
	else {
		return (
			<div style={{ border: '0px solid green', width: '800px', marginBottom: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
		        <div className="PEStoriesWithImage" key={post.uuid}>
					<div className="PEAuthor">
						<Link to={"/post/" + `${post.uuid}`}>
							<button className="PEStoryTitle">{post.title}
								<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '10px'}}>by</span>
								<span style={{border:'0px solid green', fontSize:'20px', marginLeft: '10px', position:'relative', bottom: '3px'}}>{post.name}</span>
							</button>
						</Link>
					</div>
					<p className="PEStoryIntro">{post.introduction}</p>
					<div className="PEDateAndTag">
						<Tags tags={post.tags} />
						<div className="PEDate">{post.date.split(' ')[0]}</div>
						<div>
							<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
								<FaThumbsUp />
								<span id="PELike">{post.great_num} Like</span>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<img src={post.image}  style={{width: '200px', height: '100%', border:'0px solid red'}} />
			</div>
	    );
	}
    /*return (
        <div className="PEStories" key={post.uuid}>
			<div className="PEAuthor">
				<Link to={"/post/" + `${post.uuid}`}>
					<button className="PEStoryTitle">{post.title}
						<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '10px'}}>by</span>
						<span style={{border:'0px solid green', fontSize:'20px', marginLeft: '10px', position:'relative', bottom: '3px'}}>{post.name}</span>
					</button>
				</Link>
			</div>
			<p className="PEStoryIntro">{post.introduction}</p>
			<div className="PEDateAndTag">
				<Tags tags={post.tags} />
				<div className="PEDate">{post.date.split(' ')[0]}</div>
				<div>
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="PELike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );*/
};
