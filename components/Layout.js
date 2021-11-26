import Head from "next/head";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
      {/* berisikan komponen yang dibungkus oleh layout */}
    </>
  );
}
