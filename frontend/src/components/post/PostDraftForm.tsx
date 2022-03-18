import { useState } from 'react'


export type DraftFormProps = {
    initialTitle?: string
    initialContent?: string
    initialImageUrl?: string
    disabled: boolean
    onSubmit: Function
}
export default function PostDraftForm({ initialTitle, initialContent, initialImageUrl, disabled, onSubmit }: DraftFormProps) {
    const [imageUrl, setImageUrl] = useState(initialImageUrl || '')
    const [title, setTitle] = useState(initialTitle || "")
    const [content, setContent] = useState(initialContent || "")
    return (
        <div >
            <b>{initialTitle ? "Edit Item" : "Add Item"}</b>
            <div >
                <div >
                    <span>Title</span>
                    <input
                        disabled={disabled}
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
                            if (!imageUrl) {
                                onSubmit({ title, content, imageUrl: initialImageUrl })
                            }
                            onSubmit({ title, content, imageUrl });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
