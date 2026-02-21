// Inisialisasi Lucide Icons
lucide.createIcons();

// --- LOGIKA MOBILE MENU ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// --- LOGIKA TABS PROSES KERJA (Pengganti React activeStep) ---
const steps = [
    { name: "Konsultasi & Ideasi", icon: "lightbulb", desc: "Diskusi mendalam mengenai kebutuhan bisnis Anda, menentukan fitur utama, dan menyepakati ruang lingkup proyek." },
    { name: "Perencanaan Arsitektur", icon: "book-open", desc: "Membangun wireframe, desain database (seperti Firebase/SQL), dan merancang alur pengguna (user flow)." },
    { name: "Desain UI/UX", icon: "layout", desc: "Merancang tampilan visual yang modern dan interaktif, memastikan pengalaman pengguna yang optimal di semua perangkat." },
    { name: "Pengembangan (Coding)", icon: "workflow", desc: "Proses penulisan kode menggunakan teknologi terbaru (React, Node.js, dll) termasuk integrasi payment gateway atau AI." },
    { name: "Testing & QA", icon: "target", desc: "Pengujian fungsionalitas menyeluruh untuk memastikan tidak ada bug dan performa sistem berjalan dengan sangat cepat." },
    { name: "Deployment & Maintenance", icon: "share-2", desc: "Peluncuran proyek ke server live. Kami juga menyediakan pemeliharaan rutin agar sistem tetap aman dan relevan." }
];

let activeStep = 0;
const stepButtonsContainer = document.getElementById('step-buttons');

function renderSteps() {
    stepButtonsContainer.innerHTML = '<div class="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800"></div>';
    
    steps.forEach((step, idx) => {
        const isActive = activeStep === idx;
        const btnHTML = `
            <button onclick="setActiveStep(${idx})" class="w-full text-left flex items-center gap-6 p-4 rounded-2xl transition-all relative z-10 ${isActive ? 'bg-slate-800 border border-slate-700 shadow-lg' : 'hover:bg-slate-800/50 opacity-60 hover:opacity-100'}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700 text-slate-400'} font-bold">
                    ${idx + 1}
                </div>
                <div>
                    <h4 class="text-lg font-bold ${isActive ? 'text-cyan-400' : 'text-slate-300'}">${step.name}</h4>
                </div>
            </button>
        `;
        stepButtonsContainer.innerHTML += btnHTML;
    });

    // Update Content Panel
    document.getElementById('step-title').textContent = steps[activeStep].name;
    document.getElementById('step-desc').textContent = steps[activeStep].desc;
    document.getElementById('step-counter').textContent = `Fase ${activeStep + 1} dari ${steps.length}`;
    
    const iconHtml = `<i data-lucide="${steps[activeStep].icon}" class="h-8 w-8"></i>`;
    document.getElementById('step-icon').innerHTML = iconHtml;
    document.getElementById('step-bg-icon').innerHTML = iconHtml;
    
    lucide.createIcons(); // Re-render icons for injected HTML
}

window.setActiveStep = function(idx) {
    activeStep = idx;
    renderSteps();
}

// Inisialisasi awal langkah kerja
renderSteps();

// --- LOGIKA MODAL & SIMULASI DATABASE (Local Storage) ---
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalBg = document.getElementById('closeModalBg');

const authForm = document.getElementById('authForm');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const submitBtn = document.getElementById('submitBtn');
const nameField = document.getElementById('nameField');
const togglePrompt = document.getElementById('togglePrompt');

let isLoginMode = true; // Status form: true = Login, false = Signup

function openModal() {
    authModal.classList.remove('hidden');
    // Mencegah scroll di background
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    authModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    authForm.reset();
}

loginBtn.addEventListener('click', openModal);
mobileLoginBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
closeModalBg.addEventListener('click', closeModal);

// Mengubah mode antara Login dan Sign Up
toggleAuthMode.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        modalTitle.textContent = 'Client Login';
        modalSubtitle.textContent = 'Masuk ke dashboard untuk pantau proyek Anda.';
        submitBtn.textContent = 'Masuk';
        nameField.classList.add('hidden');
        document.getElementById('userName').removeAttribute('required');
        togglePrompt.textContent = 'Belum punya akun klien?';
        toggleAuthMode.textContent = 'Daftar Sekarang';
    } else {
        modalTitle.textContent = 'Buat Akun Klien';
        modalSubtitle.textContent = 'Daftar untuk mulai memesan layanan digital kami.';
        submitBtn.textContent = 'Daftar';
        nameField.classList.remove('hidden');
        document.getElementById('userName').setAttribute('required', 'true');
        togglePrompt.textContent = 'Sudah memiliki akun?';
        toggleAuthMode.textContent = 'Masuk di sini';
    }
});
// =========================================
// EFEK SCROLL REVEAL (ANIMASI IN / OUT BERULANG)
// =========================================

document.addEventListener("DOMContentLoaded", function() {
    // 1. Pilih elemen mana saja yang ingin dianimasikan secara otomatis
    const elementsToAnimate = document.querySelectorAll(`
        section h2, 
        section > div > p, 
        section .grid > div, 
        article,
        .max-w-7xl > .flex-col > .w-full
    `);

    // 2. Suntikkan kelas 'reveal-up' dan 'delay' agar muncul bergantian
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal-up');
        
        if(el.parentElement.classList.contains('grid')) {
            const delay = (index % 4) * 100;
            if(delay > 0) el.classList.add(`delay-${delay}`);
        }
    });

    // 3. Gunakan Intersection Observer untuk memicu animasi In dan Out
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.10 // Animasi dipicu saat 10% elemen masuk layar
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Saat elemen masuk layar (Animasi IN)
                entry.target.classList.add('is-visible');
            } else {
                // Saat elemen keluar layar (Animasi OUT)
                // Ini yang membuat animasi akan terulang saat di-scroll kembali
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Mulai mengamati semua elemen
    document.querySelectorAll('.reveal-up').forEach((el) => {
        revealObserver.observe(el);
    });
});

