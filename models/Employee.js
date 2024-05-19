import mongoose from 'mongoose';

const EmployeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  extension: {
    type: String,
    required: [true, 'Extension is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  dateHired: {
    type: Date,
    default: Date.now,
  },
  currentlyEmployed: {
    type: Boolean,
    default: true,
  },
});

const Employee = mongoose.model('Employee', EmployeesSchema);

export default Employee;