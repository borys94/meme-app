import AppBar from "./AppBar";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
