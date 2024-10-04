import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '/imports/api/ContactsCollection';

Meteor.startup(async () => {

    Meteor.publish("contacts", function(){
        return ContactsCollection.find({})
    })
});
