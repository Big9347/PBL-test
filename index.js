// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1656617239-Xj3abgJz' });

  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }
  if (!liff.isInClient()) {
    if (!liff.isLoggedIn()) {
      btnLogIn.style.display = 'block';
      pictureUrl.style.display = 'none';
      userId.style.display = 'none';
      displayName.style.display = 'none';
      statusMessage.style.display = 'none';
      code.style.display = 'none';
    } else {
      btnLogOut.style.display = 'block';
    }
  }

  getUserProfile();
  if (liff.getContext().type !== 'none' && liff.isLoggedIn()) {
    btnScanCode.style.display = 'block';
  }
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
}

async function scanCodeV2() {
  liff
    .scanCodeV2()
    .then((result) => {
      // e.g. result = { value: 'Hello LIFF app!' }
      code.innerHTML = '<b>Code: </b>' + result.value;
    })
    .catch((err) => {
      console.log(err);
    });
}
btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

btnScanCode.onclick = () => {
  scanCodeV2();
};
