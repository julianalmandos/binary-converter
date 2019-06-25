export default function move(elem) {
    return new Promise((resolve,reject) => {
        var width = 1;
        var id = setInterval(frame, 3);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                resolve('finished');
            } else {
                width++; 
                elem.style.width = width + '%'; 
            }
        }
    });
  }