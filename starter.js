// Project: Decentralized Blog Platform Starter

// --- Solidity Contract: Blog.sol ---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Blog {
    struct Post {
        uint id;
        string title;
        string ipfsHash;
        address author;
        uint timestamp;
    }

    Post[] public posts;
    event PostCreated(uint id, string title, string ipfsHash, address indexed author, uint timestamp);

    function createPost(string memory title, string memory ipfsHash) public {
        uint id = posts.length;
        posts.push(Post(id, title, ipfsHash, msg.sender, block.timestamp));
        emit PostCreated(id, title, ipfsHash, msg.sender, block.timestamp);
    }

    function getPost(uint id) public view returns (Post memory) {
        return posts[id];
    }

    function getPostCount() public view returns (uint) {
        return posts.length;
    }
}

// --- React Frontend: App.jsx ---
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';
import BlogABI from './Blog.json';

const BLOG_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const web3Token = 'YOUR_WEB3STORAGE_TOKEN';

export default function App() {
  const [account, setAccount] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const uploadToIPFS = async (data) => {
    const client = new Web3Storage({ token: web3Token });
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], 'post.json');
    const cid = await client.put([file]);
    return cid + '/post.json';
  };

  const createPost = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(BLOG_CONTRACT_ADDRESS, BlogABI.abi, signer);

    const ipfsHash = await uploadToIPFS({ title, content });
    const tx = await contract.createPost(title, ipfsHash);
    await tx.wait();
    alert('Post created!');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Decentralized Blog</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Post Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={createPost}>
        Publish
      </button>
    </div>
  );
}
