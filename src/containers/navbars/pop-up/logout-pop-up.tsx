import { onMount, type Component, onCleanup, createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './logout-pop-up.css'
import { useStore } from '../../../store';
import { dataaccountmaster } from '../../../api/master/data-account-master';

interface UserData {
  email: string
  // Add any other properties here if they exist in your object
}

const LogoutPopUp: Component = () => {
  const [{ sessionStore }] = useStore();

  //Untuk menampilkan email user
  const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
  const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object
  const userEmail = userData.email;

  onMount (() => {
    console.log('email user: ', userEmail);
  });

  //untuk logout
  const ActionLogout = () => {
    console.log('hallo logout');
    sessionStorage.clear();
    window.location.reload();
  }


  return (
    <div>
      <div class="pop-up-logout" style={{display:'flex', "flex-direction":"column", "justify-content":"space-between"}}>
          <div style={{display:'flex', "align-items":"center"}}>
          <Icon icon="clarity:user-line"  width="15" class="mr-1"/>
            {userEmail}
          </div>
          <div style={{display:'flex', "justify-content":'space-between'}}>
              <Icon icon="carbon:user-avatar-filled" color="#40444b" width="30" height="30" />
              <div class="logout-btn" onClick={ActionLogout}>
              <Icon icon="tabler:logout" color="#8b8b8b" width="17" height="17" class="logout-icon"/>Logout
              </div>
          </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
