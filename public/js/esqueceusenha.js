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
                case 'select':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'h1':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'p':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.1) + 'px';
                    break;
                case 'button':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.1) + 'px';
                    break;
                case 'details':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                default:
                    break;
            }
        } else {
            switch(tagName) {
                case 'a':
                    element.style.fontSize = '18px';
                    break;
                case 'select':
                    element.style.fontSize = '20px';
                    break;
                case 'h1':
                    element.style.fontSize = '30px';
                    break;
                case 'p':
                    element.style.fontSize = '16px';
                    break;
                case 'button':
                    element.style.fontSize = '16px';
                    break;
                case 'details':
                    element.style.fontSize = '22px';
                    break;       
                default:
                    break;
            }
        }
    });

    isIncreased = !isIncreased;
});