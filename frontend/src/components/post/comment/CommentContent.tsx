import { CommentProps, PostFeedProps } from '../../../additional'
import { PostContentProps } from '../PostContent'



const CommentCard = (comments: any) => (
    <>
        { comments.map((item: any) => {
            return (

                <ul className="comments-ul" key={ item.id }>

                    <li>                { item.username }
                    </li>
                    <li>{ item.content }</li>
                </ul>

            )
        }) }
    </>
)

export default CommentCard