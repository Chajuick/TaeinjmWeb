const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(sec => sec.classList.remove('is-active'));
        entry.target.classList.add('is-active');
      }
    });
  },
  {
    threshold: 0.6
  }
);

sections.forEach(section => observer.observe(section));




const items = [...document.querySelectorAll('.carousel__item')];
const total = items.length;

let position = 0;
let velocity = 0;
let isDragging = false;
let startX = 0;
let lastX = 0;
let autoPlay = true;
let resumeTimer = null;

function update() {
  items.forEach((item, i) => {
    let offset = i - position;

    // 무한 순환 보정
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);

    const x = offset * 240;
    const scale = 1 - abs * 0.2;
    const blur = abs * 2;
    const z = 10 - abs;

    item.style.opacity = 1 / abs - 0.2;
    item.style.zIndex = z;
    item.style.transform = `
      translate(-50%, -50%)
      translateX(${x}px)
    `;
  });
}

function autoMove() {
  if (autoPlay && !isDragging) {
    position += 0.003;
  }
  position = (position + total) % total;
  update();
  requestAnimationFrame(autoMove);
}

update();
requestAnimationFrame(autoMove);

const carousel = document.querySelector('.carousel');

carousel.addEventListener('mousedown', e => {
  isDragging = true;
  autoPlay = false;
  startX = lastX = e.clientX;
  velocity = 0;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const dx = e.clientX - lastX;
  lastX = e.clientX;

  position -= dx * 0.01;
  velocity = dx * 0.002;
  update();
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;

  // 관성
  position -= velocity * 20;

  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    autoPlay = true;
  }, 1500);
});


const equipmentObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.fade-slide').forEach(el => {
  equipmentObserver.observe(el);
});


/* 스크롤 등장 */
const cards = document.querySelectorAll('.quality__card');

const qualityObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, i * 120); // 순차 등장
        qualityObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

cards.forEach(card => qualityObserver.observe(card));

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(8px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
    `;
  });
});
