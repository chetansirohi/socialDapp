import { ChallengeQuery , ChallengeQueryVariables, ChallengeDocument} from "@/graphql/generated"
import { fetcher } from "@/graphql/authorization-fetch"
// ChallengeVariables is what is expected from the api
// ChallengeDocument is what is to be sent to graphql  api
// ChallengeQuery is the what is returned back as a result of this query

// Basically a challenge for the wallet owner to prove they own the wallet by proving thier identity
export default async function generateChallenge(address:string) {
    return await fetcher<ChallengeQuery, ChallengeQueryVariables>(ChallengeDocument, {
        request:{
            address,
        }
    })();
}