
// import React, { useEffect, useState } from "react";
// import { Router } from "react-router";
// import { Button, Card, Form, Input, notification, Select, Upload } from "antd";
// import IntlMessages from "util/IntlMessages";
// const Create = () => {
//     const [categorylist, setCategorylist] = useState([]);
//     useEffect(() => {
//         console.log("value");
//         // getCatrgrylist().then((res) => {
//         //     console.log(res);
//         //     setCategorylist(res.data.result);
//         // })
//     }, []);
//     const handelsubmit = (value) => {
//         value.preventDefault();
//         console.log(value);
//         // const loginFormData = new FormData();
//         // loginFormData.append("productName", value.productName);
//         // loginFormData.append("productCode", value.productCode);
//         // loginFormData.append("price", value.price);
//         // loginFormData.append("details", value.details);
//         // loginFormData.append("mfile", value.mfile.file.originFileObj);
//         // loginFormData.append("discount", value.discount);
//         // loginFormData.append("description", value.description);
//         // loginFormData.append("category", value.category);
//         // console.log(loginFormData);
//         // productCreate(loginFormData).then((res) => {
//         //     console.log(res);
//         //     console.log(res.status);
//         //     if (res.data.status === 200) {
//         //         notification.success({
//         //             message: res.data.message,
//         //             description: 'This feature has been updated later!',
//         //         });
//         //         return Router.push('/products');
//         //     } else {
//         //         console.log(res.data.message);
//         //         notification.warn({
//         //             message: res.data.message,
//         //             description: 'This feature has been updated later!',


//         //         })
//         //     }
//         // })
//     }
//     const { Option } = Select;
//     console.log("category ", categorylist);
//     return (
//         <Card className="gx-login-content">
//             <Form
//                 onSubmit={(values) => handelsubmit(values)}
                
//             >

//                 <Form.Item
//                     name="productName"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your productName!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control  w-md-75"
//                         type="text"
//                         placeholder="productName"

//                     />
//                 </Form.Item>

//                 <Form.Item
//                     name="productCode"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your productCode!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="productCode"

//                     />
//                 </Form.Item>

//                 <Form.Item
//                     name="price"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your price!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control"
//                         type="number"
//                         placeholder="price"

//                     />
//                 </Form.Item>
//                 <Form.Item
//                     name="details"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your details!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="details"

//                     />
//                 </Form.Item>
//                 <Form.Item
//                     name="discount"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your discount!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control"
//                         type="number"
//                         placeholder="discount"

//                     />
//                 </Form.Item>

//                 <Form.Item
//                     name="description"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your description!',
//                         },
//                     ]}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="description"

//                     />
//                 </Form.Item>
//                 <Form.Item
//                     name="category"
//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your category!',
//                         },
//                     ]}
//                 >
//                     <Select
//                         className="ps-ant-dropdown "
//                         listItemHeight={25}
//                         placeholder="Select a Category"

//                     >
//                         {categorylist ? categorylist.map((list, index) => {
//                             return (<Option key={index} value={list.name}>{list.name}</Option>)
//                         }
//                         ) : ""}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item
//                     name="mfile"

//                     rules={[
//                         {
//                             required: true,
//                             message:
//                                 'Please input your mfile!',
//                         },
//                     ]}>
//                     <Upload
//                         listType="picture"
//                         className="upload-list-inline"
//                     >
//                         <Button >Upload Product </Button>
//                     </Upload>
//                 </Form.Item>
//                 <Form.Item>
//                     <Button type="primary" htmlType="submit">
//                     Submit
//                     </Button>
//                     {/* <Button ghost className="gx-mb-0" type="primary" htmlType="submit">Submit</Button> */}
//                 </Form.Item>

//             </Form>
//         </Card>
//     );
// };

// export default Create;