const header = document.getElementById('header');

function updateHeaderBase(isIndex) {
  if (!isIndex || window.scrollY > 0) {
    header.classList.add('default');
  } else {
    header.classList.remove('default');
  }
}

window.addEventListener('scroll', updateHeaderBase);