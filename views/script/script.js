let menuButton = document.querySelector('.menu')

menuButton.addEventListener('focusin',(e)=>{
    
    if(!menuButton.contains(e.relatedTarget)){
        let divmenu = e.target.closest('.menu')

        if(divmenu.getAttribute('data-menu')==0){
            divmenu.setAttribute('data-menu',1)

            let menu = document.createElement('div')

            menu.classList.add('menubox')
            menu.innerHTML = `<a href="/">Beranda</a>
                        <a href="/send">Buat Pesan</a>
                        <a href="/about">About</a>`
            divmenu.appendChild(menu)
        }else{
            close()
        }




    }
    // menu.addEventListener('click',()=>{
    //     menuButton.blur()
    //     console.log('ppppppppppppppppppp')
    // })
})


menuButton.addEventListener('focusout',(e)=>{
    
    let divmenu = e.target.closest('.menu')
    
    if(!menuButton.contains(e.relatedTarget)){
        divmenu.setAttribute('data-menu',0)
        close()
    }else{

    }
    // if(e.relatedTarget!=null){
        // try{
        //     if(e.relatedTarget.closest('.menu')) {

        //     }
        //     // console.log('eee')

        // }catch(e){
        //     close()
        // }

    // }
    



    
})

function close(){
    console.log('blur')
    let menu = document.querySelector('.menubox')
  
    menu.animate([
        {},
        {
            opacity: '0',
            transform: 'translate(30% , -30%) scale(0.8)'
        }
        ], {
            easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
        duration: 300,
        iterations: 1
    })
    
    setTimeout(()=>{
        menu.remove()
    },299)

}






// document.querySelector('.menu').addEventListener('click',(e)=>{
//     if(divmenu.getAttribute('data-menu')=='0'){
//         divmenu.setAttribute('data-menu',1)
//         let menu = document.createElement('div')
//         menu.classList.add('menubox')
//         menu.innerHTML = `<a href="/">Beranda</a>
//                     <a href="/send">Buat Pesan</a>
//                     <a href="/about">About</a>`
//         divmenu.appendChild(menu)
//         setTimeout(()=>{
//                 document.addEventListener('click', closemenu)
//         })
//     }else{
//         closemenu() 
//     }
//     function closemenu(){
        
//         divmenu.setAttribute('data-menu',0)
//         let menu = document.querySelector('.menubox')
//         menu.animate([
//             {},
//             {
//                 opacity: '0',
//                 transform: 'translate(30% , -30%) scale(0.8)'
//             }
//             ], {
//                 easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
//             duration: 300,
//             iterations: 1
//         })
//         setTimeout(()=>{
//             menu.remove()
//             document.removeEventListener('click', closemenu)
//         },299)
//     }
// })