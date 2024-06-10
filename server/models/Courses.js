module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define(
        "Courses",
        {
            ID: {
                type: DataTypes.INTEGER, // Corrected to lowercase "integer"
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: DataTypes.STRING, // Corrected to lowercase "integer"
                allowNull: false,
            },
            Price: {
                type: DataTypes.DECIMAL(10, 2), // Corrected to lowercase "integer"
                allowNull: true,
            },

        },
        {
            timestamps: false,
        }
    );

    return Courses;
};
