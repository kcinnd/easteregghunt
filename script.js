function startHunt() {
    window.location.href = 'page1.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    var hiddenMessage = document.getElementById('hiddenMessage');
    if (hiddenMessage) { 
        hiddenMessage.onclick = function() {
            window.location.href = 'page3.html'; 
        };
    }
});
