// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the 3D model if Three.js is available and the container exists
    if (typeof THREE !== 'undefined' && document.getElementById('model3D')) {
        initModel();
    }
});

function initModel() {
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);
    
    // Add renderer to DOM
    const container = document.getElementById('model3D');
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x4D61FC, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create a floating laptop model or cube as placeholder
    let laptop;
    
    // Try to load custom model if available
    try {
        // Attempt to load a GLTF model (more realistic)
        const loader = new THREE.GLTFLoader();
        loader.load(
            'models/laptop.glb', // Path to your model
            function (gltf) {
                laptop = gltf.scene;
                laptop.scale.set(1, 1, 1);
                scene.add(laptop);
            },
            undefined,
            function (error) {
                console.error('An error occurred loading the model:', error);
                createFallbackGeometry();
            }
        );
    } catch (e) {
        // Fallback if GLTFLoader is not available or errors
        console.log('Using fallback geometry:', e);
        createFallbackGeometry();
    }
    
    function createFallbackGeometry() {
        // Create a custom laptop-like shape using basic geometries
        laptop = new THREE.Group();
        
        // Laptop base
        const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
        const baseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            shininess: 100 
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        
        // Laptop screen
        const screenGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.1);
        const screenMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x111111,
            shininess: 100 
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 1;
        screen.position.z = -0.9;
        screen.rotation.x = Math.PI / 6; // Tilt the screen a bit
        
        // Screen display
        const displayGeometry = new THREE.PlaneGeometry(2.6, 1.6);
        const displayMaterial = new THREE.MeshBasicMaterial({
            color: 0x4D61FC,
            opacity: 0.9,
            transparent: true
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.z = 0.06;
        screen.add(display);
        
        // Add code-like texture to the screen
        const createCodeTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const context = canvas.getContext('2d');
            
            // Fill background
            context.fillStyle = '#1E1E3F';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw code-like lines
            const lineCount = 30;
            const lineHeight = canvas.height / lineCount;
            
            for (let i = 0; i < lineCount; i++) {
                // Randomize line lengths
                const lineWidth = Math.random() * 0.7 + 0.2; // 20% to 90% width
                
                // Choose color based on code syntax highlighting
                const colors = ['#FAEFA5', '#9EFFFF', '#A5FF90', '#FF9D00', '#FF628C'];
                const colorIndex = Math.floor(Math.random() * colors.length);
                
                // Draw line
                context.fillStyle = colors[colorIndex];
                context.fillRect(
                    20, 
                    i * lineHeight + lineHeight * 0.3, 
                    canvas.width * lineWidth, 
                    lineHeight * 0.4
                );
            }
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };
        
        display.material.map = createCodeTexture();
        display.material.needsUpdate = true;
        
        // Keyboard on base
        const keyboardGeometry = new THREE.PlaneGeometry(2.6, 1.6);
        const keyboardMaterial = new THREE.MeshBasicMaterial({
            color: 0x222222
        });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.rotation.x = -Math.PI / 2;
        keyboard.position.y = 0.11;
        keyboard.position.z = 0.2;
        
        // Add keyboard keys
        const keysGroup = new THREE.Group();
        const keySize = 0.15;
        const keySpacing = 0.17;
        const keyGeometry = new THREE.BoxGeometry(keySize, 0.02, keySize);
        const keyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x444444,
            shininess: 30 
        });
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 12; col++) {
                const key = new THREE.Mesh(keyGeometry, keyMaterial);
                key.position.set(
                    (col - 5.5) * keySpacing, 
                    0.01, 
                    (row - 2) * keySpacing
                );
                keysGroup.add(key);
            }
        }
        
        keyboard.add(keysGroup);
        
        // Assemble laptop
        laptop.add(base);
        laptop.add(screen);
        laptop.add(keyboard);
        
        // Position and add to scene
        laptop.rotation.x = -Math.PI / 12;
        laptop.position.y = -0.5;
        scene.add(laptop);
    }
    
    // Create floating code particles
    const particles = new THREE.Group();
    scene.add(particles);
    
    const codeParticles = [];
    
    // Add particles
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0x4D61FC : 0xFE5E41,
            transparent: true,
            opacity: 0.7
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Randomize position around the laptop
        particle.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
        );
        
        // Store additional properties for animation
        particle.userData = {
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.04 - 0.02,
            direction: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize()
        };
        
        particles.add(particle);
        codeParticles.push(particle);
    }
    
    // Add simple orbit control for interactivity
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };
    
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging && laptop) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            if (previousMousePosition.x === 0 && previousMousePosition.y === 0) {
                deltaMove.x = 0;
                deltaMove.y = 0;
            }
            
            laptop.rotation.y += deltaMove.x * 0.01;
            laptop.rotation.x += deltaMove.y * 0.01;
            
            laptop.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, laptop.rotation.x));
        }
        
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        if (window.innerWidth <= 768) {
            renderer.setSize(300, 300);
        } else {
            renderer.setSize(500, 500);
        }
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the laptop slightly for floating effect
        if (laptop) {
            laptop.rotation.y += 0.003;
            laptop.position.y = Math.sin(Date.now() * 0.001) * 0.1 - 0.5;
        }
        
        // Animate particles
        codeParticles.forEach(particle => {
            // Move in the particle's direction
            particle.position.add(
                particle.userData.direction.clone().multiplyScalar(particle.userData.speed)
            );
            
            // Rotate the particle
            particle.rotation.x += particle.userData.rotationSpeed;
            particle.rotation.y += particle.userData.rotationSpeed;
            
            // Check boundaries and reset if needed
            if (
                Math.abs(particle.position.x) > 5 ||
                Math.abs(particle.position.y) > 5 ||
                Math.abs(particle.position.z) > 5
            ) {
                // Reset position and direction
                particle.position.set(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                );
                
                particle.userData.direction = new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize();
            }
        });
        
        // Rotate the entire particles group
        particles.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
} 