import './PostsEnum.css'
import React, { useEffect, useRef, useState } from 'react'

function PostsEnum(){
    return (
        <div className="PostsEnum">
            <div className="Topic">
                一日遊
            </div>
            <div className="Stories">
                <button className="StoryTitle">Happy New Year</button>
                <p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
                <div className="DateAndTag">
                    <div className="Tag">#台北</div>
                    <div className="Tag">#陽明山</div>
                    <div className="Tag">#一日遊一日遊一日遊一日遊一日遊</div>
                    <div className="Date">2020/12/31</div>
                </div>
            </div>
            <div className="Stories">
                <button className="StoryTitle">Enter 2021</button>
                <p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
                <div className="DateAndTag">
                    <div className="Tag">#南投</div>
                    <div className="Tag">#日月潭</div>
                    <div className="Tag">#一日遊一日遊一日遊一日遊一日遊</div>
                    <div className="Date">2021/1/1</div>
                </div>
            </div>
            <button className="Readmore">Read more...</button>
            <div className="Topic">
                二日遊
            </div>
            <div className="Stories">
                <button className="StoryTitle">Happy New Year</button>
                <p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
                <div className="DateAndTag">
                    <div className="Tag">#屏東</div>
                    <div className="Tag">#墾丁</div>
                    <div className="Tag">#二日遊二日遊二日遊二日遊二日遊</div>
                    <div className="Date">2020/12/31</div>
                </div>
            </div>
            <div className="Stories">
                <button className="StoryTitle">A very very long story...</button>
                <p className="StoryIntro">A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.A brief introduction to the story.</p>
                <div className="DateAndTag">
                    <div className="Tag">#花蓮</div>
                    <div className="Tag">#貨櫃星巴克</div>
                    <div className="Tag">#二日遊二日遊二日遊二日遊二日遊</div>
                    <div className="Date">2020/12/31</div>
                </div>
            </div>
            <button className="Readmore">Read more...</button>
        </div>
    );
}

export default PostsEnum;