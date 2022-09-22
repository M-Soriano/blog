const signupFormJandler =async function (event) {
    event.preventDefault();

    const Username = document.querySelector('#username-input-signup');
    const Password = document.querySelector('#password-input-signup');

    fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
            username: Username.value,
            password: Password.value
        }),
        headers:{'Content-Type': 'application/json'}
    })
    .then(function(){
        document.location.replace('/dashboard');
    })
    .catch (err => {
        console.log(err);
        alert('Failed to sign up.');
    } )

};

document.querySelector('.signup-form').addEventListener('submit', signupFormJandler);