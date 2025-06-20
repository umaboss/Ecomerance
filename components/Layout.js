import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'E-commerce Store' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Your one-stop shop for everything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;