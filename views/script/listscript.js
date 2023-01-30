document.querySelectorAll('article section').forEach((el,i)=>{
    el.style.animation = `zoom-in-up 400ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${i*50}ms both`
})

document.querySelectorAll('img[data-cl=expand').forEach(el=>{
    el.addEventListener('click', async(e)=>{
        
        let modal = document.createElement('div')
        modal.classList.add('modal')
        
        let bg = document.createElement('div')
        bg.classList.add('bg')
        modal.innerHTML=`
        <div class="atas">
            <b data-placeholder = 'Memuat'></b>
            <img src="img/minimize.svg" data-cl='minim' alt="">
        </div>
        <div class="bawah">
            <p data-placeholder = 'Memuat'></p>
        </div>
        `
            
        document.querySelector('body').appendChild(modal)
        document.querySelector('body').appendChild(bg)
        
        document.querySelectorAll('nav,main').forEach(el=>{el.style.filter = 'blur(2px)' })   
        
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        
        let response = await fetch('/message', {
            method: 'POST',headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id':id}) 
        }).then(res=>res.json()).then(res=>res[0])
        
        modal.querySelector('b').innerText = (response.title!='')? response.title : "  ";
        modal.querySelector('p').innerText = response.message
        
        if(screen.width > 655){
            if(modal.querySelector('p').scrollHeight > 150 ){
                if(modal.querySelector('p').scrollHeight > 0.7*screen.height){
                    modal.style.height = '70%'
                    // modal.style.height = 'max-content'
                    console.log(document.querySelector('body').offsetHeight*0.90)
                }else{
                    modal.style.height = modal.querySelector('p').scrollHeight+50 +'px'
                    // console.log('llllll')
                }
            }

        }
       
        document.querySelector('img[data-cl=minim]').addEventListener('click', (screen.width > 655)? close : closebottom )
        bg.addEventListener('click', (screen.width > 655)? close : closebottom)

        function close(){
            modal.animate([
                {},
                {   opacity: 0,
                    transform: 'translateY(-150%) scale(0.85)' 
                }
                ], {
                    easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                duration: 300,
                iterations: 1
              })

            setTimeout(()=>{
                document.querySelectorAll('nav,main').forEach(el=>{el.style.filter = 'none' }) 
                bg.remove()
                modal.remove()
            },300)
        }

        function closebottom(){
            modal.animate([
                {},
                { transform: 'translateY(100%)'}
                ], {
                    easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                duration: 300,
                iterations: 1
              })

            setTimeout(()=>{
                document.querySelectorAll('nav,main').forEach(el=>{el.style.filter = 'none' }) 
                bg.remove()
                modal.remove()
            },300)
        }

    })
})