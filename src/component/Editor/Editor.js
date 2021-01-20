import React, { useEffect, useRef, useState } from 'react'
import { EditorState , convertFromRaw } from 'draft-js'
import EditorCore from './EditorCore'
import './Editor.css'


function Editor(prop){
    const editorState = prop.editorState
    const setEditorState = prop.setEditorState
    const [initialized, setInitialized] = useState(false);
    
    const [allowToSave, setAllowToSave] = useState(false);
    const [saved, setSaved] = useState(0); // 0: not saved | 1: saving | 2: saved
    const [background, setBackground] = useState(true) // true: white background | false: dark background
    const changeScale = () => {
        console.log("prepare to publish")
        prop.setPrePublishScale(1)
    }
    // console.log("editor post", prop.curPostInfo)
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
        let timer = null
        console.log("save0", prop.curPostInfo !== null, prop.newPost)
        if(prop.curPostInfo !== null || prop.newPost){
            console.log("save1")
            if(allowToSave) setSaved(1)
            else setSaved(0)
            timer = setTimeout(() => {
                if(allowToSave){
                    console.log("save2")
                    setSaved(2)
                    if(prop.newPost) {
                        console.log("new post")
                        prop.savefile('Untitled story', '', editorState, [], false) ///////////////////////
                    }
                    else{
                        console.log("not new post")
                        let title = ''
                        console.log("first block text", editorState.getCurrentContent().getFirstBlock().text)
                        if(prop.curPostInfo.is_sketch){
                        }
                        else{
                            title = prop.curPostInfo.title
                        }
                        prop.savefile(editorState.getCurrentContent().getFirstBlock().text, prop.curPostInfo.introduction, editorState, prop.curPostInfo.tags, !prop.curPostInfo.is_sketch) ///////////////////////
                    }
                }
            }, 1500)
        }
        return () => {
            if(timer!==null) clearTimeout(timer)
        }
    }, [editorState.getCurrentContent()])

    // initialize editor information
    useEffect(() => {
        console.log("initialize editor information", prop.curPostInfo)
        if(!initialized){
            console.log("set post : ", prop.curPostInfo)
            if(prop.newPost && !prop.isPublished){
                console.log("set new post")
                setEditorState(()=>EditorState.createEmpty())
                setInitialized(true)
            }
            else{
                if(prop.curPostInfo !== null){
                    console.log("set exist post : ", prop.curPostInfo)
                    setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(prop.curPostInfo.content))))
                    setInitialized(true)
                }
            }
        }
    }, [prop.curPostInfo])

    // editor reset
    useEffect(() => {
        return () => {
            console.log("reset")
            prop.setNewPost(false)
            prop.setCurPostInfo(null)
            prop.setIsPublished(false)
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
                            { (saved == 0) ? '' : (saved == 2) ?  'saved' : 'saving...' }
                        </span>
                        <span id="publish-button" onClick={changeScale}>
                            Publish
                        </span>
                    </div>
                </div>
                <React.Fragment>
                    <EditorCore editorState={editorState} setEditorState={setEditorState} background={background} setAllowToSave={setAllowToSave}/>
                </React.Fragment>
            </div>
        </section>
    )
}


export default Editor;