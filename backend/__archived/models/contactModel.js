import { DataTypes } from "sequelize";
import connectDB from '../config/db.js';
import User from "./userModel.js";
import { v4 as uuidv4 } from 'uuid';

const Contact = connectDB.define('contact', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  owner_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  contact_number: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'phone_number'
    },
    allowNull: false
  },
}, {
  freezeTableName: true
});

Contact.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
Contact.belongsTo(User, { foreignKey: 'contact_number', as: 'contactPerson' });

export default Contact;