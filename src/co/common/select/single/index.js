import s from './index.module.styl'
import React from 'react'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

export default class Select extends React.Component {
    static defaultProps = {
        //...same as Button +
        children: [], //should have <option> tags, other can bee too
        onChange: undefined, //({ target: { value } })
    }

    state = {
		show: false
    }

    pin = React.createRef()
    
    onButtonClick = (e)=>{
        const haveOptions = this.props.children.some(child=>child && child.type == 'option')

        if (haveOptions)
            this.setState({ show: true })
        else if (this.props.onClick)
            this.props.onClick(e)
    }

    onPopoverClose = ()=>
        this.setState({ show: false })

    onOptionClick = e=>{
        this.props.onChange({
            target: {
                value: e.currentTarget.getAttribute('data-value')
            },
            currentTarget: this.pin.current
        })
    }

    renderOption = child => {
        if (!child || child.type != 'option')
            return null

        return (
            <MenuItem 
                key={child.props.value}
                data-value={child.props.value}
                onClick={this.onOptionClick}>
                <Icon name={child.props.value == this.props.value ? 'check' : 'blank'} />
                {{...child, type: 'span'}}
            </MenuItem>
        )
    }

    renderChildren = child => {
        if (child &&
            child.type == 'option' && 
            child.props &&
            this.props.value != child.props.value)
            return null
        
        if (child && child.type == 'option')
            return {...child, type: 'span'}
            
        return child
    }

    render() {
        const { children=[], value, className='', ...etc } = this.props
        const { show } = this.state

        return (
            <>
                <Button 
                    ref={this.pin}
                    data-value={value} 
                    className={s.select+' '+className}
                    {...etc}
                    onClick={this.onButtonClick}>
                    {children.map(this.renderChildren)}
                    <Icon name='arrow' />
                </Button>

                {show && (
                    <Popover
                        pin={this.pin}
                        onClose={this.onPopoverClose}>
                        <Menu>
                            {children.map(this.renderOption)}
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}