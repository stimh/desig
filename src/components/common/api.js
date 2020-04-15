const commonUrl = 'http://localhost:8080'

function parseJSON(response){
  return response.json()
}

function checkStatus(response){
  if(response.status >= 200 && response.status < 500){
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export default  function request(options = {}){
  const {data,url} = options
  options = {...options}
  options.mode = 'cors'
  delete options.url
  if(data){
    delete options.data
    options.body = JSON.stringify({
      data
    })
  }
  options.headers={
    // 'Authorization':Authorization,
    'Content-Type':'application/json'
    //'Content-Type':'application/x-www-form-urlencoded'

  }
  return fetch(commonUrl+url,options,{credentials: 'include'})
    .then(checkStatus)
    .then(parseJSON)
    .catch(err=>({err}))
}