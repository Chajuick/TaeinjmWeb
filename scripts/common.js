fetch('/TaeinjmWeb/components/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
  });

fetch('/TaeinjmWeb/components/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });