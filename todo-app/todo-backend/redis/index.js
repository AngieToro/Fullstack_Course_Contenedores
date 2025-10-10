const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)   //La función getAsync toma la clave y devuelve el valor en una promesa.
  setAsync = promisify(client.set).bind(client)   //La función setAsync toma la clave y el valor, usando la clave para almacenar el valor.
} 

module.exports = {
  getAsync,
  setAsync
}