import Department from "../models/department.js";

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  const department = req.body;
  const {
    departmentName,
    newDepartment,
    description,
    managingDepartment,
    underDepartments,
  } = department;
  if (department.departmentName === "CEO" && newDepartment) {
    try {
      const newDepartmentAdd = await Department.create({
        newDepartment,
        description,
        managingDepartment,
        underDepartments,
      });
      await Department.updateOne(
        { departmentName: "CEO" },
        {
          $push: {
            underDepartments: {
              name: newDepartment,
            },
          },
        }
      );
      res.status(201).json(newDepartmentAdd);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (managingDepartment) {
    try {
      const newDepartmentAdd = await Department.create({
        newDepartment,
        description,
        managingDepartment,
        underDepartments,
      });
      await Department.updateOne(
        { departmentName: department.managingDepartment },
        {
          $push: {
            underDepartments: {
              name: department.newDepartment,
            },
          },
        }
      );
      res.status(201).json(newDepartmentAdd);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (departmentName === "CEO" && !newDepartment) {
    try {
      const newDepartmentAdd = await Department.create({
        departmentName,
        description,
        managingDepartment,
        underDepartments,
      });

      for (let i = 0; i < underDepartments.length; i++) {
        await Department.create({
          departmentName: underDepartments[i].departmentName,
        });
      }
      res.status(201).json(newDepartmentAdd);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
