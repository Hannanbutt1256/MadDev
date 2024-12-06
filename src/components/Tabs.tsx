import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import FollowedPage from "../pages/FollowedPage";
import DiscoverPage from "../pages/DiscoverPage";

const Tabs = () => {
  return (
    <TabGroup>
      <TabList>
        <Tab className="dark:data-[selected]:bg-dark-background dark:text-[#f9f9f9] dark:hover:text-[#6366f1] data-[selected]:bg-[#f5f5f5] hover:text-light-button data-[hover]:underline text-xl  outline-none p-2 rounded-md m-2">
          Discover
        </Tab>
        <Tab className="dark:data-[selected]:bg-dark-background dark:text-[#f9f9f9] dark:hover:text-[#6366f1] data-[selected]:bg-[#f5f5f5] hover:text-light-button data-[hover]:underline text-xl  outline-none p-2 rounded-md m-2">
          Following
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DiscoverPage />
        </TabPanel>
        <TabPanel>
          <FollowedPage />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
export default Tabs;
