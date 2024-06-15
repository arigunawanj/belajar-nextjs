import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>{`Create Next App - Profile`}</title>
        <meta
          name="description"
          content={"Generated by create next app"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      Profile
      <Footer />
    </div>
  );
}