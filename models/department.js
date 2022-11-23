import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        unique: true,
    },
    newDepartment: {
        type: String,
    },
    description: {
        type: String,
      
    },
    managingDepartment: {
        type: String,
    },
    underDepartments: {
        type: [Object],
    },
},{timestamps: true});

const Department = mongoose.model("Department", departmentSchema);

export default Department;