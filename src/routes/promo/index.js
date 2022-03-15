import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SweetAlert from "react-bootstrap-sweetalert";
import { Button as button, Divider, Form, Input, Modal, notification, Select, Switch, Table, Upload } from "antd";
import IntlMessages from "util/IntlMessages";
import axios from 'util/Api'
import moment from "moment";
import Axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
class Promo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prompt: false,
            promoStatus: Boolean,
            data: [],
            deletePromoValue: 0,
            warning: false
        }
    }
    componentDidMount() {
        this.webseting();
        this.getPromoList();
    }
    webseting = () => {
        axios.get('/get-web').then(e => {
            this.setState({ promoStatus: e.data.result.promo });
        });
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const loginFormData = new FormData();
                loginFormData.append("pCode", value.pCode);
                if (value.mfile !== null) {
                    loginFormData.append("mfile", value.mfile.file.originFileObj);
                }
                loginFormData.append("unit", value.unit);
                loginFormData.append("value", value.value);
                Axios({
                    method: 'post',
                    url: `http://localhost:8080/create-pcode`,
                    data: loginFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {

                    this.getPromoList();
                })
                this.setState({ prompt: false });
            }
        }
        )
    }

    deleteFile = () => {
        const data = { id: this.state.deletePromoValue }
        axios.post('/delete-pcode', data
        ).then((res) => {
            if (res.data.status === 200) {
                this.getPromoList();
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

    getPromoList = () => {
        axios.get('/get-pcode',
        ).then((data) => {
            if (data.data.result) {
                return this.setState({ data: data.data.result });
            }
        }).catch(function (error) {
            console.log("product-list Error****:", error.message);
        });
    }
    onCancel = () => {
        this.props.form.resetFields();
        this.setState({ prompt: false, warning: false });
    };
    onChange = (checked) => {
        console.log(`switch to ${checked}`);
        const data = { id: 0, promo: checked };
        this.setState({ promoStatus: checked });
        axios.post('/update-web', data
        ).then(e => {
            notification.success({
                message: e.data.message,
            });

        })

    }
    render() {
        const columns = [
            {
                title: 'S.No',
                dataIndex: 'id',
                key: 'S.no',
                width: 100,
                render: (item, record, index) => (<>{index + 1}</>)
            }, {
                title: 'BANNER',
                dataIndex: 'imageURL',
                key: 'imageURL',
                width: 100,
                render: text => <img src={text} alt={text.name} className="" />,
            }, {
                title: 'PromoCode',
                dataIndex: 'pCode',
                key: 'pCode',
                // width: 100,
                render: text => <span className="">{text}</span>,
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'amount',
                render: text => <span className="">{text}</span>,
            },
            {
                title: 'Unit',
                dataIndex: 'unit',
                key: 'Status',
                render: text => <span className="">{text}</span>,
            }
            , {
                title: 'Date',
                dataIndex: 'orders[0].createdDate',
                key: 'Date',
                render: text => moment(<span className="gx-link">{text}</span>).format("MMMM Do YYYY"),
            }
            , {
                title: 'Action',
                key: 'action',
                width: 160,
                render: (text, record) => {
                    return (
                        <span>


                            <Divider type="vertical" />
                            <span className="gx-link text-danger" onClick={() => {
                                this.setState({ warning: true, deletePromoValue: text.id })
                            }}>Delete</span>
                            <Divider type="vertical" />
                        </span>
                    )
                }
            }];

        const states = {
            bordered: true,
            loading: false,
            // pagination,
            size: 'default',
            // expandedRowRender,
            title: undefined,
            // showHeader,
            // footer,
            rowSelection: undefined,
            scroll: undefined,

        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h2 className="title gx-mb-4"><IntlMessages id="PROMO CODE " /></h2>
                <div className="container">
                    <row>
                        <h3>Visible On Store : <Switch checked={this.state.promoStatus} onChange={this.onChange} /></h3>

                        <Form.Item className=" d-flex justify-content-end m-1" >
                            <button type="button" class="btn btn-outline-info" onClick={(e) => this.setState({ prompt: e })} > Create Promo</button>
                        </ Form.Item>
                    </row>
                    <div className="">
                        <Table className="gx-table-responsive" {...states} columns={columns} dataSource={this.state.data} />
                    </div>
                </div>
                <Modal
                    title="Create New Product !"
                    centered
                    visible={this.state.prompt}
                    onOk={this.handleSubmit}
                    onCancel={this.onCancel}
                    className="gx-app-login-content"

                >
                    <Form className="container" id="creatForm">
                        <FormItem>
                            {getFieldDecorator('pCode', {
                                rules: [{ required: true, message: 'Please input your productName!' }],
                            })(
                                <Input
                                    className="m-1 "
                                    placeholder="Create Promo" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('value', {
                                rules: [{ required: true, message: 'Please input your description!' }],
                            })(
                                <Input
                                    className="m-1 "
                                    placeholder="PROMO VALUE" />
                            )}
                        </FormItem>


                        <FormItem>
                            {getFieldDecorator('unit', {
                                rules: [{ required: true, message: 'Please input your description!' }],
                            })(
                                <Select
                                    className="ps-ant-dropdown "
                                    listItemHeight={25}
                                    placeholder="Select a UNIT"

                                >
                                    <Option value={"%"}>%</Option>
                                    <Option value={"-"}>-</Option>
                                </Select>
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

                {/* delete Promo */}
                <SweetAlert show={this.state.warning}
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
            </div>
        );
    };
}

export default Form.create()(Promo);