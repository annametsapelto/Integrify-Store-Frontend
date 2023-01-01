import { Link } from 'react-router-dom';
import Featured from '../components/Featured'

const Home = () => {
    return(
    <>
    <div>
        <h1>Welcome to Forestfield's!</h1>
        <p>We aim at providing you the best products available at a reasonable cost. See all out products at our <Link to="products">products page</Link>.</p>
    </div>
    </>
    )
}

export default Home;