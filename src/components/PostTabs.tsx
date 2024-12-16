import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PostViewer from "../pages/PostViewer";
import EditPage from "../pages/EditPage";
const PostTabs = () => {
  return (
    <TabGroup>
      <TabList className="flex border-b">
        <Tab className="p-2 outline-none text-xl rounded-md m-2 dark:data-[selected]:bg-dark-background dark:text-[#f9f9f9] dark:hover:text-[#6366f1] data-[selected]:bg-[#f5f5f5] hover:text-light-button">
          Edit
        </Tab>
        <Tab className="p-2 outline-none text-xl rounded-md m-2 dark:data-[selected]:bg-dark-background dark:text-[#f9f9f9] dark:hover:text-[#6366f1] data-[selected]:bg-[#f5f5f5] hover:text-light-button">
          Preview
        </Tab>
      </TabList>

      <TabPanels className="p-4">
        <TabPanel>
          <EditPage />
        </TabPanel>
        <TabPanel>
          <PostViewer />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default PostTabs;
