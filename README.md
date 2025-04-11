# 📝 Decentralized Blog Platform

A fully decentralized blog platform built with **Solidity**, **IPFS**, **The Graph**, and **React**. Creators can publish posts on IPFS, and metadata is stored on-chain. Readers can explore content without relying on centralized platforms.

---

## ⚙️ Tech Stack

- **Smart Contracts** – Solidity + Hardhat
- **Decentralized Storage** – IPFS via Web3.Storage
- **Frontend** – React + Ethers.js
- **Indexing** – The Graph (for fast querying)
- **Wallet** – MetaMask

---

## 🌐 Live Demo (Coming Soon)

> A live version will be deployed on Vercel + Polygon/Mumbai testnet.

---

## 🚀 Features

- Connect with MetaMask
- Publish posts stored on **IPFS**
- Store blog metadata **on-chain**
- View posts dynamically using **The Graph**
- Fully open-source and permissionless

---

## 🪙 Token: $DBLOG

We're launching a community token via **pump.fun**:
- Power platform tipping & governance
- Enable token-gated features in future versions
- Read full [Tokenomics here](./TOKENOMICS.md)

---

## 📦 Quick Start

```bash
# Clone this repo
git clone https://github.com/yourname/decentralized-blog.git
cd decentralized-blog

# Install dependencies
npm install

# Compile and deploy the smart contract
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

# Start the frontend
cd frontend
npm install
npm run dev
