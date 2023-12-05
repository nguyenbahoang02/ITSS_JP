import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from 'Features/Admin/tabSlice';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, disabled) {
    return {
        key,
        icon,
        children,
        label,
        disabled,
    };
}
const items = [
    getItem('Manage Words', 'sub1', null, [
        getItem('Create word', '1'),
        getItem('Read word', '2'),
        getItem('Get Word', '3'),
    ]),
    getItem('Manage Requests', 'sub2', null, [getItem('Update requests', '4')]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('User', 'sub5', null, 
    [getItem('Read User To Update', '13'), 
    getItem('Delete User', '15')]),
    
    getItem('Search History', 'sub6', null,[
        getItem('Get Search History', '16'),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const Sidebar = () => {
    const { tab } = useSelector((state) => state.tab);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <div className="sidebar">
            <Menu
                mode="inline"
                onSelect={(event) => {
                    navigate('/admin');
                    dispatch(setTab(event.key));
                }}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: '100%',
                    height: '100vh',
                    backgroundColor: '#000c17',
                    color: '#ffffff',
                }}
                defaultSelectedKeys={tab}
                items={items}
            />
        </div>
    );
};
export default Sidebar;
