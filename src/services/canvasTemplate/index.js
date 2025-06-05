import http from '../api'

const SERVICE_URL = '/canvas_templates'

export async function createCanvasTemplate(payload) {
  return await http.post(SERVICE_URL, payload)
}

export async function getCanvasTemplate({ id, page = 1 } = {}) {
  return id
    ? await http.get(`${SERVICE_URL}/${id}`)
    : await http.get(`${SERVICE_URL}?page%5Bnumber%5D=${page}`)
}

export async function updateCanvasTemplate(id, payload) {
  return await http.post(`${SERVICE_URL}/${id}`, payload)
}

export async function deleteCanvasTemplate(id) {
  return await http.delete(`${SERVICE_URL}/${id}`)
}

export async function getCanvasTemplateTag() {
  return await http.get(`${SERVICE_URL}/tags/list`)
}
