import React, { useState } from "react";
import AppBar from "./AppBar";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
