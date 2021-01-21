import React, { useEffect, useRef, useState } from 'react'
import { EditorState, AtomicBlockUtils, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import createVideoPlugin from '@draft-js-plugins/video';
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



const inlineBarTextStyle = createInlineToolbarPlugin({ theme: themeInlineTextStyle });
const { InlineToolbar: InlineBarTextStyle } = inlineBarTextStyle;

console.log("createImagePlugin", createImagePlugin)

const imagePlugin = createImagePlugin();

const videoPlugin = createVideoPlugin();

console.log("imagePlugin", imagePlugin)
console.log("Editor", Editor)

const plugins = [inlineBarTextStyle, imagePlugin, videoPlugin];

function EditorCore(prop){
	//draft-js editor
	// const editorState = prop.editorState;
	const editorState = prop.editorState; //EditorState.createWithContent(convertFromRaw(initialState))
	const setEditorState = prop.setEditorState;
	const element = useRef();
	const [placeholder, setPlaceholder] = useState( "Tell your story" )
	var selection = editorState.getSelection();
	const addImageRef = useRef();

	//tool bar style
	const [sideAddOver, setSideAddOver] = useState(false);
	const [sideBlockOver, setSideBlockOver] = useState(false);
	const sideHover = (prop.background) ? "side-light" : "side-dark"
	const sideAddBar = (prop.background) ? "side-bar-addtype-light" : "side-bar-addtype-dark"
	const sideBlockBar = (prop.background) ? "side-bar-blocktype-light" : "side-bar-blocktype-dark"
	const sideAddIcon = (prop.background) ? "addtype-icon-light" : "addtype-icon-dark"
	const sideBlockIcon = (prop.background) ? "blocktype-icon-light" : "blocktype-icon-dark"
	const headerOne = (prop.background) ? "header-one-light" : "header-one-dark"
	const headerTwo = (prop.background) ? "header-two-light" : "header-two-dark"
	const headerThree = (prop.background) ? "header-three-light" : "header-three-dark"
	const unorderedList = (prop.background) ? "unordered-list-light" : "unordered-list-dark"
	const orderedList = (prop.background) ? "ordered-list-light" : "ordered-list-dark"
	const blockQuote = (prop.background) ? "blockquote-light" : "blockquote-dark"
	const addImage = (prop.background) ? "add-image-light" : "add-image-dark"
	const focusStyle = {
		opacity:  (selection.getHasFocus()) ? "1" : "0"
	}
	const sideAddMovement = {
		transform: (sideAddOver) ? "translateY(0)" : "translateY(-100%)",
		opacity: (sideAddOver) ? "1" : "0",
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
		left: `${sidePositionAdd[1] - 100}px`
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
	const toggleBlockType = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onChange(RichUtils.toggleBlockType(editorState, e.target.title))
	}
	const onChange = (newEditorState) => {
		if( editorState.getCurrentContent() !== newEditorState.getCurrentContent() ) prop.setAllowToSave(true)
		setEditorState(newEditorState)
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


	const _extends = () => {
		_extends = Object.assign || function (target) {
		  for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
	  
			for (var key in source) {
			  if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			  }
			}
		  }
	  
		  return target;
		};
	  
		return _extends.apply(this, arguments);
	  }

	const insertImage = (editorState, base64) => {
		console.log("insert image")
		var urlType = 'IMAGE';
		var contentState = editorState.getCurrentContent();
		var contentStateWithEntity = contentState.createEntity(
			urlType,
			'IMMUTABLE', 
			{ src: `${base64}`}
		);
		var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		var newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
		console.log("newEditorState.getCurrentContent().getSelectionAfter()", newEditorState.getCurrentContent().getSelectionAfter())
		onChange(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()))
	};

	const readURL = (input) => {
        console.log(1, input)
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.target.files[0]); // convert to base64 string
            reader.onload = function(e) {
                console.log("e.target.result", e.target.result)
				let base64 = String(e.target.result)
				insertImage(editorState, base64)
			}
        }
        console.log(5)
	}
	
	

	const clickAddImage = () => {
		console.log("click")
		addImageRef.current.click()
	}

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
				<div className="side-tool-bar-add" style={{...sideAddStyle, ...focusStyle}} onMouseOver={() => setSideAddOver(true)} onMouseOut={() => setSideAddOver(false)}>
					<div className="side-bar-icon" id={sideAddIcon}></div>
					<div className="roll-down-region">
						<div className="side-bar" id={sideAddBar} style={sideAddMovement}>
							<div className={`blocktype-button ${sideHover}`} id={addImage} title="addImage" onMouseDown={clickAddImage}></div>
							<div className={`blocktype-button ${sideHover}`} id={headerTwo} title="header-two" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={headerThree} title="header-three" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={unorderedList} title="unordered-list-item" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={orderedList} title="ordered-list-item" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={blockQuote} title="blockquote" onMouseDown={toggleBlockType}></div>
						</div>
					</div>
				</div>
				<div className="side-tool-bar-block" style={{...sideStyleStyle, ...focusStyle}} onMouseOver={() => setSideBlockOver(true)} onMouseOut={() => setSideBlockOver(false)}>
					<div className="side-bar-icon" id={sideBlockIcon}></div>
					<div className="roll-down-region">
						<div className="side-bar" id={sideBlockBar} style={sideBlockMovement}>
							<div className={`blocktype-button ${sideHover}`} id={headerOne} title="header-one" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={headerTwo} title="header-two" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={headerThree} title="header-three" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={unorderedList} title="unordered-list-item" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={orderedList} title="ordered-list-item" onMouseDown={toggleBlockType}></div>
							<div className={`blocktype-button ${sideHover}`} id={blockQuote} title="blockquote" onMouseDown={toggleBlockType}></div>
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
			<div>
				<input id="add-image-input" type="file" ref={addImageRef} onChange={(e) => readURL(e)}/>
			</div>
		</div>
	);
}


export default EditorCore;


// const [posts, setPosts] = useState([]);
// const topics = ['一日遊', '二日遊']


// useEffect(()=>{
//     if( data.multi_post.multiposts.length !== 0 ){
//         setPosts(data.multi_post.multiposts)
//     }
// }, [data])

// const map_function = () => {
//     return(
//         <React.Fragment>
//             {
//                 posts.map( ( post, idx )=>{
//                         return(
//                             <React.Fragment>
//                                 <div> {topics[idx]} </div>
//                                 {
//                                     post.map( ( items ) => {
//                                             return(
//                                                 <div> content </div>
//                                             )
//                                         }
//                                     )
//                                 }
//                             </React.Fragment>
//                         )
//                     }
//                 )
//             }
//         </React.Fragment>
//     )
// }
