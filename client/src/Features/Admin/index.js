import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import './index.scss';
import CreateWord from './Components/CreateWord/CreateWord';
import ReadWord from './Components/ReadWord/ReadWord';
import GetWord from '../User/Components/GetWord/GetWord';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import DeleteUser from './Components/DeleteUser/DeleteUser';
import ReadUser from './Components/ReadUser/ReadUser';
import UpdateRequest from 'Features/Requests/Components/UpdateRequest/UpdateRequest';
import GetSearchHistory from './Components/SearchHistory/GetSearchHistory/GetSearchHistory';
import GetLesson from '../User/Components/GetLesson/GetLesson';
import ReadLesson from './Components/Lesson/ReadLesson/ReadLesson';
import CreateLesson from './Components/CreateLesson/CreateLesson';
import CreateQuiz from './Components/CreateQuiz/CreateQuiz';
import ReadQuiz from './Components/ReadQuiz/ReadQuiz';

function HomeAdmin() {
    const { tab } = useSelector((state) => state.tab);
    return (
        <div className="home-admin">
            <Sidebar />
            <div className="admin-selected-feature">
                {tab === '1' && <CreateWord />}
                {tab === '2' && <ReadWord />}
                {tab === '3' && <GetWord />}
                {tab === '4' && <UpdateRequest />}
                {tab === '6' && <CreateLesson />}
                {tab === '7' && <ReadLesson />}
                {tab === '13' && <ReadUser />}
                {tab === '14' && <UpdateUser />}
                {tab === '15' && <DeleteUser />}
                {tab === '16' && <GetSearchHistory />}
                {tab === '17' && <GetLesson />}
                {tab === '18' && <CreateQuiz />}
                {tab === '19' && <ReadQuiz />}
            </div>
        </div>
    );
}

export default HomeAdmin;
