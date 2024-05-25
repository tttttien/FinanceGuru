// module.exports = (sequelize, DataTypes) => {
//   const Transactions = sequelize.define(
//     "Transactions",
//     {
//       ProductID: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       UserID: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       Price: {
//         type: DataTypes.DOUBLE,
//         allowNull: false,
//       },
//       Type: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       Quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//     },
//     {
//       timestamps: false,
//     }
//   );

//   // Define association with the Products model to establish foreign key constraint
//   Transactions.associate = (models) => {
//     Transactions.belongsTo(models.Users, {
//       foreignKey: "UserID",
//       targetKey: "ID",
//       onDelete: "CASCADE",
//     });

//     Transactions.belongsTo(models.Products, {
//       foreignKey: "ProductID",
//       targetKey: "ID",
//       onDelete: "CASCADE",
//     });
//   };

//   return Transactions;
// };
