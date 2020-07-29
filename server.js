

const Fs = require('fs')  
       const Path = require('path')  
       const Axios = require('axios')
let urls=[
    {
     name: "iFunded",
     url:"https://ifunded.de/en/",
     id:1
    },
    {
     name: "Property Partner",
     url:"www.propertypartner.co",
     id:2,

    },
    {
     name: "Property Moose",
     url:  "https://propertymoose.co.uk",
     id:3

    },
    {
     name:  "Homegrown",
     url:"www.homegrown.co.uk",
     id:4
    },
    {
     name:"Realty Mogul",
     url:"https://www.realtymogul.com",
     id:5
    }

   ]
   
   urls.map(
       (u)=>{
       
       async function downloadImage () {  
         const url = `https://api.screenshotmachine.com?key=b33fc9&url=${u.url}&dimension=1920x1080`
         const path = Path.resolve(__dirname, 'images', `${u.id}_${u.name}.png`)
         const writer = Fs.createWriteStream(path)
       
         const response = await Axios({
           url:url,
           method: 'GET',
           responseType: 'stream'
         })
       
         response.data.pipe(writer)
       
         return new Promise((resolve, reject) => {
           writer.on('finish', resolve)
           writer.on('error', reject)
         })
       }
       
       downloadImage() 
       }
   )
