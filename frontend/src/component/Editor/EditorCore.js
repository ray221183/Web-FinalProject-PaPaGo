import React, { useEffect, useRef, useState } from 'react'
import { RichUtils } from 'draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js'
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

const sideToolbarPluginAddLight = createSideToolbarPlugin({ theme: themeSideBlockAdd(true) });
const { SideToolbar: SideToolbarAddLight } = sideToolbarPluginAddLight;
const sideToolbarPluginAddDark = createSideToolbarPlugin({ theme: themeSideBlockAdd(false) });
const { SideToolbar: SideToolbarAddDark } = sideToolbarPluginAddDark;


const inlineBarTextStyle = createInlineToolbarPlugin({ theme: themeInlineTextStyle });
const { InlineToolbar: InlineBarTextStyle } = inlineBarTextStyle;

const plugins = [sideToolbarPluginAddLight, sideToolbarPluginAddDark, inlineBarTextStyle];

function EditorCore(prop){
    //draft-js editor
    const editorState = prop.editorState;
    const setEditorState = prop.setEditorState;
    const element = useRef();
    const [placeholder, setPlaceholder] = useState( "Tell your story" )
    var selection = editorState.getSelection();

    //tool bar style
    const [sideBlockOver, setSideBlockOver] = useState(false);
    const sideBlock = (prop.background) ? "blocktype-icon-light" : "blocktype-icon-dark"
    const focusStyle = {
        opacity:  (selection.getHasFocus()) ? "1" : "0"
    }
    const sideBlockMovement = {
        transform: (sideBlockOver) ? "translateY(0)" : "translateY(-100%)",
        opacity: (sideBlockOver) ? "1" : "0",
    }

    //side tool bar -- add
    const [curSelectBlock, setCurSelectBlock] = useState(null);
    const [sidePositionAdd, setSidePositionAdd] = useState([0, 0, 0]); // [offsetTop, offsetLeft,height]
    const sideAddStyle = {
        position: "absolute",
        top: `${sidePositionAdd[0] - 3.5}px`,
        left: `${sidePositionAdd[1] - 95}px`
    }
    const sideStyleStyle = {
        position: "absolute",
        top: `${sidePositionAdd[0] - 3.5}px`,
        left: `${sidePositionAdd[1] - 55}px`
    }
    const focus = () => {
        console.log('focus')
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

    const toggleBlockType = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(RichUtils.toggleBlockType(editorState, e.target.title))
    }

    const onChange = (editorState) => {
        setEditorState(editorState)
    }
    
    // console.log(editorState.getCurrentContent())
    return(
        <div>
        <div className="eidtor-content-part" onClick={() => {focus()}}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              placeholder={placeholder}
              plugins={plugins}
              ref={element}
            />
            <div className="side-tool-bar-add" style={sideAddStyle}>
                {
                    (prop.background) ? 
                        <SideToolbarAddLight>
                        </SideToolbarAddLight> :
                        <SideToolbarAddDark>
                        </SideToolbarAddDark>
                }
            </div>
            <div className="side-tool-bar-block" style={{...sideStyleStyle, ...focusStyle}} onMouseOver={() => setSideBlockOver(true)} onMouseOut={() => setSideBlockOver(false)}>
                <div className={sideBlock}></div>
                <div className="roll-down-region">
                    <div className="side-bar-blocktype" style={sideBlockMovement}>
                        <div className="blocktype-button" id="header-one-dark" title="header-one" onMouseDown={toggleBlockType}>i</div>
                        <div className="blocktype-button" id="" title="header-two" onMouseDown={toggleBlockType}>i</div>
                        <div className="blocktype-button" id="" title="header-three" onMouseDown={toggleBlockType}>i</div>
                        <div className="blocktype-button" id="" title="unordered-list-item" onMouseDown={toggleBlockType}>i</div>
                        <div className="blocktype-button" id="" title="ordered-list-item" onMouseDown={toggleBlockType}>i</div>
                        <div className="blocktype-button" id="" title="blockquote" onMouseDown={toggleBlockType}>i</div>
                    </div>
                </div>
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
        </div>
    );
}


export default EditorCore;