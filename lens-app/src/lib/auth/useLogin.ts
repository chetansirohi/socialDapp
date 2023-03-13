import { useAuthenticateMutation } from "@/graphql/generated";
import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { setAccessToken } from "./helpers";

export default function useLogin(){
    // the user is connected to wallet or not
    const address =useAddress();
    const sdk = useSDK();

    const {mutateAsync: sendSignedMessage} = useAuthenticateMutation()

    async function  login() {
        // if the wallet is not connected 
        if(!address) return;

        // generate a challenge  form lens api if wallet is connected
        const {challenge} = await generateChallenge(address);

        // sign the challenge with the user's wallet, challengequery returns an object and so we are interested in the text
        const signature = await sdk?.wallet.sign(challenge.text)

        // send signed challenge back to lens api,access variables
        const {authenticate} = await sendSignedMessage(
            {
                request:{
                    address,
                    signature
                }
            }
        )

        // receive a access token from the lens api, store the access token in the local storage to be used 
        const {accessToken, refreshToken} = authenticate;

        setAccessToken(accessToken, refreshToken);


    }

    //  Return the useMutation hook wrapping the async function
    return useMutation(login);
}