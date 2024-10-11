import React, { useState } from "react";
import { Meteor } from 'meteor/meteor'
import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";
import { useSubscribe, useFind } from 'meteor/react-meteor-data'
import { ContactsCollection } from "../api/ContactsCollection";
import { Loading } from "./components/Loading";
import { WalletsCollection } from "../api/WalletsCollection";


export const Wallet = () => {

  const isLoadingContacts = useSubscribe("contacts");
  const isLoadingWallets = useSubscribe("wallets");
  
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { cretedAt: -1 } }
    )
  )

  const [wallet] = useFind(() => WalletsCollection.find())
  
  const [open, setOpen] = useState(false)
  const [isTransfering, setIsTransfering] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationwallet, setDestinationWallet] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  const addTransaction = () => {
    Meteor.call('transactions.insert', {
      isTransfering,
      sourceWalletId: wallet?._id,
      // @ts-ignore
      destinationWalletId: destinationwallet?.walletId || "",
      amount:Number(amount),
    }, (errorResponse)=>{
      if(errorResponse){
        setErrorMessage(errorResponse.error)
      }else{
        setOpen(false);
        setDestinationWallet({})
        setAmount(0)
        setErrorMessage("")
      }
    }) 
  }

  if (isLoadingContacts()||isLoadingWallets()) {
    return <Loading />
  }
  

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-xl font-medium text-black-500">
              Main account
            </div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Wallet ID
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div className="text-2xl font-bold text-gray-700">
              {`${wallet.balance}`}  {`${wallet.currency}`}
            </div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransfering(false)
                  setErrorMessage("")
                  setOpen(true)
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransfering(true)
                  setErrorMessage("")
                  setOpen(true)
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransfering ? 'Transfering money to other wallet' : 'Add money to your wallet'
        }
        body={
          <>
            {isTransfering && (<div className="mt-2">

              <SelectContact
                title="Destination contact"
                contact={destinationwallet}
                setContact={setDestinationWallet}
                contacts={contacts}
              />
            </div>
            )}
            <div className="mt-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={addTransaction}

          >
            {isTransfering ? "Transfer" : "Add"}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  )
}