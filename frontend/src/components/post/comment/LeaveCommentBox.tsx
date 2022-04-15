
import { ReactNode, useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
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
                <div className="p-3 border-bottom d-flex justify-content-between">
                    <h6 className="font-weight-bold">Leave a Coment</h6>
                    <button type="button" className="btn" onClick={ handleFilterOpening }>
                        { !isOpen ? (
                            <MdExpandMore />
                        ) : (
                            <MdExpandLess />
                        ) }
                    </button>
                </div>

                <div className="border-bottom">
                    { isOpen && <CreateComment postId={ postId } /> }
                </div>
            </div>
        </>
    )
}