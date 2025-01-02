import { Link } from "react-router-dom";
import { MsgPreview } from "./MsgPreview.jsx"
export function ToyPreview({ toy }) {

    return (
        <article>
            <h1>Toy Preview: </h1>
            <h2>Name: <span className="toy-name">{toy.name}</span></h2>
            <h4>Labels: {toy.labels} </h4>
            <h5>Price: {toy.price}</h5>
            <h5 className={toy.inStock? "inStock" : "outOfStock"}>{toy.inStock? "In Stock" : "Out Of Stock"}</h5>
            <ul className="toy-msgs"> 
                {toy.msgs.map(msg =>
                    <li className="msg-preview" key={msg._id}>
                        <MsgPreview msg={msg} />
                    </li>)}
            </ul>
            <hr />
            <h1>{console.log("toy._id is: ", toy._id)}</h1>
            <h1>toy id: {toy._id}</h1>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}