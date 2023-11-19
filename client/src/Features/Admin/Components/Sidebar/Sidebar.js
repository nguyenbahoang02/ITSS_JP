import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Sidebar.scss';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Manage Words', 'sub1', <></>, [
        getItem('Create word', '1'),
        getItem('Read word', '2'),
        getItem('Update word', '3'),
        getItem('Delete word', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const Sidebar = ({ tab, setTab }) => {
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
                    setTab(event.key);
                }}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: '100%',
                    height: '100vh',
                    backgroundColor: '#000c17',
                    color: '#ffffff',
                }}
                items={items}
            />
        </div>
    );
};
export default Sidebar;
