import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, Drawer, Button, Space } from 'antd';
import {EditFilled, DeleteFilled} from '@ant-design/icons';
import { red } from '@ant-design/colors';
import Create from "./create"

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      records: [],
      setVisible: false,
      columns: [
        {
          title: "Name",
          dataIndex: "person_name",
          sorter: (a, b) => a.person_name.localeCompare(b.person_name), sortDirection: ['ascend']
        },
        {
          title: "Position",
          dataIndex: "person_position",
          sorter: (a, b) => a.person_position.localeCompare(b.person_position), sortDirection: ['descend'],
          responsive: ['md']
        },
        {
          title: "Job Level",
          dataIndex: "person_level",
          sorter: (a, b) => a.person_level.localeCompare(b.person_level), sortDirection: ['descend'],
          responsive: ['md']
        },
        {
          title: "",
          dataIndex: "",
          key: 'x',
          render: (text,record) => (
            <Space size="large">
              <Link to={"/edit/" + record.key}><EditFilled /></Link>
              <a href="/"onClick={() => {this.deleteRecord(record.key);}}><DeleteFilled style={{color:red.primary}} /></a>
            </Space>
          )
        }
      ]
    };
  }
  showDrawer() {
    this.setState({setVisible:true});
  }
  onClose() {
    this.setState({setVisible:false});
  }
  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }


  // This method will map out the users on the table
  recordList() {
    var json = [];
    if(this.state.records.length === 0)
    {
      return this.state.records;
    }
    this.state.records.map((currentrecord, index) => {

      
      return json.push({
        "key": currentrecord._id,
        "person_name": currentrecord.person_name,
        "person_position": currentrecord.person_position,
        "person_level": currentrecord.person_level,
      });
    });
    return json;
  }
  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        <h3>Record List</h3>
        <p>
        <Button type="ghost" onClick={this.showDrawer}>
          Create New Record
        </Button>
        <Drawer title="Create New Record" placement="left" onClose={this.onClose} visible={this.state.setVisible}>
          <Create handleCloseDrawer={this.onClose.bind(this)}/>
        </Drawer>
        </p>
        <Table columns={this.state.columns} dataSource={this.recordList()}/>
      </div>
    );
  }
}