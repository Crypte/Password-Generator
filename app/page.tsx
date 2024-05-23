import { PasswordArea } from "@/components/PasswordArea";
import { PinArea } from "@/components/PinArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="container">
      <div className="flex justify-center max-xl:pt-4">
        <Tabs defaultValue="password" className="lg:max-w-[600px] relative">
          <div className="absolute z-[-1] w-full h-full rounded-2xl bg-gradient-to-tl from-purple-400 to-red-400 blur-3xl dark:opacity-40 opacity-60 left-1/2 transform -translate-x-1/2" />
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="pin">Pin</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <PasswordArea />
          </TabsContent>
          <TabsContent value="pin">
            <PinArea />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
