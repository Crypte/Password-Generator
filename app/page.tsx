import { PasswordArea } from "@/components/PasswordArea";
import { PinArea } from "@/components/PinArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="container">
      <div className="flex justify-center">
        <Tabs defaultValue="password" className="lg:max-w-[600px]">
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
