document.addEventListener('DOMContentLoaded', () => {
    // Sample vets data
    const vets = [
        {
            id: 1,
            name: "Dr. Akram Hossain",
            image: "vet1.jpg",
            specialization: "Small Animals and Exotic Pets",
            clinic: "PetCare Veterinary Clinic",
            location: "Banani, Dhaka",
            phone: "+880 1712-345678",
            services: "Routine checkups, vaccinations, surgical procedures, and grooming services",
            availability: ["Mon-Fri: 9AM-5PM", "Sat: 10AM-2PM"],
            rating: 4.8,
            emergency: true
        },
        {
            id: 2,
            name: "Dr. Afsana Nahar",
            image: "vet2.jpg",
            specialization: "Veterinary Ophthalmology",
            clinic: "ClearSight Animal Clinic",
            location: "Baridhara, Dhaka",
            phone: "+880 1777-889900",
            services: "Eye exams, cataract surgery, and vision care for pets",
            availability: ["Mon-Sat: 10AM-6PM"],
            rating: 4.9,
            emergency: true
        },
        // Add more vets...
    ];

    const vetsGrid = document.querySelector('.vets-grid');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');

    // Render vets
    function renderVets(filteredVets = vets) {
        vetsGrid.innerHTML = filteredVets.map(vet => `
            <div class="vet-card">
                <img src="${vet.image}" alt="${vet.name}" class="vet-image">
                <div class="vet-info">
                    <h3 class="vet-name">${vet.name}</h3>
                    <p class="vet-specialty">${vet.specialization}</p>
                    <ul class="vet-details">
                        <li><i class="fas fa-clinic-medical"></i> ${vet.clinic}</li>
                        <li><i class="fas fa-map-marker-alt"></i> ${vet.location}</li>
                        <li><i class="fas fa-phone"></i> ${vet.phone}</li>
                        <li><i class="fas fa-clock"></i> ${vet.availability[0]}</li>
                    </ul>
                    <button class="book-btn" onclick="showBookingModal(${vet.id})">Book Appointment</button>
                </div>
            </div>
        `).join('');
    }

    // Filter vets
    function filterVets() {
        const category = document.querySelector('.pill.active').dataset.category;
        const location = document.querySelector('.location-select').value;
        const serviceType = document.querySelector('.service-select').value;

        let filtered = vets;
        
        if (category !== 'all') {
            filtered = filtered.filter(vet => 
                vet.specialization.toLowerCase().includes(category)
            );
        }

        if (location) {
            filtered = filtered.filter(vet => 
                vet.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (serviceType === 'emergency') {
            filtered = filtered.filter(vet => vet.emergency);
        }

        renderVets(filtered);
    }

    // Event listeners
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelector('.pill.active').classList.remove('active');
            pill.classList.add('active');
            filterVets();
        });
    });

    document.querySelector('.location-select').addEventListener('change', filterVets);
    document.querySelector('.service-select').addEventListener('change', filterVets);

    // Search functionality
    document.querySelector('.search-bar input').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = vets.filter(vet => 
            vet.name.toLowerCase().includes(searchTerm) ||
            vet.specialization.toLowerCase().includes(searchTerm) ||
            vet.clinic.toLowerCase().includes(searchTerm)
        );
        renderVets(filtered);
    });

    // Modal handling
    window.showBookingModal = (vetId) => {
        bookingModal.style.display = 'block';
    };

    closeModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Appointment booked successfully! We will contact you shortly.');
        bookingModal.style.display = 'none';
    });

    // Initial render
    renderVets();
}); 