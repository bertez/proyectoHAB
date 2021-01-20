import useFetch from './useFetch'


export const useExperienceList = () => useFetch('http://localhost:3000/api/experiences')

export const useExperienceById = (id) => useFetch('http://localhost:3000/api/experiences/'+id)
export const useExperienceByUserId = () => useFetch('http://localhost:3000/api/experiencesbyuser')
export const useExperienceByLocation = (id) => useFetch('http://localhost:3000/api/experiences/bylocation/' + id)
export const useExperienceByTipo = (id) => useFetch('http://localhost:3000/api/experiences/bytipo/' + id)

export const useUserById = (id) => useFetch('http://localhost/api/users/' + id)

export const useReviewsList = () => useFetch('http://localhost:3000/api/reviews')


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

export const createReview = async (token, {experienceId, rating, text }) => {
 
  const ret = await fetch('http://localhost:3000/api/reviews/newReview/'+ experienceId, {
    method: 'Post',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({rating,text})
  })
  const review = await ret.json()
  return review
}

export const createExperience = async (token, { nombre, tipo, imagen,localizacion, descripcion }) => {

  const fd = new FormData()
  // fd.append('experienceId', experienceId);
  fd.append('nombre', nombre);
  fd.append('tipo', tipo);
  fd.append('imagen', imagen);
  fd.append('localizacion', localizacion);
  fd.append('descripcion', descripcion);

  const ret = await fetch('http://localhost:3000/api/experiences/create', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      body: fd
  })
  const data = await ret.json();
  return data;
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
/* 
export const deleteExperience = async (id) => {
  const ret = await fetch('http://localhost:3000/api/experiences/deteleExperiences', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
  })
  const data = await ret.json();
  return data;
} */