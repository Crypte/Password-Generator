import { Generation } from "@/components/Generation";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="flex justify-center mt-16">
          <Generation />
        </div>
      </main>
    </>
  );
}
