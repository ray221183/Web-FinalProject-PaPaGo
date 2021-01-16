import React, { useEffect, useRef, useState } from 'react'
import EditorCore from './EditorCore'
import './Editor.css'
import './Publish.css'


function Editor(prop){
    const [saved, setSaved] = useState(true);
    const [background, setBackground] = useState(true) // true: white background | false: dark background
    const changeScale = () => {
        console.log("prepare to publish")
        prop.setPrePublishScale(1)
    }
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

    useEffect(() => {
        setSaved(false)
        const timer = setTimeout(() => {
            setSaved(true)
            prop.savefile(prop.editorState, [], false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [prop.editorState.getCurrentContent()])

    return(
        <section className = {`Editor ${editorColor}`} style={editorBackgroundStyle}>
            <div className="editor-part" name = "editor-part">
                <div className="top-part" style={borderBottomStyle}>
                    <div className="editor-tools">
                        <div id="light" onClick={changeBackground}>
                            
                        </div>
                    </div>
                    <div className="publish" onClick={changeScale}>
                        <span id="save-state" style={saveColorStyle}>
                            { (saved) ? 'saved' : 'saving...' }
                        </span>
                        <span id="publish-button">
                            Publish
                        </span>
                    </div>
                </div>
                <React.Fragment>
                    <EditorCore editorState={prop.editorState} setEditorState={prop.setEditorState} background={background}/>
                </React.Fragment>
            </div>
        </section>
    )
}

function PublishCheck(prop){
    const elementParent = useRef();
    const elementChild = useRef();
    const [curTag, setCurTag] = useState('');
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState(0);
    const scale = {
        transform: `scale(${prop.prePublishScale})`
    }

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
    
    useEffect(() => {
        elementParent.current.addEventListener('click', (e) => {
            if (e.target !== elementChild.current && e.target.contains(elementChild.current)) {
                changeScale()
            }
        })
    }, []);

    return(
        <div className="prepublish-part" style={scale} ref={elementParent}>
            <div className="interface-part" ref={elementChild}>
                <div className="top-banner">
                    <div className="choose-bar" id="tag">
                        關鍵字
                    </div>
                </div>
                <div className="content-part">
                    <div className="tag-fill">
                        <input placeholder="請輸入關鍵字" value={curTag} onKeyDown={handleKeyDown} onChange={changeInputTag}/>
                    </div>
                    <div className="tag-list">
                        <DisplayTags />
                    </div>
                </div>
                <div className="footer">
                    <span className="explain">
                        輸入關鍵字，幫助讀者搜尋到你的文章
                    </span>
                    <span className="publish-button" onClick={() => prop.savefile(prop.editorState, tags, true)}>
                        Publish
                    </span>
                </div>
            </div>
        </div>
    )
}

export { PublishCheck, Editor};