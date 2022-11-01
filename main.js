function winCombination(allBoard){
    let winComb = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    let chek = true
    for(let i = 0; i != 15; i++){
        if(allBoard[i].innerHTML == `<p>${winComb[i]}</p>`){}
        else chek = false
    }
    return chek
}


let allBoard = document.querySelectorAll('.p_block')
let btn = document.querySelector('#btn_p')
let text = document.querySelector('.text')
let step = document.querySelector('#step')
let patnashki = document.querySelector('.patnashki')



btn.onclick = () =>{    //перемешать
    text.innerHTML = ''
    let mix = []
    for(let i = 0; mix.length != 15; i++){
        let num = Math.round(Math.random() * 14 + 1)
        if(mix.includes(num) == false){
            mix.push(num)
        }
    }
    for(let i = 0; i != 15; i++){
        allBoard[i].innerHTML = `<p>${mix[i]}</p>`
    }
    allBoard[allBoard.length-1].innerHTML = ''
    allBoard[allBoard.length-1].id = 'empty'
    step.innerHTML = 0
}

window.onmousedown = (eventP) =>{
    function move(eventD){  //функция для следование <p> за курсором
        eventP.target.style.position = 'absolute'
        eventP.target.style.top = eventD.pageY - eventP.target.offsetWidth / 2 + 'px'
        eventP.target.style.left = eventD.pageX - eventP.target.offsetHeight / 2 + 'px'
    }
    let idxEmptyElem
    allBoard.forEach((elem, idx) => {if(elem.id == 'empty') idxEmptyElem = idx})
    if(eventP.target.tagName == 'P'){   //если нажато на p
        let obj = `<p>${eventP.target.innerHTML}</p>`   //записывается перетягиваемый элемент
        
        

        window.addEventListener('mousemove', move)  //элемент притягивается к курсору
        window.onmouseup = (eventU) =>{ //когда мышь отпускается
            window.removeEventListener('mousemove', move)   //элемент перестает притягиваться к курсору   
            eventU.target.style.display = 'none'

            if(allBoard[idxEmptyElem-1] == eventU.target.parentElement || allBoard[idxEmptyElem+1] == eventU.target.parentElement || allBoard[idxEmptyElem-4] == eventU.target.parentElement || allBoard[idxEmptyElem+4] == eventU.target.parentElement){
                //проверка на то чтобы можно было переставить только верхний нижний левый и правый
                if(document.elementFromPoint(eventU.pageX, eventU.pageY).innerHTML == ''){  //если перетягиваемый елемент был на пустом поле
                eventU.target.parentElement.id = 'empty'
                eventU.target.parentElement.innerHTML = ''  //а из страрого стереть
                document.elementFromPoint(eventU.pageX, eventU.pageY).id = ''
                document.elementFromPoint(eventU.pageX, eventU.pageY).innerHTML = obj //добавить его в пустое поле
                step.innerHTML++
                }else{  //иначе вернуть обратно
                    eventU.target.style.position = ''
                    eventU.target.style.top = ''
                    eventU.target.style.left = ''
                }
                }else{
                    eventU.target.style.position = ''
                    eventU.target.style.top = ''
                    eventU.target.style.left = ''
            }   
            eventU.target.style.display = 'flex'
            if(winCombination(allBoard) == true){   //проверка на правильное положение каждого элемента
                text.innerHTML = 'Win'
                step.innerHTML = 0
            }else text.innerHTML = ''
        } 
    }else{}
    
}