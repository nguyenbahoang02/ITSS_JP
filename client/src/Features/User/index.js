import './index.scss';
import GetWord from './Components/GetWord/GetWord';
import NavBar from './Components/NavBar/NavBar';

function HomeUser() {
    return (
        <div className="home-user">
            <NavBar />
            <GetWord />
        </div>
    );
}

export default HomeUser;
