function initializeRefreshTokenStrategy(shellSdk, auth) {

    shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event) => {
        displayMessage('Got token');
        setTimeout(() => fetchToken(), (event.expires_in * 1000) - 5000);
    });

    function fetchToken() {
        displayMessage('Refreshing token...')
        shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
            response_type: 'token'  // request a user token within the context
        });
    }

    console.log('the token will expire in', auth.expires_in);
    setTimeout(() => fetchToken(), (auth.expires_in * 1000) - 5000);
}

function displayMessage(message) {
    const messageContainer = document.querySelector('#messageContainer');
    messageContainer.innerText = `${messageContainer.innerText}${message}\n`;
}
