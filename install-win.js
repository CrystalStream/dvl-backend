const Service = require('node-windows').Service

// Create a new service object
const svc = new Service({
  name: 'Divertilandia-API',
  description: 'Divertilandia server.',
  script: require('path').join(__dirname,'bin/www')
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start()
})

svc.install()