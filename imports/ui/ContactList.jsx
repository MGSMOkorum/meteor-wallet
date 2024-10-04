import React from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import {useTracker, useSubscribe} from 'meteor/react-meteor-data'

export const ContactList = ()=>{
    useSubscribe("contacts");

    const contacts = useTracker(() => {
        return ContactsCollection.find({}).fetch();
    });

    return (
        <>
            <h3>Contacts list</h3>
            {contacts.map(contact=>(

                <li key={contact.email}>{contact.name} - {contact.email}</li>
            ))}
        </>
    )
}