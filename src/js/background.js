import '../img/icon-128.png'
import '../img/icon-34.png'

async function login(email, password, spaceName) {
  try {
    const res = await fetch(
        new Request('https://api.vein.space/api/spaces/login'),
        {
            body: JSON.stringify(
                    {
                        email,
                        password,
                        spaceName
                    }
                ),
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=UTF-8'
            }
        }
    )

    const resBody = await res.json()
    if (resBody.success) {
      await new Promise(
          resolve => chrome.storage.sync.set(resBody.results, resolve)
      )
    }
    return resBody.success
  } catch (e) {
    alert(e.message)
    return false
  }
}

async function isLogin() {
    return !!await getToken()
}

async function getToken() {
    const {jwt} = await new Promise(
        resolve => chrome.storage.sync.get('jwt', resolve)
    )
    return jwt
}

async function getUser() {
    const {user} = await new Promise(
        resolve => chrome.storage.sync.get('user', resolve)
    )
    return user
}

async function getCurrentTabUrl() {
    const tabs = await new Promise(resolve =>
        chrome.tabs.query(
            {'active': true},
            resolve
        )
    );
    return tabs.length > 0 ? tabs[0].url : ''
}

async function sendToTL(url) {
    const res = await fetch(
            new Request('https://api.vein.space/api/urls/',
            {
                body: JSON.stringify(
                    {
                        urlParams: {
                            url
                        }
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': await getToken()
                }
            }
        )
    )
    return true
}

async function logout() {
    return await new Promise(resolve =>
        chrome.storage.sync.clear(resolve)
    )
}
window.login = login
window.isLogin = isLogin
window.getUser = getUser
window.sendToTL = sendToTL
window.getCurrentTabUrl = getCurrentTabUrl
window.logout = logout