import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface LFBEBProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function
}
const LineFromBoxExpandBar = (props : LFBEBProps) => {
    const {lineStyle, boxStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {boxStyle()} onClick = {() => props.onClick()}></div>
            <div style = {lineStyle()}></div>
            <div style = {barStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(LineFromBoxExpandBar)