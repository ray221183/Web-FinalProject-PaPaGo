import React, { useEffect, useRef, useState } from 'react'
import { convertFromRaw } from 'draft-js'
import { EditorState } from 'draft-js'
import EditorCore from './EditorCore'
import './Editor.css'
import './Publish.css'
import { setServers } from 'dns'


function Editor(prop){
    const editorState = prop.editorState
    const setEditorState = prop.setEditorState
    const [title, setTitle] = useState('');
    
    const [saved, setSaved] = useState(true);
    const [background, setBackground] = useState(true) // true: white background | false: dark background
    const changeScale = () => {
        console.log("prepare to publish")
        prop.setPrePublishScale(1)
    }
    console.log("editor post", prop.curPostInfo)
    const changeBackground = () => setBackground(!background)
    const editorColor = (background) ? 'Editor-light' : 'Editor-dark'
    const editorBackgroundStyle = {
        backgroundColor:  (background) ? 'rgb(255, 255, 255)' : 'rgb(49, 49, 49)'
    }
    const borderBottomStyle = {
        borderColor: (background) ? 'rgb(214, 214, 214)' : 'rgb(255, 255, 255)'
    }
    const saveColorStyle = {
        color: (background) ? 'rgb(172, 172, 172)' : 'rgb(255, 255, 255)'
    }
    // autosave
    useEffect(() => {
        setSaved(false)
        const timer = setTimeout(() => {
            setSaved(true)
            if(prop.newPost) {
                let blank_essay = EditorState.createEmpty()
                prop.savefile('', '', blank_essay, [''], false) ///////////////////////
            }
            else prop.savefile(prop.curPostInfo.title, prop.curPostInfo.introduction, editorState, prop.curPostInfo.tags, !prop.curPostInfo.is_sketch) ///////////////////////
        }, 1500)
        return () => clearTimeout(timer)
    }, [editorState.getCurrentContent()])

    // initialize editor information
    useEffect(() => {
        console.log("initialize editor information", prop.curPostInfo)
        if( typeof prop.curPostInfo !== "undefined" ){
            console.log("set post : ", prop.curPostInfo)
            if(prop.newPost){
                console.log("new")
                setEditorState(()=>EditorState.createEmpty())
                setTitle('')
            }
            else{
                console.log("existed")
                setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(prop.curPostInfo.content))))
                setTitle(prop.curPostInfo.title)
            }
        }
    }, [prop.curPostInfo])

    // editor reset
    useEffect(() => {
        return () => {
            console.log("reset")
            prop.setCurPostInfo([])
        }
    }, [])

    return(
        <section className = {`Editor ${editorColor}`} style={editorBackgroundStyle}>
            <div className="editor-part" name = "editor-part">
                <div className="top-part" style={borderBottomStyle}>
                    <div className="editor-tools">
                        <div id="light" onClick={changeBackground}>
                            
                        </div>
                    </div>
                    <div className="publish">
                        <span id="save-state" style={saveColorStyle}>
                            { (saved) ? 'saved' : 'saving...' }
                        </span>
                        <span id="publish-button" onClick={changeScale}>
                            Publish
                        </span>
                    </div>
                </div>
                <React.Fragment>
                    <EditorCore editorState={editorState} setEditorState={setEditorState} background={background}/>
                </React.Fragment>
            </div>
        </section>
    )
}

function PublishCheck(prop){
    const editorState = prop.editorState
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [curTag, setCurTag] = useState('');
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState(0);

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
        if( prop.curPostInfo.length !== 0 ){
            if( typeof prop.curPostInfo[0] !== "undefined" ){
                console.log("set post : ", prop.curPostInfo)
                if(prop.newPost){
                    setTitle('')
                    setIntroduction('')
                    setTags([''])
                }
                else{
                    setTitle(prop.curPostInfo.title)
                    setIntroduction(prop.curPostInfo.introduction)
                    setTags(prop.curPostInfo.tags)
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
                    <span className="publish-button" onClick={() => prop.savefile(title, introduction, editorState, tags, true)}>
                        Publish
                    </span>
                </div>
            </div>
        </div>
    )
}

export { PublishCheck, Editor};