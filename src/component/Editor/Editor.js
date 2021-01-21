import React, { useEffect, useState } from 'react'
import { EditorState , convertFromRaw } from 'draft-js'
import EditorCore from './EditorCore'
import {
	useLocation
  } from "react-router-dom";
import './Editor.css'

function Editor(prop){
    //const curLocation = useLocation();
    const editorState = prop.editorState
    const setEditorState = prop.setEditorState
    const [initialized, setInitialized] = useState(false);
    //const [tags, setTags] = useState();
    
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
    const lightStyle = {
        backgroundColor: (background) ? 'rgb(207, 207, 207)' : 'rgb(121, 121, 121)'
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
                    let title = ''
                    title = (editorState.getCurrentContent().getFirstBlock().text === '') ? 'Untitled story' : editorState.getCurrentContent().getFirstBlock().text
                    if(prop.newPost && !prop.isPublished) {
                        console.log("new post 11")
                        prop.savefile(title, '', editorState, [], false) ///////////////////////
                    }
                    else{
                        console.log("not new post 22")
                        let title = ''
                        let introduction = prop.curPostInfo.introduction
                        let publish = !prop.curPostInfo.is_sketch
                        let tagsList = prop.curPostInfo.tags.filter((item) => {return item !== ''})
                        tagsList =  ( tagsList.length !== 0 ) ? prop.curPostInfo.tags.map((item, idx) => {
                            return [item, idx]
                        }) : []
                        console.log("first block text", editorState.getCurrentContent().getFirstBlock().text)
                        if(prop.isPublished){
                            title = editorState.getCurrentContent().getFirstBlock().text
                        }
                        else{
                            title = (editorState.getCurrentContent().getFirstBlock().text === '') ? 'Untitled story' : editorState.getCurrentContent().getFirstBlock().text
                        }
                        prop.savefile(title, introduction, editorState, tagsList, publish) ///////////////////////
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
        console.log(initialized)
        if(true){
            console.log("set post : ", prop.curPostInfo)
            if(prop.newPost && !prop.isPublished){
                console.log("set new post")
                setEditorState(()=>EditorState.createEmpty())
                // setInitialized(true)
                // console.log("111washwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwash")
                // prop.searchPost([''], false, false, '', '', '', false)
            }
            else{
                if(prop.curPostInfo !== null){
                    console.log("set exist post : ", prop.curPostInfo)
                    setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(prop.curPostInfo.content))))
                    // setInitialized(true)
                    // console.log("222washwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwashwash")
                    // prop.searchPost([''], false, false, '', '', '', false)
                }
            }
        }
    }, [prop.curPostInfo])

    // // editor reset
    // useEffect(() => {
    //     return () => {
    //         console.log("reset editor")
    //         // prop.rePosts()
    //         // console.log("reposts")
    //         prop.setNewPost(false)
    //         prop.setCurPostInfo(null)
    //         prop.setIsPublished(false)
    //         prop.setPrePublishScale(0)
    //         prop.setCurUuid('')
    //         prop.setRelatedUuid('')
    //     }
    // }, [])
    return(
        <section className = {`Editor ${editorColor}`} style={editorBackgroundStyle}>
            <div className="editor-part" name = "editor-part">
                <div className="top-part" style={borderBottomStyle}>
                    <div className="editor-tools">
                        <div id="light" onClick={changeBackground} style={lightStyle}></div>
                    </div>
                    <div className="publish">
                        <span id="save-state" style={saveColorStyle}>
                            { (saved === 0) ? '' : (saved === 2) ?  'saved' : 'saving...' }
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