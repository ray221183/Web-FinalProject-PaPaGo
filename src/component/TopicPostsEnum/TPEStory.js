import './TPEStory.css'
import React from 'react'
import { Link, useHistory } from "react-router-dom";

import {FaThumbsUp} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IconContext} from 'react-icons';

export default (props) => { /////////////////////////////////
	const post = props.post;
	const deleteP = props.deleteP;
	const scale = (props.allowEdit) ? "" : "disable"
	const curHistory = useHistory();
	const editEssay = ( post_info ) => {
		console.log("Post Info Post InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost InfoPost Info")
		console.log("Post Info: ", post_info)
		if(!post_info.is_sketch){
			console.log("setIsPublished", props.setIsPublished)
			props.setIsPublished(true)
			console.log("related_uuid: ", post_info.related_uuid)
			if(post_info.related_uuid === ""){
				props.setNewPost(true)
				props.setCurPostInfo(post_info)
				// props.setCurUuid(post_info.related_uuid)
			}
			else{
				props.searchPost([''], true, true, post_info.related_uuid, '', '',true)
			}
			// props.setCurUuid()
			props.setRelatedUuid(post_info.uuid)
		}
		else{
			props.setRelatedUuid('')
			props.setCurPostInfo(post_info)
			props.setCurUuid(post_info.uuid)
			props.setSearchUuid(post_info.uuid)
		}
		curHistory.push("/editor")
	}

    return (
        <div className="TPEStories" key={post.uuid}>
			<div className="TPEAuthor">
				<Link to={"/post/" + `${post.uuid}`}><button className="TPEStoryTitle">{post.title}</button></Link>
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'gray', marginLeft: '10px', marginBottom: '4px' } }}>
					<Link to={"/editor"}>
						<button id="TPEIconButton" className={scale} onClick={() => editEssay(post)}>  {/*//////////////////////////////*/}
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
				<div className="TPEDate">{post.date.split(' ')[0]}</div>
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
