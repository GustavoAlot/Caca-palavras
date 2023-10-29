// Este código precisa ser executado em um ambiente de navegador

document.getElementById('fileInput').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function () {
        const lines = this.result.split('\n');
        createWordSearch(lines);
    };
    reader.readAsText(event.target.files[0]);
}, false);


document.addEventListener('DOMContentLoaded', function() {
    // Evento para marcar ou desmarcar uma letra
    document.getElementById('board').addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'SPAN') {
            e.target.classList.toggle('selected');
        }
    });
});


