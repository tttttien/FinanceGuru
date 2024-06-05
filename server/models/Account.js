// module.exports = (sequelize, DataTypes) => {
//     const Account = sequelize.define(
//       "Account",
//       {
//         Num: {
//           type: DataTypes.INTEGER, // Corrected to lowercase "integer"
//           allowNull: false,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         FirstName: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//         },
//         LastName: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         Gender: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         StudentDOB: {
//           type: DataTypes.DATE, // Corrected to lowercase "integer"
//           allowNull: true,
//         },
//         StudentAddress: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         StudentPhone: {
//           type: DataTypes.STRING, // Corrected to lowercase "integer"
//           allowNull: false,
//         },
//         RegDate: {
//           type: DataTypes.DATE, // Corrected to lowercase "integer"
//           allowNull: true,
//         },
//         Course: {
//           type: DataTypes.STRING, // Corrected to lowercase "integer"
//           allowNull: false,
//         },
  
//       },
//       {
//         timestamps: false,
//       }
//     );
  
//     return Account;
//   };
  