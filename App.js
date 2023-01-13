import React from 'react'
import AuthProvider from './Authentication/AuthProvider'
import Welcome from './Welcome'

const App = () => {
  return (
    <AuthProvider>
      <Welcome />
    </AuthProvider>
  );
}

export default App