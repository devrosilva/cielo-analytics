import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalyticsCard } from "./analytics-card";
import { AnalyticsIcon } from "./icons/analytics-icon";
import { SettingsIcon } from "./icons/settings-icon";

export const SideBar = () => {
  const location = useLocation();
  return (
      <Tabs defaultValue={location.pathname.slice(1) || "analytics"} className="flex bg-sky-200 w-1/2 rounded">
        <TabsList className="flex flex-col justify-start space-y-4 h-11/12 m-4 bg-sky-500">
          <TabsTrigger className="shadow-none text-sky-50" value="analytics" asChild>
            <Link to="/analytics" replace>
              <AnalyticsIcon />
            </Link>
          </TabsTrigger>
          <TabsTrigger className="shadow-none text-sky-50" value="settings" asChild>
            <Link to="/settings" replace>
              <SettingsIcon />
            </Link>
          </TabsTrigger>
        </TabsList>
        <div className="flex h-96 m-2">
          <TabsContent value="analytics"><AnalyticsCard /></TabsContent>
          <TabsContent value="settings"></TabsContent>
        </div>
      </Tabs>
  );
}
