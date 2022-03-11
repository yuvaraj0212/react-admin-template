import { Button,  Divider, Form, Input, Modal, notification,  Table, Upload } from "antd";
import React from "react";
import axios from 'util/Api'
import IntlMessages from "util/IntlMessages";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
// const scroll = { y: 240 };
const FormItem = Form.Item;

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
      EditModel: false,
      editModelValue: {},
      data: [],
      warning:false
    }
  }

  componentDidMount() {
    this.getcategoryList();
  }


  getcategoryList = () => {
    axios.get('/category/category-list',
    ).then(({ data }) => {
      if (data.result) {
        this.setState({ data: data.result });
      }
    }).catch(function (error) {
      console.log("product-list Error****:", error.message);
    });
  }
  deleteFile = (datas) => {

    Axios({
      method: 'delete',
      url: `http://localhost:8080/category/delete-category?categoryId=` + this.state.editModelValue.id,
    }).then((res) => {
      if (res.data.status === 200) {
        this.getcategoryList();
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

  onCancel = () => {
    this.props.form.resetFields();
    this.setState({ prompt: false, EditModel: false, warning:false});
  };

  EdithandleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const loginFormData = new FormData();
        loginFormData.append("id", this.state.editModelValue.id);
        loginFormData.append("name", value.name);
        loginFormData.append("mfile", value.mfile.file.originFileObj);
        loginFormData.append("desc", value.desc);
        Axios({
          method: 'post',
          url: `http://localhost:8080/category/update-category`,
          data: loginFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          document.getElementById("editForm").reset();
          notification.success({
            message: res.data.message,
            description: 'This feature has been updated later!',
          });
          this.getcategoryList();
          this.props.form.resetFields()
        })
        return this.setState({ EditModel: false });
      }

    });

  };


  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const loginFormData = new FormData();
        loginFormData.append("name", value.name);
        loginFormData.append("mfile", value.mfile.file.originFileObj);
        loginFormData.append("desc", value.desc);
        Axios({
          method: 'post',
          url: `http://localhost:8080/category/create-category`,
          data: loginFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          document.getElementById("creatForm").reset();
          notification.success({
            message: res.data.message,
            description: 'This feature has been updated later!',
          });
          this.getcategoryList();
        })
        return this.setState({ prompt: false });
      }

    });

  };
  render() {
    const states = {
      bordered: true,
      loading: false,
      // pagination,
      size: 'small',
      // expandedRowRender,
      title: undefined,
      showHeader: true,
      // footer,
      rowSelection: undefined,
      scroll: undefined,

    };
    const columns = [
      {
        title: 'Id',
        dataIndex: 'ID',
        key: 'id',
        render: (item, record, index) => (<>{index + 1}</>)
      },
      {
        title: 'Image',
        dataIndex: 'imageURL',
        key: 'imageURL',
        render: text => <img width={80} src={text} alt={text.name} className="gx-link" />,
      }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span className="gx-link">{text}</span>,
      },
      {
        title: 'Description',
        dataIndex: 'desc',
        key: 'description',
        render: text => <span className="gx-link">{text}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          console.log(text);
          return (
            <span>
              {/* <span className="gx-link">Action 一 {record.name}</span> */}
              <Divider type="vertical" />
              <span className="gx-link" onClick={() => {
                this.setState({ EditModel: true, editModelValue: text })
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
    const { getFieldDecorator } = this.props.form;
    const { editModelValue, EditModel, prompt, data,warning } = this.state;
    return (
      <>
        <div>
          <h2 className="title gx-mb-4"><IntlMessages id="Categories" /></h2>
          <Button ghost className="gx-mb-0" type="primary" onClick={() => {
            this.setState({ prompt: true })
          }} ><IntlMessages id="Create Products" /></Button>
          <Table className="gx-table-responsive" {...states} columns={columns} dataSource={data} />
        </div>
        {/* create category */}
        <Modal
          title="Create New Product !"
          centered
          visible={prompt}
          onOk={this.handleSubmit}
          onCancel={this.onCancel}
          className="gx-app-login-content"

        >
          <Form className="container" id="creatForm">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your productName!' }],
              })(
                <Input
                  className="m-1 "
                  placeholder="productName" />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: 'Please input your description!' }],
              })(
                <Input
                  className="m-1 "
                  placeholder="description" />
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

                >
                  <Input
                    style={{ width: 191 }}
                    type='button'
                    className="m-1 "
                    status='done'
                    value=" + Upload" />

                </Upload>
                //  </ImgCrop> 
              )}
            </FormItem>

          </Form>
        </Modal>

        {/* edit category */}
        <Modal
          title="Edit category !"
          centered
          visible={EditModel}
          onOk={this.EdithandleSubmit}
          onCancel={this.onCancel}
          className="gx-app-login-content"
        >
          <Form className="container" id="editForm">
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: editModelValue.name,
                rules: [{ required: true, message: 'Please input your productName!' }],
              })(
                <Input
                  className="m-1 "
                  placeholder="Name" />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('desc', {
                initialValue: editModelValue.desc,
                rules: [{ required: true, message: 'Please input your description!' }],
              })(
                <Input

                  className="m-1 "
                  placeholder="description" />
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

                >
                  <Input
                    style={{ width: 191 }}
                    type='button'
                    className="m-1 "
                    status='done'
                    value=" + Upload" />

                </Upload>
                //  </ImgCrop> 
              )}
            </FormItem>

          </Form>
        </Modal>

        {/* delete category */}
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
      </>
    );
  }
};

export default Form.create()(Categories);