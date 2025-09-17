// PawPals Complete Full-Stack Application (Frontend with Backend Simulation)

// ==================== BACKEND SIMULATION ====================

// Database Simulation using localStorage
class Database {
    constructor() {
        this.collections = {
            users: 'pawpals_users',
            pets: 'pawpals_pets',
            adoptionRequests: 'pawpals_adoption_requests',
            contactMessages: 'pawpals_contact_messages'
        };
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem(this.collections.users)) {
            this.set('users', [
                {
                    id: 1,
                    name: "Sarah Johnson", 
                    email: "sarah@example.com",
                    password: "password123",
                    type: "individual",
                    location: "Mumbai, Maharashtra",
                    phone: "+91 98765 43210",
                    createdAt: new Date().toISOString(),
                    favorites: []
                },
                {
                    id: 2,
                    name: "Happy Paws Shelter",
                    email: "info@happypaws.org",
                    password: "shelter123", 
                    type: "organization",
                    location: "Delhi, Delhi",
                    verified: true,
                    description: "Leading animal rescue organization",
                    phone: "+91 98765 43211",
                    createdAt: new Date().toISOString(),
                    favorites: []
                }
            ]);
        }

        if (!localStorage.getItem(this.collections.pets)) {
            this.set('pets', [
                {
                    id: 1,
                    name: "Buddy",
                    type: "dog",
                    breed: "Golden Retriever", 
                    age: "2 years",
                    gender: "Male",
                    size: "Large",
                    location: "Mumbai, Maharashtra",
                    description: "Friendly and energetic Golden Retriever who loves playing fetch and going for long walks. Great with kids and other pets.",
                    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
                    status: "available",
                    shelter: "Happy Paws Shelter",
                    shelterContact: "info@happypaws.org",
                    shelterPhone: "+91 98765 43211",
                    vaccinated: true,
                    neutered: true,
                    category: "dogs",
                    featured: true,
                    adoptionFee: "₹5000",
                    createdAt: "2024-12-15T00:00:00.000Z",
                    userId: 2
                },
                {
                    id: 2,
                    name: "Whiskers",
                    type: "cat",
                    breed: "Persian",
                    age: "1 year",
                    gender: "Female", 
                    size: "Medium",
                    location: "Delhi, Delhi",
                    description: "Calm and affectionate Persian cat who loves to be petted. Perfect lap cat for cozy homes.",
                    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
                    status: "available",
                    shelter: "Animal Care Foundation",
                    shelterContact: "contact@acf.org",
                    shelterPhone: "+91 98765 43212",
                    vaccinated: true,
                    neutered: false,
                    category: "cats",
                    featured: true,
                    adoptionFee: "₹3000",
                    createdAt: "2024-12-10T00:00:00.000Z",
                    userId: 2
                },
                {
                    id: 3,
                    name: "Max", 
                    type: "dog",
                    breed: "Labrador Mix",
                    age: "3 years",
                    gender: "Male",
                    size: "Large",
                    location: "Bangalore, Karnataka",
                    description: "Max was rescued from the streets and is incredibly loyal. Needs experienced owner.",
                    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
                    status: "available", 
                    shelter: "Street Angels",
                    shelterContact: "help@streetangels.org",
                    shelterPhone: "+91 98765 43213",
                    vaccinated: true,
                    neutered: true,
                    category: "rescued",
                    featured: false,
                    adoptionFee: "₹4000",
                    createdAt: "2024-12-08T00:00:00.000Z",
                    userId: 2
                },
                {
                    id: 4,
                    name: "Luna",
                    type: "cat",
                    breed: "Siamese",
                    age: "2 years", 
                    gender: "Female",
                    size: "Small",
                    location: "Chennai, Tamil Nadu",
                    description: "Playful and intelligent, excellent with other cats. Loves interactive toys.",
                    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop",
                    status: "available",
                    shelter: "Feline Friends",
                    shelterContact: "adopt@felinefriends.org", 
                    shelterPhone: "+91 98765 43214",
                    vaccinated: true,
                    neutered: true,
                    category: "cats",
                    featured: false,
                    adoptionFee: "₹3500",
                    createdAt: "2024-12-05T00:00:00.000Z",
                    userId: 2
                },
                {
                    id: 5,
                    name: "Bunny",
                    type: "rabbit",
                    breed: "Holland Lop",
                    age: "6 months",
                    gender: "Female",
                    size: "Small",
                    location: "Pune, Maharashtra",
                    description: "Adorable and gentle Holland Lop rabbit, perfect for families with children.",
                    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop",
                    status: "available",
                    shelter: "Exotic Pet Rescue", 
                    shelterContact: "care@exoticrescue.org",
                    shelterPhone: "+91 98765 43215",
                    vaccinated: true,
                    neutered: false,
                    category: "other",
                    featured: true,
                    adoptionFee: "₹2000",
                    createdAt: "2024-12-12T00:00:00.000Z",
                    userId: 2
                }
            ]);
        }

