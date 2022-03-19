import { useState } from 'react'


export type DraftFormProps = {
    initialTitle?: string
    initialContent?: string
    initialImageUrl?: string
    initialPostId?: string
    disabled: boolean
    onSubmit: Function
}
export default function PostDraftForm({ initialTitle, initialContent, initialImageUrl, initialPostId, disabled, onSubmit }: DraftFormProps) {
    const [imageUrl, setImageUrl] = useState(initialImageUrl || '')
    const [postId, setPostId] = useState(initialPostId || '')
    const [title, setTitle] = useState(initialTitle || "")
    const [content, setContent] = useState(initialContent || "")
    return (
        <div key={postId}>
            <b>{initialTitle ? "Edit Item" : "Add Item"}</b>
            <div >
                <div >
                    <input
                        hidden
                        disabled={disabled}
                        type="text"
                        value={initialPostId}
                        onChange={e => setPostId(e.target.value)}
                    />
                </div>
                <div >
                    <span>Title</span>
                    <input
                        disabled={disabled}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div >
                    <span>content</span>
                    <input
                        disabled={disabled}
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <div >
                    <span>Image</span>
                    <input
                        disabled={disabled}
                        type="text"
                        value={initialImageUrl}
                        onChange={e => setImageUrl(imageUrl)}
                    />
                </div>
                <div>
                    <button
                        disabled={disabled}

                        onClick={() => {
                            if (!imageUrl || !postId) {
                                onSubmit({ title, content, imageUrl: initialImageUrl, initialPostId })
                            }
                            onSubmit({ title, content, imageUrl, postId });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
