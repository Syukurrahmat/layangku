document.querySelector('input[type=text]').focus()

document.querySelectorAll('h1, input , p, h3 , .button').forEach((el,i)=>{
    el.style.animation = `zoom-in-up 400ms cubic-bezier(0.18, 0.89, 0.32, 1.28) ${i*50}ms both`
    // el.style.animation = 'zoom-in-up 400ms ease-in-out '+i*50+'ms both'
})