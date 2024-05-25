// module.exports = (sequelize, DataTypes) => {
//   const Users = sequelize.define(
//     "Users",
//     {
//       ID: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true, // Ensure email is unique
//       },
//       Name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       Status: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: 'Offline'
//       },
//       Reputation: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//       },
//     },
//     {
//       timestamps: false,
//     }
//   );

//   return Users;
// };
