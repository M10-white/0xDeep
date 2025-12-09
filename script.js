const appWindows = ['finder-window', 'mail-window', 'internet-window', 'terminal-window', 'mail-detail'];

// === Fonction générique pour rendre une fenêtre draggable ===
function makeDraggable(windowId, headerSelector = '.window-header') {
  const win = document.getElementById(windowId);
  const header = win.querySelector(headerSelector);
  let isDragging = false, offsetX = 0, offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    win.style.zIndex = Date.now(); // ramène au premier plan
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => isDragging = false);
}

// === Ouverture/Fermeture avec animation (et classe .visible pour transition CSS) ===
function openWindow(id) {
  const win = document.getElementById(id);
  if (!win.classList.contains("visible")) {
    win.classList.remove("hidden");
    setTimeout(() => win.classList.add("visible"), 10);
    win.style.zIndex = Date.now();
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  win.classList.remove("visible");
  setTimeout(() => win.classList.add("hidden"), 300);
}

// === Spécial Finder (pour garder compatibilité avec menu Finder) ===
function openFinder() {
  openWindow("finder-window");
}

function closeFinder() {
  closeWindow("finder-window");
}

// === Initialisation ===
document.addEventListener("DOMContentLoaded", () => {
  const appWindows = ['finder-window', 'mail-window', 'internet-window', 'terminal-window'];
  appWindows.forEach(id => makeDraggable(id, id === 'finder-window' ? '.finder-header' : '.window-header'));

  // Dock bindings
  document.querySelector('.dock-icon[title="Finder"]').addEventListener('click', () => openWindow('finder-window'));
  document.querySelector('.dock-icon[title="Mail"]').addEventListener('click', () => openWindow('mail-window'));
  document.querySelector('.dock-icon[title="Internet"]').addEventListener('click', () => openWindow('internet-window'));
  document.querySelector('.dock-icon[title="Terminal"]').addEventListener('click', () => openWindow('terminal-window'));
});

const mails = [
  {
    subject: "Besoin de ton aide",
    body: "Hey, j’ai laissé quelque chose dans ce dossier étrange... tu peux vérifier ?"
  },
  {
    subject: "Tu te souviens de moi ?",
    body: "C’est toi qui a ce PC maintenant ? Étrange, je n’ai jamais eu le temps de finir ce que j’avais commencé..."
  }
];

function showMail(index) {
  const mail = mails[index];
  document.getElementById("mail-detail-subject").textContent = mail.subject;
  document.getElementById("mail-detail-body").textContent = mail.body;
  openWindow("mail-detail");
}
