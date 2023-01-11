import Navigation from "./Navigation";

const Footer = () => {
    return (
        <div>
            <hr></hr>
            <footer>
                <div className="footer_texts">
                    <p>&copy; Copyright by Forestfield's</p>
                    <div className="footer_nav">
                        <Navigation></Navigation>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;