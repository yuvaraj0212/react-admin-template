import {  Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from 'util/Api'
import IntlMessages from "util/IntlMessages";
const columns = [
  {
    title: 'Id',
    dataIndex: 'ID',
    key: 'id',
    width: 50,
    render: (item, record, index) => (<>{index + 1}</>)
  },{
  title: 'Name',
  dataIndex: 'username',
  key: 'username',
  width: 100,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Phone',
  dataIndex: 'phone',
  key: 'phone',
  render: text => <span className="gx-link">{text}</span>,
},
 {
  title: 'Roles',
  dataIndex: 'roles[0].rolename',
  key: 'roles[0].rolename',
  render: text => <span className="gx-link">{text}</span>,
}
];
const scroll = { y: 240 };

const Customer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = () => {
    axios.get('/user-list',
    ).then(({ data }) => {
      if (data.result) {
        console.log(data.result);
        setData(data.result)
      }
    }).catch(function (error) {
      console.log("product-list Error****:", error.message);
    });
  }
  const state = {
    bordered: true,
    loading: false,
    // pagination,
    size: 'default',
    // expandedRowRender,
    title: undefined,
    // showHeader,
    // footer,
    rowSelection: undefined,
    scroll: scroll,

  };
  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="Customer" /></h2>
      <Table className="gx-table-responsive" {...state} columns={columns} dataSource={data} />

    </div>
  );
};

export default Customer;