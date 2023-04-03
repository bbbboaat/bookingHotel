import React , { useState } from 'react';
import { abi , contractAddress } from '../config.json'
import { ethers } from "ethers";

export const BlockchainContext = React.createContext();

export const BlockchainProvider = ({children}) => {
    const [currentAccount , setCurrentAccount] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const address = contractAddress;
    const contractAbi = abi;
    const contract = new ethers.Contract(address, contractAbi, signer);

    const connectWallet = async () => {
        try{
            if(!window.ethereum) return alert("Please install Metamask")

            const account = await provider.send("eth_requestAccounts");
            console.log(account[0])
            setCurrentAccount(account[0])
        } catch (error) {
            console.log(error)
            throw new Error("No etheruem object")
        }
    }

    return (
        <BlockchainContext.Provider
            value={{
                connectWallet,
                currentAccount
            }}>
                { children }
        </BlockchainContext.Provider>
    )
}