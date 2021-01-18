const themeSideBlockAdd = (background) => {
    return(
        {
            buttonStyles:{
                "buttonWrapper": "buttonWrapper-add",
                "button": "button-add",
                "active": "active-add",
                "separator": "separator-add"
            },
            blockTypeSelectStyles:{
                "blockType": (background) ?  "blockType-add blockType-add-light" : "blockType-add blockType-add-dark",
                "spacer": "spacer-add",
                "popup": "popup-add"
            },
            toolbarStyles:{
                "wrapper": "wrapper-add"
            }
        }
    )
}
const themeSideBlockStyle = (background) => {
    return(
        {
            buttonStyles:{
                "buttonWrapper": "buttonWrapper-block-style",
                "button": "button-block-style",
                "active": "active-block-style",
                "separator": "separator-block-style"
            },
            blockTypeSelectStyles:{
                "blockType": (background) ? "blockType-block-style blockType-block-style-light" : "blockType-block-style blockType-block-style-dark",
                "spacer": "spacer-block-style",
                "popup": "popup-block-style"
            },
            toolbarStyles:{
                "wrapper": "wrapper-block-style"
            }
        }
    )
}
const themeInlineTextStyle = {
    buttonStyles: {
        "buttonWrapper": "buttonWrapper-text",
        "button": "button-text",
        "active": "active-text"
    },
    toolbarStyles: {
        "toolbar": "toolbar-text"
    }
}

export { themeSideBlockAdd, themeSideBlockStyle, themeInlineTextStyle };