import React, { useEffect, useRef, useState } from 'react'
import {EditorState} from 'draft-js'
import Editor from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import './EditorCore.css'


function EditorCore(){
    const sideToolbarPlugin = createSideToolbarPlugin();
    const { SideToolbar } = sideToolbarPlugin;
    const plugins = [sideToolbarPlugin];
    const [editorState, setEditorState] = useState( ()=>EditorState.createEmpty() );

    const changeEditorState = (editorState) => {
        setEditorState(editorState)
    }

    return(
        <React.Fragment>
            <Editor
              editorState={editorState}
              onChange={changeEditorState}
              plugins={plugins}
            />
            <SideToolbar />
        </React.Fragment>
    )
}


export default EditorCore;