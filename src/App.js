import * as React from 'react';
import { LoginButton } from './Login';
import { LogoutButton } from './Logout';
import { Map } from './Map'
import { useAuth0 } from '@auth0/auth0-react';



const App =  ()=> {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
        {isAuthenticated ? (
          <>
            
            <div>
            
            <LogoutButton/>
            <Map/>
            </div>
          </>
        ) : ( 
        <LoginButton/>
          )}
    </div>
  );
}


export default App;

