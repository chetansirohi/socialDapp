import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "@/graphql/generated";
import { ConnectWallet, useAddress, useLogin } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  const { mutate: requestLogin } = useLogin();

  if (!address) {
    return <ConnectWallet />;
  }
  return <button onClick={() => requestLogin}>Login</button>;
}
