import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import EmployeeAdd from './EmployeeAdd.jsx';
import EmployeeFilter from './EmployeeFilter.jsx';

function EmployeeTable(props) {
    const employeeRows = props.employees
      ? props.employees.map(employee => (
          employee ? (
            <EmployeeRow
              key={employee._id}
              employee={employee}
              deleteEmployee={props.deleteEmployee}
            />
          ) : null
        ))
      : null;
  
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Extension</th>
            <th>Email</th>
            <th>Title</th>
            <th>Date Hired</th>
            <th>Employed?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    );
  }

class EmployeeRow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
      };
      this.toggleModal = this.toggleModal.bind(this);
    }
  
    toggleModal() {
      this.setState((prevState) => ({
        modalVisible: !prevState.modalVisible,
      }));
    }
  
    onDeleteClick() {
      this.props.deleteEmployee(this.props.employee._id);
      this.toggleModal();
    }
  
    render() {
      return (
        <tr>
          <td>{this.props.employee.name}</td>
          <td>{this.props.employee.extension}</td>
          <td>{this.props.employee.email}</td>
          <td>{this.props.employee.title}</td>
          <td>{this.props.employee.dateHired.toDateString()}</td>
          <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
          <td>
            <Button variant="danger" onClick={this.toggleModal}>
              Delete
            </Button>
            <Modal show={this.state.modalVisible} onHide={this.toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Employee?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this employee?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => this.onDeleteClick()}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </td>
        </tr>
      );
    }
}

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => {
        console.log('Total count of employees:', data.count);
        data.employees.forEach(employee => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      })
      .catch(err => console.log(err));
  }

  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then(response => response.json())
      .then(newEmployee => {
        newEmployee.dateHired = new Date(newEmployee.dateHired);
        const newEmployees = this.state.employees.concat(newEmployee);
        this.setState({ employees: newEmployees });
        console.log('Total count of employees:', newEmployees.length);
      })
      .catch(err => console.log(err));
  }

  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          alert('Failed to delete employee');
        } else {
          this.loadData();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management App</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable
          employees={this.state.employees}
          deleteEmployee={this.deleteEmployee}
        />
        <hr />
        <EmployeeAdd createEmployee={this.createEmployee} />
      </React.Fragment>
    );
  }
}

export default EmployeeList;