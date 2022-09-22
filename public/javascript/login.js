const post_id = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event){
    event.preventDefault();

    const Username = document.querySelector('#username-input-login');
    const Password = document.querySelector('#password-input-login');

    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username: Username.value,
          password: Password.value,
        }),
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert("Failed to login");
      }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
