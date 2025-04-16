function adjustBottomSpacer() {
    var bar = document.getElementById('bottom-bar');
    var spacer = document.getElementById('bottom-spacer');
    var main = document.getElementById('main-content');
    if (bar && spacer && main) {
        var h = bar.offsetHeight;
        spacer.style.height = h + 'px';
        main.style.paddingBottom = h + 'px';
    }
}
window.addEventListener('DOMContentLoaded', adjustBottomSpacer);
window.addEventListener('resize', adjustBottomSpacer); 