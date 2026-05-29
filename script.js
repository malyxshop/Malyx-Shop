document.addEventListener('DOMContentLoaded', () => {
    // 1. දත්ත ලැයිස්තුව (සියල්ල මෙහි අඩංගු කරන්න)
    const items = [
        { code: "M-001", title: "Rose Bouquet", category: "p1", img: "https://i.postimg.cc/W3nGB36V/Whats-App-Image-2026-05-28-at-6-34-31-PM.jpg", price: "Rs. 2100", note: "" },
                            
    ];

    const grid = document.getElementById('grid');
    const paginationDiv = document.getElementById('pagination');
    let currentPage = 1;
    const itemsPerPage = 16;

    // 2. ප්‍රධාන Render Function එක
    window.renderItems = function(filter = 'all', page = 1) {
        grid.innerHTML = "";
        let filtered = filter === 'all' ? items : items.filter(item => item.category === filter);
        
        let startIndex = (page - 1) * itemsPerPage;
        let paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);
        
        paginatedItems.forEach(item => {
            const card = document.createElement('div');
            card.className = "showcase-card";
            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}" onclick="openLightbox('${item.img}')" style="width:100%; height:200px; object-fit:cover; cursor:pointer;">
        <div style="padding: 10px;">
            <h3>${item.title}</h3>
            <p style="color: #ff4d4d; font-weight:bold;">${item.price}</p>
            <p style="color: #666; font-size: 0.8rem;">Code: ${item.code}</p>
            <a href="https://wa.me/94763810658?text=Hi, I want to buy:%0AProduct Code: ${item.code}%0AProduct Name: ${item.title}" 
               target="_blank" 
               style="display:block; padding:8px; background:#25d366; color:white; text-align:center; border-radius:5px; text-decoration:none;">
               Buy Now
            </a>
        </div>
            `;
            grid.appendChild(card);
        });
        renderPagination(filtered.length, filter);
    }

    // 3. Pagination Function එක
    function renderPagination(totalItems, filter) {
        if(paginationDiv) {
            paginationDiv.innerHTML = "";
            let totalPages = Math.ceil(totalItems / itemsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                let btn = document.createElement('button');
                btn.innerText = i;
                btn.onclick = () => renderItems(filter, i);
                paginationDiv.appendChild(btn);
            }
        }
    }

    // 4. ෆිල්ටර් බොත්තම්
    document.querySelectorAll('.showcase-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.showcase-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderItems(btn.getAttribute('data-filter'), 1);
        });
    });

    renderItems(); // මුලින්ම පින්තූර පෙන්වන්න
});

// Lightbox සහ අනෙකුත් functions
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
    }
}

function showAll() {
    document.querySelectorAll('.hidden-filter').forEach(btn => btn.style.display = 'inline-block');
    document.getElementById('showMoreBtn').style.display = 'none';
    document.getElementById('showLessBtn').style.display = 'inline-block';
}

function showLess() {
    document.querySelectorAll('.hidden-filter').forEach(btn => btn.style.display = 'none');
    document.getElementById('showLessBtn').style.display = 'none';
    document.getElementById('showMoreBtn').style.display = 'inline-block';
}    
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show'); // 'show' පන්තිය එක් කිරීම හෝ ඉවත් කිරීම
}
// Search Bar එක පෙන්වීමට/සැඟවීමට
function toggleSearch() {
    document.getElementById('searchInput').classList.toggle('active');
}

// නිෂ්පාදන පෙරීමට (Filter)
function filterProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('showcase-card'); // ඔබේ card එකේ class නම මෙහි දමන්න

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// සෑම තත්පර 3කට වරක්ම මාරු වේ
setInterval(nextSlide, 3000);