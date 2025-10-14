// TheDietPlanner Application
class TheDietPlannerApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'home';
        this.currentDate = new Date();
        this.isLoading = false;
        
        // Initialize data from JSON
        this.initializeData();
        
        // Bind event listeners
        this.initializeEventListeners();
        
        // Check for existing user session
        this.loadUserSession();
        
        // Initialize the app
        this.showView('home');
        this.updateBottomNav();
        this.updateDateTime();
    }

    initializeData() {
        // Food Database from JSON
        this.foodDatabase = [
            {
                "id": "food-1",
                "name": "Poha with roasted peanuts",
                "category": "Breakfast",
                "cuisine": "Indian",
                "calories": 320,
                "protein": 8,
                "carbs": 48,
                "fat": 10,
                "fiber": 4,
                "per100g": false,
                "servingSize": "1 plate",
                "prepTime": 15,
                "tags": ["vegetarian", "vegan-friendly", "nuts"],
                "allergens": ["nuts"]
            },
            {
                "id": "food-2", 
                "name": "Mixed Dal Tadka with rice",
                "category": "Lunch",
                "cuisine": "Indian",
                "calories": 520,
                "protein": 22,
                "carbs": 70,
                "fat": 10,
                "fiber": 8,
                "per100g": false,
                "servingSize": "1 plate",
                "prepTime": 25,
                "tags": ["vegetarian", "vegan-friendly", "high-protein"]
            },
            {
                "id": "food-3",
                "name": "Chicken Breast (grilled)",
                "category": "Protein",
                "cuisine": "General",
                "calories": 165,
                "protein": 31,
                "carbs": 0,
                "fat": 3.6,
                "fiber": 0,
                "per100g": true,
                "servingSize": "100g",
                "tags": ["high-protein", "low-carb", "non-vegetarian"]
            },
            {
                "id": "food-4",
                "name": "Brown Rice (cooked)",
                "category": "Grains",
                "cuisine": "General", 
                "calories": 111,
                "protein": 2.6,
                "carbs": 23,
                "fat": 0.9,
                "fiber": 1.8,
                "per100g": true,
                "servingSize": "100g",
                "tags": ["whole-grain", "vegetarian", "vegan-friendly"]
            },
            // Additional Indian foods
            {
                "id": "food-5",
                "name": "Chapati (whole wheat)",
                "category": "Grains",
                "cuisine": "Indian",
                "calories": 71,
                "protein": 3,
                "carbs": 15,
                "fat": 0.4,
                "fiber": 2,
                "per100g": false,
                "servingSize": "1 piece",
                "tags": ["vegetarian", "vegan-friendly", "whole-grain"]
            },
            {
                "id": "food-6",
                "name": "Paneer Curry",
                "category": "Lunch",
                "cuisine": "Indian",
                "calories": 280,
                "protein": 15,
                "carbs": 8,
                "fat": 22,
                "fiber": 2,
                "per100g": false,
                "servingSize": "1 bowl",
                "tags": ["vegetarian", "high-protein"]
            },
            {
                "id": "food-7",
                "name": "Masala Dosa",
                "category": "Breakfast",
                "cuisine": "Indian",
                "calories": 420,
                "protein": 12,
                "carbs": 58,
                "fat": 16,
                "fiber": 4,
                "per100g": false,
                "servingSize": "1 piece",
                "tags": ["vegetarian", "fermented"]
            },
            {
                "id": "food-8",
                "name": "Fish Curry",
                "category": "Lunch",
                "cuisine": "Indian",
                "calories": 245,
                "protein": 25,
                "carbs": 8,
                "fat": 12,
                "fiber": 2,
                "per100g": false,
                "servingSize": "1 bowl",
                "tags": ["non-vegetarian", "high-protein"]
            }
        ];

        // Exercises from JSON
        this.exercises = [
            {
                "id": "exercise-1",
                "name": "Push-ups",
                "category": "Upper Body",
                "equipment": "Bodyweight",
                "primaryMuscles": ["Chest", "Shoulders", "Triceps"],
                "difficulty": "Beginner",
                "instructions": "Start in plank position, lower body to ground, push back up",
                "caloriesPerMinute": 8,
                "demoVideoUrl": "/videos/pushups.mp4"
            },
            {
                "id": "exercise-2",
                "name": "Squats",
                "category": "Lower Body", 
                "equipment": "Bodyweight",
                "primaryMuscles": ["Quadriceps", "Glutes", "Hamstrings"],
                "difficulty": "Beginner",
                "instructions": "Stand with feet shoulder-width apart, lower body as if sitting, return to standing",
                "caloriesPerMinute": 10,
                "demoVideoUrl": "/videos/squats.mp4"
            },
            {
                "id": "exercise-3",
                "name": "Deadlifts",
                "category": "Full Body",
                "equipment": "Barbell",
                "primaryMuscles": ["Hamstrings", "Glutes", "Back", "Traps"],
                "difficulty": "Intermediate",
                "instructions": "Stand with barbell at feet, bend at hips and knees, lift bar by standing up straight",
                "caloriesPerMinute": 12,
                "demoVideoUrl": "/videos/deadlifts.mp4"
            },
            // Additional exercises
            {
                "id": "exercise-4",
                "name": "Plank",
                "category": "Core",
                "equipment": "Bodyweight",
                "primaryMuscles": ["Core", "Shoulders"],
                "difficulty": "Beginner",
                "instructions": "Hold body in straight line from head to heels",
                "caloriesPerMinute": 5,
                "demoVideoUrl": "/videos/plank.mp4"
            },
            {
                "id": "exercise-5",
                "name": "Lunges",
                "category": "Lower Body",
                "equipment": "Bodyweight",
                "primaryMuscles": ["Quadriceps", "Glutes", "Hamstrings"],
                "difficulty": "Beginner",
                "instructions": "Step forward, lower back knee toward ground, return to start",
                "caloriesPerMinute": 7,
                "demoVideoUrl": "/videos/lunges.mp4"
            }
        ];

        // Blog posts from JSON
        this.blogPosts = [
            {
                "id": "post-1",
                "title": "Complete Guide to Indian Diet Planning",
                "excerpt": "Learn how to create balanced meal plans using traditional Indian cuisine",
                "category": "Diet Planning",
                "readTime": 8,
                "publishDate": "2024-10-01",
                "content": "A comprehensive guide to planning balanced meals using traditional Indian foods..."
            },
            {
                "id": "post-2", 
                "title": "Home Workout Routines for Beginners",
                "excerpt": "Effective bodyweight exercises you can do at home with no equipment",
                "category": "Fitness",
                "readTime": 6,
                "publishDate": "2024-09-28",
                "content": "Start your fitness journey with these simple yet effective bodyweight exercises..."
            },
            {
                "id": "post-3",
                "title": "Understanding Macronutrients in Indian Foods",
                "excerpt": "Break down of proteins, carbs, and fats in traditional Indian cuisine",
                "category": "Nutrition",
                "readTime": 10,
                "publishDate": "2024-10-05",
                "content": "Learn about the nutritional composition of your favorite Indian dishes..."
            }
        ];

        // User data
        this.users = [];
        
        // Current meal builder
        this.currentMeal = [];
        
        // Current diet plan
        this.currentDietPlan = null;
        
        // Current workout plan
        this.currentWorkoutPlan = null;
        
        // Progress data
        this.progressData = {
            weight: [
                { date: '2024-09-01', value: 73.5 },
                { date: '2024-09-08', value: 72.8 },
                { date: '2024-09-15', value: 72.1 },
                { date: '2024-09-22', value: 71.6 },
                { date: '2024-09-29', value: 71.0 },
                { date: '2024-10-06', value: 70.5 }
            ],
            calories: [
                { date: '2024-10-01', consumed: 1650, target: 1800 },
                { date: '2024-10-02', consumed: 1720, target: 1800 },
                { date: '2024-10-03', consumed: 1580, target: 1800 },
                { date: '2024-10-04', consumed: 1790, target: 1800 },
                { date: '2024-10-05', consumed: 1630, target: 1800 },
                { date: '2024-10-06', consumed: 1750, target: 1800 }
            ]
        };
    }

    initializeEventListeners() {
        // Navigation - Enhanced to handle all data-view attributes
        document.addEventListener('click', (e) => {
            const viewTarget = e.target.getAttribute('data-view') || e.target.closest('[data-view]')?.getAttribute('data-view');
            if (viewTarget) {
                e.preventDefault();
                this.showView(viewTarget);
                return;
            }
        });

       // ---- Auth buttons (unchanged) ----
document.getElementById('loginBtn')?.addEventListener('click', () => this.showAuthModal('login'));
document.getElementById('signupBtn')?.addEventListener('click', () => this.showAuthModal('signup'));
document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());
document.getElementById('dashboardBtn')?.addEventListener('click', () => this.showView('dashboard'));
document.getElementById('getStartedBtn')?.addEventListener('click', () => this.handleGetStarted());

