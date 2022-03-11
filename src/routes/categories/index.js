import { Divider, Icon, Table } from "antd";
import React from "react";

import IntlMessages from "util/IntlMessages";
const scroll = { y: 240 };
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <span className="gx-link">Action 一 {record.name}</span>
      <Divider type="vertical" />
      <span className="gx-link">Delete</span>
      <Divider type="vertical" />
      <span className="gx-link ant-dropdown-link">
        More actions <Icon type="down" />
      </span>
    </span>
  ),
}];

const data = [];

const Categories = () => {
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
      <h2 className="title gx-mb-4"><IntlMessages id="Categories"/></h2>
      <Table className="gx-table-responsive" {...state} columns={columns} dataSource={data} />
    </div>
  );
};

export default Categories;