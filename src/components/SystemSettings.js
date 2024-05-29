import { Typography } from "@mui/material";
import MainHeading from "./MainHeading";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainButtonGroup from "./MainButtonGroup";
import MainTable from "./MainTable";

function SystemSettings() {
  const { systemSettingsSubItemId } = useParams();
  const sideMenuItems = useSelector((state) => state.management.sideMenuItems);
  const singleSideMenuItem = sideMenuItems.find((sideMenuItem) =>
    window.location.pathname.includes(`/${sideMenuItem.path}`)
  );
  const subMenuItem = singleSideMenuItem.subMenuItems.find(
    (subMenuItem) => subMenuItem.label === systemSettingsSubItemId
  );

  return (
    <>
      <MainHeading mainHeading={subMenuItem.mainHeading} />
      <MainButtonGroup addFormHeading={subMenuItem.addFormHeading} />
      <MainTable />
    </>
  );
}

export default SystemSettings;
