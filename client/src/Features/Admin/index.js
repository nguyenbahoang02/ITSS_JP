import Sidebar from './Components/Sidebar/Sidebar';
import './index.scss';
import CreateWord from './Components/CreateWord/CreateWord';
import ReadWord from './Components/ReadWord/ReadWord';
import GetWord from './Components/GetWord/GetWord';
import UpdateUser from './Components/User/UpdateUser/UpdateUser';
import { useSelector } from 'react-redux';

function HomeAdmin() {
    const { tab } = useSelector((state) => state.tab);
    return (
        <div className="home-admin">
            <Sidebar />
            <div className="admin-selected-feature">
                {tab === '1' && <CreateWord />}
                {tab === '2' && <ReadWord />}
                {tab === '3' && <GetWord />}
            </div>
            <div className="admin-selected-feature">
                {tab === '13' && <UpdateUser />}
            </div>
        </div>
    );
}

export default HomeAdmin;
