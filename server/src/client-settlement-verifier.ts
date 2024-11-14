const VERIFIER_SERVER_URL = "http://localhost:8000/IJsonApi/prepareResponse";
const TWITTER_API_URL = "https://api.twitter.com/2/tweets";
const TWITTER_API_KEY = "YOUR_TWITTER_API_KEY";

async function getAttestationData(tweetId: string): Promise<any> {
    const twitterUrl = `${TWITTER_API_URL}/${tweetId}?tweet.fields=author_id,created_at,public_metrics&expansions=author_id&user.fields=most_recent_tweet_id,pinned_tweet_id`;
    const jqScheme = '.data.text, .includes.users[0].username, .data.created_at, .data.public_metrics.like_count, .data.public_metrics.reply_count';
    const abiSignature = '{"struct Tweet":{"text":"string","username":"string","createdAt":"uint256","likeCount":"uint256","replyCount":"uint256"}}';

    return await (await fetch(VERIFIER_SERVER_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
            "attestationType": "0x4a736f6e41706900000000000000000000000000000000000000000000000000",
            "sourceId": "0x5745423200000000000000000000000000000000000000000000000000000000",
            "messageIntegrityCode": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "requestBody": {
                "url": twitterUrl,
                "postprocessJq": jqScheme,
                "abi_signature": abiSignature
            }
        })
    })).json();
}

async function main() {
    const tweetId = "1385323032295706112";
    const attestationData = await getAttestationData(tweetId);

    console.log(attestationData);


}

main();

