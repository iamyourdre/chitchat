import asyncHandler from 'express-async-handler';
import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import { Op } from 'sequelize';

export const searchContact = asyncHandler(async (req, res) => {
  try {
    const { saver_id, query } = req.body;
    const search = await Contact.findAll({
      where: {
        saver_id,
        [Op.or]: [
          {
            contact_number: {
              [Op.like]: `%${query}%`,  // Use Op.like for MySQL
            },
          },
          { 
            contact_name: {
              [Op.like]: `%${query}%`,  // Use Op.like for MySQL
            },
          }
        ]
      },
    });
    return res.status(200).json(search);
  } catch (error) {
    console.log(error);
  }
});
