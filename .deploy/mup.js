module.exports = {
  servers: {
    one: {
      host: 'ec2-54-161-40-68.compute-1.amazonaws.com',
      username: 'ec2-user',
      pem: '/home/felix/Downloads/vockey.pem'
    }
  },

  app: {
    name: 'simpletask',
    path: '/home/felix/simpletasks',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'http://ec2-54-161-40-68.compute-1.amazonaws.com',
      MONGO_URL: 'mongodb+srv://flx:9926193316@meteorcluster.lb0eogr.mongodb.net/?retryWrites=true&w=majority&appName=meteorcluster',
      PORT: 80
    },

    docker: {
      image: 'zodern/meteor:root'
    },

    enableUploadProgressBar: true
  },

   // Proxy configuration (optional)
   proxy: {
     domains: 'meteorapp.weba-raab.com',
     ssl: {
       // Enable Let's Encrypt
       letsEncryptEmail: 'felixraab@gmx.at'
     }
   }
};

