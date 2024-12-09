import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useNavigate, useLocation } from "react-router-dom";
import FollowedPage from "../pages/FollowedPage";
import DiscoverPage from "../pages/DiscoverPage";

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active tab based on the URL
  const activeTab = location.pathname === "/following" ? 1 : 0;

  const handleTabChange = (index: number) => {
    if (index === 0) {
      navigate("/discover");
    } else if (index === 1) {
      navigate("/following");
    }
  };

  return (
    <TabGroup selectedIndex={activeTab} onChange={handleTabChange}>
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
