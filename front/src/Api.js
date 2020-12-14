import useFetch from './useFetch'

export const useUserList = () => useFetch('http://hab.trek-quest.com/users')
export const useUserById = (id) => useFetch('http://hab.trek-quest.com/users/' + id)

export const login = async (username, password) => {
  const ret = await fetch('http://hab.trek-quest.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await ret.json()
  return data
}

export const register = async (username, password, email) => {
  const ret = await fetch('http://hab.trek-quest.com/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
  const data = await ret.json()
  return data
}

export const edit = async (token, id, newUser) => {
  const ret = await fetch('http://hab.trek-quest.com/users/' + id, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  const data = await ret.json()
  return data
}