
import imgUrl from "../assets/img/logo.png"



export function HomePage() {


    return (
        <section>
            <h2> Hello and Welcome to Miss Toy Store! </h2 >
            <p>
                Here you can find a wide variety of toys, from dolls to balls and even motorized vehicles! 
                <br></br>
                You can scroll around and read other customers' reviews.
                <br></br>
                Please feel free to contact us for any reason!
                </p>
            <img src={imgUrl} width="36%" alt="Miss Toy logo" />
        </section >
    )
}
