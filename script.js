
// Slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides w3-animate-fading");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 4 seconds
}

function currentSlide(n) {
    let slides = document.getElementsByClassName("slides w3-animate-fading");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex = n;
    slides[slideIndex - 1].style.display = "block";
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
}

// Grab elements
const header = document.getElementById('header');
const sidebarIcon = document.getElementById('sidebar-icon');

// Scroll Event
window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        // Shrink header and hide nav
        header.classList.add('scrolled');
        sidebarIcon.classList.add('visible');
    } else {
        // Reset header and nav
        header.classList.remove('scrolled');
        sidebarIcon.classList.remove('visible');
    }
});

// Canvas, ung mesh na background
const canvas = document.getElementById("meshCanvas");
const ctx = canvas.getContext("2d");

// canvas sa screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ung colors and points ng canvas
const points = [];
const numPoints = 8; // Increase for smoother gradient blending
const colors = [
    "#ff6b6b", // Red
    "#feca57", // Orange
    "#48dbfb", // Light Blue
    "#1dd1a1", // Green
    "#5f27cd", // Purple
    "#ff9ff3", // Pink
    "#54a0ff", // Additional Blue
    "#ee5253"  // Bright Coral
];

// random points para sa mesh
function randomPoint() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 3, // Random speed in x
        dy: (Math.random() - 0.5) * 3, // Random speed in y
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

for (let i = 0; i < numPoints; i++) {
    points.push(randomPoint());
}

// follow mue cursor beh
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// galaw mesh
function drawMeshGradient() {
    const { width, height } = canvas;

    // canvas restart
    ctx.clearRect(0, 0, width, height);

    // follow cursor olit
    const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0.5, mouseX, mouseY, width * 3 // Larger gradient radius for smoother blending
    );

    // colors for each point
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        gradient.addColorStop(i / points.length, point.color);
    }

    // Fill the canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Update point positions
    for (const point of points) {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x <= 0 || point.x >= width) point.dx *= -1;
        if (point.y <= 0 || point.y >= height) point.dy *= -1;
    }

    requestAnimationFrame(drawMeshGradient);
}

drawMeshGradient();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


