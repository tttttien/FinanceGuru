module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define(
        "Employees",
        {
            ID: {
                type: DataTypes.INTEGER, // Corrected to lowercase "integer"
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            EmployeeDOB: {
                type: DataTypes.DATE, // Corrected to lowercase "integer"
                allowNull: true,
            },
            EmployeeAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            EmployeePhone: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: false,
            },
            Position: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: false,
            },
            EmployeeEmail: {
                type: DataTypes.STRING,
                allowNull: true,
            },


        },
        {
            timestamps: false,
        }
    );

    return Employees;
};
