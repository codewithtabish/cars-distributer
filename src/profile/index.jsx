import { Button } from "@/components/ui/button";
import Header from "@/components/ui/custom/Header";
import { PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyListing from "./components/MyListing";
import Inbox from "./components/Inbox";

const ProfilePage = () => {
  return (
    <div className="container max-w-6xl mx-auto bg-white min-h-screen">
      <Header />
      <Tabs defaultValue="my-listing" className="w-full my-8">
        <TabsList>
          <TabsTrigger value="my-listing">My Listing</TabsTrigger>
          <TabsTrigger value="Chats">Chats</TabsTrigger>
          <TabsTrigger value="profile">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="my-listing">
          <MyListing />
        </TabsContent>
        <TabsContent value="Chats">
          <Inbox />
        </TabsContent>
        <TabsContent value="profile">inbox Tab</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
