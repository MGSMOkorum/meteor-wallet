import { Meteor } from 'meteor/meteor';
import {SimpleSchema} from "simpl-schema/dist/esm/SimpleSchema"
import '/imports/api/ContactsCollection';
import '/imports/api/ContactsMethods';
import '/imports/api/ContactsPublications';
import '/imports/api/WalletsCollection';
import '/imports/api/TransactionsCollection';
import '/imports/api/TransactionsMethods';
import '/imports/api/WalletsPublications';
import { WalletsCollection } from "/imports/api/WalletsCollection";
import '/infra/customError';


const walletSchema = new SimpleSchema({
  balance:{
    type: Number,
    min:0,
    defaultValue:0,
   },
  currency: {
    type:String,
    allowedValues:["USD","EUR"] ,
    defaultValue: "USD"
   },
  createdAt:{ 
    type: Date,
  }
});

Meteor.startup(async () => {
    const walletData = {
      createdAt: new Date()
    }
   const cleanWallet = walletSchema.clean(walletData )
   walletSchema.validate(cleanWallet);

    const count = await WalletsCollection.find().countAsync();
    if (count === 0) {
      try {
        await WalletsCollection.insertAsync(cleanWallet);
      } catch (error) {
        console.error("Error inserting wallet:", error);
      }
    }
  });