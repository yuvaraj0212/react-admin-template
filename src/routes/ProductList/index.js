import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
// import ImgCrop from 'antd-img-crop';
import { Button, Modal, Col, Divider, Form, Input, Row, Select, Table, Upload, notification } from "antd";
import axios from 'util/Api'
import IntlMessages from "../../util/IntlMessages";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { done } from "nprogress";
import Axios from "axios";
const FormItem = Form.Item;
// const expandedRowRender = record => <p>{record.description}</p>;
// const scroll = { y: 540 };
const { Option } = Select;


class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bordered: true,
      editModelValue: {},
      loading: false,
      // pagination,
      catName: '',
      warning: false,
      size: 'default',
      prompt: false,
      // title: title,
      showHeader: true,
      EditModel: false,
      // footer,
      rowSelection: undefined,
      scroll: undefined,
      imagevisable: true,
      products: [],
      categorylist:[]
    };
  }
  componentDidMount() {

    this.getPoductsList();
    this.getcategoryList();
  }
  getcategoryList = () => {
    axios.get('/category/category-list',
    ).then(({ data }) => {
      if (data.result) {
        this.setState({ categorylist: data.result });
      }
    }).catch(function (error) {
      console.log("product-list Error****:", error.message);
    });
  }
  getPoductsList = () => {
    axios.get('/product/product-list',
    ).then(({ data }) => {
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
    this.setState({ prompt: false, EditModel: false, warning: false, });
  };
  EdithandleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const loginFormData = new FormData();
        loginFormData.append("productId", this.state.editModelValue.id);
        loginFormData.append("productName", value.productName);
        loginFormData.append("productCode", value.productCode);
        loginFormData.append("price", value.price);
        loginFormData.append("details", value.details);
        loginFormData.append("mfile", value.mfile.file.originFileObj);
        loginFormData.append("discount", value.discount);
        loginFormData.append("description", value.description);
        loginFormData.append("category", value.category);
        Axios({
          method: 'post',
          url: `http://localhost:8080/product/update-product`,
          data: loginFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          notification.success({
            message: res.data.message,
            description: 'This feature has been updated later!',
          });
          this.getPoductsList();
        })
        return this.setState({ prompt: false, });
      }

    });
  };
  deleteFile = (datas) => {

    Axios({
      method: 'delete',
      url: `http://localhost:8080/product/delete-product?productId=` + this.state.editModelValue.id,
    }).then((res) => {
      if (res.data.status === 200) {
        this.getPoductsList();
        this.setState({ warning: false, });
        notification.success({
          message: res.data.message,
          description: 'This feature has been updated later!',
        });
      } else {
        console.log(res.data.message);
        notification.warn({
          message: res.data.message,
        })
      }

    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const loginFormData = new FormData();
        loginFormData.append("productName", value.productName);
        loginFormData.append("productCode", value.productCode);
        loginFormData.append("price", value.price);
        loginFormData.append("details", value.details);
        loginFormData.append("mfile", value.mfile.file.originFileObj);
        loginFormData.append("discount", value.discount);
        loginFormData.append("description", value.description);
        loginFormData.append("category", value.category);
        console.log(loginFormData);
        Axios({
          method: 'post',
          url: `http://localhost:8080/product/create-product`,
          data: loginFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          notification.success({
            message: res.data.message,
            description: 'This feature has been updated later!',
          });
          this.getPoductsList();
        })
        return this.setState({ prompt: false, });
      }

    });
  };
  render() {

    const { getFieldDecorator } = this.props.form;
    const { products, prompt, EditModel, editModelValue, catName, warning ,categorylist} = this.state;
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
        render: text => <img src={text} alt={text.name} className="gx-link" />,
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
        render: (text, record) => {
          console.log(text);
          return (
            <span>
              {/* <span className="gx-link">Action 一 {record.name}</span> */}
              <Divider type="vertical" />
              <span className="gx-link" onClick={() => {
                this.setState({ EditModel: true, editModelValue: text, catName: text.category.name })
              }}>Edit</span>
              <Divider type="vertical" />
              <Divider type="vertical" />
              <span className="gx-link" onClick={() => {
                this.setState({ warning: true, editModelValue: text })
              }}>Delete</span>
              <Divider type="vertical" />
            </span>
          )
        }
      }];
    return (
      <div className="gx-main-content">
        <div>
          <h2 className="title gx-mb-4"><IntlMessages id="Products" /></h2>
          <Button ghost className="gx-mb-0" type="primary" onClick={() => {
            this.setState({ prompt: true })
          }} ><IntlMessages id="Create Products" /></Button>

          <Table className="gx-table-responsive" {...this.state} columns={columns} dataSource={products} />

        </div>
        <SweetAlert show={warning}
          warning
          showCancel
          confirmBtnText="yes"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.deleteFile}
          onCancel={this.onCancel}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble" />
        </SweetAlert>

        {/*  edite model */}
        <Modal
          title="Edit New Product !"
          centered
          visible={EditModel}
          onOk={this.EdithandleSubmit}
          onCancel={this.onCancel}
          className="col-12 "
        >
          <Form
            className="container offset-1"
          >
            <Row className="">
              <Col className=" col-5  ">
                <FormItem>
                  {getFieldDecorator('productName', {
                    initialValue: editModelValue.name,
                    rules: [{ required: true, message: 'Please input your productName!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="productName" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('productCode', {
                    initialValue: editModelValue.code,
                    rules: [{ required: true, message: 'Please input your productCode!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="productCode" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('price', {
                    initialValue: editModelValue.price,
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input
                      className="m-1 "
                      type="number" placeholder="price" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('mfile', {
                    rules: [{ required: true, message: 'Please input your mfile!' }],
                  })(

                    // <ImgCrop rotate>
                    <Upload
                      listType="picture"
                      className="upload-list-inline"
                      onPreview={onPreview}
                      onClick={() => this.state({ imagevisable: false })}

                    >
                      <Input
                        style={{ width: 191 }}
                        type='button'
                        className="m-1 "
                        value=" + Upload" />

                    </Upload>
                    //  </ImgCrop> 
                  )}
                </FormItem>
              </Col>

              <Col className="col-5 offset-1 ">
                <FormItem>
                  {getFieldDecorator('details', {
                    initialValue: editModelValue.details,
                    rules: [{ required: true, message: 'Please input your details!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="details" />
                  )}
                </FormItem>


                <FormItem>
                  {getFieldDecorator('discount', {
                    initialValue: editModelValue.discount,
                    rules: [{ required: true, message: 'Please input your discount!' }],
                  })(
                    <Input
                      className="m-1 "
                      type="number" placeholder="discount" />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('category', {
                    initialValue: catName,
                    rules: [{ required: true, message: 'Please input your category!' }],
                  })(
                    <Select
                      className="ps-ant-dropdown m-1  "
                      listItemHeight={25}
                      placeholder="Select a Category"
                      style={{ width: 191 }}
                    >
                      {categorylist ? categorylist.map((list, index) => {
                            return (<Option key={index} value={list.name}>{list.name}</Option>)
                        }
                        ) : ""}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('description', {
                    initialValue: editModelValue.description,
                    rules: [{ required: true, message: 'Please input your description!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="description" />
                  )}
                </FormItem>
              </Col>


            </Row>
          </Form>
        </Modal >
        {/* create model */}
        <Modal
          title="Create New Product !"
          centered
          visible={prompt}
          onOk={this.handleSubmit}
          onCancel={this.onCancel}
          className="col-12 "
        >
          <Form
            className="container offset-1"
          >
            <Row className="">
              <Col className=" col-5  ">
                <FormItem>
                  {getFieldDecorator('productName', {
                    rules: [{ required: true, message: 'Please input your productName!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="productName" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('productCode', {
                    rules: [{ required: true, message: 'Please input your productCode!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="productCode" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('price', {
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input
                      className="m-1 "
                      type="number" placeholder="price" />
                  )}
                </FormItem>
                <FormItem>
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
                        style={{ width: 191 }}
                        type='button'
                        className="m-1 "
                        value=" + Upload" />

                    </Upload>
                    //  </ImgCrop> 
                  )}
                </FormItem>
              </Col>

              <Col className="col-5 offset-1 ">
                <FormItem>
                  {getFieldDecorator('details', {
                    rules: [{ required: true, message: 'Please input your details!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="details" />
                  )}
                </FormItem>


                <FormItem>
                  {getFieldDecorator('discount', {
                    rules: [{ required: true, message: 'Please input your discount!' }],
                  })(
                    <Input
                      className="m-1 "
                      type="number" placeholder="discount" />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'Please input your category!' }],
                  })(
                    <Select
                      className="ps-ant-dropdown m-1  "
                      listItemHeight={25}
                      placeholder="Select a Category"
                      style={{ width: 191 }}
                    >
                      {categorylist ? categorylist.map((list, index) => {
                            return (<Option key={index} value={list.name}>{list.name}</Option>)
                        }
                        ) : ""}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input your description!' }],
                  })(
                    <Input
                      className="m-1 "
                      placeholder="description" />
                  )}
                </FormItem>
              </Col>


            </Row>
          </Form>
        </Modal>
      </div >
    );
  }
}


export default Form.create()(ProductsList);
