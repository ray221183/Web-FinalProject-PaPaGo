import React, { useEffect, useRef, useState } from 'react'
import { EditorState, AtomicBlockUtils, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import createVideoPlugin from '@draft-js-plugins/video';
import './EditorCore.css';
import './SideBar.css';
import './InlineBar.css';
import {
	ItalicButton,
	BoldButton ,
	UnderlineButton
} from '@draft-js-plugins/buttons';
import { themeInlineTextStyle } from './ThemeStyle';



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
	const [videoUrl, setVedioUrl] = useState('');
	const [showVideo, setShowVideo] = useState(false);
	const [imgUrl, setImgUrl] = useState('');
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
	const addVideo = (prop.background) ? "add-video-light" : "add-video-dark"

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
	const videoStyle = {
		transform: (showVideo) ? "scale(1)" : "scale(0)",
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
		setVedioUrl('')
		setShowVideo(false)
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

	const changeVideoUrl = (e) => {
		setVedioUrl(e.target.value)
	}
	const handleKeyDown = (e) => {
        if(e.keyCode === 13 && videoUrl !== ''){
			var contentState = editorState.getCurrentContent();
			var contentStateWithEntity = contentState.createEntity(
				'draft-js-video-plugin-video', 
				'IMMUTABLE', 
				{ src: videoUrl }
			);
			var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			setEditorState(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '))
			setVedioUrl('')
			setShowVideo(false)
        }
    }
	const clickAddVideo = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setShowVideo(true)
	}
	const prevent = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return(
		<div>
			<div className="eidtor-content-part" onClick={() => {focus()}}>
				<Editor
					id="editor-content"
					editorState={editorState}
					onChange={onChange}
					placeholder={placeholder}
					plugins={plugins}
					ref={element}
				/>
				<div id="video-input-div" ></div>
					<div id="video-input" style={videoStyle} >
						<input placeholder="請輸入影片的網址" onClick={(e) => prevent(e)} value={videoUrl} onChange={changeVideoUrl} onKeyDown={handleKeyDown}/>
					</div>
					<div className="side-tool-bar-add" style={{...sideAddStyle, ...focusStyle}} onMouseOver={() => setSideAddOver(true)} onMouseOut={() => setSideAddOver(false)}>
						<div className="side-bar-icon" id={sideAddIcon}></div>
						<div className="roll-down-region">
							<div className="side-bar-add" id={sideAddBar} style={sideAddMovement}>
								<div className={`blocktype-button ${sideHover}`} id={addImage} title="addImage" onMouseDown={clickAddImage}></div>
								<div className={`blocktype-button ${sideHover}`} id={addVideo} title="header-two" onClick={(e) => clickAddVideo(e)}></div>
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
				<input id="add-image-input" value={imgUrl} type="file" ref={addImageRef} onChange={(e) => readURL(e)}/>
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