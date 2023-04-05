import React , { useEffect, useState } from 'react';
import { abi , contractAddress } from '../config.json'
import { ethers } from "ethers";

export const BlockchainContext = React.createContext("");

export const BlockchainProvider = ({children}) => {
    const [currentAccount , setCurrentAccount] = useState("");
    const [balance , setBalance] = useState()
    const [renterExists , setRenterExists] = useState()
    const [renter , setRenter] = useState()
    const [renterBalance , setRenterBalance] = useState()
    
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

    const checkRenterExists = async () => {
        try{
            if(currentAccount) { 
                const renter = await contract.rentersExists(currentAccount) // wrong contract setting rentersExist
                setRenterExists(renter);
                if(renter) {
                    await getRenter();
                }
            }
    } catch (error) {
            console.log(error)
        }
    }

    const getRenter = async () => {
        try{ 
            if(currentAccount) {
                const renter = await contract.getRenter(currentAccount)
                setRenter(renter)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addRenter = async (walletAddress,firstName,lastName,canRent,active,balance,due,start,end) => {
        try{ 
            const addRenter = await contract.addRenter(walletAddress,firstName,lastName,canRent,active,balance,due,start,end)
            await addRenter.wait()
            console.log(`${firstName} added`)
            checkRenterExists()
        } catch (error) {
            console.log(error)
        }
    }

    const getRenterBalance = async() => {
        try{
            if (currentAccount) {
                
                const balance = await contract.balanceOfRenter(currentAccount)
                setRenterBalance(ethers.utils.formatEther(balance))
            }
        }catch(error) {
            console.log(error)
        }
    }

    const deposit = async() => {
        try{
            const bnbValue = ethers.utils.parseEther(value)
            const deposit = await contract.deposit(currentAccount , {value : bnbValue})
            await deposit.wait()
            await getRenterBalance();
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkWalletConnect()
        checkRenterExists()
        getRenterBalance()
    } , [currentAccount])


    return (
        <BlockchainContext.Provider
            value={{
                connectWallet,
                currentAccount,
                renterExists,
                addRenter,
                renterBalance,
                deposit

            }}>
                { children }
        </BlockchainContext.Provider>
    )
}