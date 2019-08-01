<<<<<<< HEAD
module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'https://www.yixi.tv'
            }
           
=======
module.exports = {
    devServer : {
        proxy : {
            '/api': {
                target: 'https://www.yixi.tv',
                // changeOrigin: false,
              },
>>>>>>> 1b68f24ff34e55479dcaa80a7f43b038f1d15760
        }
    }
}