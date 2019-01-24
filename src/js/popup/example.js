const tokenIndex = 'token'

export async function login(email, password, spaceName) {
  try {
    alert(JSON.stringify(
      {
          email,
          password,
          spaceName
      }
  ))
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
    alert(JSON.stringify(resBody))
    if (resBody.success) {
      localStorage.setItem(tokenIndex, resBody.results.jwt)
    }
    return isLogin()
  } catch (e) {
    alert(e)
    return false
  }
}

export function isLogin() {
  return !!localStorage.getItem(tokenIndex)
}