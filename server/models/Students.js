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
      RegDate: {
        type: DataTypes.DATE, // Corrected to lowercase "integer"
        allowNull: true,
      },

    },
    {
      timestamps: false,
    }
  );

  return Students;
};
