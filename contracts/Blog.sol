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

    event PostCreated(
        uint indexed id,
        string title,
        string ipfsHash,
        address indexed author,
        uint timestamp
    );

    function createPost(string memory title, string memory ipfsHash) public {
        uint id = posts.length;
        posts.push(Post(id, title, ipfsHash, msg.sender, block.timestamp));
        emit PostCreated(id, title, ipfsHash, msg.sender, block.timestamp);
    }

    function getPost(uint id) public view returns (Post memory) {
        require(id < posts.length, "Post does not exist.");
        return posts[id];
    }

    function getPostCount() public view returns (uint) {
        return posts.length;
    }
}