        if (!localStorage.getItem(this.collections.adoptionRequests)) {
            this.set('adoptionRequests', []);
        }

        if (!localStorage.getItem(this.collections.contactMessages)) {
            this.set('contactMessages', []);
        }
    }

    get(collection) {
        try {
            return JSON.parse(localStorage.getItem(this.collections[collection]) || '[]');
        } catch (e) {
            console.error('Database get error:', e);
            return [];
        }
    }

    set(collection, data) {
        try {
            localStorage.setItem(this.collections[collection], JSON.stringify(data));
        } catch (e) {
            console.error('Database set error:', e);
        }
    }

    create(collection, item) {
        const items = this.get(collection);
        const newItem = {
            ...item,
            id: this.generateId(items),
            createdAt: new Date().toISOString()
        };
        items.push(newItem);
        this.set(collection, items);
        return newItem;
    }

    update(collection, id, updates) {
        const items = this.get(collection);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
            this.set(collection, items);
            return items[index];
        }
        return null;
    }

    delete(collection, id) {
        const items = this.get(collection);
        const filteredItems = items.filter(item => item.id !== id);
        this.set(collection, filteredItems);
        return filteredItems.length !== items.length;
    }

    find(collection, query = {}) {
        const items = this.get(collection);
        return items.filter(item => {
            return Object.keys(query).every(key => {
                if (typeof query[key] === 'string') {
                    return item[key]?.toLowerCase().includes(query[key].toLowerCase());
                }
                return item[key] === query[key];
            });
        });
    }

    findById(collection, id) {
        const items = this.get(collection);
        return items.find(item => item.id === id);
    }

    generateId(items) {
        return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    }
}

// API Service Class
class APIService {
    constructor() {
        this.db = new Database();
        this.currentUser = null;
        this.authToken = localStorage.getItem('pawpals_auth_token');
        
        if (this.authToken) {
            try {
                const userData = JSON.parse(atob(this.authToken));
                const user = this.db.findById('users', userData.id);
                if (user) {
                    this.currentUser = user;
                }
            } catch (e) {
                localStorage.removeItem('pawpals_auth_token');
            }
        }
    }

    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const existingUser = this.db.find('users', { email: userData.email });
                    if (existingUser.length > 0) {
                        reject(new Error('User with this email already exists'));
                        return;
                    }

                    const newUser = this.db.create('users', {
                        ...userData,
                        favorites: []
                    });

                    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
                    localStorage.setItem('pawpals_auth_token', token);
                    this.authToken = token;
                    this.currentUser = newUser;

