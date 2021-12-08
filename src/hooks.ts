import {CSSProperties, useEffect, useState} from 'react'

const delay : number = 20 
const scGap : number = 0.01 
const boxSizeFactor : number = 8.4
const barSizeFactor : number = 14.9 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {
                
            }
        }
    })
    return {
        w, 
        h, 

    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n) 
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const boxSize : number = Math.min(w, h) / boxSizeFactor
    const position = 'absolute'
    const barSize : number = Math.min(w, h) / barSizeFactor
    const background = 'indigo'
    const lineSize : number = Math.min(w, h) / 90
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    return {
        barStyle() : CSSProperties {
            const width = `${w * 0.5 * sf2}px`
            const height = `${barSize}px`
            const left = `${w / 2}px`
            const top = `${h - barSize}px`
            return {
                width, 
                height, 
                position, 
                left, 
                top,
                background 
            } 
        },

        lineStyle() : CSSProperties {
            const width = `${lineSize}px`
            const height = `${(h / 2 - boxSize / 2) * sf1}px`
            const left = `${w / 2 - lineSize / 2}px`
            const top = `${h / 2 + boxSize / 2}px`
            return {
                width, 
                height, 
                position, 
                left, 
                top, 
                background,
            }
        },

        boxStyle() : CSSProperties {
            const left = `${w / 2 - boxSize / 2}px`
            const top = `${h / 2 - boxSize / 2}px`
            const width = `${boxSize}px`
            const height = `${boxSize}px`
            return {
                position, 
                top, 
                left, 
                width, 
                height 
            }
        }
    }
}