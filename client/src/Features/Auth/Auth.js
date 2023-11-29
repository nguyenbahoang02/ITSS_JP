import { useState } from 'react';

import './Auth.scss';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

function Auth() {
    const [tab, setTab] = useState(1);
    return (
        <div className="auth">
            <div className="auth__tabs">
                <div className="auth__tabs__titles">
                    <div
                        className={tab === 1 ? 'auth__tabs__title auth__tabs__title--active' : 'auth__tabs__title'}
                        onClick={() => setTab(1)}
                    >
                        Login
                    </div>
                    <div
                        className={tab === 2 ? 'auth__tabs__title auth__tabs__title--active' : 'auth__tabs__title'}
                        onClick={() => setTab(2)}
                    >
                        SignUp
                    </div>
                </div>
                <div className="auth__tabs__content">
                    {tab === 1 && <Login></Login>}
                    {tab === 2 && <SignUp setTab={setTab}></SignUp>}
                </div>
            </div>
        </div>
    );
}

export default Auth;
