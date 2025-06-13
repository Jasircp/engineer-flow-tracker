
import React from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <Layout userRole="hr">
      <Dashboard />
    </Layout>
  );
};

export default Index;
