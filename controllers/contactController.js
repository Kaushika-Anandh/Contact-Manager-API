const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id : req.user.id})
    res.status(200).json(contacts);
});

//@desc get contact
//@route GET /api/contacts/:id
//@access private 
const getContact = asyncHandler(async (req,res) => {
    const conatct = await Contact.findById(req.params.id);
    if(!conatct){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(conatct);
});

//@desc create new contact
//@route POST /api/contacts
//@access private 
const createContact = asyncHandler(async (req,res) => {
    console.log("The request body is: ", req.body);
    const {name,email,phone} = req.body;
    if (!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});


//@desc update contact
//@route PUT /api/contacts/:id
//@access private 
const updateContact = asyncHandler(async (req,res) => {
    const conatct = await Contact.findById(req.params.id);
    if(!conatct){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(conatct.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User does not have permission other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}    
    );
    res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private 
const deleteContact = asyncHandler(async (req,res) => {
    const conatct = await Contact.findById(req.params.id);
    if(!conatct){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(conatct.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User does not have permission other user contacts");
    }
    
    await Contact.deleteOne({_id : req.params.id}); //--> this is depreciated anf findByIdAndDelete is used instead
    res.status(200).json(conatct);
});

module.exports = {getContacts, 
                  getContact, 
                  createContact, 
                  updateContact, 
                  deleteContact};