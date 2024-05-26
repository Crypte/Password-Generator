import { Faq } from "@/components/Faq";
import { H1 } from "@/components/H1";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { List } from "@/components/List";
import { P } from "@/components/P";
import { Table } from "@/components/Table";

export default function Home() {
  const exampleData = [
    ["Generator", "hash algorithm", "Response encoding", "Method"],
    ["Password", "SHA-512", "Base64", "First 20 caracters"],
    ["Pin", "SHA-512", "Hex", "First X numbers"],
  ];
  const security = [
    "Generator",
    "hash algorithm",
    "Response encoding",
    "Method",
  ];

  const privacy = [
    "The app run locally on your browser",
    "No data are stored and send",
  ];
  return (
    <div className="md:max-w-3xl container mt-24">
      <H1>WIP</H1>
      <H2>Introduction</H2>
      <P>
        This tool is designed to give you a simple, practical and easily
        reusable alternative for managing your passwords. You only need to
        remember one password (your secret) to generate others on demand when
        you need them.
      </P>
      <H2>Security</H2>
      <P>
        The generation mainly use SHA512, an hash algorithm that allow us to
        generate for a same entry always the same exit.
      </P>
      <List data={security} />
      <Table data={exampleData} />
      <H2>Privacy</H2>
      <P>
        The app run locally on your browser, no data are stored and send. You
        can check the source code on Github
      </P>
      <List data={privacy} />
      <H3>Step 1</H3>
      <H2>Faq</H2>
      <Faq />
    </div>
  );
}
