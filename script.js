// =========================================
// INISIALISASI ICON
// =========================================
lucide.createIcons();

// =========================================
// LOGIKA MOBILE MENU
// =========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon) menuIcon.classList.toggle('hidden');
        if (closeIcon) closeIcon.classList.toggle('hidden');
    });
}

// =========================================
// LOGIKA TABS PROSES KERJA
// =========================================
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
    // Pengamanan: Hentikan fungsi jika kontainer langkah kerja tidak ada di halaman ini
    if (!stepButtonsContainer) return;

    stepButtonsContainer.innerHTML = '<div class="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800"></div>';
    
    steps.forEach((step, idx) => {
        const isActive = activeStep === idx;
        const btnHTML = `
            <button onclick="setActiveStep(${idx})" class="w-full text-left flex items-center gap-6 p-4 rounded-2xl transition-all relative z-10 ${isActive ? 'bg-slate-800 border border-slate-700 shadow-lg' : 'hover:bg-slate-800/50 opacity-60 hover:opacity-100'}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-fuchsia-500 text-white' : 'bg-slate-700 text-slate-400'} font-bold">
                    ${idx + 1}
                </div>
                <div>
                    <h4 class="text-lg font-bold ${isActive ? 'text-fuchsia-400' : 'text-slate-300'}">${step.name}</h4>
                </div>
            </button>
        `;
        stepButtonsContainer.innerHTML += btnHTML;
    });

    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-desc');
    const stepCounter = document.getElementById('step-counter');
    const stepIcon = document.getElementById('step-icon');
    const stepBgIcon = document.getElementById('step-bg-icon');

    if(stepTitle) stepTitle.textContent = steps[activeStep].name;
    if(stepDesc) stepDesc.textContent = steps[activeStep].desc;
    if(stepCounter) stepCounter.textContent = `Fase ${activeStep + 1} dari ${steps.length}`;
    
    const iconHtml = `<i data-lucide="${steps[activeStep].icon}" class="h-8 w-8"></i>`;
    if(stepIcon) stepIcon.innerHTML = iconHtml;
    if(stepBgIcon) stepBgIcon.innerHTML = iconHtml;
    
    lucide.createIcons(); // Render ulang ikon baru
}

window.setActiveStep = function(idx) {
    activeStep = idx;
    renderSteps();
}

// Eksekusi awal saat halaman dimuat
renderSteps();

// =========================================
// EFEK SCROLL REVEAL (Animasi Masuk & Keluar)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll(`
        section h2, 
        section > div > p, 
        section .grid > div, 
        article,
        .max-w-7xl > .flex-col > .w-full,
        .reveal-manual
    `);

    elementsToAnimate.forEach((el, index) => {
        if(!el.classList.contains('reveal-up')) {
            el.classList.add('reveal-up');
        }
        
        if(el.parentElement && el.parentElement.classList.contains('grid')) {
            const delay = (index % 4) * 100;
            if(delay > 0) el.classList.add(`delay-${delay}`);
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.10
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach((el) => {
        revealObserver.observe(el);
    });
});

// =========================================
// EFEK MOUSE PARALLAX (Hanya di layar Desktop/Besar)
// =========================================
document.addEventListener("mousemove", parallax);
function parallax(e) {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.mouse-parallax').forEach(function(move){
            var moving_value = move.getAttribute("data-speed");
            var x = (e.clientX * moving_value) / 150;
            var y = (e.clientY * moving_value) / 150;
            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
}

// =========================================
// EFEK ACCORDION UNTUK FAQ
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            if(answer.style.maxHeight) {
                answer.style.maxHeight = null;
                if(icon) icon.style.transform = 'rotate(0deg)';
            } else {
                document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
                document.querySelectorAll('.faq-button i').forEach(i => i.style.transform = 'rotate(0deg)');
                
                answer.style.maxHeight = answer.scrollHeight + "px";
                if(icon) icon.style.transform = 'rotate(180deg)';
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
        e.preventDefault(); 

        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const wa = document.getElementById('clientWa').value;
        const service = document.getElementById('clientService').value;
        const message = document.getElementById('clientMessage').value;

        // Pastikan Anda mengganti URL ini dengan link gambar hosting Anda
        let bannerUrl = "https://sciedutech.id"; 
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
            case "E-Commerce / Profil Perusahaan":
                bannerUrl = "https://yourwebsite.com/assets/banner-ecommerce.jpg";
                break;
            default:
                bannerUrl = "https://yourwebsite.com/assets/banner-general.jpg";
        }
        
        let waText = `Halo *Sciedutech Digital Solutions*! 👋%0A`;
        waText += `Saya tertarik untuk berkonsultasi mengenai proyek IT. Berikut detailnya:%0A%0A`;
        waText += `👤 *Informasi Klien*%0A`;
        waText += `▪️ *Nama:* ${name}%0A`;
        waText += `▪️ *Email:* ${email}%0A`;
        waText += `▪️ *No. WA:* ${wa}%0A%0A`;
        waText += `🚀 *Detail Proyek*%0A`;
        waText += `▪️ *Layanan:* ${service}%0A`;
        waText += `▪️ *Pesan:* %0A_${message}_%0A%0A`;
        waText += `💻 *Referensi Layanan:* %0A${bannerUrl}%0A%0A`;
        waText += `Mohon info lebih lanjut. Terima kasih! ✨`;

        const targetNumber = "6285748175548";
        const waLink = `https://wa.me/${targetNumber}?text=${waText}`;
        
        window.open(waLink, '_blank');
        orderForm.reset();
    });
}

