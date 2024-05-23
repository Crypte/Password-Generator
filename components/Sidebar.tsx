import { Faq } from "./Faq";
import { H2 } from "./H2";
import { H3 } from "./H3";
import { P } from "./P";

export function Sidebar() {
  return (
    <div className="space-y-4">
      <H2 className="mb-6">How it's work? </H2>
      <P>
        It's simple, the best password you have is the password you don't store.
        Our algotihrm will generate a password for you, and you can use it to
        login to your account.
      </P>
      <H3>Step 1</H3>
      <P>
        It's simple, the best password you have is the password you don't store.
        Our algotihrm will generate a password for you, and you can use it to
        login to your account.
      </P>
      <H3>Step 2</H3>
      <P>
        It's simple, the best password you have is the password you don't store.
        Our algotihrm will generate a password for you, and you can use it to
        login to your account.
      </P>
      <H3>Step 3</H3>
      <P>
        It's simple, the best password you have is the password you don't store.
        Our algotihrm will generate a password for you, and you can use it to
        login to your account.
      </P>

      <Faq />
    </div>
  );
}
