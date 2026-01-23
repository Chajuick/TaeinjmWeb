function fetchWithFallback(primaryUrl, fallbackUrl, targetId) {
  fetch(primaryUrl)
    .then(res => {
      if (!res.ok) throw new Error('primary failed');
      return res.text();
    })
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
    })
    .catch(() => {
      return fetch(fallbackUrl)
        .then(res => res.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
        });
    });
}

fetchWithFallback(
  '/TaeinjmWeb/components/header.html',
  '/components/header.html',
  'header'
);

fetchWithFallback(
  '/TaeinjmWeb/components/footer.html',
  '/components/footer.html',
  'footer'
);
