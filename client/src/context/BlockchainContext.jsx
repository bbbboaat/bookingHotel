import React , { useState } from 'react';
import { abi , contractAddress } from '../config.json'
import { ethers } from "ethers";

export const BlockchainContext = React.createContext();

export const BlockchainProvider = ({children}) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const address = contractAddress;
    const contractAbi = abi;
    const contract = new ethers.Contract(address, contractAbi, signer);

    

    return (
        <BlockchainContext.Provider
            value={{}} >
                { children }
        </BlockchainContext.Provider>
    )
}