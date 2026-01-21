const header = document.getElementById('header');

const isIndex =
  location.pathname === '/' ||
  location.pathname.endsWith('/index.html');

function updateHeaderBase() {
  if (!isIndex || window.scrollY > 0) {
    header.classList.add('default');
  } else {
    header.classList.remove('default');
  }
}

updateHeaderBase();

window.addEventListener('scroll', updateHeaderBase);