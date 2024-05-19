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
      title: form.title.value
    };
    this.props.createEmployee(employee);
    form.name.value = "";
    form.extension.value = "";
    form.email.value = "";
    form.title.value = "";
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeAdd",
      onSubmit: this.handleSubmit
    }, "Name: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name",
      placeholder: "Name"
    }), "Extention: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "extension",
      placeholder: "Extension",
      maxLength: 4
    }), "Email: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "email",
      placeholder: "Email"
    }), "Title: ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }
}
export default EmployeeAdd;