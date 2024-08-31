import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

import { ChangeFontButton } from "./changefontbutton";
import { ChnageLayoutButton } from "./changelayoutbutton";
import { ChangeSkinButton } from "./changeskinbutton";

export function DesignEditor() {
  return (
    <>
      <Tabs defaultValue="스킨">
        <TabList className="my-4 px-4">
          <Tab value="스킨" className="w-28">
            스킨
          </Tab>
          <Tab value="버튼" className="w-28">
            버튼
          </Tab>
          <Tab value="폰트" className="w-28">
            폰트
          </Tab>
        </TabList>
        <TabPanel value="스킨">
          <ChangeSkinButton />
        </TabPanel>
        <TabPanel value="버튼">
          <ChnageLayoutButton />
        </TabPanel>
        <TabPanel value="폰트">
          <ChangeFontButton />
        </TabPanel>
      </Tabs>
    </>
  );
}
