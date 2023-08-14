import { data } from "autoprefixer";
import React from "react";
import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import Profile from "./Profile";
import NFTpage from "./NFTpage";
    


const Admin = () => {
//part

const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    // async function getNFTData(tokenId) {
    //     const ethers = require("ethers");
    //     let sumPrice = 0;
    //     //After adding your Hardhat network to your metamask, this code will get providers and signers
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const addr = await signer.getAddress();

    //     //Pull the deployed contract instance
    //     let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

    //     //create an NFT Token
    //     let transaction = await contract.getMyNFTs()

    //     /*
    //     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
    //     * and creates an object of information that is to be displayed
    //     */
        
    //     const items = await Promise.all(transaction.map(async i => {
    //         const tokenURI = await contract.tokenURI(i.tokenId);
    //         let meta = await axios.get(tokenURI);
    //         meta = meta.data;

    //         let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
    //         let item = {
    //             price,
    //             tokenId: i.tokenId.toNumber(),
    //             seller: i.seller,
    //             owner: i.owner,
    //             image: meta.image,
    //             name: meta.name,
    //             description: meta.description,
    //         }
    //         sumPrice += Number(price);
    //         return item;
    //     }))

    //     updateData(items);
    //     updateFetched(true);
    //     updateAddress(addr);
    //     updateTotalPrice(sumPrice.toPrecision(3));
    // }   

    // const params = useParams();
    // const tokenId = params.tokenId;
    // if(!dataFetched)
    //     getNFTData(tokenId);

        //EXTRAS



async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched){
    getAllNFTs();
    return (
        <div>
            <Navbar></Navbar>
            <div className="extDiv flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">
                    Wait! Your Content is getting ready......
                </div>
            </div>            
        </div>
    );
}
else{
    return (
        
        <><Navbar></Navbar><div class="flex flex-col">
             <th scope="col" class="text-xl font-bold text-yellow-400 px-6 py-4 text-left">
                                        The ticket status will be updated in this section.     Checkout the latest transactions</th>
            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-3">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-xl font-bold text-orange-400 px-6 py-4 text-left">
                                        Wallet Address
                                    </th>
                                    <th scope="col" class="text-xl font-bold text-orange-400 px-6 py-4 text-left">
                                        Category
                                    </th>
                                    <th scope="col" class="text-xl font-bold text-orange-400 px-6 py-4 text-left">
                                        Total Price
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                    {data.map((item) => {
                                        return (
                                            <>
                                            <tr class="border-b">
                                                <td class="text-xl text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm">{item.seller}</span>
                                                </td>
                                                <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.description}
                                                </td>
                                                <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.price} ETH
                                                </td>
                                                {/* <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                                    {<NFTTile data={item.image}></NFTTile>}
                                                </td> */}
                                                </tr>
                                            </>
                                        );
                                    })}
                                    {/* // <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-100">1</td>
                                    // <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                    // <span className="text-sm">{data.owner}</span>
                                    // </td>
                                    // <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                        
                                    // </td>
                                    // <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                    // {totalPrice} ETH
                                    // </td>
                                    // <td class="text-sm text-blue-100 font-light px-6 py-4 whitespace-nowrap">
                                    // {data.map((value) => {return <NFTTile data={value}></NFTTile>;})}
                                    // </td> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div></>
    )
}
                                
}

export default Admin;