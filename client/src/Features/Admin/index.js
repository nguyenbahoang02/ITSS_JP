import { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import './index.scss';
import CreateWord from './Components/CreateWord/CreateWord';

function HomeAdmin() {
    const [tab, setTab] = useState('');
    return (
        <div className="home-admin">
            <Sidebar tab={tab} setTab={setTab} />
            <div className="admin-selected-feature">{tab === '1' && <CreateWord/>}</div>
        </div>
    );
}

export default HomeAdmin;
