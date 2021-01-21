import './HomeStory.css'
import React from "react";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

import Tags from '../Tags/Tags';

export default ({ post }) => {
	if(post.image === '' || post.image === null){
		return(
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
					<Tags tags={post.tags} />
					<div className="HomeDate">{post.date.split(' ')[0]}</div>
					<div className="HomeLike">
						<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
							<FaThumbsUp />
							<span id="homeLike">{post.great_num} Like</span>
						</IconContext.Provider>
					</div>
				</div>
			</div>
		)
	}
	else {
		return (
			<div style={{ border: '0px solid green', width: '680px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
		        <div className="HomeStoriesWithImage">
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
						<Tags tags={post.tags} />
						<div className="HomeDate">{post.date.split(' ')[0]}</div>
						<div className="HomeLike">
							<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
								<FaThumbsUp />
								<span id="homeLike">{post.great_num} Like</span>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<img src={post.image} style={{width: '150px', height: '100%', border: '0px solid red'}} />
			</div>
	    );
	}
    /*return (
        <div className="HomeStories">
        	<div style={{border: '2px solid green', width:'680px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
	        	<div style={{border: '2px solid blue', width:'480px'}}>
					<div className="HomeAuthor">
						<Link to={"/post/" + `${post.uuid}`}>
							<button className="HomeStoryTitle">{post.title}
								<span style={{border:'0px solid black', fontSize: '15px', marginLeft: '10px'}}>by</span>
								<span style={{border:'0px solid green', fontSize:'20px', marginLeft: '10px', position:'relative', bottom: '3px'}}>{post.name}</span>
							</button>
						</Link>
					</div>
					<p className="HomeStoryIntro">{post.introduction}</p>
				</div>
				<img src={post.image} style={{width: '200px', height: '150px', border:'2px solid red'}} />
			</div>
			<div className="HomeDateAndTag">
				<Tags tags={post.tags} />
				<div className="HomeDate">{post.date.split(' ')[0]}</div>
				<div className="HomeLike">
					<IconContext.Provider value={{ size: '16px', style:{ fill: 'black', marginLeft: '5px', marginBottom: '4px' } }}>
						<FaThumbsUp />
						<span id="homeLike">{post.great_num} Like</span>
					</IconContext.Provider>
				</div>
			</div>
		</div>
    );*/
};
