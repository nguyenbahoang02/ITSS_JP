import React from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import './DeleteUser.scss';
import { useDeleteUserMutation, useGetUsersQuery } from 'app/api/userService';

const DeleteUser = () => {
  const [deleteUser] = useDeleteUserMutation();
  const confirm = (id) => {
    deleteUser({
      id: id,
      headers: {
        accessToken: JSON.parse(localStorage.getItem('user')).token,
      },
    }).then((response) => {
      if (response.data.error !== undefined) {
        message.error(response.data.error.message);
      } else message.success('Deleted successfully');
      console.log(response);
    });
  };

  const cancel = (e) => {
    message.error('Cancelled');
  };

  const columns = [
    {
      title: 'Order',
      dataIndex: 'index',
      key: 'id',
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
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { data: users, isLoading, isError } = useGetUsersQuery({
    accessToken: JSON.parse(localStorage.getItem('user')).token,
  });

  if (isError) {
    return <h1>Something went wrong!</h1>;
  } else if (isLoading) {
    return <h1>Loading ... </h1>;
  }

  // Sửa lỗi:
  const tableData = users.map((current, index) => ({
    ...current,
    key: current.id,
    index: index + 1,
  }));

  return (
    <div className="delete-user">
      <div className="title">
        <h1>DELETE USER</h1>
      </div>
      <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={tableData} size="large" />
    </div>
  );
};

export default DeleteUser;
