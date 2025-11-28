# Decentralized On-Chain Chatroom (Flare Network)

## **Contract Address**
**0xab47785613B8df84074bEFBa3d0BD5daD88845Ea**  
Explorer: https://coston2-explorer.flare.network/address/0xab47785613B8df84074bEFBa3d0BD5daD88845Ea

---

## **Description**
This project is a fully on-chain decentralized chatroom built on the Flare **Coston2 Testnet**.  
Users can join a shared chatroom, send messages, and read all previously posted messages — all stored directly on the blockchain. The UI is built with Next.js and integrates using wagmi + viem for seamless Web3 interaction.

The purpose of this project is to demonstrate how simple social interactions (such as chatrooms) can be implemented using smart contracts, allowing censorship-resistant and trustless communication between users.

---

## **Features**
### ✅ **Smart Contract Features**
- **Join the chatroom** using the `joinRoom()` function  
- **Post messages on-chain** using `postMessage(message)`  
- **Fully decentralized storage** for:
  - Member addresses  
  - Chat messages  
- **View total chat members** (`totalMembers()`)
- **View total messages** (`totalMessages()`)
- **Retrieve any stored message** from `messages(index)`

### ✅ **Frontend Features**
- Wallet connection gating (must connect to use)
- Join room button with loading state
- Message posting UI
- Auto-updating message list
- Transaction hash tracking
- Error and loading state handling

---

## **How It Solves Real Problems**
Traditional chat systems rely on centralized servers that may:
- Store user data insecurely  
- Become unavailable  
- Be censored or controlled  
- Modify or delete user messages  

This decentralized chatroom solves these issues by moving communication on-chain, offering:

### **1. Censorship Resistance**
Messages stored on the blockchain cannot be edited, deleted, or hidden by any centralized entity.

### **2. High Transparency**
All interactions are publicly accessible, verifiable, and immutable.

### **3. Trustless Interaction**
Users do not need to trust any server or admin — the smart contract enforces all rules.

### **4. Web3 UX Demonstration**
This project is an excellent educational example of:
- Smart contract integration with wagmi  
- Using useReadContract + useWriteContract  
- Waiting for transaction receipts  
- Handling asynchronous blockchain workflows  

### **5. Real Use Cases**
- Web3 community chatrooms  
- DAO announcements  
- On-chain social platforms  
- Permanent proof-of-message communication  

---

## **Summary**
This project showcases a clean, functional, and extensible decentralized chat system — perfect for learning Web3 development, experimenting with smart contracts, or demonstrating on-chain social interactions.

---

