import {
  ChainId,
  ConnectWallet,
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
}
