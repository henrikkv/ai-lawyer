// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./generated/interfaces/verification/IJsonApiVerification.sol";
import "./generated/implementation/verification/JsonApiVerification.sol";

struct Tweet {
        string text;               // Tweet content
        string username;           // Username of the author
        uint256 createdAt;         // Timestamp of tweet creation (stored as uint256)
        uint256 likeCount;         // Number of likes
        uint256 replyCount;        // Number of comments (replies)
}

contract JsonApiExample {
    IJsonApiVerification public jsonApiAttestationVerification;

    constructor() {
        jsonApiAttestationVerification = new JsonApiVerification();
    }

    function checkTweet(IJsonApi.Response calldata jsonResponse) public view returns (Tweet memory) {
        // We mock the proof for testing and hackathon
        IJsonApi.Proof memory proof = IJsonApi.Proof({
            merkleProof: new bytes32[](0),
            data: jsonResponse
        });
        require(
            jsonApiAttestationVerification.verifyJsonApi(proof),
            "Invalid proof"
        );

        Tweet memory _tweet = abi.decode(
            jsonResponse.responseBody.abi_encoded_data,
            (Tweet)
        );

        return _tweet;

    }
}
