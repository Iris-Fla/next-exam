'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';


function App() {
  return (
    <>
      <h1>Hello, Amplify 👋</h1>

      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel='protected'
        maxFileCount={1}
      />
    </>
  );
}

export default withAuthenticator(App);