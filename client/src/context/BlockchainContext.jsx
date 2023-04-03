import React , { useEffect, useState } from 'react';
import { abi , contractAddress } from '../config.json'
import { ethers } from "ethers";

export const BlockchainContext = React.createContext();

export const BlockchainProvider = ({children}) => {
    const [currentAccount , setCurrentAccount] = useState("");
    const [balance , setBalance] = useState();  
    
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

    const checkWalletConnect = async () => {
        try{
            if(!window.ethereum) return alert("Please install Metamask")

            const account = await provider.send("eth_accounts");
            if(account.length){
                setCurrentAccount(account[0])
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getBalance = async() =>{
        try {
            const contractBalance = await contract.balanceOf();
            setBalance(ethers.utils.formatEther(contractBalance))
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        checkWalletConnect()
        getBalance()
    } , [])


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