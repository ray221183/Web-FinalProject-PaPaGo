import React, { useEffect, useRef, useState } from 'react'
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import './EditorCore.css';
import './SideBar.css';
import './InlineBar.css';
import {
    createBlockStyleButton,
    createInlineStyleButton,
    ItalicButton,
    BoldButton ,
    SupButton, //?
    SubButton, //?
    CodeButton ,
    UnderlineButton ,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton ,
    AlignBlockDefaultButton,
    AlignBlockCenterButton,
    AlignBlockLeftButton,
    AlignBlockRightButton,
} from '@draft-js-plugins/buttons';
import { themeSideBlockAdd, themeSideBlockStyle, themeInlineTextStyle } from './ThemeStyle';


const sideToolbarPluginAdd = createSideToolbarPlugin({ theme: themeSideBlockAdd });
const sideToolbarPluginStyle = createSideToolbarPlugin({ theme: themeSideBlockStyle });
const inlineBarTextStyle = createInlineToolbarPlugin({ theme: themeInlineTextStyle });
const { SideToolbar: SideToolbarAdd } = sideToolbarPluginAdd;
const { SideToolbar: SideToolbarStyle } = sideToolbarPluginStyle;
const { InlineToolbar: InlineBarTextStyle } = inlineBarTextStyle;
const plugins = [sideToolbarPluginAdd, sideToolbarPluginStyle, inlineBarTextStyle];

function EditorCore(prop){
    //draft-js editor
    const editorState = prop.editorState;
    const setEditorState = prop.setEditorState;
    const element = useRef();
    const [placeholder, setPlaceholder] = useState( "Tell your story" )
    var selection = editorState.getSelection();

    //side tool bar -- add
    const [curSelectBlock, setCurSelectBlock] = useState(null);
    const [sidePositionAdd, setSidePositionAdd] = useState([0, 0, 0]); // [offsetTop, offsetLeft,height]
    const sideAddStyle = {
        position: "absolute",
        top: `${sidePositionAdd[0] }px`,
        left: `${sidePositionAdd[1] - 95}px`
    }
    const sideStyleStyle = {
        position: "absolute",
        top: `${sidePositionAdd[0]}px`,
        left: `${sidePositionAdd[1] - 55}px`
    }
    const focus = () => {
        element.current.focus();
    }

    // editor placeholder
    useEffect(() => {
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText() && !selection.getHasFocus()) {
            setPlaceholder("Tell your story")
        }
        else{
            setPlaceholder("")
        }
    }, [editorState, selection])

    // side tool bar movement
    useEffect(() => {
        const interval = setInterval(() => {
            const curBlock = document.querySelectorAll(`[data-offset-key="${selection.getStartKey()}-0-0"]`)
            setCurSelectBlock(curBlock)
            if(curBlock[2] !== null && typeof curBlock[2] !== "undefined") {
                let pos = [curBlock[2].offsetTop, curBlock[2].offsetLeft, curBlock[2].offsetHeight]
                setSidePositionAdd(pos)
            }
        }, 50); //can modift the time interval to increase user experience
        return () => {clearInterval(interval)}
    }, [document.querySelectorAll(`[data-offset-key="${selection.getStartKey()}-0-0"]`), curSelectBlock])

    return(
        <div className="eidtor-content-part" onClick={() => {focus()}}>
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder={placeholder}
              plugins={plugins}
              ref={element}
            />
            <div className="side-tool-bar-add" style={sideAddStyle}>
                <SideToolbarAdd>
                </SideToolbarAdd>
            </div>
            <div className="side-tool-bar-style" style={sideStyleStyle}>
                <SideToolbarStyle>
                    {
                        (externalProps) => (
                            <div>
                                <HeadlineOneButton {...externalProps} />
                                <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                            </div>)
                    }
                </SideToolbarStyle>
            </div>
            <InlineBarTextStyle>
                {
                    (externalProps) => (
                        <div>
                            <BoldButton {...externalProps} /> 
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                        </div>
                    )
                }
            </InlineBarTextStyle>
        </div>
    );
}


export default EditorCore;