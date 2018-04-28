// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Signup,
} from './';

export default {
  path: 'user',
  name: 'User',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'signup', name: 'Signup', component: Signup },
  ],
};
