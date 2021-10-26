import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, Drawer, Button } from 'antd';
import Create from "./create"

const columns = [
  {
    title: "Name",
    dataIndex: "person_name",
    sorter: (a,b) => a.person_name.length - b.person_name.length, sortDirection: ['descend']
  },
  {
    title: "Position",
    dataIndex: "person_position",
    sorter: (a,b) => a.person_position.length - b.person_position.length, sortDirection: ['descend'],
    responsive: ['md']
  },
  {
    title: "Job Level",
    dataIndex: "person_level",
    sorter: (a,b) => a.person_level.length - b.person_level.length, sortDirection: ['descend'],
    responsive: ['md']
  },
  {
    title: "",
    dataIndex: "options"
  }
];

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
    return this.state.records.map((currentrecord) => {

      var json = {};
      json.push({
        "key": currentrecord._id,
        "person_name": currentrecord.person_name,
        "person_position": currentrecord.person_name,
        "options": <Link to={"/edit/" + currentrecord._id}>Edit</Link> | <a href="/"onClick={() => {this.deleteRecord(currentrecord._id);}}>Delete</a>
      });
      return json;
      /*return (<Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );*/
    });
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
          <Create/>
        </Drawer>
        </p>
        <Table columns={columns} dataSource={this.recordList}/>
      </div>
    );
  }
}