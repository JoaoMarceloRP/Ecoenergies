var isIncreased = false; 

document.getElementById('aumentar-fonte-btn').addEventListener('click', function() {
    var elementsToIncrease = document.querySelectorAll('.aumentar-fonteA');

    elementsToIncrease.forEach(function(element) {
        var computedStyles = window.getComputedStyle(element);
        var tagName = element.tagName.toLowerCase();

        if (!isIncreased) {
            switch(tagName) {
                case 'a':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'button':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.3) + 'px';
                    break;
                case 'li':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                default:
                    break;
            }
        } else {
            switch(tagName) {
                case 'a':
                    element.style.fontSize = '22px';
                    break;
                case 'button':
                    element.style.fontSize = '20px';
                    break;
                case 'li':
                    element.style.fontSize = '22px';
                    break;     
                default:
                    break;
            }
        }
    });

    isIncreased = !isIncreased;
});
