import { Link } from "react-router-dom"

export default function Header () {
    return (
        <nav >
            <Link to='/'>
                <div>People App</div>
            </Link>
        </nav>
    )
}