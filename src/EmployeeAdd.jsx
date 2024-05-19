import React from 'react';


class EmployeeAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.employeeAdd;
        const employee = {
          name: form.name.value, 
          extension: form.extension.value, 
          email: form.email.value, 
          title: form.title.value, 
        };
          this.props.createEmployee(employee);
          form.name.value = "";
          form.extension.value = "";
          form.email.value = "";
          form.title.value = "";
      }
      render() {
        return (
          <form name="employeeAdd" onSubmit={this.handleSubmit}>
              Name: <input type="text" name="name" placeholder="Name" />
              Extention: <input type="text" name="extension" placeholder="Extension" maxLength={4}/>
              Email: <input type="text" name="email" placeholder="Email" />
              Title: <input type="text" name="title" placeholder="Title" />
              <button>Add</button>
          </form>
          );
      }
  }

  export default EmployeeAdd;
