
import { ReactNode, useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Button from '../../common/Button';
import CreateComment from './CreateComment';

interface CommentBoxProps {
    open?: boolean;
    children?: ReactNode
    postId: string;
}
export default function LeaveCommentBox ({ open, children, postId }: CommentBoxProps) {
    const [isOpen, setIsOpen] = useState(open);
    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            <div>


                <Button className="btn" onClick={ handleFilterOpening }>
                    { !isOpen ? (
                        <MdExpandMore />
                    ) : (
                        <MdExpandLess />
                    ) }
                </Button>


                <div className="comment_input">
                    { isOpen && <CreateComment postId={ postId } /> }
                </div>
            </div>
        </>
    )
}