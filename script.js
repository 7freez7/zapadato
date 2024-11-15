// Scroll to top button
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    scrollToTopBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    scrollToTop(300);
});

function scrollToTop(duration) {
    const start = document.documentElement.scrollTop || document.body.scrollTop;
    const startTime = performance.now();

    function scroll() {
        const now = performance.now();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunction = time * (2 - time); // easeOutQuad easing
        document.documentElement.scrollTop = document.body.scrollTop = start * (1 - timeFunction);

        if (document.documentElement.scrollTop || document.body.scrollTop) {
            requestAnimationFrame(scroll);
        }
    }
    scroll();
}

// Toggle menu
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-active", menu.classList.contains("active"));
}

// Function to send email
function sendEmail(event) {
    event.preventDefault();

    const recipientEmail = "filipgilar07@gmail.com"; 
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=Dotaz`;

    window.open(gmailLink, '_blank');
}

// Save form data to localStorage on input
document.getElementById("email").addEventListener("input", saveFormData);
document.getElementById("message").addEventListener("input", saveFormData);

function saveFormData() {
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Save data to localStorage and log to console for debugging
    localStorage.setItem("contactEmail", email);
    localStorage.setItem("contactMessage", message);
    console.log("Form data saved:", { email, message });
}

        // Zobrazí lightbox s vybraným obrázkem
        function openLightbox(imageSrc) {
            document.getElementById('lightboxImage').src = imageSrc;
            document.getElementById('lightbox').style.display = 'flex';
        }

        // Zavře lightbox
        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        // Přidá posluchač události ke každému obrázku v .pics
        document.querySelectorAll('.pics img').forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src));
        });

// Funkce pro načítání komponent (navbar, footer)
function loadComponent(id, file) {
    console.log(`Načítám komponentu z ${file} do #${id}`);
    fetch(file)
        .then(response => {
            if (!response.ok) {
                console.error(`Chyba při načítání ${file}: HTTP status ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            console.log(`Načteno: ${file} do #${id}`);
        })
        .catch(error => console.error(`Chyba při načítání ${file}:`, error));
}

// Načítání komponent při načtení stránky
window.onload = function() {
    loadComponent('navbar', 'components\navbar.html'); // Cesta ke složce components pro navbar
    loadComponent('footer', 'components/footer.html'); // Cesta ke složce components pro footer
};

fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Chyba při načítání navbaru:', error));


