document.addEventListener('DOMContentLoaded', () => {
    const petsGrid = document.querySelector('.pets-grid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const modal = document.getElementById('petModal');

    // Extended Pet database
    const pets = {
        cat: [
            {
                id: 1,
                name: 'Samantha',
                location: 'Dhaka',
                image: 'cat1.jpg',
                gender: 'female',
                age: '2 years',
                breed: 'Maine Coon',
                description: 'Friendly and playful Maine Coon looking for a loving home.'
            },
            {
                id: 2,
                name: 'Taffy',
                location: 'Badda',
                image: 'cat2.jpg',
                gender: 'male',
                age: '1 year',
                breed: 'Persian',
                description: 'Sweet and gentle Persian cat who loves attention.'
            },
            {
                id: 3,
                name: 'Candy',
                location: 'Adabor',
                image: 'cat3.jpg',
                gender: 'female',
                age: '3 years',
                breed: 'Persian',
                description: 'Beautiful white Persian cat, very affectionate.'
            },
            {
                id: 4,
                name: 'Luna',
                location: 'Mirpur',
                image: 'cat4.jpg',
                gender: 'female',
                age: '1.5 years',
                breed: 'Bengal',
                description: 'Energetic Bengal cat with stunning spotted coat.'
            }
        ],
        dog: [
            {
                id: 5,
                name: 'Max',
                location: 'Gulshan',
                image: 'dog1.jpg',
                gender: 'male',
                age: '3 years',
                breed: 'German Shepherd',
                description: 'Loyal and intelligent German Shepherd, great with families.'
            },
            {
                id: 6,
                name: 'Bella',
                location: 'Dhanmondi',
                image: 'dog2.jpg',
                gender: 'female',
                age: '2 years',
                breed: 'Labrador',
                description: 'Friendly Labrador who loves to play fetch.'
            },
            {
                id: 7,
                name: 'Rocky',
                location: 'Uttara',
                image: 'dog3.jpg',
                gender: 'male',
                age: '4 years',
                breed: 'Golden Retriever',
                description: 'Gentle Golden Retriever, perfect family companion.'
            }
        ],
        bird: [
            {
                id: 8,
                name: 'Rio',
                location: 'Banani',
                image: 'bird1.jpg',
                gender: 'male',
                age: '1 year',
                breed: 'Budgie',
                description: 'Colorful and chatty budgie, loves to sing.'
            },
            {
                id: 9,
                name: 'Coco',
                location: 'Mohakhali',
                image: 'bird2.jpg',
                gender: 'female',
                age: '2 years',
                breed: 'Cockatiel',
                description: 'Sweet Cockatiel who enjoys head scratches.'
            },
            {
                id: 10,
                name: 'Mango',
                location: 'Khilgaon',
                image: 'bird3.jpg',
                gender: 'male',
                age: '6 months',
                breed: 'Lovebird',
                description: 'Young and playful lovebird seeking companion.'
            }
        ],
        turtle: [
            {
                id: 11,
                name: 'Sheldon',
                location: 'Motijheel',
                image: 'turtle1.jpg',
                gender: 'male',
                age: '5 years',
                breed: 'Red-eared Slider',
                description: 'Calm and easy-going turtle, perfect for beginners.'
            },
            {
                id: 12,
                name: 'Flash',
                location: 'Tejgaon',
                image: 'turtle2.jpg',
                gender: 'male',
                age: '3 years',
                breed: 'Eastern Box Turtle',
                description: 'Active turtle who enjoys swimming and basking.'
            },
            {
                id: 13,
                name: 'Pearl',
                location: 'Rampura',
                image: 'turtle3.jpg',
                gender: 'female',
                age: '4 years',
                breed: 'Yellow-bellied Slider',
                description: 'Friendly turtle who loves fresh vegetables.'
            }
        ]
    };

    // Sort functionality
    function sortPets(petsArray, sortType) {
        switch(sortType) {
            case 'name':
                return [...petsArray].sort((a, b) => a.name.localeCompare(b.name));
            case 'location':
                return [...petsArray].sort((a, b) => a.location.localeCompare(b.location));
            case 'age':
                return [...petsArray].sort((a, b) => {
                    const ageA = parseInt(a.age);
                    const ageB = parseInt(b.age);
                    return ageB - ageA;
                });
            default:
                return petsArray;
        }
    }

    // Get current category
    function getCurrentCategory() {
        const activeCategory = document.querySelector('.category-list li.active');
        return activeCategory ? activeCategory.dataset.category : 'cat';
    }

    // Update renderPets function to fix pet card click handling
    function renderPets(category, petsList = null) {
        petsGrid.innerHTML = '';
        let petsToRender = petsList || pets[category];
        
        // Apply sorting if selected
        const sortType = sortSelect.value;
        petsToRender = sortPets(petsToRender, sortType);
        
        petsToRender.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <div class="pet-info">
                    <h3 class="pet-name">${pet.name}</h3>
                    <div class="pet-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${pet.location}</span>
                    </div>
                    <div class="pet-age">${pet.age}</div>
                    <div class="pet-gender">
                        <i class="fas fa-${pet.gender === 'male' ? 'mars' : 'venus'}"></i>
                    </div>
                </div>
            `;
            
            // Add click event listener to each pet card
            petCard.addEventListener('click', () => {
                window.location.href = `pet-profile.html?id=${pet.id}&category=${category}`;
            });
            
            petsGrid.appendChild(petCard);
        });
    }

    // Close modal
    document.querySelector('.close-modal').onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Start adoption process
    window.startAdoption = function(petId) {
        alert('Thank you for your interest! Our team will contact you soon about the adoption process.');
        modal.style.display = 'none';
    };

    // Category click handlers
    document.querySelectorAll('.category-list li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-list li').forEach(cat => 
                cat.classList.remove('active')
            );
            item.classList.add('active');
            const category = item.dataset.category;
            renderPets(category);
        });
    });

    // Sort event listener
    sortSelect.addEventListener('change', () => {
        const currentCategory = getCurrentCategory();
        renderPets(currentCategory);
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const currentCategory = getCurrentCategory();
        const filteredPets = pets[currentCategory].filter(pet => 
            pet.name.toLowerCase().includes(searchTerm) ||
            pet.location.toLowerCase().includes(searchTerm) ||
            pet.breed.toLowerCase().includes(searchTerm)
        );
        renderPets(currentCategory, filteredPets);
    });

    // Initial render
    renderPets('cat');
}); 