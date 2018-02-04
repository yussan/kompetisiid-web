export default {
  development: {
    front: process.env.FRONT_HOST || 'https://ki.local',
    media: process.env.MEDIA_HOST || 'https://media.ki.local',
    api: process.env.API_HOST || 'https://api.ki.local'
  },
  production: {
    // front: 'https://ki.local',
    front: 'http://kompetisi.id',
    media: 'https://media.kompetisi.id',
    api: 'http://api.kompetisi.id'
  }
}