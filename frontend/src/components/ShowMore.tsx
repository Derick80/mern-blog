import { useState } from 'react'
import Button from './Button'

function ShowButton({ ...props }) {
    let content = props.content
    let className = 'button'
    const [more, setMore] = useState(false)
    function onClick() {
        setMore(!more)
    }
    if (content && content.length < 100) {
        return <>
            <p>{content}</p>
        </>
    } else {
        return (
            <>
                {more ? content : `${content?.substring(0, 100)}`}
                <Button className={className} onClick={onClick}>
                    {more ? 'show less' : 'show more'}
                </Button>
            </>
        )
    }
}

export default ShowButton
