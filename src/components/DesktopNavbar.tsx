import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const DesktopNavbar = async () => {
  const user = await currentUser();
  console.log("user is here: ", user);

  return <div>DesktopNavbar</div>;
};

export default DesktopNavbar;
