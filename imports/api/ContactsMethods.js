import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ContactsCollection } from "./ContactsCollection"

Meteor.methods({
    'contacts.insert'({ name, email, imageUrl,walletId }) {

        check(name, String);
        check(email, String);
        check(imageUrl, String);
        check(walletId, String);

        if (!name) {
            throw new Meteor.Error("Name is required")
        }
        if (!walletId) {
            throw new Meteor.Error("Wallet ID is required")
        }
        return ContactsCollection.insertAsync({ name, email, imageUrl, walletId, createdAt: new Date()});
    },

    'contacts.remove'({ contactId }) {
        check(contactId ,String)
        return ContactsCollection.removeAsync(contactId);
    },
    'contacts.archive' ({contactId}){
        check(contactId ,String)
        return ContactsCollection.updateAsync({_id: contactId}, {$set:{archived:true}})
    }
})

