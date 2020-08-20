const selectSingles = document.querySelectorAll('.__select');

for(let i = 0; i < selectSingles.length; i++){
    let single_title = selectSingles[i].querySelector('.__select__title');
    single_title.addEventListener('click', function(e){
        if ('active' === selectSingles[i].getAttribute('data-state')) {
            selectSingles[i].setAttribute('data-state', '');
            let rect = selectSingles[i].getBoundingClientRect();
            console.log(e);
        } else {
            selectSingles[i].setAttribute('data-state', 'active');
            let rect = selectSingles[i].getBoundingClientRect();
            let d = document.documentElement
            console.log(d.clientHeight - rect.bottom);
            let t = e.target.closest('.__select');
            let l = t.querySelector('.__select__content');
            console.log(l.offsetHeight);
        }
    })

    let single_labels = selectSingles[i].querySelectorAll('.__select__label');
    let select_single_title = selectSingles[i].querySelector('.__select__title');
    for (let j = 0; j < single_labels.length; j++) {
        single_labels[j].addEventListener('click', function(evt)  {
            select_single_title.textContent = evt.target.textContent;
            selectSingles[i].setAttribute('data-state', '');
        });
    }
}
document.addEventListener('click', function(event) {
    let target = event.target;
    let is_select = target.closest('.__select');
    if(!is_select){
        for(let selectSingle of selectSingles){
            selectSingle.setAttribute('data-state', '');
        }
    }else{
        for(let selectSingle of selectSingles){
            if(selectSingle !== is_select){
                selectSingle.setAttribute('data-state', '');
            }
        }
    }
});


