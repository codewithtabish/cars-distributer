import React, { useState, useEffect } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import Footer from "@/components/ui/custom/Footer";
import { useUser } from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

const Inbox = () => {
  const [userId, setUserId] = useState();
  const { user } = useUser();
  const [channelUrl, setchannelUrl] = useState();

  useEffect(() => {
    if (user) {
      const id = (user?.primaryEmailAddress?.emailAddress).split("@")[0];
      setUserId(id);
    }

    return () => {};
  }, [user]);

  return (
    <div>
      {/* The chat interface can expand up to the dimensions of your parent
      component. // To achieve a full-screen mode, apply the following CSS rules
      to the parent element. */}
      <div style={{ height: "500px" }} className="h-[500px]">
        <SendBirdProvider
          appId={import.meta.env.VITE_SEND_BIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          <div className="grid md:grid-cols-12 gap-4 h-[500px]">
            <div className="grid col-span-4">
              <GroupChannelList
                onChannelSelect={(chal) => setchannelUrl(chal?.url)}
                channelListQueryParams={{
                  includeEmpty: true,
                }}
              />
            </div>
            <div className="col-span-8 h-[500px]">
              <GroupChannel channelUrl={channelUrl} />
            </div>
          </div>
        </SendBirdProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Inbox;