                    resolve({ user: { ...newUser, password: undefined }, token });
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }

    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const users = this.db.find('users', { email });
                    const user = users.find(u => u.password === password);
                    
                    if (!user) {
                        reject(new Error('Invalid email or password'));
                        return;
                    }

                    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
                    localStorage.setItem('pawpals_auth_token', token);
                    this.authToken = token;
                    this.currentUser = user;

                    resolve({ user: { ...user, password: undefined }, token });
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }

    async logout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem('pawpals_auth_token');
                this.authToken = null;
                this.currentUser = null;
                resolve({ success: true });
            }, 100);
        });
    }

    async getPets(filters = {}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let pets = this.db.get('pets');
                
                if (filters.type) {
                    pets = pets.filter(pet => pet.type === filters.type);
                }
                if (filters.location) {
                    pets = pets.filter(pet => pet.location === filters.location);
                }
                if (filters.search) {
                    const searchTerm = filters.search.toLowerCase();
                    pets = pets.filter(pet => 
                        pet.name.toLowerCase().includes(searchTerm) ||
                        pet.breed.toLowerCase().includes(searchTerm) ||
                        pet.description.toLowerCase().includes(searchTerm)
                    );
                }
                if (filters.category) {
                    pets = pets.filter(pet => pet.category === filters.category);
                }
                
                resolve({ pets, total: pets.length });
            }, 300);
        });
    }

    async createPet(petData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.currentUser) {
                        reject(new Error('Authentication required'));
                        return;
                    }

                    const newPet = this.db.create('pets', {
                        ...petData,
                        userId: this.currentUser.id,
                        shelter: this.currentUser.name,
                        shelterContact: this.currentUser.email,
                        shelterPhone: this.currentUser.phone || 'Not available',
                        status: 'available'
                    });

                    resolve({ pet: newPet });
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }

    async addFavorite(petId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.currentUser) {
                        reject(new Error('Authentication required'));
                        return;
                    }

                    if (!this.currentUser.favorites.includes(petId)) {
                        this.currentUser.favorites.push(petId);
                        this.db.update('users', this.currentUser.id, { favorites: this.currentUser.favorites });
                    }

                    resolve({ success: true });
                } catch (error) {
                    reject(error);
                }
            }, 200);
        });
    }

    async removeFavorite(petId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.currentUser) {
                        reject(new Error('Authentication required'));
                        return;
                    }

                    this.currentUser.favorites = this.currentUser.favorites.filter(id => id !== petId);
                    this.db.update('users', this.currentUser.id, { favorites: this.currentUser.favorites });

                    resolve({ success: true });
                } catch (error) {
                    reject(error);
                }
            }, 200);
        });
    }

    async createAdoptionRequest(requestData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.currentUser) {
                        reject(new Error('Authentication required'));
                        return;
                    }

                    const request = this.db.create('adoptionRequests', {
                        ...requestData,
                        userId: this.currentUser.id,
                        status: 'pending'
                    });

                    resolve({ request });
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }

    async getAdoptionRequests() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!this.currentUser) {
                        reject(new Error('Authentication required'));
                        return;
                    }

                    const requests = this.db.find('adoptionRequests', { userId: this.currentUser.id });
                    resolve({ requests });
                } catch (error) {
                    reject(error);
                }
            }, 300);
        });
    }

    async submitContact(contactData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const message = this.db.create('contactMessages', contactData);
                    resolve({ message });
                } catch (error) {
                    reject(error);
                }
            }, 500);
        });
    }
}

// ==================== FRONTEND APPLICATION ====================

// Global variables
let api;
let currentSection = 'home';
let filteredPets = [];
let allPets = [];

const appData = {
    categories: [
        { id: "dogs", name: "Dogs", icon: "🐕", count: 0 },
        { id: "cats", name: "Cats", icon: "🐱", count: 0 },
        { id: "other", name: "Other Animals", icon: "🐰", count: 0 },
        { id: "rescued", name: "Rescued", icon: "❤️", count: 0 }
    ],
    locations: [
        "Mumbai, Maharashtra",
        "Delhi, Delhi",
        "Bangalore, Karnataka", 
        "Chennai, Tamil Nadu",
        "Pune, Maharashtra",
        "Hyderabad, Telangana",
        "Kolkata, West Bengal"
    ]
};

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        opacity: 1;
        transform: translateX(0);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showModal(modalName) {
    const modal = document.getElementById(modalName + 'Modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.main-content section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active-section');
        currentSection = sectionName;
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Load section-specific data
    if (sectionName === 'dashboard' && api.currentUser) {
        loadDashboard();
    } else if (sectionName === 'listings') {
        loadPets();
    }
    
    window.scrollTo(0, 0);
}

// Data Loading Functions
async function loadPets(filters = {}) {
    try {
        const response = await api.getPets(filters);
        allPets = response.pets;
        filteredPets = [...allPets];
        
        updateCategoryCounts();
        populateAllPets();
        populateFeaturedPets();
        populateCategories();
    } catch (error) {
        console.error('Error loading pets:', error);
        showNotification('Error loading pets: ' + error.message, 'error');
    }
}

function updateCategoryCounts() {
    appData.categories.forEach(category => {
        if (category.id === 'dogs') {
            category.count = allPets.filter(pet => pet.type === 'dog').length;
        } else if (category.id === 'cats') {
            category.count = allPets.filter(pet => pet.type === 'cat').length;
        } else if (category.id === 'other') {
            category.count = allPets.filter(pet => pet.type !== 'dog' && pet.type !== 'cat').length;
        } else if (category.id === 'rescued') {
            category.count = allPets.filter(pet => pet.category === 'rescued').length;
        }
    });
}

