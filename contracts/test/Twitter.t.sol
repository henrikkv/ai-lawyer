// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "../src/twitter.sol";

contract TwitterTest is Test {
    JsonApiExample twitterContract;

    function setUp() public {
        twitterContract = new JsonApiExample();
    }
function testCheckTweet() public {
    // Mock a JSON response
    IJsonApi.Response memory jsonResponse = IJsonApi.Response({
        attestationType: bytes32("JsonApi"), // Provide appropriate value
        sourceId: bytes32(0),        // Provide appropriate value
        votingRound: 0,              // Provide appropriate value
        lowestUsedTimestamp: 0,      // Provide appropriate value
        requestBody: IJsonApi.RequestBody({
            url: "http://example.com",
            postprocessJq: ".",
            abi_signature: "signature"
        }),
        responseBody: IJsonApi.ResponseBody({
            abi_encoded_data: abi.encode(Tweet({
                text: "Hello, world!",
                username: "testuser",
                createdAt: block.timestamp,
                likeCount: 10,
                replyCount: 2
            }))
        })
    });
        // Call the checkTweet function
        Tweet memory tweet = twitterContract.checkTweet(jsonResponse);

        // Assert the tweet data
        assertEq(tweet.text, "Hello, world!");
        assertEq(tweet.username, "testuser");
        assertEq(tweet.likeCount, 10);
        assertEq(tweet.replyCount, 2);
    }
}
