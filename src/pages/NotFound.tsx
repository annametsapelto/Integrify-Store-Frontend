import cats from '../images/cats.jpg';

const NotFound = () => {
    return (
        <div>
            <h1>Sorry, that page does not exist!</h1>
            <h2>But here are some cute cats</h2>
            <div className='about_picture'>
                <img src={cats} alt="Cats"></img>
            </div>
        </div>
    )
}

export default NotFound;