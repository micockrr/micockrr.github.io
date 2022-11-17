API_URL = 'https://api.lanyard.rest/v1';
USERID = '541284990281842710';

// thanks muffina & creper

async function fetchResponse(userId) {
    try {
        const url = await fetch(`${API_URL}/users/${userId}`);
        const response = await url.json();
        return response;
    } catch (error) {
        console.error(error);
    }

}


async function setAvatar() {
    const response = await fetchResponse(USERID);

    var avatarId = response.data.discord_user.avatar;
    var fullUrl = `https://cdn.discordapp.com/avatars/${USERID}/${avatarId}`;

    document.getElementById('pfp').src = fullUrl;
}

async function setAvatarFrame() {
    const response = await fetchResponse(USERID);
    const activity2 = document.getElementById('status2');

    if (response.data.discord_status == 'offline') {
        activity2.innerHTML = "Jestem offline";
        activity2.style.cssText = 'color: unset; opacity: 0.5;';
    } else {
        activity2.innerHTML = "Jestem online";
        activity2.style.cssText = 'color: #3ba45d; opacity: 1;';
    }
    switch (response.data.discord_status) {
        case 'online':
            document.getElementById('activity-dot').style.background =
                '#3ba45d';
            document.getElementById('activity-dot').title = "Online";
            activity2.innerHTML = "Jestem online";
            break;

        case 'dnd':
            document.getElementById('activity-dot').style.background =
                '#ed4245';
            document.getElementById('activity-dot').title = 'Do not disturb';
            break;

        case 'idle':
            document.getElementById('activity-dot').style.background =
                '#faa81a';
            document.getElementById('activity-dot').title = 'Idle';
            break;

        case 'offline':
            document.getElementById('activity-dot').style.background =
                '#747e8c';
            document.getElementById('activity-dot').title = 'Offline';
            break;
    }
}

async function setUsername() {
    const response = await fetchResponse(USERID);

    var user = response.data.discord_user.username;
    var discriminator = response.data.discord_user.discriminator;
    var fullName = `${user}#${discriminator}`;

    document.getElementById('username').innerHTML = fullName;
}

async function statusInvoke() {
    setAvatarFrame();
}

async function invoke() {
    setAvatar();
    setUsername();
    setInterval(statusInvoke, 1000);
}

invoke();