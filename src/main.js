import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Spin, Alert,notification ,Form,
    Input,
    DatePicker,
    Select,
    Button, } from 'antd';



import { useEffect, useState } from 'react';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const openNotification = () => {
    notification.open({
      message: 'Submmited Succesfully',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const openNotification1 = () => {
    notification.open({
      message: 'failed to submit!!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };



export default function Main(){
    const [form] = Form.useForm();
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [dob,setDob] = useState("")
    const [loading,setLoading] = useState(false)

   const SubmitHandler =async (e) =>{
       try{
           setLoading(true)
         const senddata = await axios.post("http://localhost:5000/createform",{
               name,
               username,
               email,
               address,
               phone,
               dob
         })

         form.setFieldsValue({
            name:"",
            address:"",
            username:"",
            address:"",
            email:"",
            phone:"",
            dob:""
          });
         setName(" ")
         setAddress(" ")
         setDob(" ")
         setEmail(" ")
         setPhone(" ")
         setUserName(" ")
         setLoading(false)
         openNotification()
       }catch(e){
        form.setFieldsValue({
            name:"",
            address:"",
            username:"",
            email:"",
            address:"",
            phone:"",
            dob:""
          });
        setName(" ")
        setAddress(" ")
        setDob(" ")
        setEmail(" ")
        setPhone(" ")
        setUserName(" ")
           setLoading(false)
           openNotification1()
       }
   }

   function onChange(date, dateString) {
    setDob(dateString)
  }

    return (
<div>
    {(loading)?
   <Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  </Spin>:null}
  <Form {...formItemLayout} onFinish={(e)=>SubmitHandler(e)}  form={form} >
    <Form.Item
      name="name"
      label="Name"
      rules={[
        {
          required: true,
          message: 'Please input your nickname!',
          whitespace: true,
        },
      ]}
    >
      <Input onChange={(e)=>setName(e.target.value)} value={name} placeholder="name" />
    </Form.Item>
    <Form.Item
       name="username"
       label="Username"
       tooltip="What do you want others to call you?"
       rules={[
         {
           required: true,
           message: 'Please input your nickname!',
           whitespace: true,
         },
       ]}
    //   validateStatus={(validateusername)?"success":"error"}
    >
      <Input onChange={(e)=>setUserName(e.target.value)} value={username} placeholder="username" id="error" />
    </Form.Item>
    <Form.Item label="Address"
     >
      <Input onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
    </Form.Item>
    <Form.Item
     name="phone"
     label="Phone Number"
     hasFeedback
     validateStatus="success"
     rules={[
       {
         required: true,
         message: 'Please input your phone number!',
       },
     ]}>
      <Input onChange={(e)=>setPhone(e.target.value)}
      value={phone}
      name={phone}
      id="success"
      addonBefore={prefixSelector}
      style={{
        width: '100%',
      }}
      />
    </Form.Item>

    <Form.Item
      name="email"
      label="E-mail"
       hasFeedback
    //    validateStatus={(validateemail)?"success":"error"}
       rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        }
      ]}
      >
      <Input onChange={(e)=>setEmail(e.target.value)} value={email}/>
    </Form.Item>

    <Form.Item label="Dob"  name="dob"
     hasFeedback
    // validateStatus={(validatedob)?"success":"error"}
    >
      <DatePicker
        style={{
          width: '100%',
        }}
        onChange={onChange}
        // value={dob}
      />
    </Form.Item>
    <Button htmlType="submit">Submit</Button>
  </Form>
  </div>
    )
}
