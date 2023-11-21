import React from 'react'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;



