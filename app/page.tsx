import { Generation } from "@/components/Generation";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="flex items-center justify-center mt-20">
          <Generation />
        </div>
      </main>
    </>
  );
}
