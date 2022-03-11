import React, { useEffect, useState } from "react";
import {  Divider, Icon,  Table } from "antd";
import IntlMessages from "util/IntlMessages";
import axios from 'util/Api'
import moment from "moment";
// import Dynamic from "../SamplePage/Dynamic";
const scroll = { y: 240 };
const columns = [
  {
    title: 'Id',
    dataIndex: 'ID',
    key: 'id',
    width: 50,
    render: (item, record, index) => (<>{index + 1}</>)
  },{
  title: 'Name',
  dataIndex: 'userModel.username',
  key: 'username',
  width: 100,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Email',
  dataIndex: 'userModel.email',
  key: 'email',
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Phone',
  dataIndex: 'userModel.phone',
  key: 'phone',
  render: text => <span className="gx-link">{text}</span>,
},
, {
  title: 'Status',
  dataIndex: 'orderStatus',
  key: 'Status',
  render: text => <span className="gx-link">{text}</span>,
}
, {
  title: 'Date',
  dataIndex: 'orders[0].createdDate',
  key: 'Date',
  render: text =>moment(<span className="gx-link">{text}</span>).format("MMMM Do YYYY") ,
}
, {
  title: 'Amount',
  dataIndex: 'amount',
  key: 'amount',
  render: text => <span className="gx-link">{text}</span>,
}
];


const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getOrderList();
  }, [])

  const getOrderList = () => {
    axios.get('/order-list',
    ).then(({ data }) => {
      if (data.result) {
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
      <h2 className="title gx-mb-4"><IntlMessages id="Orders" /></h2>

      <Table className="gx-table-responsive" {...state} columns={columns} dataSource={data} />


    </div>
  );
};

export default Orders;