import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Wallet } from './Wallet';
import { Header } from './Header';


export const App = () => (
  <div>
    <Header/>
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto p-2">
        <ContactForm />
        <ContactList />
        <Wallet/>
      </div>
    </div>
  </div>
);
