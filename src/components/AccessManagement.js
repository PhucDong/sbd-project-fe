import MainHeading from "./MainHeading";
import MainButtonGroup from "./MainButtonGroup";
import MainTable from "./MainTable";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AccessManagement() {
  const { accessManagementSubItemId } = useParams();
  const sideMenuItems = useSelector((state) => state.management.sideMenuItems);
  const singleSideMenuItem = sideMenuItems.find((sideMenuItem) =>
    window.location.pathname.includes(`/${sideMenuItem.path}`)
  );
  const subMenuItem = singleSideMenuItem.subMenuItems.find(
    (subMenuItem) =>
      subMenuItem.label === accessManagementSubItemId
  );

  return (
    <>
      <MainHeading mainHeading={subMenuItem.mainHeading} />
      <MainButtonGroup addFormHeading={subMenuItem.addFormHeading} />
      <MainTable />
    </>
  );
}

export default AccessManagement;
