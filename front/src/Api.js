import useFetch from './useFetch'

export const useExperienceList = () => useFetch('http://localhost:3000/experiences')
export const useExperienceById = (id) => useFetch('http://localhost:3000/experience/' + id)

export const login = async (username, password) => {
  const ret = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await ret.json()
  return data
}

export const register = async (username, password, email) => {
  const ret = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
  const data = await ret.json()
  return data
}

export const createCommentary = async (token, id, newCommentary) => {
  const ret = await fetch('http://localhost:3000/api/commentary', {
    method: 'Post',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCommentary)
  })
  const commentary = await ret.json()
  return commentary
}

export const createExperience = async (token, id, newExperience) => {
  const ret = await fetch('http://localhost:3000/experience/create' , {
    method: 'Post',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newExperience)
  })
  const experience = await ret.json()
  return experience
}
export const editExperience = async (token, id, newExperience) => {
  const ret = await fetch('http://localhost:3000/experience/' + id, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newExperience)
  })
  const data = await ret.json()
  return data
}