import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './NavBar.scss';
function NavBar() {
    return (
        <div className="nav-bar">
            <div className="sub-nav">
                <Link to="/getLesson">レッスン</Link>
                <div>クイズ</div>
                <div>フォーラム</div>
            </div>
            <Link to="/" className="web-name">
                ITpedia
            </Link>
            <div className="sub-nav login">
                <Button>ログイン</Button>
                <Button>サインアップ</Button>
            </div>
        </div>
    );
}

export default NavBar;
