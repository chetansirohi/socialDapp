import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "@/graphql/generated";

export default function Home() {
  const { isLoading, error, data } = useExplorePublicationsQuery({
    request: {
      sortCriteria: PublicationSortCriteria.TopMirrored,
    },
  });
  return <>Hello World</>;
}
