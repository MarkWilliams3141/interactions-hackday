import axios from 'axios'
const OC_URL = 'https://validation-dslices.pharmpress.net/v1.0/'

export default {
  autoComplete (term) {
    return axios.get(`${OC_URL}/martindale/adr/autocomplete?term=${term}&termType=drugs`).then(response => { return response })
  },
  adverseReactions (drugs) {
    return axios.get(`${OC_URL}/martindale/adr?drugNames=${drugs}`).then(response => { return response })
  }
}
