import './Tags.css'
import React from "react";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function Tags(props) {
	let tags_show;
	if(props.tags.length > 5) {
		//console.log('In Tags.js, tags length > 5');
		tags_show = [props.tags[0], props.tags[1], props.tags[2], props.tags[3], props.tags[4]];
	}
	else {
		tags_show = props.tags;
	}
	//console.log('tags_show = ', tags_show);

	if(props.tags.length === 0) {
		return(
			<React.Fragment>
			</React.Fragment>
		)
	}
	else {
		return (
	        <React.Fragment>
				{
					tags_show.map( (tag) => {
							return(
								<div className="Tag">
									{tag}
								</div>
							)
						}
					)
				}
			</React.Fragment>
	    );
	}
};

export default Tags;