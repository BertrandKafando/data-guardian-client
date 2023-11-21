// home.js

import React from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
 import FileUploader from 'src/components/FileUploader';

const Page = () => {
  const handleFileUpload = (file) => {
    console.log(file);
    // Traitez ici le fichier uploadé (lecture, envoi au serveur, etc.)
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>chargé votre fichier</p>
      <FileUploader onFileSelect={handleFileUpload} />
    </div>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
