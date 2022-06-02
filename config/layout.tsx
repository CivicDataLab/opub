import { Navbar } from 'components/common';
import { Footer } from 'components/common';
import { navList } from 'data/navdata/navlist';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar data={navList} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
