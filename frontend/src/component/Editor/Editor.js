import './Editor.css'
import React, { useEffect, useRef, useState } from 'react'

function Editor(){
    return(
        <section className = "Editor">
            <div className="ba" name = "editor-part">
                <input className="aa ab" type="text" name="title" />
                <input className="aa ab" type="text" name="body" />
            </div>
        </section>
    )
}

export default Editor;