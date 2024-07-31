import React from 'react';
import Header from './header';
import Footer from './footer';
import Backtotop from './backToTop';


const Layout = ({ isLoggedIn, UserName, UserId ,onLogin, onLogout, children }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} UserName={UserName} UserId={UserId} onLogin={onLogin} onLogout={onLogout}/>
            <main style={{backgroundColor:'white'}}>{children}</main>
            <Backtotop />
            <Footer />
        </>
    );
};

export default Layout;
