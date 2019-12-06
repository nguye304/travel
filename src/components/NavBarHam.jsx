import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { HomePage } from '../webpages/HomePage';
import { HotSpots } from '../webpages/HotSpots';

export class NavBarHam extends React.Component {

    constructor() {
        super();
        this.state = {
            search: false,
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/HotSpots'>HotSpots</Link>
                            </li>
                        </ul>
                    </nav>



                    <Switch>
                        <Route path='/'>
                            <HomePage></HomePage>
                        </Route>
                        
                        <Route path='/HotSpots'>
                            <HotSpots></HotSpots>
                        </Route>

                    </Switch>
                </div>

            </Router >
        );
    }

}