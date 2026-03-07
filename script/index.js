document.getElementById('btn-signIn').addEventListener('click', function () {
    const userName = document.getElementById('userName-val').value;
    const userPass = document.getElementById('userName-pass').value;

    if (userName === 'admin' && userPass === 'admin123') {
        alert('Sign in Successful');
        window.location.assign('/home.html');
    }
    else {
        alert('Sign in Failed');
        return;
    }

})