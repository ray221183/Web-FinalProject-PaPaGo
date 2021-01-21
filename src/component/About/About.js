import './About.css';
import React from 'react'

function About(props) {
	return (
		<div className="AboutMain">
			<div id="topandbottom">PaPaGo</div>
			<div className="AboutIntro">
				About This Website
				<hr id='abouthr' />
				<div id="aboutIntro">
					<span style={{color: 'black'}}>哈哈</span>我們希望做出一個旅遊版的網站，這個網站能讓想知道某個縣市哪裏好玩、最近熱門的景點、或是哪裏的美食不錯的人都能在這裡找到答案。同時，讓人們在想分享旅遊經驗的時候能來這裡寫下他們的故事，與大家一同分享。
				</div>
			</div>
			<div className="Authors">
				Authors
				<hr id='abouthr' />
				<h3 id='aaa'>我們是三個電機四的大學生</h3>
				<div className="AuthorNames">
					<h2 id="authorName">
						賴永玄
					</h2>
					<h2 id="authorName">
						何承叡
					</h2>
					<h2 id="authorName">
						李崇嘉
					</h2>
				</div>
			</div>
			<div className="Contact">
				Contact Us
				<hr id='abouthr' />
				<div className="Emails">
					<h2 id="authorEmail">
						B06901070@ntu.edu.tw
					</h2>
					<h2 id="authorEmail">
						B06901071@ntu.edu.tw
					</h2>
					<h2 id="authorEmail">
						B06901074@ntu.edu.tw
					</h2>
				</div>
			</div>
			<div id="topandbottom">Welcome to Join Us!!!</div>
		</div>
	);
}

export default About;
