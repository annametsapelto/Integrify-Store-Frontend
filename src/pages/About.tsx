import Cats from '../images/cats.jpg';

const About = () => {
    return (
        <div>
            <h1>About this store</h1>
            <p>This store is owned by family Forestfield and founded in 2022 in Tampere Finland by Anna and assisted by cats Anduin and Valdemar.
                We hope to meet all your expectations concerning the functionalities of this store. All the data is provided by <a href="https://fakeapi.platzi.com/"
                >FakeAPI</a> and the code can be reviewed at <a href="https://github.com/annametsapelto/Integrify-Store-Frontend">my Github page</a>.
            </p>
            <img src={Cats} alt="Two orange cats"></img>
            <p>The assistants who were crucial in making this site</p>
        </div>
    )
}

export default About;