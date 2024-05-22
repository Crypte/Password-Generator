import { PasswordArea } from "@/components/PasswordArea";
import { PinArea } from "@/components/PinArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Tabs defaultValue="password" className="w-[400px]">
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
