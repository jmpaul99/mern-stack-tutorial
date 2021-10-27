import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Form, Input, Button, Radio, notification } from 'antd';
 
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

const openNotificationWithIcon = name => {
  notification.success({
    message: 'Record Created',
    description: 'A new record has been added for '+ name
  })
}

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
    this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      person_name: "",
      person_position: "",
      person_level: "",
    };
  }
 
  // These methods will update the state properties.
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value,
    });
  }
 
  onChangePersonPosition(e) {
    this.setState({
      person_position: e.target.value,
    });
  }
 
  onChangePersonLevel(e) {
    this.setState({
      person_level: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    //e.preventDefault();
    /*if (typeof this.props.handleCloseDrawer === 'function')
    {
      this.props.handleCloseDrawer().bind(this);
    }*/
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: this.state.person_name,
      person_position: this.state.person_position,
      person_level: this.state.person_level,
    };
  
    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data))
      .then(openNotificationWithIcon(this.state.person_name));
  
    // We will empty the state after posting the data to the database
    this.setState({
      person_name: "",
      person_position: "",
      person_level: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <Form name="basic"
          labelCol={{span: 24}}
          wrapperCol={{span: 24}}
          initialValues={{remember:true}}
          onFinish={this.onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          requiredMark = 'optional'
        >
          <Form.Item label="Employee Name"
            name="person_name"
            rules={[{required:true, message:'Please input the employees name'}]}
          >
            <Input
              value={this.state.person_name}
              onChange={this.onChangePersonName}
            />
          </Form.Item>

          <Form.Item label="Employee Position"
            name="person_position"
            rules={[{required:true, message:'Please input the employees position'}]}
          >
            <Input
              value={this.state.person_position}
              onChange={this.onChangePersonPosition}
            />
          </Form.Item>

          <Form.Item label="Employee Level"
          name="employee_level">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="Intern" checked={this.state.person_level === "Intern"} onChange={this.onChangePersonLevel}>
                Intern
              </Radio.Button>
              <Radio.Button value="Junior" checked={this.state.person_level === "Junior"} onChange={this.onChangePersonLevel}>
                Junior
              </Radio.Button>
              <Radio.Button value="Senior" checked={this.state.person_level === "Senior"} onChange={this.onChangePersonLevel}>
                Senior
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}