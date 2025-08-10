// ===== MINIMAL PORTFOLIO SCRIPT =====

class MinimalPortfolio {
    constructor() {
        this.init();
        this.bindEvents();
        this.initWebGL();
        this.initScrollAnimation();
        this.initProjectInteractions();
        this.initHexHoverEffects();
        this.initCustomCursor();
    }

    init() {
        // Initialize variables
        this.isMenuOpen = false;
        
        // Get DOM elements
        this.nav = document.getElementById('nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.progressBar = document.getElementById('progress-bar');
        this.webglCanvas = document.getElementById('webgl-canvas');
        
        // Set initial states
        this.updateProgressBar();
    }

    bindEvents() {
        // Navigation
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.closeMenu();
                    this.smoothScrollTo(target);
                }
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.updateProgressBar();
            this.updateNavbar();
            this.animateOnScroll();
        });

        // Resize event
        window.addEventListener('resize', () => {
            if (this.webglRenderer) {
                this.resizeWebGL();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    }

    // ===== WEBGL ANIMATION =====
    initWebGL() {
        if (!this.webglCanvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.webglRenderer = new THREE.WebGLRenderer({ 
            canvas: this.webglCanvas, 
            alpha: true,
            antialias: true 
        });
        
        this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
        this.webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particle system
        this.createParticleSystem();
        
        // Create floating geometry
        this.createFloatingGeometry();

        // Camera position
        this.camera.position.z = 5;

        // Start animation
        this.animateWebGL();
    }

    createParticleSystem() {
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            // Velocity
            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.particleVelocities = velocities;
        this.scene.add(this.particles);
    }

    createFloatingGeometry() {
        // Create wireframe geometries
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1.2),
            new THREE.TetrahedronGeometry(0.8)
        ];

        this.floatingObjects = [];

        geometries.forEach((geometry, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });

            const mesh = new THREE.Mesh(geometry, material);
            
            // Position
            mesh.position.x = (index - 1) * 4;
            mesh.position.y = Math.sin(index) * 2;
            mesh.position.z = -2;

            // Rotation speed
            mesh.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };

            this.floatingObjects.push(mesh);
            this.scene.add(mesh);
        });
    }

    animateWebGL() {
        requestAnimationFrame(() => this.animateWebGL());

        const time = Date.now() * 0.0005;

        // Animate particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += this.particleVelocities[i];
                positions[i + 1] += this.particleVelocities[i + 1];
                positions[i + 2] += this.particleVelocities[i + 2];

                // Boundary check
                if (Math.abs(positions[i]) > 10) this.particleVelocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 10) this.particleVelocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 10) this.particleVelocities[i + 2] *= -1;
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.rotation.y = time * 0.1;
        }

        // Animate floating objects
        this.floatingObjects.forEach((obj, index) => {
            obj.rotation.x += obj.rotationSpeed.x;
            obj.rotation.y += obj.rotationSpeed.y;
            obj.rotation.z += obj.rotationSpeed.z;
            
            obj.position.y += Math.sin(time + index) * 0.001;
        });

        // Camera movement based on mouse
        if (this.mouseX !== undefined && this.mouseY !== undefined) {
            this.camera.position.x += (this.mouseX * 0.001 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouseY * 0.001 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }

        this.webglRenderer.render(this.scene, this.camera);
    }

    resizeWebGL() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    // ===== NAVIGATION =====
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        if (this.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateNavbar() {
        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        this.progressBar.style.width = scrolled + '%';
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimation() {
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('[data-scroll]').forEach(el => {
            observer.observe(el);
        });

        // Observe skill categories with delay
        document.querySelectorAll('.skill-category').forEach((el, index) => {
            observer.observe(el);
            if (el.classList.contains('animate')) {
                el.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }

    animateOnScroll() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        // Parallax effect for WebGL
        if (this.scene) {
            this.scene.rotation.y = scrolled * 0.0001;
        }
    }

    // ===== HEXAGONAL PROJECT INTERACTIONS =====
    initProjectInteractions() {
        // Hexagonal project interactions
        document.querySelectorAll('.hex-item').forEach(hex => {
            const hexInner = hex.querySelector('.hex-inner');
            
            hex.addEventListener('click', () => {
                this.toggleHexDetails(hex);
            });

            hex.addEventListener('mouseenter', () => {
                this.highlightHex(hex);
            });

            hex.addEventListener('mouseleave', () => {
                this.removeHexHighlight(hex);
            });
        });

        // Navigation dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.updateNavDots(index);
            });
        });

        // Auto-cycle through navigation dots
        this.startNavAnimation();
    }

    toggleHexDetails(hex) {
        const hexInner = hex.querySelector('.hex-inner');
        const isFlipped = hexInner.style.transform.includes('rotateY(180deg)');
        
        if (isFlipped) {
            hexInner.style.transform = 'rotateY(0deg)';
        } else {
            hexInner.style.transform = 'rotateY(180deg)';
        }

        // Add visual feedback
        hex.style.transform = 'scale(1.1)';
        setTimeout(() => {
            hex.style.transform = '';
        }, 300);
    }

    highlightHex(hex) {
        // Create subtle glow effect
        hex.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
        
        // Enhance other hexagons' opacity
        document.querySelectorAll('.hex-item').forEach(otherHex => {
            if (otherHex !== hex) {
                otherHex.style.opacity = '0.7';
            }
        });
    }

    removeHexHighlight(hex) {
        hex.style.filter = '';
        
        // Reset all hexagons' opacity
        document.querySelectorAll('.hex-item').forEach(otherHex => {
            otherHex.style.opacity = '';
        });
    }

    updateNavDots(activeIndex) {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });

        // Create a subtle animation effect
        this.animateHexGrid(activeIndex);
    }

    animateHexGrid(phase) {
        const hexItems = document.querySelectorAll('.project-hex');
        
        hexItems.forEach((hex, index) => {
            const delay = index * 0.1;
            hex.style.animation = `hexFloat 1s ease ${delay}s`;
            
            // Reset animation
            setTimeout(() => {
                hex.style.animation = '';
            }, 1000 + delay * 1000);
        });
    }

    startNavAnimation() {
        let currentDot = 0;
        const totalDots = document.querySelectorAll('.dot').length;
        
        setInterval(() => {
            this.updateNavDots(currentDot);
            currentDot = (currentDot + 1) % totalDots;
        }, 3000);
    }

    // Enhanced hover effects for better interaction
    initHexHoverEffects() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hexFloat {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.05); }
            }
            
            .hex-item.featured-hex:hover {
                animation: hexPulse 1.5s ease-in-out infinite;
            }
            
            @keyframes hexPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== CUSTOM CURSOR =====
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Disable on mobile

        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');

        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';

            this.cursorOutline.style.left = e.clientX + 'px';
            this.cursorOutline.style.top = e.clientY + 'px';
        });

        // Hover effects
        document.querySelectorAll('a, button, .nav-toggle, .project-nav-btn, .indicator').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursorDot.style.opacity = '0';
            this.cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursorDot.style.opacity = '1';
            this.cursorOutline.style.opacity = '1';
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.throttle = this.throttle.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }
}

