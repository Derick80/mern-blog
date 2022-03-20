import React, { useState } from 'react'
import { PostFeedProps } from '../additional';






function ShowButton({ content }: Partial<PostFeedProps>) {

    const [more, setMore] = useState(false)
    // @ts-ignore
    if (content.length < 100) { return (<><p>{content}</p></>) }
    else {

        return (
            <>
                {more ? content : `${content?.substring(0, 100)}`}
                <button className="button" onClick={() => setMore(!more)}>
                    {more ? "show less" : "show more"}

                </button>
            </>
        )
    }


}





export default ShowButton