// =========================================
// LOGIKA MODAL LOGIN & SIGN UP
// =========================================
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const footerLoginBtn = document.getElementById('footerLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalBg = document.getElementById('closeModalBg');

const authForm = document.getElementById('authForm');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const submitBtn = document.getElementById('submitBtn');
const nameField = document.getElementById('nameField');
const togglePrompt = document.getElementById('togglePrompt');

let isLoginMode = true; 

function openModal() {
    if(authModal) {
        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if(authModal) {
        authModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        if(authForm) authForm.reset();
    }
}

if(loginBtn) loginBtn.addEventListener('click', openModal);
if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', openModal);
if(footerLoginBtn) footerLoginBtn.addEventListener('click', openModal);
if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(closeModalBg) closeModalBg.addEventListener('click', closeModal);

if(toggleAuthMode) {
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
}

// Simulasi Database Submit (Penting: Pastikan Form Login yang dipanggil)
if(authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        
        let usersDb = JSON.parse(localStorage.getItem('sciedutechUsers')) || [];

        if (!isLoginMode) {
            // PROSES SIGN UP
            const name = document.getElementById('userName').value;
            const userExists = usersDb.find(u => u.email === email);
            
            if (userExists) {
                alert('Email sudah terdaftar! Silakan login.');
                return;
            }

            const newUser = { id: Date.now(), name, email, password };
            usersDb.push(newUser);
            localStorage.setItem('sciedutechUsers', JSON.stringify(usersDb));
            
            alert(`Pendaftaran berhasil, Halo ${name}! Mengalihkan ke dashboard...`);
            closeModal();
            // Opsional: Langsung login-kan setelah daftar
            localStorage.setItem('sciedutechActiveUser', JSON.stringify(newUser));
            window.location.href = 'dashboard-client.html';
            
        } else {
            // PROSES LOGIN
            const user = usersDb.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('sciedutechActiveUser', JSON.stringify(user));
                alert(`Selamat datang kembali, ${user.name}! Mengalihkan ke dashboard client...`);
                window.location.href = 'dashboard-client.html'; 
            } else {
                alert('Email atau Password salah!');
            }
        }
    });
}

// =========================================
// LOGIKA FILTER PORTFOLIO (HUD TERMINAL)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');

                // 1. UPDATE TAMPILAN TOMBOL (Visual Aktif/Non-Aktif)
                filterBtns.forEach(b => {
                    // Copot efek neon dari semua tombol
                    b.classList.remove('border-fuchsia-500', 'bg-fuchsia-500/10', 'text-fuchsia-400', 'shadow-[0_0_15px_rgba(217,70,239,0.3)]');
                    // Jadikan mode redup/gelap
                    b.classList.add('border-slate-700', 'bg-slate-950', 'text-slate-400');
                });

                // Berikan efek neon pada tombol yang sedang diklik
                btn.classList.remove('border-slate-700', 'bg-slate-950', 'text-slate-400');
                btn.classList.add('border-fuchsia-500', 'bg-fuchsia-500/10', 'text-fuchsia-400', 'shadow-[0_0_15px_rgba(217,70,239,0.3)]');

                // 2. PROSES PENYARINGAN KARTU (Tampil/Sembunyi)
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    // Jika tombol "all" diklik, atau kategori kartu cocok dengan tombol yang diklik
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hidden'); // Munculkan kartu
                    } else {
                        item.classList.add('hidden'); // Sembunyikan kartu
                    }
                });
            });
        });
    }
});

// =========================================
// EFEK TERMINAL DATA STREAM (LOADING TERUS MENERUS)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const dataStreamElement = document.getElementById('data-stream');
    
    if (dataStreamElement) {
        // Daftar simulasi file dan proses yang seolah-olah sedang dimuat
        const processes = [
            "sys_core/modules/pos_engine.js",
            "db_connect/firebase_auth.json",
            "render_engine/three_canvas.glsl",
            "ai_models/nlp_logic_v4.py",
            "assets/textures/cyber_grid.png",
            "payment/midtrans_gateway.ts",
            "security/bypass_firewall.sh",
            "ui_ux/glassmorphism_style.css",
            "client_data/waroeng_archive.zip"
        ];
        
        // Loop yang berjalan setiap 100 milidetik (sangat cepat!)
        setInterval(() => {
            const randomProcess = processes[Math.floor(Math.random() * processes.length)];
            // Menghasilkan kode hexadesimal acak (misal: 0x8F2A1B)
            const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
            // Menghasilkan ukuran file acak
            const randomSize = Math.floor(Math.random() * 900) + 10;
            
            // Merakit output teks bergaya terminal HUD
            dataStreamElement.innerHTML = `[ <span class="text-fuchsia-400 animate-pulse">LOADING DATABASE</span> ] <span class="text-slate-500">0x${randomHex}</span> >> ${randomProcess} <span class="text-emerald-600 opacity-70">(${randomSize}kb)</span>`;
            
        }, 120); // 120ms = layar akan berkedip/ganti data hampir 8 kali per detik
    }
});