// Auth modal
document.getElementById('closeAuthModal')?.addEventListener('click', () => this.hideModal('authModal'));
document.getElementById('authForm')?.addEventListener('submit', (e) => this.handleAuth(e));

// Auth switch link (event delegation)
document.addEventListener('click', (e) => {
  if (e.target.id === 'authSwitchLink') {
    e.preventDefault();
    this.toggleAuthMode();
  }
});

// ---- Onboarding ----
document.getElementById('onboardingForm')?.addEventListener('submit', (e) => this.handleOnboarding(e));

// small helper to find the current step number from the DOM so we don't rely on a loose variable
const getCurrentStepNumber = () => {
  // Adjust selector to whatever your app uses to mark current step
  const current = document.querySelector('.onboarding [data-current-step]') || document.querySelector('[data-step].active');
  return current ? parseInt(current.getAttribute('data-step') || current.getAttribute('data-current-step') || '1', 10) : 1;
};

document.getElementById('nextStepBtn')?.addEventListener('click', () => {
  const stepNumber = getCurrentStepNumber();
  if (this.validateStep(stepNumber)) {
    this.nextOnboardingStep();
  }
});

document.getElementById('prevStepBtn')?.addEventListener('click', () => this.prevOnboardingStep());
document.getElementById('completeOnboardingBtn')?.addEventListener('click', () => this.completeOnboarding());

// ---- validateStep method (make sure this is placed inside the same class/object scope as `this`) ----
validateStep(stepNumber) 
  const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
  if (!currentStep) return false;

  switch (stepNumber) {
    case 1: {
      const age = currentStep.querySelector('[name="age"]')?.value;
      const gender = currentStep.querySelector('[name="gender"]')?.value;
      const height = currentStep.querySelector('[name="height"]')?.value;
      const weight = currentStep.querySelector('[name="weight"]')?.value;

      if (!age || !gender || !height || !weight) {
        this.showNotification('Please fill in all required fields', 'error');
        return false;
      }
      if (parseInt(age, 10) < 16 || parseInt(age, 10) > 100) {
        this.showNotification('Age must be between 16 and 100', 'error');
        return false;
      }
      break;
    }

    case 2: {
      const activity = currentStep.querySelector('[name="activityLevel"]')?.value;
      const goal = currentStep.querySelector('[name="goal"]')?.value;
      if (!activity || !goal) {
        this.showNotification('Please select your activity level and goal', 'error');
        return false;
      }
      break;
    }

    case 3: {
      const dietType = currentStep.querySelector('[name="dietType"]')?.value;
      if (!dietType) {
        this.showNotification('Please select your diet preference', 'error');
        return false;
      }
      break;
    }

    case 4: {
      const experience = currentStep.querySelector('[name="workoutExperience"]')?.value;
      const days = currentStep.querySelector('[name="workoutDays"]')?.value;
      const length = currentStep.querySelector('[name="sessionLength"]')?.value;
      if (!experience || !days || !length) {
        this.showNotification('Please fill in all workout preferences', 'error');
        return false;
      }
      break;
    }
  }

  return true;
}

// ---- remaining buttons (unchanged) ----
document.getElementById('generateDietPlan')?.addEventListener('click', () => this.generateDietPlan());
document.getElementById('downloadPdfPlan')?.addEventListener('click', () => this.downloadDietPDF());
document.getElementById('editPlan')?.addEventListener('click', () => this.editDietPlan());

document.getElementById('generateWorkoutPlan')?.addEventListener('click', () => this.generateWorkoutPlan());
document.getElementById('downloadWorkoutPdf')?.addEventListener('click', () => this.downloadWorkoutPDF());
document.getElementById('exportToCalendar')?.addEventListener('click', () => this.exportToCalendar());
document.getElementById('editWorkoutPlan')?.addEventListener('click', () => this.editWorkoutPlan());

document.getElementById('calculateCalories')?.addEventListener('click', () => this.calculateCalories());

document.getElementById('searchFoodBtn')?.addEventListener('click', () => this.searchFood());
document.getElementById('foodSearch')?.addEventListener('input', () => this.searchFood());
document.getElementById('logMeal')?.addEventListener('click', () => this.logCurrentMeal());

