import React, { BrowserRouter as Route } from 'react-router-dom';
import Navbar from './component/navbar';

export const Routes = () => {
    return (
                <Route path="/Navbar">
                    <Navbar />
                </Route>
    );
}