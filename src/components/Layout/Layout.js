import React from 'react';
import './Layout.css';

const Layout = ({children}) => {
    return(
        <div className="container mx-auto my-4 px-4">
            {/* Add layout elements here such as header, footer, or navigation */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;