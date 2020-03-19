//console.log('clientside javascript file is loaded....')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }
// );
// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             consile.log(data.error);
//         }else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
        
//     })
// }
// );
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

message1.textContent='';
message2.textContent='';

weatherForm.addEventListener('submit',(e)=>{
    message1.textContent='Loading...';
    message2.textContent='';

    e.preventDefault();
    //grab input
    const location = searchElement.value;
    console.log(location);

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                message1.textContent=data.error;
            }else {
                console.log(data.location);
                console.log(data.forecast);
                
                message1.textContent=data.location;
                message2.textContent=data.forecast;

            }
            
        })
    });
})
