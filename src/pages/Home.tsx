import { Link } from 'react-router-dom';
import Featured from '../components/Featured'
import BookStack from '../images/book-stack.jpg';

const Home = () => {
    return(
    <main>
        <div>
            <h1>Welcome to Forestfield's!</h1>
            <p>We aim at providing you the best products available at a reasonable cost. See all out products at our <Link to="products">products page</Link>.</p>
            <hr></hr>
            <div className="home_books">
                <img src={BookStack} alt="Stack of books" />
            </div>
            
        </div>
    </main>
    )
}

export default Home;