import { Faq } from "@/components/Faq";
import { H1 } from "@/components/H1";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { InlineCode } from "@/components/Inlinecode";
import { List } from "@/components/List";
import { P } from "@/components/P";
import { Table } from "@/components/Table";

export default function Home() {
  const security = [
    "Generator",
    "hash algorithm",
    "Response encoding",
    "Method",
  ];

  return (
    <div className="md:max-w-3xl container mt-24">
      <H1>Hello Users,</H1>
      <H2>Introduction</H2>
      <P>
        This tool is designed to give you a simple, practical and easily
        reusable alternative for managing your passwords. You only need to
        remember one password (your secret) to generate others on demand when
        you need them.
      </P>
      <H2>How it's work? </H2>
      <H3>Entry required</H3>
      <List
        data={["Type", "Count (by default 1)", "Name", "Domain", "Secret"]}
      />
      <H2>Security</H2>
      <P>
        The generation mainly use PBKDF2, an derivative algorithm that allow us
        to generate for a same entry always the same exit.
      </P>

      <InlineCode>hello</InlineCode>

      <Table
        data={[
          ["Generator", "algorithm", "Response encoding", "Method"],
          ["Password", "PBKDF2", "Base64", "First 20 caracters"],
          ["Pin 4", "PBKDF2", "Hex", "First 4 numbers"],
          ["Pin 6", "PBKDF2", "Hex", "First 6 numbers"],
          ["Pin 8", "PBKDF2", "Hex", "First 8 numbers"],
        ]}
      />
      <H2>Privacy</H2>
      <P>
        The app run locally on your browser, no data are stored and send. You
        can check the source code on Github. You can also clone the project and
        run it locally on your machine.
      </P>
      <H3>Clone the repository</H3>
      <InlineCode>
        git clone https://github.com/Crypte/Password-Generator.git{" "}
      </InlineCode>
      <List
        data={[
          "The app run locally on your browser",
          "No data are stored or send",
        ]}
      />

      <H2>Faq</H2>
      <Faq />
    </div>
  );
}
