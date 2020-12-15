import useFetch from './useFetch'

export const useExperienceList = () => useFetch('http://localhost:8080/experience')
export const useExperienceById = (id) => useFetch('http://localhost:8080/experience/' + id)

export const login = async (username, password) => {
  const ret = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await ret.json()
  return data
}

export const register = async (username, password, email) => {
  const ret = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
  const data = await ret.json()
  return data
}

export const createCommentary = async (token, id, newCommentary) => {
  const ret = await fetch('http://localhost:8080/commentary', {
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
  const ret = await fetch('http://localhost:8080/experience' , {
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