// UI Population Functions
function populateLocations() {
    const locationSelects = [
        'locationSelect',
        'locationFilter',
        'signupLocation', 
        'petListingLocation'
    ];

    locationSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const firstOption = select.querySelector('option');
            select.innerHTML = '';
            if (firstOption) {
                select.appendChild(firstOption);
            }
            
            appData.locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                select.appendChild(option);
            });
        }
    });
}

function populateCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    appData.categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.category = category.id;
        card.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <h3>${category.name}</h3>
            <p class="category-count">${category.count} available</p>
        `;
        grid.appendChild(card);
    });
}

function populateFeaturedPets() {
    const grid = document.getElementById('featuredPetsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const featuredPets = allPets.filter(pet => pet.featured) || allPets.slice(0, 3);
    featuredPets.forEach(pet => {
        const card = createPetCard(pet);
        grid.appendChild(card);
    });
}

function populateAllPets() {
    const grid = document.getElementById('allPetsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredPets.length === 0) {
        grid.innerHTML = '<div class="empty-state">No pets found matching your criteria.</div>';
        return;
    }
    
    filteredPets.forEach(pet => {
        const card = createPetCard(pet);
        grid.appendChild(card);
    });
}

function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.dataset.petId = pet.id;
    
    const isFavorite = api.currentUser && api.currentUser.favorites.includes(pet.id);
    
    card.innerHTML = `
        <div class="pet-image" style="background-image: url('${pet.image}')">
            <div class="pet-status">${pet.status}</div>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-pet-id="${pet.id}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
        <div class="pet-info">
            <h3>${pet.name}</h3>
            <div class="pet-details">
                <span class="pet-detail">${pet.breed}</span>
                <span class="pet-detail">${pet.age}</span>
                <span class="pet-detail">${pet.gender}</span>
            </div>
            <p class="pet-location">📍 ${pet.location}</p>
            <p class="pet-description">${pet.description.substring(0, 100)}...</p>
            <div class="pet-actions">
                <button class="btn btn--primary btn--sm view-pet-btn" data-pet-id="${pet.id}">View Details</button>
                <button class="btn btn--outline btn--sm adopt-btn" data-pet-id="${pet.id}">Adopt</button>
            </div>
        </div>
    `;

    return card;
}

// Pet Details
function showPetDetails(petId) {
    const pet = allPets.find(p => p.id === petId);
    if (!pet) return;
    
    const content = document.getElementById('petDetailsContent');
    if (!content) return;
    
    const isFavorite = api.currentUser && api.currentUser.favorites.includes(pet.id);
    
    content.innerHTML = `
        <div class="pet-main-image" style="background-image: url('${pet.image}')"></div>
        <div class="pet-info-detailed">
            <div class="pet-header">
                <div class="pet-title">
                    <h1>${pet.name}</h1>
                    <p class="pet-breed">${pet.breed}</p>
                </div>
                <button class="favorite-btn large ${isFavorite ? 'active' : ''}" data-pet-id="${pet.id}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            
            <div class="pet-attributes">
                <div class="attribute">
                    <div class="attribute-label">Age</div>
                    <div class="attribute-value">${pet.age}</div>
                </div>
                <div class="attribute">
                    <div class="attribute-label">Gender</div>
                    <div class="attribute-value">${pet.gender}</div>
                </div>
                <div class="attribute">
                    <div class="attribute-label">Size</div>
                    <div class="attribute-value">${pet.size}</div>
                </div>
                <div class="attribute">
                    <div class="attribute-label">Location</div>
                    <div class="attribute-value">${pet.location}</div>
                </div>
            </div>
            
            <div class="health-status">
                <div class="health-item">
                    <span class="health-icon">${pet.vaccinated ? '✅' : '❌'}</span>
                    <span>Vaccinated</span>
                </div>
                <div class="health-item">
                    <span class="health-icon">${pet.neutered ? '✅' : '❌'}</span>
                    <span>Neutered/Spayed</span>
                </div>
            </div>
            
            <div class="shelter-info">
                <h4>About ${pet.shelter}</h4>
                <p>Contact: ${pet.shelterContact}</p>
                <p>Phone: ${pet.shelterPhone}</p>
                ${pet.adoptionFee ? `<p>Adoption Fee: ${pet.adoptionFee}</p>` : ''}
            </div>
            
            <p class="pet-description">${pet.description}</p>
            
            <div class="pet-actions">
                <button class="btn btn--primary btn--full-width adopt-btn" data-pet-id="${pet.id}">
                    Apply for Adoption
                </button>
            </div>
        </div>
    `;
    
    content.dataset.petId = pet.id;
    showSection('petDetails');
}

// Authentication Functions
async function handleLogin(formData) {
    try {
        const response = await api.login(formData.email, formData.password);
        
        updateUIForLoggedInUser(response.user);
        hideModal('signInModal');
        showNotification('Welcome back, ' + response.user.name + '!');
        
        await loadPets();
    } catch (error) {
        showNotification('Login failed: ' + error.message, 'error');
    }
}

async function handleSignup(formData) {
    try {
        const response = await api.register(formData);
        
        updateUIForLoggedInUser(response.user);
        hideModal('signInModal');
        showNotification('Welcome to PawPals, ' + response.user.name + '!');
        
        await loadPets();
    } catch (error) {
        showNotification('Registration failed: ' + error.message, 'error');
    }
}

function updateUIForLoggedInUser(user) {
    const signInBtn = document.getElementById('signInBtn');
    if (signInBtn) {
        signInBtn.textContent = user.name.split(' ')[0];
        signInBtn.classList.remove('btn--outline');
        signInBtn.classList.add('btn--secondary');
    }
    
    populateFeaturedPets();
    populateAllPets();
}

// Favorites Management
async function toggleFavorite(petId) {
    if (!api.currentUser) {
        showModal('signIn');
        return;
    }
    
    try {
        const isFavorite = api.currentUser.favorites.includes(petId);
        
        if (isFavorite) {
            await api.removeFavorite(petId);
            showNotification('Removed from favorites');
        } else {
            await api.addFavorite(petId);
            showNotification('Added to favorites');
        }
        
        populateFeaturedPets();
        populateAllPets();
        
        if (currentSection === 'petDetails') {
            const currentPetId = parseInt(document.querySelector('.pet-details-content')?.dataset?.petId);
            if (currentPetId) showPetDetails(currentPetId);
        }
        
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error updating favorites: ' + error.message, 'error');
    }
}

// Pet Listing
async function handlePetListing(formData) {
    if (!api.currentUser) {
        showModal('signIn');
        return;
    }
    
    try {
        const petData = {
            name: formData.name,
            type: formData.type,
            breed: formData.breed,
            age: formData.age,
            gender: formData.gender,
            size: 'Medium',
            location: formData.location,
            description: formData.description,
            image: getRandomPetImage(formData.type),
            vaccinated: formData.vaccinated || false,
            neutered: formData.neutered || false,
            category: formData.type === 'dog' ? 'dogs' : formData.type === 'cat' ? 'cats' : 'other',
            featured: false,
            adoptionFee: '₹3000'
        };
        
        await api.createPet(petData);
        
        hideModal('listPetModal');
        showNotification('Pet listed successfully!');
        
        await loadPets();
        
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error listing pet: ' + error.message, 'error');
    }
}

function getRandomPetImage(type) {
    const images = {
        dog: [
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop'
        ],
        cat: [
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop'
        ],
        rabbit: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop'],
        other: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop']
    };
    
    const typeImages = images[type] || images.other;
    return typeImages[Math.floor(Math.random() * typeImages.length)];
}

// Adoption Applications
async function handleAdoptionApplication(formData) {
    if (!api.currentUser) {
        showModal('signIn');
        return;
    }
    
    try {
        const modal = document.getElementById('adoptionModal');
        const petId = parseInt(modal.dataset.petId);
        
        const requestData = {
            petId: petId,
            reason: formData.reason,
            experience: formData.experience,
            livingSituation: formData.living,
            additionalInfo: formData.additional
        };
        
        await api.createAdoptionRequest(requestData);
        
        hideModal('adoptionModal');
        showNotification('Your adoption application has been submitted successfully!');
        
        if (currentSection === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error submitting application: ' + error.message, 'error');
    }
}

// Contact Form
async function handleContactForm(formData) {
    try {
        await api.submitContact(formData);
        showNotification(`Thank you ${formData.name}! Your message has been sent.`);
        document.getElementById('contactForm').reset();
    } catch (error) {
        showNotification('Error sending message: ' + error.message, 'error');
    }
}

// Dashboard Functions
async function loadDashboard() {
    if (!api.currentUser) return;
    
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <div class="user-avatar">${api.currentUser.name.charAt(0)}</div>
            <div>
                <div style="font-weight: 500;">${api.currentUser.name}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${api.currentUser.location}</div>
            </div>
        `;
    }
    
    loadFavorites();
    loadAdoptionRequests();
    loadMyListings();
}

