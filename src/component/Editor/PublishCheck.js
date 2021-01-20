import './Publish.css'
import React, { useEffect, useRef, useState } from 'react'
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";


function PublishCheck(prop){
    const curLocation = useLocation();
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

    const [step, setStep] = useState(0); // 0: 簡介 | 1: 關鍵字 | 2:圖片

    const changeScale = (e) => {
        prop.setPrePublishScale(0)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            if(tags.length<8 && curTag!== ''){
                let tagsTemp = [...tags, ["＃" + curTag, tagId]]
                setTagId(tagId + 1)
                setTags(tagsTemp)
                setCurTag('')
            }
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
        console.log("initialize publish information", prop.curPostInfo)
        console.log(initialized)
        if(true){
            console.log("set post : ", prop.curPostInfo)
            if(prop.newPost && !prop.isPublished){
                console.log("set new post")
                setTitle('')
                setIntroduction('')
                setTags([''])
            }
            else{
                if(prop.curPostInfo !== null){
                    console.log("set exist post : ", prop.curPostInfo)
                    setTitle(prop.curPostInfo.title)
                    setIntroduction(prop.curPostInfo.introduction)
                    let tagsList = prop.curPostInfo.tags.filter((item) => {return item !== ''})
                    tagsList =  ( tagsList.length !== 0 ) ? prop.curPostInfo.tags.map((item, idx) => {
                        return [item, idx]
                    }) : []
                    console.log(tagsList)
                    setTags(tagsList)
                    setTagId(tagsList.length)
                }
            }
        }
    }, [prop.curPostInfo])

    //change title
    useEffect(() => {
        console.log("to set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set titleto set title")
        if(!prop.isPublished){
            console.log("set title", editorState.getCurrentContent().getFirstBlock().text)
            let curTitle = (editorState.getCurrentContent().getFirstBlock().text === '') ? 'Untitled story' : editorState.getCurrentContent().getFirstBlock().text
            setTitle(curTitle)
        }
    }, [editorState.getCurrentContent().getFirstBlock().text])
    
    useEffect(() => {
        elementParent.current.addEventListener('click', (e) => {
            if (e.target !== elementChild.current && e.target.contains(elementChild.current)) {
                changeScale()
            }
        })
    }, [])

    const aboutClass = (step == 0) ? "click choose-bar" : "choose-bar"
    const tagClass = (step == 1) ? "click choose-bar" : "choose-bar"
    const picClass = (step == 2) ? "click choose-bar" : "choose-bar"
    const changeStep = (step) => {
        setStep(step)
    }

    useEffect(() => {
        return () => {
            console.log("reset public check")
            // prop.rePosts()
            // console.log("reposts")
            prop.setNewPost(false)
            prop.setCurPostInfo(null)
            prop.setIsPublished(false)
            prop.setPrePublishScale(0)
            prop.setCurUuid('')
            prop.setRelatedUuid('')
        }
    }, [])

    const [imgSrc, setImgSrc] = useState('');

    const readURL = (input) => {
        console.log(1, input)
        if (input.target.files && input.target.files[0]) {
            console.log(2)
            var reader = new FileReader();
          
            reader.onload = function(e) {
                console.log(3)
                console.log("e.target.result", e.target.result)
                setImgSrc(String(e.target.result));
            }
            console.log(4)
            reader.readAsDataURL(input.target.files[0]); // convert to base64 string
            console.log("img src", imgSrc)
        }
        console.log(5)
    }
    const img = {
        backgroundImage: `url('${imgSrc}')`
    }


    console.log("prop.curUuid", prop.curUuid)

    return(
        <div className="prepublish-part" style={scale} ref={elementParent}>
            <div className="interface-part" ref={elementChild}>
                <div className="top-banner">
                    <div className={aboutClass} id="about" onClick={() => changeStep(0)}>
                        關於
                    </div>
                    <div className={picClass} id="picture" onClick={() => changeStep(2)}>
                        圖片
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
                                {/* <input placeholder="請輸入標題" value={title} onChange={changeTitle}/> */}
                                <textarea placeholder="請輸入最多50字的標題" value={title} onChange={changeTitle} maxLength="50"></textarea>
                            </div>
                            <div className="introduction-fill">
                                <textarea placeholder="請輸入最多100字的簡介" value={introduction} onChange={changeIntroduction} maxLength="100"></textarea>
                            </div>
                        </div> :
                        (step == 1) ?
                        <div className="content-part">
                            <div className="tag-fill">
                                <input placeholder="請輸入最多8組的關鍵字" value={curTag} onKeyDown={handleKeyDown} onChange={changeInputTag}/>
                                {/* <textarea placeholder="請輸入最多8組且每組字數10字內的關鍵字" value={(clear) ? '' : curTag} onKeyDown={handleKeyDown} onChange={changeInputTag} maxLength="10"></textarea> */}
                            </div>
                            <div className="tag-list">
                                <DisplayTags />
                            </div>
                        </div> :
                        <div className="content-part">
                            <div className="picture-fill">
                                <input type="file" onChange={(e) => readURL(e)}/>
                            </div>
                            <div className="picture-show" style={img}></div>
                        </div>
                    }
                </React.Fragment>
                <div className="footer">
                    <span className="explain">
                        {(step == 0) ? "標題與簡介會在讀者瀏覽時顯示，不會影響文章內文" : (step == 1) ? "輸入關鍵字，幫助讀者搜尋到你的文章" : "放上漂亮的封面照，吸引讀者目光喔"}
                    </span>
                    <Link to={"/post/" + `${prop.curUuid}`}>
                        <span className="publish-button" onClick={() => {
                            console.log(prop.curUuid)
                            prop.savefile(title, introduction, editorState, tags, true)
                        }}>
                            Publish
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PublishCheck;
