const db = require('../models')

module.exports = {
    
    create: (req, res) => {
        if (req.body!=='') {
            db.Contact.create(req.body, (err, newContact) => {
                if (err) {
                    return console.log(err);
                } 
                res.json(newContact);
            })
        }
    },

    read: (req, res) => {
        db.Contact.find({})
        .populate('user')
        .exec(function(err, allContacts){
            if(err) return console.log(err);
            res.json({'data': allContacts});
        })
    },

    update: (req,res) => {
        var contactId = req.params.id;
        var contact = req.body;
        db.Contact.findByIdAndUpdate({_id: contactId}, contact, (err, updatedContact) => {
            if (err) { 
                return console.log(err);
            }
            res.json(updatedContact);
        })
    },

    delete: (req, res) => {
        var contactId = req.params.id;
        db.Contact.findByIdAndDelete({_id: contactId}, (err, deletedContact) => {
            if (err) {
                return console.log(err);
            }
            res.json(deletedContact);
        })
    },

    filter: (req, res) => {
        contact.find({})
        .populate(
            {
                path: 'user',
                match: {_id: req.params.userId}
            }
        )
        .exec((err, contacts) => {
            if(err) return console.log(err);
            console.log(contacts);
            contacts = contacts.filter((contact) => contact.author)
            res.json(contacts);
        })
    }
}