document.querySelectorAll(' article section').forEach((el,i)=>{
    el.style.animation = `zoom-in-right 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${i*50}ms both`
})

document.querySelectorAll('aside img, aside h3 , .button-soft, .button').forEach((el,i)=>{
    if(i==0) return el.style.animation = `rotate-zoom 400ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${(i+1)*50}ms both` 
    el.style.animation = `zoom-in-up 400ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${(i+1)*50}ms both`
})


