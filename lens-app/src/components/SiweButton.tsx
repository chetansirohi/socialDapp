import useLensUser from "@/lib/auth/useLensUser";
import useLogin from "@/lib/auth/useLogin";
import {
  ChainId,
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import React from "react";

type Props = {};

export default function SiweButton({}: Props) {
  //Detect the connected address
  const address = useAddress();
  //Detect if the user is on the wrong network
  const isOnWrongNetwork = useNetworkMismatch();
  //Function to switch the network
  const [, switchNetwork] = useNetwork();

  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  //   Connect wallet
  if (!address) {
    return <ConnectWallet />;
  }

  //   Wrong Network, Switch to Mumbai Testnet
  if (isOnWrongNetwork) {
    <button onClick={() => switchNetwork?.(ChainId.Mumbai)}>
      Switch Network
    </button>;
  }

  //   Sign in with Lens

  // Loading signed state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, we need to request a login
  if (!isSignedInQuery.data) {
    return <button onClick={() => requestLogin()}>Sign in with Lens</button>;
  }

  // Loading profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // If loading complete and no  default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile</div>;
  }

  // If loading complete and there is a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <div>
        <MediaRenderer
          src={profileQuery.data.defaultProfile.picture.original.url || ""}
          alt={profileQuery.data.defaultProfile.name}
          style={{ width: 48, height: 48, borderRadius: "50%" }}
        />
      </div>
    );
  }
}
