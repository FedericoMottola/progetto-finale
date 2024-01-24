import Main from "../components/Main";
import '../index.css'


const Home = ({page}) => {
    return (
        <div className="app root">
            <Main page={page}/>
        </div>
    )
}


export default Home
