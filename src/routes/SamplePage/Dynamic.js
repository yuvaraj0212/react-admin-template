import React from "react";
import { Card, Divider, Form, Icon, Radio, Switch, Table } from "antd";

const FormItem = Form.Item;

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


const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class Dynamic extends React.Component {
  state = {
    bordered: true,
    loading: false,
    pagination,
    size: 'middle',
    // expandedRowRender,
    title: undefined,
    showHeader,
    // footer,
    rowSelection: undefined,
    scroll: scroll,

  };

  // handleToggle = (prop) => {
  //   return (enable) => {
  //     this.setState({ [prop]: enable });
  //   };
  // };

  // handleSizeChange = (e) => {
  //   this.setState({ size: e.target.value });
  // };

  // handleExpandChange = (enable) => {
  //   this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  // };

  // handleTitleChange = (enable) => {
  //   this.setState({ title: enable ? title : undefined });
  // };

  // handleHeaderChange = (enable) => {
  //   this.setState({ showHeader: enable ? showHeader : false });
  // };

  // handleFooterChange = (enable) => {
  //   this.setState({ footer: enable ? footer : undefined });
  // };

  // handleRowSelectionChange = (enable) => {
  //   this.setState({ rowSelection: enable ? {} : undefined });
  // };

  // handleScollChange = (enable) => {
  //   this.setState({ scroll: enable ? scroll : undefined });
  // };

  // handlePaginationChange = (e) => {
  //   const { value } = e.target;
  //   this.setState({
  //     pagination: value === 'none' ? false : { position: value },
  //   });
  // };
 

  render() {
    const state = this.state;
    return (<>
      {/* <Card title="Dynamic"> */}
      <div className="components-table-demo-control-bar">
        {/* <Form layout="inline">
            <FormItem label="Bordered">
              <Switch checked={state.bordered} onChange={this.handleToggle('bordered')}/>
            </FormItem>
            <FormItem label="loading">
              <Switch checked={state.loading} onChange={this.handleToggle('loading')}/>
            </FormItem>
            <FormItem label="Title">
              <Switch checked={!!state.title} onChange={this.handleTitleChange}/>
            </FormItem>
            <FormItem label="Column Header">
              <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange}/>
            </FormItem>
            <FormItem label="Footer">
              <Switch checked={!!state.footer} onChange={this.handleFooterChange}/>
            </FormItem>
            <FormItem label="Expandable">
              <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange}/>
            </FormItem>
            <FormItem label="Checkbox">
              <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange}/>
            </FormItem>
            <FormItem label="Fixed Header">
              <Switch checked={!!state.scroll} onChange={this.handleScollChange}/>
            </FormItem>
            <FormItem label="Size">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Pagination">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form> */}
      </div>
      <Table className="gx-table-responsive" {...this.state} columns={columns} dataSource={data} />
      {/* </Card> */}
    </>
    );
  }
}

export default Dynamic;