// =========================================
// EFEK MOUSE PARALLAX (HERO SECTION)
// =========================================
document.addEventListener("mousemove", parallax);
function parallax(e) {
    document.querySelectorAll('.mouse-parallax').forEach(function(move){
        var moving_value = move.getAttribute("data-speed");
        var x = (e.clientX * moving_value) / 150;
        var y = (e.clientY * moving_value) / 150;
        
        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}

// (TETAP BIARKAN LOGIKA MOBILE MENU, MODAL, DAN PROSES KERJA YANG ADA DI SINI SEBELUMNYA)

// =========================================
// EFEK ACCORDION UNTUK FAQ
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            // Jika diklik saat sedang terbuka -> tutup
            if(answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Tutup semua FAQ lain yang sedang terbuka (opsional, agar rapi)
                document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
                document.querySelectorAll('.faq-button i').forEach(i => i.style.transform = 'rotate(0deg)');
                
                // Buka FAQ yang diklik
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// =========================================
// LOGIKA FORMULIR ORDER KE WHATSAPP
// =========================================
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman me-refresh

        // 1. Ambil data dari form
        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const wa = document.getElementById('clientWa').value;
        const service = document.getElementById('clientService').value;
        const message = document.getElementById('clientMessage').value;

        // 2. Siapkan URL gambar banner berdasarkan layanan yang dipilih
        // GANTI URL INI DENGAN URL GAMBAR ASLI ANDA YANG SUDAH DI-HOSTING
        let bannerUrl = "";
        switch (service) {
            case "Web App & Sistem POS":
                bannerUrl = "https://yourwebsite.com/assets/banner-pos.jpg"; 
                break;
            case "Integrasi AI / Chatbot":
                bannerUrl = "https://yourwebsite.com/assets/banner-ai.jpg";
                break;
            case "Pustaka 3D WebGL":
                bannerUrl = "https://yourwebsite.com/assets/banner-3d.jpg";
                break;
            case "E-Commerce / Company Profile":
                bannerUrl = "https://yourwebsite.com/assets/banner-ecommerce.jpg";
                break;
            default:
                bannerUrl = "https://yourwebsite.com/assets/banner-general.jpg";
        }

        // 3. Rangkai pesan WhatsApp dengan format yang keren dan rapi
        // %0A adalah kode untuk Enter (Baris Baru)
        let waText = `Halo *Sciedutech Digital Solutions*! 👋%0A`;
        waText += `Saya tertarik untuk berkonsultasi mengenai proyek IT. Berikut detailnya:%0A%0A`;
        
        waText += `👤 *Informasi Klien*%0A`;
        waText += `▪️ *Nama:* ${name}%0A`;
        waText += `▪️ *Email:* ${email}%0A`;
        waText += `▪️ *No. WA:* ${wa}%0A%0A`;

        waText += `🚀 *Detail Proyek*%0A`;
        waText += `▪️ *Layanan Fokus:* ${service}%0A`;
        waText += `▪️ *Deskripsi / Kebutuhan:* %0A_${message}_%0A%0A`;

        waText += `💻 *Referensi Layanan:* %0A${bannerUrl}%0A%0A`;
        
        waText += `Mohon info lebih lanjut mengenai estimasi waktu dan biayanya. Terima kasih! ✨`;

        // 4. Nomor WhatsApp Tujuan (Gunakan format internasional tanpa tanda + atau awalan 0)
        // Nomor Anda: 085748175548 -> diubah menjadi 6285748175548
        const targetNumber = "6285748175548";

        // 5. Buat tautan akhir dan arahkan browser ke WhatsApp
        const waLink = `https://wa.me/${targetNumber}?text=${waText}`;
        
        // Buka WhatsApp di tab baru
        window.open(waLink, '_blank');
        
        // Reset form setelah terkirim
        orderForm.reset();
    });
}
// Simulasi Database Submit (Login / Register)
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    // MENGAMBIL DATABASE DARI LOCALSTORAGE
    // (Di real project, ini diganti dengan Firebase Auth / Fetch API ke backend Node.js)
    let usersDb = JSON.parse(localStorage.getItem('sciedutechUsers')) || [];

    if (!isLoginMode) {
        // --- PROSES SIGN UP ---
        const name = document.getElementById('userName').value;
        
        // Cek jika email sudah terdaftar
        const userExists = usersDb.find(u => u.email === email);
        if (userExists) {
            alert('Email sudah terdaftar! Silakan login.');
            return;
        }

        // Simpan user baru ke simulasi database
        const newUser = { id: Date.now(), name, email, password };
        usersDb.push(newUser);
        localStorage.setItem('sciedutechUsers', JSON.stringify(usersDb));
        
        alert(`Pendaftaran berhasil, Halo ${name}! Mengalihkan ke dashboard...`);
        closeModal();
        
    } else {
        // --- PROSES LOGIN ---
        const user = usersDb.find(u => u.email === email && u.password === password);

        if (user) {
            // 1. Simpan sesi aktif ke local storage
            localStorage.setItem('sciedutechActiveUser', JSON.stringify(user));
            
            // 2. Beri alert lalu alihkan ke dashboard
            alert(`Selamat datang kembali, ${user.name}! Mengalihkan ke dashboard client...`);
            window.location.href = 'dashboard-client.html'; // Pindah ke halaman dashboard
        } else {
            alert('Email atau Password salah!');
        }
    }
});