document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('category-btn')) {
    this.filterFoodsByCategory(e.target.getAttribute('data-category'));
  }
});

        // Food modal - Fixed
        document.getElementById('closeFoodModal')?.addEventListener('click', () => this.hideModal('foodModal'));
        document.getElementById('addFoodItem')?.addEventListener('click', () => this.addFoodToMeal());
        document.getElementById('portionAmount')?.addEventListener('input', () => this.updateNutritionPreview());
        document.getElementById('portionUnit')?.addEventListener('change', () => this.updateNutritionPreview());

        // Diet tracker - Fixed
        document.getElementById('prevDay')?.addEventListener('click', () => this.changeTrackerDate(-1));
        document.getElementById('nextDay')?.addEventListener('click', () => this.changeTrackerDate(1));
        
        // Add food buttons - Using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-food-btn')) {
                this.showFoodSelector(e);
            }
        });

        // Progress tracking - Fixed
        document.getElementById('logWeight')?.addEventListener('click', () => this.logWeight());
        document.getElementById('logMeasurements')?.addEventListener('click', () => this.logMeasurements());

        // Blog filters - Fixed with event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.filterBlogPosts(e.target.getAttribute('data-category'));
            }
        });

        // Distribution sliders - Fixed with event delegation
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('distribution-slider')) {
                this.updateDistribution(e);
            }
        });

        // Bottom navigation - Fixed
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                const view = e.target.closest('.nav-item').getAttribute('data-view');
                if (view) {
                    this.showView(view);
                }
            }
        });

        // Quick actions - Fixed
        document.getElementById('markWorkoutBtn')?.addEventListener('click', () => this.markWorkoutComplete());

        // Feature cards - Enhanced to handle all feature card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.feature-card')) {
                const featureCard = e.target.closest('.feature-card');
                const view = featureCard.getAttribute('data-view');
                if (view) {
                    e.preventDefault();
                    this.showView(view);
                }
            }
        });

        // Tool cards - Enhanced to handle tool card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tool-card')) {
                const toolCard = e.target.closest('.tool-card');
                const view = toolCard.getAttribute('data-view');
                if (view) {
                    e.preventDefault();
                    this.showView(view);
                }
            }
        });

        // Action buttons - Enhanced to handle all action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                const actionBtn = e.target.closest('.action-btn');
                const view = actionBtn.getAttribute('data-view');
                if (view) {
                    e.preventDefault();
                    this.showView(view);
                }
            }
        });

        // Modal backdrop clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Initialize food results and blog posts
        setTimeout(() => {
            this.populateFoodResults();
            this.populateBlogPosts();
            this.loadUserProfile();
        }, 100);
    }

    // User Session Management
    loadUserSession() {
        const savedUser = localStorage.getItem('thedietplanner_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
            if (this.currentUser.onboardingComplete) {
                this.showView('dashboard');
            }
        }
    }

    saveUserSession() {
        if (this.currentUser) {
            localStorage.setItem('thedietplanner_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('thedietplanner_user');
        }
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            userMenu.classList.remove('hidden');
            userName.textContent = this.currentUser.firstName || 'User';
            
            // Update dashboard user name
            const dashboardUserName = document.getElementById('dashboardUserName');
            if (dashboardUserName) {
                dashboardUserName.textContent = this.currentUser.firstName || 'User';
            }
        } else {
            loginBtn.style.display = 'inline-flex';
            signupBtn.style.display = 'inline-flex';
            userMenu.classList.add('hidden');
        }
    }

    // Authentication
    showAuthModal(mode) {
        const modal = document.getElementById('authModal');
        const title = document.getElementById('authModalTitle');
        const submitBtn = document.getElementById('authSubmitBtn');
        const switchText = document.getElementById('authSwitchText');

        if (mode === 'login') {
            title.textContent = 'Login';
            submitBtn.textContent = 'Login';
            switchText.innerHTML = 'Don\'t have an account? <a href="#" id="authSwitchLink">Sign up</a>';
        } else {
            title.textContent = 'Sign Up';
            submitBtn.textContent = 'Sign Up';
            switchText.innerHTML = 'Already have an account? <a href="#" id="authSwitchLink">Login</a>';
        }

        modal.classList.remove('hidden');
    }

    toggleAuthMode() {
        const title = document.getElementById('authModalTitle');
        const isLogin = title.textContent === 'Login';
        this.showAuthModal(isLogin ? 'signup' : 'login');
    }

    async handleAuth(e) {
        e.preventDefault();
        
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const isLogin = document.getElementById('authModalTitle').textContent === 'Login';

        this.showLoading(true);
        await this.delay(1000);

        if (isLogin) {
            // Demo login - accept any email/password
            this.currentUser = {
                id: 'user-1',
                email: email,
                firstName: email.split('@')[0] || 'User',
                lastName: 'Demo',
                onboardingComplete: true
            };
        } else {
            // Demo signup
            this.currentUser = {
                id: 'user-' + Date.now(),
                email: email,
                firstName: email.split('@')[0] || 'User',
                lastName: 'Demo',
                onboardingComplete: false
            };
        }

        this.saveUserSession();
        this.updateAuthUI();
        this.hideModal('authModal');
        this.showLoading(false);

        if (!this.currentUser.onboardingComplete) {
            this.showView('onboarding');
        } else {
            this.showView('dashboard');
        }

        this.showNotification(isLogin ? 'Welcome back!' : 'Account created successfully!', 'success');
    }

    handleGetStarted() {
        if (this.currentUser) {
            if (this.currentUser.onboardingComplete) {
                this.showView('dashboard');
            } else {
                this.showView('onboarding');
            }
        } else {
            this.showAuthModal('signup');
        }
    }

    logout() {
        this.currentUser = null;
        this.saveUserSession();
        this.updateAuthUI();
        this.showView('home');
        this.showNotification('Logged out successfully', 'info');
    }

    // Onboarding
        nextOnboardingStep() {
        const currentStep = document.querySelector('.onboarding-step.active');
        const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));

        // Validate current step before proceeding
        if (!this.validateStep(currentStepNumber)) {
            return; // Don't proceed if validation fails
        }

        if (currentStepNumber < 4) {
            this.showOnboardingStep(currentStepNumber + 1);
        }
    }

    prevOnboardingStep() {
        const currentStep = document.querySelector('.onboarding-step.active');
        const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));
        
        if (currentStepNumber > 1) {
            this.showOnboardingStep(currentStepNumber - 1);
        }
    }

    showOnboardingStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show target step
        const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        
        // Update progress
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.toggle('active', index < stepNumber);
        });
        
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${(stepNumber / 4) * 100}%`;
        }
        
        // Update buttons
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        const completeBtn = document.getElementById('completeOnboardingBtn');
        
        if (prevBtn) prevBtn.style.display = stepNumber > 1 ? 'inline-flex' : 'none';
        if (nextBtn) nextBtn.style.display = stepNumber < 4 ? 'inline-flex' : 'none';
        if (completeBtn) completeBtn.style.display = stepNumber === 4 ? 'inline-flex' : 'none';
    }

    async handleOnboarding(e) {
        e.preventDefault();
        // Handle form submission if needed
    }

    async completeOnboarding() {
        const formData = new FormData(document.getElementById('onboardingForm'));
        
        // Collect form data
        const profile = {
            age: formData.get('age'),
            gender: formData.get('gender'),
            height: formData.get('height'),
            weight: formData.get('weight'),
            activityLevel: formData.get('activityLevel'),
            goal: formData.get('goal'),
            dietType: formData.get('dietType'),
            allergies: formData.get('allergies'),
            dislikes: formData.get('dislikes'),
            workoutExperience: formData.get('workoutExperience'),
            workoutDays: formData.get('workoutDays'),
            sessionLength: formData.get('sessionLength'),
            equipment: formData.getAll('equipment')
        };

        this.showLoading(true);
        await this.delay(1500);

        // Update user profile
        this.currentUser = {
            ...this.currentUser,
            ...profile,
            onboardingComplete: true
        };

        this.saveUserSession();
        this.showLoading(false);
        
        this.showView('dashboard');
        this.showNotification('Profile setup complete! Welcome to TheDietPlanner!', 'success');
        
        // Initialize user data
        this.initializeUserData();
    }

    initializeUserData() {
        if (!this.currentUser) return;
        
        // Calculate TDEE
        const tdee = this.calculateTDEE(
            this.currentUser.age,
            this.currentUser.gender,
            this.currentUser.height,
            this.currentUser.weight,
            this.currentUser.activityLevel
        );

        this.currentUser.tdee = tdee;
        this.saveUserSession();
        this.updateDashboardSummary();
    }

    // View Navigation - Enhanced
    showView(viewName) {
        // Check authentication for protected views
        const protectedViews = ['dashboard', 'dietPlanner', 'workoutGenerator', 'calorieCalculator', 'foodCalculator', 'dietTracker', 'progress'];
        if (protectedViews.includes(viewName) && !this.currentUser) {
            this.showAuthModal('login');
            return;
        }

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(`${viewName}View`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
        } else {
            // Fallback - show home if view doesn't exist
            document.getElementById('homeView').classList.add('active');
            this.currentView = 'home';
        }

        // Update bottom nav
        this.updateBottomNav();

        // Load view-specific content
        switch(viewName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'dietPlanner':
                this.loadUserProfile();
                break;
            case 'calorieCalculator':
                this.loadUserProfile();
                break;
            case 'foodCalculator':
                this.populateFoodResults();
                break;
            case 'dietTracker':
                this.updateDietTracker();
                break;
            case 'progress':
                this.updateProgressCharts();
                break;
            case 'blog':
                this.populateBlogPosts();
                break;
        }
    }

    updateBottomNav() {
        document.querySelectorAll('.nav-item').forEach(item => {
            const view = item.getAttribute('data-view');
            item.classList.toggle('active', view === this.currentView);
        });
    }

    // Dashboard
    updateDashboard() {
        this.updateDateTime();
        this.updateDashboardSummary();
        this.updateTodaysPlan();
        setTimeout(() => this.initializeCharts(), 200);
    }

    updateDateTime() {
        const dateElement = document.getElementById('dashboardDate');
        if (dateElement) {
            dateElement.textContent = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    updateDashboardSummary() {
        // Update calorie summary
        const caloriesConsumed = document.getElementById('caloriesConsumed');
        if (caloriesConsumed && this.currentUser) {
            const targetCalories = this.getTargetCalories();
            const consumed = this.getTodayCalories();
            caloriesConsumed.textContent = `${consumed}`;
            
            // Update progress bar
            const progressFill = caloriesConsumed.parentNode.querySelector('.progress-fill');
            if (progressFill) {
                const percentage = Math.min((consumed / targetCalories) * 100, 100);
                progressFill.style.width = `${percentage}%`;
            }
        }
    }

    updateTodaysPlan() {
        // Update today's meals
        const todayMeals = document.getElementById('todayMeals');
        if (todayMeals) {
            todayMeals.innerHTML = `
                <div class="meal-preview">
                    <strong>Breakfast:</strong> Poha with peanuts (320 cal)
                </div>
                <div class="meal-preview">
                    <strong>Lunch:</strong> Dal Tadka with rice (520 cal)
                </div>
                <div class="meal-preview">
                    <strong>Dinner:</strong> Grilled chicken with roti (450 cal)
                </div>
            `;
        }

        // Update today's workout
        const todayWorkout = document.getElementById('todayWorkout');
        if (todayWorkout) {
            todayWorkout.innerHTML = `
                <div class="workout-preview">
                    <strong>Upper Body Strength</strong>
                    <div>3 exercises • 45 minutes</div>
                    <button class="btn btn--outline btn--sm" onclick="app.startWorkout()">Start Workout</button>
                </div>
            `;
        }
    }

    startWorkout() {
        this.showNotification('Workout started! Timer is running. 💪', 'success');
    }

    // Diet Planner - Enhanced
    async generateDietPlan() {
        const durationSelect = document.getElementById('planDuration');
        const calorieInput = document.getElementById('calorieTarget');
        
        const duration = durationSelect ? durationSelect.value : 'weekly';
        const calorieTarget = calorieInput ? calorieInput.value : this.getTargetCalories();

        this.showLoading(true);
        await this.delay(2000);

        // Generate meal plan based on user preferences
        const plan = this.createMealPlan(duration, parseInt(calorieTarget));
        
        this.currentDietPlan = plan;
        this.displayDietPlan(plan);
        
        const generatedPlan = document.getElementById('generatedDietPlan');
        if (generatedPlan) {
            generatedPlan.style.display = 'block';
        }
        
        this.showLoading(false);
        this.showNotification('Diet plan generated successfully!', 'success');
    }

    editDietPlan() {
        this.showNotification('Plan editing feature coming soon!', 'info');
    }

    createMealPlan(duration, targetCalories) {
        const days = duration === 'weekly' ? 7 : 30;
        const meals = [];

        for (let day = 1; day <= days; day++) {
            const dayMeals = {
                day: day,
                date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toDateString(),
                breakfast: this.selectMealsByCategory('Breakfast', targetCalories * 0.25),
                lunch: this.selectMealsByCategory('Lunch', targetCalories * 0.35),
                dinner: this.selectMealsByCategory('Lunch', targetCalories * 0.30), // Use lunch foods for dinner
                snacks: this.selectMealsByCategory('Breakfast', targetCalories * 0.10), // Use breakfast foods for snacks
                totalCalories: 0
            };
            
            // Calculate total calories
            dayMeals.totalCalories = dayMeals.breakfast.calories + dayMeals.lunch.calories + 
                                   dayMeals.dinner.calories + dayMeals.snacks.calories;
            
            meals.push(dayMeals);
        }

        return {
            duration: duration,
            targetCalories: targetCalories,
            meals: meals,
            generatedAt: new Date()
        };
    }

    selectMealsByCategory(category, targetCalories) {
        const categoryFoods = this.foodDatabase.filter(food => 
            food.category === category && 
            (!this.currentUser?.dietType || this.isDietCompatible(food, this.currentUser.dietType))
        );
        
        if (categoryFoods.length === 0) {
            return { name: 'Custom meal', calories: targetCalories, protein: 0, carbs: 0, fat: 0 };
        }
        
        // Select a random food close to target calories
        const food = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
        return food;
    }

    isDietCompatible(food, dietType) {
        switch (dietType) {
            case 'vegetarian':
                return food.tags.includes('vegetarian');
            case 'non_vegetarian':
                return true; // Non-veg can eat everything
            case 'vegan':
                return food.tags.includes('vegan-friendly');
            default:
                return true;
        }
    }

    displayDietPlan(plan) {
        const planContent = document.getElementById('planContent');
        if (!planContent) return;
        
        let html = `
            <div class="plan-overview">
                <div class="plan-stats">
                    <div class="stat-item">
                        <span class="stat-label">Duration</span>
                        <span class="stat-value">${plan.duration === 'weekly' ? '7 days' : '30 days'}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Daily Target</span>
                        <span class="stat-value">${plan.targetCalories} cal</span>
                    </div>
                </div>
            </div>
            <div class="plan-meals">
        `;

        plan.meals.slice(0, 7).forEach(dayMeal => {
            html += `
                <div class="day-plan">
                    <h3>Day ${dayMeal.day} - ${new Date(dayMeal.date).toLocaleDateString()}</h3>
                    <div class="day-meals">
                        <div class="meal-item">
                            <span class="meal-type">🌅 Breakfast</span>
                            <span class="meal-name">${dayMeal.breakfast.name}</span>
                            <span class="meal-calories">${dayMeal.breakfast.calories} cal</span>
                        </div>
                        <div class="meal-item">
                            <span class="meal-type">🍽️ Lunch</span>
                            <span class="meal-name">${dayMeal.lunch.name}</span>
                            <span class="meal-calories">${dayMeal.lunch.calories} cal</span>
                        </div>
                        <div class="meal-item">
                            <span class="meal-type">🌙 Dinner</span>
                            <span class="meal-name">${dayMeal.dinner.name}</span>
                            <span class="meal-calories">${dayMeal.dinner.calories} cal</span>
                        </div>
                        <div class="meal-item">
                            <span class="meal-type">🍪 Snack</span>
                            <span class="meal-name">${dayMeal.snacks.name}</span>
                            <span class="meal-calories">${dayMeal.snacks.calories} cal</span>
                        </div>
                    </div>
                    <div class="day-total">Total: ${dayMeal.totalCalories} calories</div>
                </div>
            `;
        });

        html += '</div>';
        planContent.innerHTML = html;
    }

    async downloadDietPDF() {
        this.showLoading(true);
        await this.delay(1500);
        this.showLoading(false);
        this.showNotification('PDF download started! Check your downloads folder.', 'success');
    }

    // Workout Generator - Enhanced
    async generateWorkoutPlan() {
        const durationSelect = document.getElementById('workoutPlanDuration');
        const focusSelect = document.getElementById('workoutFocus');
        const limitationsInput = document.getElementById('workoutLimitations');
        
        const duration = durationSelect ? durationSelect.value : '4';
        const focus = focusSelect ? focusSelect.value : 'strength';
        const limitations = limitationsInput ? limitationsInput.value : '';

        this.showLoading(true);
        await this.delay(2000);

        const plan = this.createWorkoutPlan(duration, focus, limitations);
        this.currentWorkoutPlan = plan;
        this.displayWorkoutPlan(plan);

        const generatedWorkout = document.getElementById('generatedWorkoutPlan');
        if (generatedWorkout) {
            generatedWorkout.style.display = 'block';
        }
        
        this.showLoading(false);
        this.showNotification('Workout plan generated successfully!', 'success');
    }

    editWorkoutPlan() {
        this.showNotification('Workout plan editing feature coming soon!', 'info');
    }

    createWorkoutPlan(weeks, focus, limitations) {
        const workoutsPerWeek = parseInt(this.currentUser?.workoutDays) || 3;
        const sessionLength = parseInt(this.currentUser?.sessionLength) || 45;
        const experience = this.currentUser?.workoutExperience || 'beginner';
        const equipment = this.currentUser?.equipment || ['bodyweight'];

        // Filter exercises based on equipment
        const availableExercises = this.exercises.filter(ex => 
            equipment.includes(ex.equipment.toLowerCase()) || ex.equipment === 'Bodyweight'
        );

        const weeklyWorkouts = [];

        for (let week = 1; week <= parseInt(weeks); week++) {
            const weekWorkouts = [];
            
            for (let day = 1; day <= workoutsPerWeek; day++) {
                const workout = this.createDailyWorkout(availableExercises, focus, experience, sessionLength, day, workoutsPerWeek);
                weekWorkouts.push(workout);
            }
            
            weeklyWorkouts.push({
                week: week,
                workouts: weekWorkouts
            });
        }

        return {
            duration: weeks,
            focus: focus,
            experience: experience,
            workoutsPerWeek: workoutsPerWeek,
            sessionLength: sessionLength,
            equipment: equipment,
            limitations: limitations,
            weeks: weeklyWorkouts,
            generatedAt: new Date()
        };
    }

    createDailyWorkout(exercises, focus, experience, duration, dayNumber, totalDays) {
        // Determine workout split based on days per week
        let workoutType;
        if (totalDays <= 2) {
            workoutType = 'Full Body';
        } else if (totalDays === 3) {
            workoutType = ['Push', 'Pull', 'Legs'][dayNumber - 1];
        } else {
            workoutType = ['Upper Body', 'Lower Body', 'Push', 'Pull'][dayNumber % 4];
        }

        // Select exercises based on workout type and focus
        const workoutExercises = this.selectWorkoutExercises(exercises, workoutType, focus, experience);
        
        return {
            day: dayNumber,
            type: workoutType,
            duration: duration,
            warmup: this.getWarmupRoutine(5),
            exercises: workoutExercises,
            cooldown: this.getCooldownRoutine(5),
            estimatedCalories: this.calculateWorkoutCalories(workoutExercises, duration)
        };
    }

    selectWorkoutExercises(exercises, type, focus, experience) {
        const exerciseCount = experience === 'beginner' ? 4 : experience === 'intermediate' ? 5 : 6;
        const selectedExercises = [];

        // Filter exercises by type
        let filteredExercises = exercises;
        if (type === 'Upper Body') {
            filteredExercises = exercises.filter(ex => ex.category === 'Upper Body' || ex.category === 'Core');
        } else if (type === 'Lower Body') {
            filteredExercises = exercises.filter(ex => ex.category === 'Lower Body' || ex.category === 'Core');
        }

        // Select exercises randomly
        const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < Math.min(exerciseCount, shuffled.length); i++) {
            const exercise = shuffled[i];
            const sets = experience === 'beginner' ? 3 : experience === 'intermediate' ? 4 : 5;
            const reps = this.getRepsForFocus(focus, experience);
            
            selectedExercises.push({
                ...exercise,
                sets: sets,
                reps: reps,
                rest: focus === 'strength' ? 90 : focus === 'hypertrophy' ? 60 : 45
            });
        }

        return selectedExercises;
    }

    getRepsForFocus(focus, experience) {
        switch (focus) {
            case 'strength':
                return experience === 'beginner' ? '5-8' : '3-6';
            case 'hypertrophy':
                return '8-12';
            case 'cardio':
                return '12-20';
            case 'hiit':
                return '30 seconds';
            default:
                return '8-12';
        }
    }

    getWarmupRoutine(duration) {
        return [
            'Light jogging in place - 2 minutes',
            'Arm circles - 1 minute',
            'Leg swings - 1 minute',
            'Dynamic stretching - 1 minute'
        ];
    }

    getCooldownRoutine(duration) {
        return [
            'Walking in place - 2 minutes',
            'Static stretching - 2 minutes',
            'Deep breathing - 1 minute'
        ];
    }

    calculateWorkoutCalories(exercises, duration) {
        const avgCaloriesPerMinute = 8; // Approximate
        return Math.round(avgCaloriesPerMinute * duration);
    }

    displayWorkoutPlan(plan) {
        const planContent = document.getElementById('workoutPlanContent');
        if (!planContent) return;
        
        let html = `
            <div class="workout-overview">
                <div class="plan-stats">
                    <div class="stat-item">
                        <span class="stat-label">Duration</span>
                        <span class="stat-value">${plan.duration} weeks</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Workouts/Week</span>
                        <span class="stat-value">${plan.workoutsPerWeek}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Focus</span>
                        <span class="stat-value">${plan.focus}</span>
                    </div>
                </div>
            </div>
        `;

        // Show first week in detail
        const firstWeek = plan.weeks[0];
        html += `<div class="week-plan">
            <h3>Week 1 Schedule</h3>
        `;

        firstWeek.workouts.forEach((workout, index) => {
            html += `
                <div class="workout-day">
                    <div class="workout-header">
                        <h4>Day ${workout.day}: ${workout.type}</h4>
                        <span class="workout-duration">${workout.duration} minutes</span>
                    </div>
                    <div class="workout-exercises">
                        ${workout.exercises.map(ex => `
                            <div class="exercise-item">
                                <div class="exercise-info">
                                    <strong>${ex.name}</strong>
                                    <div class="exercise-details">${ex.sets} sets × ${ex.reps} reps</div>
                                    <div class="exercise-muscles">${ex.primaryMuscles.join(', ')}</div>
                                </div>
                                <div class="exercise-rest">Rest: ${ex.rest}s</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="workout-calories">Estimated calories: ${workout.estimatedCalories}</div>
                </div>
            `;
        });

        html += '</div>';
        planContent.innerHTML = html;
    }

    async downloadWorkoutPDF() {
        this.showLoading(true);
        await this.delay(1500);
        this.showLoading(false);
        this.showNotification('Workout PDF download started!', 'success');
    }

    async exportToCalendar() {
        this.showLoading(true);
        await this.delay(1000);
        this.showLoading(false);
        this.showNotification('Calendar export file created! Import into your calendar app.', 'success');
    }

    // Calorie Calculator - Enhanced
    async calculateCalories() {
        const age = document.getElementById('calcAge')?.value;
        const gender = document.getElementById('calcGender')?.value;
        const height = document.getElementById('calcHeight')?.value;
        const weight = document.getElementById('calcWeight')?.value;
        const activity = document.getElementById('calcActivity')?.value;

        if (!age || !height || !weight) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        this.showLoading(true);
        await this.delay(1000);

        // Calculate BMR using Mifflin-St Jeor equation
        const bmr = this.calculateBMR(age, gender, height, weight);
        const tdee = Math.round(bmr * parseFloat(activity));

        // Goal-based recommendations
        const weightLoss = Math.round(tdee - 500);
        const maintenance = tdee;
        const weightGain = Math.round(tdee + 300);

        // Display results
        const bmrResult = document.getElementById('bmrResult');
        const tdeeResult = document.getElementById('tdeeResult');
        const weightLossCalories = document.getElementById('weightLossCalories');
        const maintainCalories = document.getElementById('maintainCalories');
        const weightGainCalories = document.getElementById('weightGainCalories');

        if (bmrResult) bmrResult.textContent = Math.round(bmr);
        if (tdeeResult) tdeeResult.textContent = tdee;
        if (weightLossCalories) weightLossCalories.textContent = weightLoss;
        if (maintainCalories) maintainCalories.textContent = maintenance;
        if (weightGainCalories) weightGainCalories.textContent = weightGain;

        const resultsDiv = document.getElementById('calculatorResults');
        if (resultsDiv) {
            resultsDiv.style.display = 'block';
        }
        
        this.showLoading(false);
    }

    calculateBMR(age, gender, height, weight) {
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            return (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
    }

    calculateTDEE(age, gender, height, weight, activityLevel) {
        const bmr = this.calculateBMR(age, gender, height, weight);
        const multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'high': 1.725,
            'very_high': 1.9
        };
        return Math.round(bmr * (multipliers[activityLevel] || 1.2));
    }

    // Food Calculator - Enhanced
    searchFood() {
        const searchInput = document.getElementById('foodSearch');
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        this.populateFoodResults(query);
    }

    filterFoodsByCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        });
        
        this.populateFoodResults('', category);
    }

    populateFoodResults(searchQuery = '', category = 'all') {
        const resultsContainer = document.getElementById('foodResults');
        if (!resultsContainer) return;

        let filteredFoods = this.foodDatabase;

        // Apply search filter
        if (searchQuery) {
            filteredFoods = filteredFoods.filter(food =>
                food.name.toLowerCase().includes(searchQuery) ||
                food.category.toLowerCase().includes(searchQuery) ||
                food.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // Apply category filter
        if (category && category !== 'all') {
            filteredFoods = filteredFoods.filter(food => food.category === category);
        }

        resultsContainer.innerHTML = filteredFoods.map(food => `
            <div class="food-item" onclick="app.showFoodDetails('${food.id}')">
                <h4>${food.name}</h4>
                <div class="food-meta">
                    <span>${food.category}</span>
                    <span>${food.servingSize}</span>
                </div>
                <div class="food-nutrition">
                    <div class="nutrition-item">
                        <div class="nutrition-value">${food.calories}</div>
                        <div class="nutrition-label">cal</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${food.protein}g</div>
                        <div class="nutrition-label">protein</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${food.carbs}g</div>
                        <div class="nutrition-label">carbs</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${food.fat}g</div>
                        <div class="nutrition-label">fat</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showFoodDetails(foodId) {
        const food = this.foodDatabase.find(f => f.id === foodId);
        if (!food) return;

        const modal = document.getElementById('foodModal');
        const details = document.getElementById('foodDetails');
        
        if (details) {
            details.innerHTML = `
                <h4>${food.name}</h4>
                <p><strong>Category:</strong> ${food.category}</p>
                <p><strong>Serving Size:</strong> ${food.servingSize}</p>
                <div class="nutrition-info">
                    <div>Calories: ${food.calories}</div>
                    <div>Protein: ${food.protein}g</div>
                    <div>Carbs: ${food.carbs}g</div>
                    <div>Fat: ${food.fat}g</div>
                    ${food.fiber ? `<div>Fiber: ${food.fiber}g</div>` : ''}
                </div>
            `;
        }

        // Store current food for adding to meal
        this.currentSelectedFood = food;
        
        // Reset portion inputs
        const portionAmount = document.getElementById('portionAmount');
        const portionUnit = document.getElementById('portionUnit');
        if (portionAmount) portionAmount.value = 1;
        if (portionUnit) portionUnit.value = 'serving';
        
        this.updateNutritionPreview();
        if (modal) modal.classList.remove('hidden');
    }

    updateNutritionPreview() {
        const food = this.currentSelectedFood;
        if (!food) return;

        const portionAmount = document.getElementById('portionAmount');
        const portionUnit = document.getElementById('portionUnit');
        const preview = document.getElementById('nutritionPreview');
        
        if (!portionAmount || !portionUnit || !preview) return;

        const amount = parseFloat(portionAmount.value) || 1;
        const unit = portionUnit.value;

        let multiplier = amount;
        if (unit === '100g' && !food.per100g) {
            // Estimate conversion - this would need more sophisticated logic in production
            multiplier = amount * 0.5; // Rough estimate
        }

        preview.innerHTML = `
            <h5>Nutrition Preview</h5>
            <div>Calories: ${Math.round(food.calories * multiplier)}</div>
            <div>Protein: ${Math.round(food.protein * multiplier)}g</div>
            <div>Carbs: ${Math.round(food.carbs * multiplier)}g</div>
            <div>Fat: ${Math.round(food.fat * multiplier)}g</div>
        `;
    }

    addFoodToMeal() {
        const food = this.currentSelectedFood;
        if (!food) return;

        const portionAmount = document.getElementById('portionAmount');
        const portionUnit = document.getElementById('portionUnit');
        
        if (!portionAmount || !portionUnit) return;

        const amount = parseFloat(portionAmount.value) || 1;
        const unit = portionUnit.value;

        let multiplier = amount;
        if (unit === '100g' && !food.per100g) {
            multiplier = amount * 0.5; // Rough estimate
        }

        const mealItem = {
            id: Date.now(),
            food: food,
            amount: amount,
            unit: unit,
            multiplier: multiplier,
            calories: Math.round(food.calories * multiplier),
            protein: Math.round(food.protein * multiplier),
            carbs: Math.round(food.carbs * multiplier),
            fat: Math.round(food.fat * multiplier)
        };

        this.currentMeal.push(mealItem);
        this.updateMealBuilder();
        this.hideModal('foodModal');
        this.showNotification('Food added to meal!', 'success');
    }

    updateMealBuilder() {
        const selectedFoods = document.getElementById('selectedFoods');
        const totalCalories = document.getElementById('totalCalories');
        const totalProtein = document.getElementById('totalProtein');
        const totalCarbs = document.getElementById('totalCarbs');
        const totalFat = document.getElementById('totalFat');

        if (selectedFoods) {
            if (this.currentMeal.length === 0) {
                selectedFoods.innerHTML = '<p class="empty-state">No foods added yet. Search and add foods to build your meal.</p>';
            } else {
                selectedFoods.innerHTML = this.currentMeal.map(item => `
                    <div class="selected-food-item">
                        <div>
                            <strong>${item.food.name}</strong>
                            <div>${item.amount} ${item.unit} - ${item.calories} cal</div>
                        </div>
                        <button class="btn btn--outline btn--sm" onclick="app.removeFoodFromMeal(${item.id})">Remove</button>
                    </div>
                `).join('');
            }
        }

        // Update totals
        const totals = this.currentMeal.reduce((acc, item) => ({
            calories: acc.calories + item.calories,
            protein: acc.protein + item.protein,
            carbs: acc.carbs + item.carbs,
            fat: acc.fat + item.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        if (totalCalories) totalCalories.textContent = totals.calories;
        if (totalProtein) totalProtein.textContent = totals.protein + 'g';
        if (totalCarbs) totalCarbs.textContent = totals.carbs + 'g';
        if (totalFat) totalFat.textContent = totals.fat + 'g';
    }

    removeFoodFromMeal(itemId) {
        this.currentMeal = this.currentMeal.filter(item => item.id !== itemId);
        this.updateMealBuilder();
        this.showNotification('Food removed from meal', 'info');
    }

    logCurrentMeal() {
        if (this.currentMeal.length === 0) {
            this.showNotification('Add some foods to your meal first!', 'error');
            return;
        }

        // In a real app, this would save to a database
        this.showNotification('Meal logged successfully!', 'success');
        this.currentMeal = [];
        this.updateMealBuilder();
    }

    // Diet Tracker - Enhanced
    updateDietTracker() {
        this.updateTrackerDate();
        this.loadTodayMeals();
    }

    updateTrackerDate() {
        const dateElement = document.getElementById('trackerDate');
        if (dateElement) {
            if (this.isToday(this.currentDate)) {
                dateElement.textContent = 'Today';
            } else {
                dateElement.textContent = this.currentDate.toLocaleDateString();
            }
        }
    }

    changeTrackerDate(days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
        this.updateTrackerDate();
        this.loadTodayMeals();
    }

    loadTodayMeals() {
        // Sample logged meals for demonstration
        const sampleMeals = {
            breakfast: [
                { name: 'Poha with peanuts', calories: 320, protein: 8 }
            ],
            lunch: [
                { name: 'Dal Tadka with rice', calories: 520, protein: 22 }
            ],
            dinner: [],
            snack: [],
            mid_morning: []
        };

        Object.entries(sampleMeals).forEach(([mealType, items]) => {
            const container = document.getElementById(`${mealType === 'mid_morning' ? 'midMorning' : mealType}Items`);
            if (container) {
                if (items.length === 0) {
                    container.innerHTML = '<p class="empty-state">No items logged</p>';
                } else {
                    container.innerHTML = items.map(item => `
                        <div class="meal-item">
                            <div>
                                <strong>${item.name}</strong>
                                <div>${item.calories} cal • ${item.protein}g protein</div>
                            </div>
                            <button class="btn btn--outline btn--sm">Remove</button>
                        </div>
                    `).join('');
                }
            }
        });

        // Update daily summary
        const totalCalories = Object.values(sampleMeals).flat().reduce((sum, item) => sum + item.calories, 0);
        const dailyCalories = document.getElementById('dailyCalories');
        if (dailyCalories) {
            dailyCalories.textContent = totalCalories;
        }
    }

    showFoodSelector(e) {
        const mealType = e.target.closest('.meal-section')?.getAttribute('data-meal');
        this.currentMealType = mealType;
        this.showView('foodCalculator');
    }

    // Progress Tracking - Enhanced
    updateProgressCharts() {
        setTimeout(() => {
            this.initializeProgressCharts();
        }, 100);
    }

    async logWeight() {
        const weightInput = document.getElementById('newWeight');
        if (!weightInput) return;
        
        const weight = parseFloat(weightInput.value);

        if (!weight || weight < 30 || weight > 300) {
            this.showNotification('Please enter a valid weight', 'error');
            return;
        }

        // Add to progress data
        this.progressData.weight.push({
            date: new Date().toISOString().split('T')[0],
            value: weight
        });

        this.showNotification('Weight logged successfully!', 'success');
        weightInput.value = '';
        this.updateProgressCharts();
    }

    async logMeasurements() {
        this.showNotification('Measurements logged successfully!', 'success');
        // Clear form inputs
        document.querySelectorAll('.measurements-grid input').forEach(input => {
            if (input.type === 'number') input.value = '';
        });
    }

    markWorkoutComplete() {
        this.showNotification('Workout marked as complete! Great job! 💪', 'success');
    }

    // Blog - Enhanced
    populateBlogPosts(category = 'all') {
        const postsContainer = document.getElementById('blogPosts');
        if (!postsContainer) return;

        let filteredPosts = this.blogPosts;
        if (category !== 'all') {
            filteredPosts = this.blogPosts.filter(post => post.category === category);
        }

        postsContainer.innerHTML = filteredPosts.map(post => `
            <article class="blog-post">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.category}</span>
                    <span>${post.readTime} min read</span>
                </div>
            </article>
        `).join('');
    }

    filterBlogPosts(category) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        });
        this.populateBlogPosts(category);
    }

    // Utility functions
    loadUserProfile() {
        if (!this.currentUser) return;

        // Load user data into forms
        const fields = [
            { form: 'calc', user: 'age' },
            { form: 'calc', user: 'gender' },
            { form: 'calc', user: 'height' },
            { form: 'calc', user: 'weight' },
            { form: 'calc', user: 'activityLevel' }
        ];
        
        fields.forEach(field => {
            const input = document.getElementById(`${field.form}${field.user.charAt(0).toUpperCase() + field.user.slice(1)}`);
            if (input && this.currentUser[field.user]) {
                input.value = this.currentUser[field.user];
            }
        });

        // Set calorie target
        const calorieTarget = document.getElementById('calorieTarget');
        if (calorieTarget && this.currentUser.tdee) {
            calorieTarget.value = this.getTargetCalories();
        }
    }

    getTargetCalories() {
        if (!this.currentUser || !this.currentUser.tdee) return 1800;
        
        const goal = this.currentUser.goal;
        switch (goal) {
            case 'weight_loss': return Math.round(this.currentUser.tdee - 500);
            case 'weight_gain': return Math.round(this.currentUser.tdee + 300);
            case 'muscle_gain': return Math.round(this.currentUser.tdee + 200);
            default: return this.currentUser.tdee;
        }
    }

    getTodayCalories() {
        // Sample calculation - in real app would sum from logged meals
        return 1245;
    }

    updateDistribution(e) {
        const value = e.target.value;
        const valueSpan = e.target.parentNode.querySelector('.distribution-value');
        if (valueSpan) {
            valueSpan.textContent = `${value}%`;
        }
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Charts - Enhanced with error handling
    initializeCharts() {
        setTimeout(() => {
            this.initializeWeightChart();
            this.initializeCalorieChart();
        }, 300);
    }

    initializeProgressCharts() {
        setTimeout(() => {
            this.initializeProgressWeightChart();
            this.initializeWorkoutStreakChart();
        }, 300);
    }

    initializeWeightChart() {
        const ctx = document.getElementById('weightChart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.progressData.weight.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Weight (kg)',
                    data: this.progressData.weight.map(d => d.value),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    initializeCalorieChart() {
        const ctx = document.getElementById('calorieChart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.progressData.calories.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Consumed',
                    data: this.progressData.calories.map(d => d.consumed),
                    backgroundColor: '#1FB8CD'
                }, {
                    label: 'Target',
                    data: this.progressData.calories.map(d => d.target),
                    backgroundColor: '#FFC185'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initializeProgressWeightChart() {
        const ctx = document.getElementById('progressWeightChart');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.progressData.weight.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Weight (kg)',
                    data: this.progressData.weight.map(d => d.value),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    initializeWorkoutStreakChart() {
        const ctx = document.getElementById('workoutStreakChart');
        if (!ctx || typeof Chart === 'undefined') return;

        // Sample workout data
        const workoutData = [
            { date: '2024-10-01', completed: 1 },
            { date: '2024-10-02', completed: 0 },
            { date: '2024-10-03', completed: 1 },
            { date: '2024-10-04', completed: 1 },
            { date: '2024-10-05', completed: 0 },
            { date: '2024-10-06', completed: 1 }
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: workoutData.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Workouts Completed',
                    data: workoutData.map(d => d.completed),
                    backgroundColor: workoutData.map(d => d.completed ? '#5D878F' : '#ECEBD5'),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return value === 1 ? 'Yes' : 'No';
                            }
                        }
                    }
                }
            }
        });
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('hidden');
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    }

    // UI Feedback
    showLoading(show) {
        this.isLoading = show;
        // Add loading states to buttons if needed
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            background: var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'});
            color: white;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
            font-size: 14px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TheDietPlannerApp();
});

// Global functions for onclick handlers
window.app = {
    showFoodDetails: (id) => app.showFoodDetails(id),
    removeFoodFromMeal: (id) => app.removeFoodFromMeal(id),
    showView: (view) => app.showView(view),
    startWorkout: () => app.startWorkout()
};
