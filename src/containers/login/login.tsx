import { useLocation, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount } from "solid-js";
import { Key_Field, User_Field, User_Login, User_Top } from "../../components/Icons/Users/Icon_User";
import { datalogin } from "../../api/login/datalogin";
import './login.css';


const Login: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  onMount(() => {
    console.log('ini halaman Login');
  });

  const ActionLogin = () => {
    console.log('hallo login button clicked');
    const dataUser = { username: "erp-last", email: "erp-last@gmail.com" };
    sessionStorage.setItem('userData', JSON.stringify(dataUser));
    window.location.assign('/');
  }

  // const [username, setUsername] = createSignal("");
  // const [password, setPassword] = createSignal("");

  // onMount(() => {
  //     console.log('ini halaman Login');
  // });

  // const ActionLogin = async () => {
  //     console.log('hallo login button clicked');
  //     const dataUser = { username: username(), password: password() };
  //     try {
  //       // Kirim dataUser ke server untuk proses login
  //       const response = await fetch('http://192.168.100.210:8080/login/query/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(dataUser),
  //       });

  //       if (response.ok) {
  //         // Jika login berhasil, Anda dapat melakukan navigasi ke halaman yang sesuai.
  //         const responseData = await response.json();
  //         // responseData dapat berisi informasi tambahan yang Anda butuhkan dari server.

  //         // Contoh penggunaan responseData:
  //         console.log('Login berhasil:', responseData);

  //         // Di sini Anda bisa menentukan apa yang harus dilakukan setelah login berhasil,
  //         // seperti menavigasi ke halaman dashboard.
  //         navigate('/dashboard');
  //       } else {
  //         // Handle kesalahan jika login gagal
  //         console.error('Login gagal');
  //         // Tampilkan pesan kesalahan kepada pengguna jika perlu.
  //       }
  //     } catch (error) {
  //       // Handle kesalahan jika ada masalah koneksi atau lainnya
  //       console.error('Error selama proses login:', error);
  //       // Tampilkan pesan kesalahan kepada pengguna jika ada masalah koneksi.
  //     }
  //   };



  // onMount(async () => {
  //     const data_login = await datalogin ("data coa master");
  //     console.log("datalogin", data_login);
  //     setDataLogin(data_login);
  //   })


  // const ActionLogin = () => {
  //     console.log('hallo login button clicked');
  //     const dataUser = {username: `${username}`, password:`${password}`};
  //     sessionStorage.setItem('userData', JSON.stringify(dataUser));
  //     window.location.assign('/');
  // }

  const fetchLogin = async () => {
    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username(),
          password: password(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const ActionLogin1 = async () => {
    try {
      const data = await fetchLogin();
      // Cek apakah data login berhasil atau tidak
      if (data) {
        console.log("apa", data)
        // Login berhasil, Anda dapat menyimpan data pengguna di sessionStorage atau localStorage
        sessionStorage.setItem('userData', JSON.stringify(data));
        // Redirect ke halaman utama atau halaman lain yang sesuai
        window.location.assign('/');
      } else {
        // Handle login gagal di sini
        console.error('Login failed');
      }
    } catch (error) {
      // Handle kesalahan saat melakukan permintaan login
      console.error(error);
    }
  };


  return (
    <div id="LoginRoot" class="login-container">
      <div class="flex flex-col">
        <div class="flex flex-row gap-8 align-right mt-5 mb-15 mr-10 ml-auto">
          <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex flex-col w-64 shrink-0 rounded-[20px]">
            <div class="shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.1)]  bg-white flex flex-row justify-center pt-3 gap-3 h-10 shrink-0 items-start rounded-[20px]">
              <img
                src="https://file.rendit.io/n/Q1vGwgsXbO1TkPP5ycuD.svg"
                id="Uimcalender"
                class="w-5 shrink-0"
              />
              <div class="text-sm font-['Inter'] text-[#909090]">
                02.10.2023 - 12:00 WIB
              </div>
            </div>
          </div>
          <User_Top class="mt-2 w-5 shrink-0" />
        </div>
        <div class="login-container">
          <div class="login-card">
            <div class="inline-flex">
              <p class="p1">ERP</p>
              <p class="p2">TUS</p>
            </div>

            <User_Login class="mt-6 w-16 mb-5" />
            <div class="login-content">
              <input type="text" placeholder="Username" required
                id="username"
                value={username()}
                onInput={(e) => setUsername(e.currentTarget.value)}
              />
              <span class="icon-user"><User_Field /></span>
              <input placeholder="Password"
                id="password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
              <span class="icon-pass"><Key_Field /></span>
              <p>Forgot Password?</p>
            </div>
            <div>
              <button onclick={() => ActionLogin()}>Log in</button>
              {/* <button onclick={() => ActionLogin()}>Log in</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;