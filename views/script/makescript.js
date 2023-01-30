document.getElementsByName('receiver')[0].focus()

document.querySelectorAll('input, textarea').forEach((el,i)=>{
    el.style.animation = `zoom-in-right 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${i*50}ms both`
})

