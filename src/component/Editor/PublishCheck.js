import './Publish.css'
import React, { useEffect, useRef, useState } from 'react'
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";


function PublishCheck(prop){
    const editorState = prop.editorState
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [curTag, setCurTag] = useState('');
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState(0);
    const [initialized, setInitialized] = useState(false);

    const elementParent = useRef();
    const elementChild = useRef();
    const scale = {
        transform: `scale(${prop.prePublishScale})`
    }

    const [step, setStep] = useState(0); // 0: 簡介 | 1: 關鍵字

    const changeScale = (e) => {
        prop.setPrePublishScale(0)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            let tagsTemp = [...tags, [curTag, tagId]]
            setTagId(tagId + 1)
            setTags(tagsTemp)
            setCurTag('')
        }
    }
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const changeIntroduction = (e) => {
        setIntroduction(e.target.value)
    }
    const changeInputTag = (e) => {
        setCurTag(e.target.value)
    }
    const removeTag = (idx) => {
        let tagsTemp = tags.filter((item) => {return item[1] !== idx})
        if(tagsTemp.length === 0) setTagId(0)
        setTags(tagsTemp)
    }
    const DisplayTags = () => {
        return(
            <div>
                {tags.map(
                    (item) => {
                        console.log(item)
                        return(
                            <div key={item[1]} className="tag">
                                <span>{item[0]}</span>

                                <span className="delete-tag" onClick={() => removeTag(item[1])}>X</span>
                            </div>
                        )
                    }
                )}
            </div>
        )
    }
    // initialize editor information
    useEffect(() => {
        console.log("initialize publish check information", prop.curPostInfo)
        if(!initialized){
            console.log("set post : ", prop.curPostInfo)
            if(prop.newPost && !prop.isPublished){
                console.log("set new post")
                setTitle('')
                setIntroduction('')
                setTags([''])
                setInitialized(true)
            }
            else{
                if(prop.curPostInfo !== null){
                    console.log("set exist post : ", prop.curPostInfo)
                    setTitle(prop.curPostInfo.title)
                    setIntroduction(prop.curPostInfo.introduction)
                    setTags(prop.curPostInfo.tags)
                    setInitialized(true)
                }
            }
        }
    }, [prop.curPostInfo])
    
    useEffect(() => {
        elementParent.current.addEventListener('click', (e) => {
            if (e.target !== elementChild.current && e.target.contains(elementChild.current)) {
                changeScale()
            }
        })
    }, [])

    const aboutClass = (step == 0) ? "click choose-bar" : "choose-bar"
    const tagClass = (step == 1) ? "click choose-bar" : "choose-bar"
    const changeStep = (step) => {
        setStep(step)
    }

    return(
        <div className="prepublish-part" style={scale} ref={elementParent}>
            <div className="interface-part" ref={elementChild}>
                <div className="top-banner">
                    <div className={aboutClass} id="about" onClick={() => changeStep(0)}>
                        關於
                    </div>
                    <div className={tagClass} id="tag" onClick={() => changeStep(1)}>
                        關鍵字
                    </div>
                </div>
                <React.Fragment>
                    {
                        (step == 0) ? 
                        <div className="content-part">
                            <div className="topic-fill">
                                <input placeholder="請輸入標題" value={title} onChange={changeTitle}/>
                            </div>
                            <div className="introduction-fill">
                                <textarea placeholder="請輸入最多100字的簡介" value={introduction} onChange={changeIntroduction} maxLength="100"></textarea>
                            </div>
                        </div> :
                        <div className="content-part">
                            <div className="tag-fill">
                                <input placeholder="請輸入關鍵字" value={curTag} onKeyDown={handleKeyDown} onChange={changeInputTag}/>
                            </div>
                            <div className="tag-list">
                                <DisplayTags />
                            </div>
                        </div>
                    }
                </React.Fragment>
                <div className="footer">
                    <span className="explain">
                        {(step == 0) ? "標題與簡介會在讀者瀏覽時顯示，不會影響文章內文" : "輸入關鍵字，幫助讀者搜尋到你的文章"}
                    </span>
                    <Link to={"/post/" + `${prop.curUuid}`}>
                        <span className="publish-button" onClick={() => prop.savefile(title, introduction, editorState, tags, true)}>
                            Publish
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PublishCheck;