import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

const saveContact = asyncHandler(async (req, res) => {
  try {
    const { ownerNumber, contactNumber } = req.body;
    const contact = await User.findOne({where: {phone_number:contactNumber}});
    if (contact) {
      return res.status(400).json({message:'Phone number not registered'});
    }
    const save = await Contact.create({
      owner_number: ownerNumber,
      contact_number: contactNumber,
    });
    return res.status(200).json({message: 'Contact added successful!'});
  } catch (error) {
    console.log(error)
  }
});

const searchContact = asyncHandler(async (req, res) => {
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
      listOfContacts.push(contact);
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
  searchContact
}