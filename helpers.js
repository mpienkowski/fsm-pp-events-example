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

function initInputValidation(pluginId) {
    const input = document.querySelector('#requiredInput');
    sendValidationEvent(false, pluginId);
    input.addEventListener('input', ({target}) => {
        sendValidationEvent(target.value.length > 0, pluginId);
    })
}

function sendValidationEvent(isValid, pluginId) {
    const eventName = isValid ? 'Valid' : 'Invalid';
    displayMessage(`Sending event "${eventName}"`);
    shellSdk.emit(
        SHELL_EVENTS.Version1.TO_APP,
        {
            pluginId,
            name: eventName,
        },
    );
}
