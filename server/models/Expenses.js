module.exports = (sequelize, DataTypes) => {
    const Expenses = sequelize.define(
        "Expenses",
        {
            ID: {
                type: DataTypes.INTEGER, // Corrected to lowercase "integer"
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            EmployeeName: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: true,
            },
            Amount: {
                type: DataTypes.DECIMAL(10, 2), // Corrected to lowercase "integer"
                allowNull: false,
            },
            Category: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: false,
            },
            InputDate: {
                type: DataTypes.DATEONLY, // Corrected to lowercase "integer"
                allowNull: false,
            },
            Description: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: true,
            },

        },
        {
            timestamps: false,
        }
    );

    return Expenses;
};