function loadFavorites() {
    const grid = document.getElementById('favoritePetsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!api.currentUser.favorites || api.currentUser.favorites.length === 0) {
        grid.innerHTML = '<div class="empty-state">No favorites yet. Start browsing pets to add them to your favorites!</div>';
        return;
    }
    
    const favoritePets = allPets.filter(pet => api.currentUser.favorites.includes(pet.id));
    favoritePets.forEach(pet => {
        const card = createPetCard(pet);
        grid.appendChild(card);
    });
}

async function loadAdoptionRequests() {
    try {
        const response = await api.getAdoptionRequests();
        const list = document.getElementById('requestsList');
        if (!list) return;
        
        list.innerHTML = '';
        
        if (response.requests.length === 0) {
            list.innerHTML = '<div class="empty-state">No adoption requests yet.</div>';
            return;
        }
        
        response.requests.forEach(request => {
            const pet = allPets.find(p => p.id === request.petId);
            const item = document.createElement('div');
            item.className = 'request-item';
            item.innerHTML = `
                <div class="request-info">
                    <h4>Application for ${pet ? pet.name : 'Unknown Pet'}</h4>
                    <p class="request-date">Submitted on ${new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="status status--${request.status === 'pending' ? 'warning' : request.status === 'approved' ? 'success' : 'error'}">
                    ${request.status}
                </div>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading adoption requests:', error);
    }
}

function loadMyListings() {
    const grid = document.getElementById('myListingsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const myPets = allPets.filter(pet => pet.userId === api.currentUser.id);
    
    if (myPets.length === 0) {
        grid.innerHTML = '<div class="empty-state">You haven\'t listed any pets yet. Click "List Pet" to get started!</div>';
        return;
    }
    
    myPets.forEach(pet => {
        const card = createPetCard(pet);
        grid.appendChild(card);
    });
}

function showDashboardTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(tabName + 'Tab');
    
    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

// Search and Filtering
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const locationSelect = document.getElementById('locationSelect');
    
    const searchTerm = searchInput?.value || '';
    const location = locationSelect?.value || '';
    
    applyFilters({ search: searchTerm, location });
    showSection('listings');
}

function applyFilters(extraFilters = {}) {
    const typeFilter = document.getElementById('typeFilter');
    const locationFilter = document.getElementById('locationFilter');
    const ageFilter = document.getElementById('ageFilter');
    
    const filters = {
        type: typeFilter?.value || '',
        location: locationFilter?.value || '',
        age: ageFilter?.value || '',
        ...extraFilters
    };
    
    filteredPets = allPets.filter(pet => {
        const matchesType = !filters.type || pet.type === filters.type;
        const matchesLocation = !filters.location || pet.location === filters.location;
        const matchesSearch = !filters.search || 
            pet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            pet.breed.toLowerCase().includes(filters.search.toLowerCase()) ||
            pet.description.toLowerCase().includes(filters.search.toLowerCase());
        
        let matchesAge = true;
        if (filters.age === 'young') {
            matchesAge = pet.age.includes('month') || pet.age === '1 year';
        } else if (filters.age === 'adult') {
            const ageNum = parseInt(pet.age);
            matchesAge = ageNum >= 1 && ageNum <= 5;
        } else if (filters.age === 'senior') {
            const ageNum = parseInt(pet.age);
            matchesAge = ageNum > 5;
        }
        
        const matchesCategory = !filters.category || pet.category === filters.category;
        
        return matchesType && matchesLocation && matchesSearch && matchesAge && matchesCategory;
    });
    
    populateAllPets();
}

function filterByCategory(categoryId) {
    applyFilters({ category: categoryId });
    showSection('listings');
}

// Event Handlers
function setupEventListeners() {
    // Click event delegation
    document.addEventListener('click', function(e) {
        // Prevent default behavior and stop propagation for specific interactive elements
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.nav-link')) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Navigation brand
        if (e.target.closest('.nav-brand')) {
            showSection('home');
            return;
        }

        // Navigation links
        if (e.target.classList.contains('nav-link')) {
            const href = e.target.getAttribute('href');
            if (href) {
                const section = href.substring(1);
                showSection(section);
            }
            return;
        }

        // Sign In button
        if (e.target.id === 'signInBtn') {
            if (api.currentUser) {
                showSection('dashboard');
            } else {
                showModal('signIn');
            }
            return;
        }

        // List Pet button
        if (e.target.id === 'listPetBtn') {
            if (api.currentUser) {
                showModal('listPet');
            } else {
                showModal('signIn');
            }
            return;
        }

        // Donate button
        if (e.target.id === 'donateBtn') {
            showNotification('Thank you for your interest! This would redirect to a payment gateway.');
            return;
        }

        // Back button
        if (e.target.id === 'backBtn') {
            showSection('listings');
            return;
        }

        // Search button
        if (e.target.id === 'searchBtn') {
            handleSearch();
            return;
        }

        // Category cards
        if (e.target.closest('.category-card')) {
            const card = e.target.closest('.category-card');
            const categoryId = card.dataset.category;
            if (categoryId) {
                filterByCategory(categoryId);
            }
            return;
        }

        // Pet cards (but not buttons within them)
        if (e.target.closest('.pet-card') && !e.target.closest('button')) {
            const card = e.target.closest('.pet-card');
            const petId = parseInt(card.dataset.petId);
            if (petId) {
                showPetDetails(petId);
            }
            return;
        }

        // Pet actions
        if (e.target.classList.contains('view-pet-btn')) {
            const petId = parseInt(e.target.dataset.petId);
            if (petId) showPetDetails(petId);
            return;
        }

        if (e.target.classList.contains('adopt-btn')) {
            const petId = parseInt(e.target.dataset.petId);
            if (petId) {
                if (api.currentUser) {
                    const modal = document.getElementById('adoptionModal');
                    modal.dataset.petId = petId;
                    showModal('adoption');
                } else {
                    showModal('signIn');
                }
            }
            return;
        }

        if (e.target.classList.contains('favorite-btn')) {
            const petId = parseInt(e.target.dataset.petId);
            if (petId) toggleFavorite(petId);
            return;
        }

        // Modal controls
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
            const modal = e.target.closest('.modal');
            if (modal) hideModal(modal.id);
            return;
        }

        // Auth tabs
        if (e.target.classList.contains('auth-tab-btn')) {
            const tab = e.target.dataset.tab;
            document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            const targetForm = document.getElementById(tab + 'Form');
            if (targetForm) targetForm.classList.add('active');
            return;
        }

        // Dashboard tabs
        if (e.target.classList.contains('tab-btn')) {
            const tab = e.target.dataset.tab;
            showDashboardTab(tab);
            return;
        }

        // Google login
        if (e.target.closest('.google-btn')) {
            const googleUserData = {
                name: 'Google User',
                email: 'google.user@example.com',
                type: 'individual',
                location: 'Mumbai, Maharashtra'
            };
            handleSignup(googleUserData);
            return;
        }

        // Mobile menu
        if (e.target.closest('#mobileMenuBtn')) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
            return;
        }
    });

    // Form submissions
    document.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formId = form.id;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });
        
        switch (formId) {
            case 'loginFormElement':
                handleLogin(data);
                break;
            case 'signupFormElement':
                handleSignup(data);
                break;
            case 'listPetForm':
                handlePetListing(data);
                break;
            case 'adoptionForm':
                handleAdoptionApplication(data);
                break;
            case 'contactForm':
                handleContactForm(data);
                break;
        }
        
        form.reset();
    });

    // Search on Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Filter changes
    document.addEventListener('change', function(e) {
        if (e.target.id === 'typeFilter' || e.target.id === 'locationFilter' || e.target.id === 'ageFilter') {
            applyFilters();
        }
    });
}

// Initialize Application
async function initializeApp() {
    try {
        // Initialize API service
        api = new APIService();
        
        // Setup event listeners
        setupEventListeners();
        
        // Populate initial data
        populateLocations();
        
        // Load pets data
        await loadPets();
        
        // Show home section
        showSection('home');
        
        // Update UI if user is logged in
        if (api.currentUser) {
            updateUIForLoggedInUser(api.currentUser);
        }
        
        console.log('PawPals application initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
        showNotification('Error initializing application', 'error');
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeApp, 100);
});