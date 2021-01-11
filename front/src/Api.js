import useFetch from './useFetch'

/* export const useExperienceList = async (nombre, tipo,descripcion) => {
   const ret = await fetch('http://localhost:3000/api/experiences', {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ nombre,tipo, descripcion })
  })
  const data = await ret.json()
   return data
 } */

export const useExperienceList = () => useFetch('http://localhost:3000/api/experiences')

//export const useExperienceById = (id) => useFetch('http://localhost:3000/api/experiences/' + id)
//export const useUserList = (id) => useFetch('http://localhost/api/users/' + id)
export const useUserById = (id) => useFetch('http://localhost/api/users/' + id)


export const login = async (email, password) => {
  const ret = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
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