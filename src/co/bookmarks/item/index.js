import React from 'react'
import { connect } from 'react-redux'
import { bookmark, tags, makeIsSelected, makeHighlight, makeCreatorRef, selectModeWorking, getGridSize } from '~data/selectors/bookmarks'
import { copyText } from '~modules/browser'

import View from './view'
import Contextmenu from './contextmenu'

class BookmarkItem extends React.Component {
    static defaultProps = {
        //bookmarks
        _id:                0,
        active:             false,
        //collection
        spaceId:            0,
        view:               '', //list, grid, etc...
        access:             {}, //{ level }...
        selectModeEnabled:  false,
        //funcs
        getLink:            undefined, //same as ...items/index
        mainAction:         '', //same as ...items/index
        events:             {}, //same as ...items/index
        actions:            {}  //redux collections
    }

    state = {
        menu: false
    }

    handlers = {
        onClick: (e)=>{
            const { selectModeEnabled } = this.props

            if (selectModeEnabled){
                e.preventDefault()
                return this.handlers.onSelectClick()
            }

            if (e.metaKey || e.ctrlKey || e.shiftKey){
                e.preventDefault()
                this.handlers.onSelectClick()
            }
        },

        onDoubleClick: (e)=>{
            e.preventDefault()
            window.open(this.props.item.link)
        },

        onSelectClick: ()=>{
            this.props.actions[this.props.selected ? 'unselectOne' : 'selectOne'](this.props.spaceId, this.props.item._id)
        },

        onImportantClick: ()=>
            this.props.actions.oneImportant(this.props.item._id),
    
        onRemoveClick: ()=>
            this.props.actions.oneRemove(this.props.item._id),

        onCopyLinkClick: ()=>
            copyText(this.props.item.link),

        onCreateScreenshotClick: ()=>
            this.props.actions.oneScreenshot(this.props.item._id),

        onReparseClick: ()=>
            this.props.actions.oneReparse(this.props.item._id),
    
        onContextMenu: (e)=>{
            e.preventDefault()
            e.target.focus()
            this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),
    
        onKeyUp: (e)=>{
            switch(e.keyCode){
                case 46: //delete
                case 8: //backspace
                    e.preventDefault()
                    return this.handlers.onRemoveClick()
    
                case 13: //enter
                    e.preventDefault()
                    return this.handlers.onClick()
            }
        }
    }

    render() {
        const { item, ...props } = this.props

        return (
            <>
                <View 
                    {...item}
                    {...props}
                    {...this.handlers}
                    />

                {this.state.menu ? (
                    <Contextmenu 
                        {...item}
                        {...props}
                        {...this.handlers} />
                ) : null}
            </>
        )
    }
}

export default connect(
	() => {
        const getIsSelected = makeIsSelected()
        const getHighlight = makeHighlight()
        const getCreatorRef = makeCreatorRef()
    
        return (state, { _id, spaceId, selectModeEnabled })=>{
            const item = bookmark(state, _id)
    
            return {
                item,
                tags: tags(state, _id),
                selected: selectModeEnabled ? getIsSelected(state, spaceId, _id) : false,
                selectDisabled: selectModeWorking(state) ? true : false,
                highlight: getHighlight(state, spaceId, _id),
                creatorRef: getCreatorRef(state, _id),
                gridSize: getGridSize(state, spaceId)
            }
        }
    }
)(BookmarkItem)