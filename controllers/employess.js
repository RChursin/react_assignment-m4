const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ employee });
        // res.status(201).json({ msg: 'Emloyee added successfully', employee });
        // res.send('Create a new employee')
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}