import app from './app'




function main(){
    app.listen(5555 , () => {
        console.log('Server montado en el puerto ' + 5555)
    })
}




main();