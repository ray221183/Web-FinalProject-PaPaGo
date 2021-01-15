import React, { useEffect, useRef, useState } from 'react'
import {EditorState} from 'draft-js'
import EditorCore from './EditorCore'
import './Editor.css'


function Editor(prop){
    const [editorState, setEditorState] = useState( ()=>EditorState.createEmpty() );

    const changeScale = () => {
        console.log("prepare to publish")
        prop.setPrePublishScale(1)
    }

    return(
        <section className = "Editor">
            <div className="editor-part" name = "editor-part">
                <div className="top-part">
                    <div className="publish" onClick={changeScale}>
                        <span>
                            Publish
                        </span>
                    </div>
                </div>
                <React.Fragment>
                    <EditorCore editorState={editorState} setEditorState={setEditorState}/>
                </React.Fragment>
            </div>
        </section>
    )
}

function PublishCheck(prop){
    const elementParent = useRef();
    const elementChild = useRef();
    const scale = {
        transform: `scale(${prop.prePublishScale})`
    }
    const changeScale = (e) => {
        console.log("close")
        prop.setPrePublishScale(0)
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
            </div>
        </div>
    )
}

export { PublishCheck, Editor};