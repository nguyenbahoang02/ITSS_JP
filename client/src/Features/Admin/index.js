import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import './index.scss';
import CreateWord from './Components/CreateWord/CreateWord';
import ReadWord from './Components/ReadWord/ReadWord';
import GetWord from './Components/GetWord/GetWord';
import UpdateUser from './Components/User/UpdateUser/UpdateUser';
import UpdateRequest from 'Features/Requests/Components/UpdateRequest/UpdateRequest';

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
            </div>
            {/* <div className="admin-selected-feature">{tab === '13' && <UpdateUser />}</div> */}
        </div>
    );
}

export default HomeAdmin;
