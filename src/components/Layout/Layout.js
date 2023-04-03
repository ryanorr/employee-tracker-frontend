import React from 'react';
import './Layout.css';

const Layout = ({children}) => {
    return(
        <div className="layout">
            {/* Add layout elements here such as header, footer, or navigation */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;