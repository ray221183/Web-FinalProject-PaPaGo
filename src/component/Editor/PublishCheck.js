import './Publish.css'
import React, { useEffect, useRef, useState } from 'react'
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";
import axios from 'axios';
import { useQuery, useMutation } from '@apollo/react-hooks'
import {UPLOAD_IMAGE} from '../../graphql'

const client_id = '6e44dcf658378f5';

function PublishCheck(prop){
    const curLocation = useLocation();
    const curHistory = useHistory();
    const editorState = prop.editorState
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [curTag, setCurTag] = useState('');
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [addPic] = useMutation(UPLOAD_IMAGE)

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

    const [imgSrc, setImgSrc] = useState('');
    const [pageImg, setPageImg] = useState(null);

    const readURL = (input) => {
        console.log(1, input)
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.target.files[0]); // convert to base64 string
            reader.onload = function(e) {
                console.log("e.target.result", e.target.result)
                setImgSrc(String(e.target.result));
            }
            setPageImg(input.target.files[0])
            console.log(4)
        }
        console.log(5)
    }
    const pageImgSrc = {backgroundImage: `url('${imgSrc}')`}

    const toPublish = async () => {
        prop.savefile(title, introduction, editorState, tags, true)
        if(pageImg !== null){
            const data = new FormData()
            const config = {headers: { Authorization: `Client-ID ${client_id}` }}
            let res = await axios.post('https://api.imgur.com/3/image', data, config).catch((err) => {
                console.log(err)
            })
            if(typeof res !== "undefined"){
                const imgUrl = res.data.data.link
                console.log("1")
                console.log("uuid", prop.curUuid)
                console.log("image", imgUrl)
                await addPic({
                    variables: {
                        uuid: prop.curUuid,
	                    image: imgUrl
                    }
                })
            }
            else{
                console.log("2")
                console.log("uuid", prop.curUuid, typeof prop.curUuid)
                console.log("image", imgSrc, typeof imgSrc)
                await addPic({
                    variables: {
                        uuid: prop.curUuid,
	                    image: imgSrc //"https://static.wikia.nocookie.net/disney/images/d/d4/Mickey_Mouse.png/revision/latest?cb=20180703032033&path-prefix=zh"//"https://images.freeimages.com/images/large-previews/1dc/sky-1374686.jpg"
                    }
                })
            }
            curHistory.push("/post/" + `${prop.curUuid}`)
        }
        else{
            curHistory.push("/post/" + `${prop.curUuid}`)
        }
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
                            <div className="picture-show" style={pageImgSrc}>
                            </div>
                        </div>
                    }
                </React.Fragment>
                <div className="footer">
                    <span className="explain">
                        {(step == 0) ? "標題與簡介會在讀者瀏覽時顯示，不會影響文章內文" : (step == 1) ? "輸入關鍵字，幫助讀者搜尋到你的文章" : "放上漂亮的封面照，吸引讀者目光喔"}
                    </span>
                    <span className="publish-button" onClick={() => {toPublish()}}>
                        Publish
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PublishCheck;