// ===== LOADING ANIMATION =====
class LoadingManager {
    constructor() {
        this.initLoader();
    }

    initLoader() {
        // Create loading overlay
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-text">SV</div>
                <div class="loader-progress">
                    <div class="loader-bar"></div>
                </div>
            </div>
        `;

        // Add loader styles
        const loaderStyles = `
            .loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-text {
                font-size: 4rem;
                font-weight: 900;
                color: white;
                letter-spacing: 0.2em;
                margin-bottom: 2rem;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .loader-progress {
                width: 200px;
                height: 2px;
                background: rgba(255, 255, 255, 0.1);
                margin: 0 auto;
                overflow: hidden;
            }
            
            .loader-bar {
                width: 0%;
                height: 100%;
                background: white;
                transition: width 0.3s ease;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;

        // Inject styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loaderStyles;
        document.head.appendChild(styleSheet);

        // Add loader to DOM
        document.body.appendChild(loader);

        // Simulate loading progress
        this.simulateLoading(loader);
    }

    simulateLoading(loader) {
        const progressBar = loader.querySelector('.loader-bar');
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    new LoadingManager();
    
    // Initialize portfolio after a short delay
    setTimeout(() => {
        new MinimalPortfolio();
        new PerformanceOptimizer();
    }, 1000);
});

// ===== UTILITY FUNCTIONS =====
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
