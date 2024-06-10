module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define(
        "Employees",
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Thêm thuộc tính unique ở đây
            },
            Gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            EmployeeDOB: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            EmployeeAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            EmployeePhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            EmployeeEmail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    return Employees;
};
