import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import '../assets/style/cmps/AppHeader.css'


export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Toy</h1>
                <h3>Welcome to our Toy Store !</h3>

                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toys" >Toys</NavLink>
                </nav>
        
            </section>
            
        </header>
    )
}
