import React from 'react';
import { Table, Button } from 'antd';
import './ReadUser.scss';
import { useGetUsersQuery } from 'app/api/userService';
import { useNavigate } from 'react-router-dom';
import { setTab } from 'Features/Admin/tabSlice';
import { useDispatch } from 'react-redux';

const ReadUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Order',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Username',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch(setTab('13'));
                            navigate(`/admin/updateUser/${record.id}`);
                        }}
                    >
                        Update
                    </Button>
                </div>
            ),
        },
    ];

    const { data: users, isError, isLoading } = useGetUsersQuery({
        accessToken: JSON.parse(localStorage.getItem('user')).token,
    });

    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const tableData = users.map((current) => ({
        ...current, key: current.id, index: users.indexOf(current) + 1
    }));

    return (
        <div className="read-user">
            <div className="title">
                <h1>UPDATE USERS</h1>
            </div>
            <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={tableData} size="large" />
        </div>
    );
};

export default ReadUser;