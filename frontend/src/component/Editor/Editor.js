import React, { useEffect, useRef, useState } from 'react'
import EditorCore from './EditorCore'
import './Editor.css'

function Editor(){
    const [title, setTitle] = useState('Title');

    return(
        <section className = "Editor">
            <div className="editor-part" name = "editor-part">
                <div className="top-part">
                </div>
                <div className="eidtor-title-part">
                    <EditorCore />
                </div>
                <div className="editor-content-part">
                </div>
            </div>
        </section>
    )
}

export default Editor;