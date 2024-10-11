import { Meteor } from 'meteor/meteor';
import '/imports/api/ContactsCollection';
import '/imports/api/ContactsMethods';
import '/imports/api/ContactsPublications';
import '/imports/api/WalletsCollection';
import '/imports/api/TransactionsCollection';
import '/imports/api/TransactionsMethods';
import '/imports/api/WalletsPublications';
import { WalletsCollection } from '/imports/api/WalletsCollection';

Meteor.startup(async () => {
    const count = await WalletsCollection.find().countAsync();
    if (count === 0) {
      try {
        await WalletsCollection.insertAsync({
          balance: 0,
          currency: "USD",
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error inserting wallet:", error);
      }
    }
  });