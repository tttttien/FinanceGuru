module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      Num: {
        type: DataTypes.INTEGER, // Corrected to lowercase "integer"
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      StudentID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StudentDOB: {
        type: DataTypes.DATE, // Corrected to lowercase "integer"
        allowNull: true,
      },
      StudentAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StudentPhone: {
        type: DataTypes.STRING, // Corrected to lowercase "integer"
        allowNull: false,
      },
      Course: {
        type: DataTypes.STRING, // Corrected to lowercase "integer"
        allowNull: false,
      },

    },
    {
      timestamps: false,
    }
  );

  return Students;
};
