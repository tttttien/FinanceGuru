module.exports = (sequelize, DataTypes) => {
    const Lecturer = sequelize.define(
        "Lecturer",
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            LecturerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            LecturerGender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            LecturerDOB: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            LecturerAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            EmployeePhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    return Lecturer;
};
