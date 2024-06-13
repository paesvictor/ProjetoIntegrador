var menuItem = document.querySelectorAll ('.item-menu')

function selectlink (){
    menuItem.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')

}

menuItem.forEach((item)=>
    item.addEventListener('click', selectlink)
)

// para expandir o menu

var btnExpandir = document.querySelector ('#btn-expandir')
var menuSide = document.querySelector ('.menu-lateral')

btnExpandir.addEventListener ('click', function(){
    menuSide.classList.toggle ('expandir')
})