import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));


const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const BirdLibrary = Loadable(lazy(() => import('../views/bird-library/BirdLibrary')))
const BirdManager = Loadable(lazy(() => import('../views/bird-manager/BirdManager')))
const PairManager = Loadable(lazy(() => import('../views/pair-manager/PairManager')))









const Router = [



  /// FULLLAYOUT ----------

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/sample-page" /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/bird-library " /> },
      { path: '/bird-library', exact: true, element: <BirdLibrary /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/bird-manager " /> },
      { path: '/bird-manager', exact: true, element: <BirdManager /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/pair-manager " /> },
      { path: '/pair-manager', exact: true, element: <PairManager /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },



  /// BLACKOUT ------------

  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];



export default Router;
