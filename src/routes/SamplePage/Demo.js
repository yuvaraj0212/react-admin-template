import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import ImgCrop from 'antd-img-crop';
import { Button, Modal, Col, Divider, Form, Space, Input, Row, Select, Table, Upload, Card } from "antd";
import IntlMessages from "../../util/IntlMessages";
import { getPoductsList } from "../../appRedux/actions/Api";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_PRODUCT } from "../../constants/ActionTypes";
import axios from 'util/Api'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const FormItem = Form.Item;
const columns = [
  {
    title: 'Id',
    dataIndex: 'ID',
    key: 'id',
    width: 50,
    render: (item, record, index) => (<>{index + 1}</>)
  },
  {
    title: 'Image',
    dataIndex: 'imageURL',
    key: 'imageURL',
    width: 100,
    render: text => <img src={text} className="gx-link" />,
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: text => <span className="gx-link">{text}</span>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: text => <span className="gx-link">{text}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 100,
    render: text => <span className="gx-link">{text}</span>,
  },
  {
    title: 'Category',
    dataIndex: 'category.name',
    key: 'category',
    width: 200,
    render: text => <span className="gx-link">{text}</span>,
  }, {
    title: 'Action',
    key: 'action',
    width: 160,
    render: (text, record) => (
      <span>
        {/* <span className="gx-link">Action 一 {record.name}</span> */}
        <Divider type="vertical" />
        <span className="gx-link">Edit</span>
        <Divider type="vertical" />
        <Divider type="vertical" />
        <span className="gx-link">Delete</span>
        <Divider type="vertical" />
      </span>
    ),
  }];

const expandedRowRender = record => <p>{record.description}</p>;
const scroll = { y: 540 };
const { Option } = Select;
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bordered: true,
      loading: false,
      // pagination,
      size: 'default',
      prompt: false,
      // title: title,
      showHeader: true,
      // footer,
      rowSelection: undefined,
      scroll: undefined,
      products: []
    };
  }
  componentDidMount() {

    axios.get('/product/product-list',
    ).then(({ data }) => {
      console.log("product-list: ", data);
      if (data.result) {

        this.setState({ products: data.result })
      }
    }).catch(function (error) {
      console.log("product-list Error****:", error.message);
    });
  }
  onConfirm = () => {
    this.setState({ prompt: false, });
  };
  onCancel = () => {
    this.setState({ prompt: false, });
  };
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log("values", values);
        if (!err) {
          return this.setState({ prompt: false, });
        }

      });
    };
    const { getFieldDecorator } = this.props.form;
    const { products, prompt } = this.state;
    console.log(products);
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };
    // const onChange = ({ fileList: newFileList }) => {
    //   setFileList(newFileList);
    // }
    return (
      <div className="gx-main-content">
        <div>
          <h2 className="title gx-mb-4"><IntlMessages id="Products" /></h2>
          <Button ghost className="gx-mb-0" type="primary" onClick={() => {
            this.setState({ prompt: true })
          }} ><IntlMessages id="Create Products" /></Button>

          <Table className="gx-table-responsive" {...this.state} columns={columns} dataSource={products} />

        </div>

        <Modal
          title="Vertically centered modal dialog"
          centered
          // footer={[
          //   <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit}>
          //     Sign Up
          //   </Button>
          // ]}
          visible={prompt}
          onOk={handleSubmit}
          onCancel={this.onCancel}
          className="col-12 "
        >
          <Form
            className="container"
          >
            <Row className="">
              <Col className=" col-5  ">
                {getFieldDecorator('productName', {
                  rules: [{ required: true, message: 'Please input your productName!' }],
                })(
                  <Input
                    className="m-1 "
                    placeholder="productName" />
                )}
                {getFieldDecorator('productCode', {
                  rules: [{ required: true, message: 'Please input your productCode!' }],
                })(
                  <Input
                    className="m-1 "
                    placeholder="productCode" />
                )}

                {getFieldDecorator('price', {
                  rules: [{ required: true, message: 'Please input your price!' }],
                })(
                  <Input
                    className="m-1 "
                    type="number" placeholder="price" />
                )}

                {getFieldDecorator('mfile', {
                  rules: [{ required: true, message: 'Please input your mfile!' }],
                })(

                  // <ImgCrop rotate>
                  <Upload
                    listType="picture"
                    className="upload-list-inline"
                    onPreview={onPreview}
                  >
                    <Input
                      type='button'
                      className="m-1 "
                      value=" + Upload" />

                  </Upload>
                  //  </ImgCrop> 
                )}
              </Col>

              <Col className="col-5 offset-1 ">
                {/* <FormItem> */}
                {getFieldDecorator('details', {
                  rules: [{ required: true, message: 'Please input your details!' }],
                })(
                  <Input
                    className="m-1 "
                    placeholder="details" />
                )}
                {/* </FormItem> */}


                {/* <FormItem>/ */}
                {getFieldDecorator('discount', {
                  rules: [{ required: true, message: 'Please input your discount!' }],
                })(
                  <Input
                    className="m-1 "
                    type="number" placeholder="discount" />
                )}
                {/* </FormItem> */}

                {/* <FormItem> */}
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Please input your category!' }],
                })(
                  <Select
                    className="ps-ant-dropdown m-1  "
                    listItemHeight={25}
                    placeholder="Select a Category"
                    style={{ width: 198 }}
                  >
                    {/* {categorylist ? categorylist.map((list, index) => {
                            return (<Option key={index} value={list.name}>{list.name}</Option>)
                        }
                        ) : ""} */}
                    <Option value={"list.name"}>cat 1</Option>
                  </Select>
                )}
                {/* </FormItem> */}
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please input your description!' }],
                })(
                  <Input
                    className="m-1 "
                    placeholder="description" />
                )}
              </Col>
             

            </Row>
          </Form>
        </Modal>
      </div >
    );
  }
}


export default Form.create()(ProductsList);
