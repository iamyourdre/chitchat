import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

const saveContact = asyncHandler(async (req, res) => {
  try {
    const { id, contactNumber } = req.body;
    const save = await Contact.create({
      owner_id: id,
      contact_number: contactNumber,
    });
    return res.status(200).json(save);
  } catch (error) {
    console.log(error)
  }
});

const searchContact = asyncHandler(async (req, res) => {
  try {
    const { id, phoneNumber } = req.body;
    const searchContact = await Contact.findOne({
      where: {
        id: id,
      }
    });
    if (searchContact) {
      return res.status(200).json(searchContact);
    }
    return res.status(400).json({message:`${phoneNumber} not found`});
  } catch (error) {
    console.log(error)
  }
});

const searchPhoneNumber = asyncHandler(async (req, res) => {
  try {
    const { id, phoneNumber } = req.body;
    const listOfContacts = [];
    const searchContact = await Contact.findAll({
      where: {
        owner_id: id,
        contact_number: {
          [Op.like]: `%${phoneNumber}%`,
        },
      }
    });
    for(const c of searchContact){
      const contact = await User.findOne({
        where: {
          phone_number: c.contact_number,
        },
        attributes: ['name', 'phone_number', 'profile_picture']
      });
      listOfContacts.push({id: c.id, contact});
    }
    if (listOfContacts.length>0) {
      return res.status(200).json({contact:listOfContacts, stranger:null});
    }
    const stranger = await User.findOne({
      where: {
        phone_number:phoneNumber
      },
      attributes: ['name', 'phone_number', 'profile_picture']
    });
    if (stranger) {
      return res.status(200).json({contact:null, stranger});
    }
    return res.status(400).json({message:`${phoneNumber} not found`});
  } catch (error) {
    console.log(error)
  }
});

export {
  saveContact,
  searchPhoneNumber,
  searchContact
}