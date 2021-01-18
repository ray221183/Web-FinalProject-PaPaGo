import './Article.css';
import React from 'react';
import {FaThumbsUp} from 'react-icons/fa';
import {IconContext} from 'react-icons';

function Article() {
	return (
		<div className="Article">
			<h1 id="title">I am the title of this story I am the title of this story</h1>
			<div className="ArticleImage">
				A image about this story.
			</div>
			<p className="Paragraph">
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
				The first paragraph.The first paragraph.The first paragraph.The first paragraph.The first paragraph.
			</p>
			<p className="Paragraph">
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
				The second paragraph.The second paragraph.The second paragraph.The second paragraph.The second paragraph.
			</p>
			<p className="Paragraph">
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
				The third paragraph.The third paragraph.The third paragraph.The third paragraph.The third paragraph.
			</p>
			<div className="ArticleBottom">
				<IconContext.Provider value={{ size: '20px', style:{ fill: 'black' } }}>
					<button id='LikePost'>
						<FaThumbsUp />
						<span id="likeNum">87 Like</span>
					</button>
				</IconContext.Provider>
			</div>
			<div className="Author">
				<div id='WrittenBy'>
					Written By
				</div>
				<div id='author'>
					An image about the author
					<button id="AuthorButton">The author name</button>
				</div>
			</div>
			<h3 id="MoreStories">More Interesting Stories</h3>
			<hr id='hr' />
			<div className="RelatedStories">
				<div className="Story">
					<h3>A related story</h3>
				</div>
				<div className="Story">
					<h3>A related story</h3>
				</div>
				<div className="Story">
					<h3>A related story</h3>
				</div>
			</div>
		</div>
	);
}

export default Article;
