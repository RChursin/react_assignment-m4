import Employee from '../models/Employee.js';

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees, count: employees.length });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Get a single employee by ID
const getEmployee = async (req, res) => {
  try {
    let { id: employeeId } = req.params;
    const employee = await Employee.findOne({ _id: employeeId })
    if (!employee) {
      return res.status(404).json({ msg: `Employee with ID ${employeeId} not found` });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ employee });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json({ msg: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};