import { Generation } from "@/components/Generation";

export default function Home() {
  return (
    <>
      <main className="container">
        <div className="flex flex-col items-center justify-center mt-16">
          <Generation />
        </div>
      </main>
    </>
  );
}
