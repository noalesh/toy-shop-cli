
export function MsgPreview({ msg }) {

    return (
        <article>
            <h1>Message Preview: </h1>
            <h2 className="msg-by">written by: {msg.by}</h2>
            <p className="msg-txt">{msg.txt}</p>
        </article>
    )
}