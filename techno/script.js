const materials = {
    beton: {
        name: 'Béton',
        color: '#424242',
        limits: {
            flexion: 150,
            compression: 800,
            traction: 100
        },
        info: "Le béton est excellent en compression mais faible en traction. C'est pourquoi on l'utilise souvent avec de l'acier pour le renforcer."
    },
    betonArme: {
        name: 'Béton Armé',
        color: '#333333',
        limits: {
            flexion: 300,
            compression: 900,
            traction: 250
        },
        info: "Le béton armé combine la résistance à la compression du béton et la résistance à la traction de l'acier, le rendant très polyvalent."
    },
    bois: {
        name: 'Bois',
        color: '#3e2723',
        limits: {
            flexion: 200,
            compression: 350,
            traction: 150
        },
        info: "Le bois est un matériau naturel léger et résistant. Il est particulièrement bon en flexion et peut supporter des charges importantes pour son poids."
    },
    acier: {
        name: 'Acier',
        color: '#212121',
        limits: {
            flexion: 800,
            compression: 1000,
            traction: 900
        },
        info: "L'acier est le plus résistant de ces matériaux. Il peut supporter des forces importantes dans toutes les directions."
    }
};

let currentMaterial = 'beton';
let currentForce = 'flexion';
let currentWeight = 1;

const weightSlider = document.getElementById('weight-slider');
const weightDisplay = document.getElementById('weight-display');
const bridgeDeck = document.querySelector('.bridge-deck');
const statusMessage = document.getElementById('status-message');
const materialInfo = document.getElementById('material-info');
const themeToggle = document.querySelector('.theme-toggle');

document.querySelectorAll('.material-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMaterial = btn.dataset.material;
        updateBridge();
    });
});

document.querySelectorAll('.force-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.force-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentForce = btn.dataset.force;
        updateBridge();
    });
});

weightSlider.addEventListener('input', (e) => {
    currentWeight = parseInt(e.target.value);
    weightDisplay.textContent = `${currentWeight} kg`;
    updateBridge();
});

function updateBridge() {
    const material = materials[currentMaterial];
    const limit = material.limits[currentForce];
    const percentage = (currentWeight / limit) * 100;

    bridgeDeck.style.backgroundColor = material.color;
    materialInfo.textContent = material.info;

    const forceIndicator = document.querySelector('.force-indicator');
    forceIndicator.classList.remove('safe', 'warning', 'danger', 'broken');

    if (percentage <= 33) {
        forceIndicator.classList.add('safe');
        statusMessage.textContent = "État: Sûr ✅";
        statusMessage.style.color = "#4caf50";
    } else if (percentage <= 66) {
        forceIndicator.classList.add('warning');
        statusMessage.textContent = "État: Attention ⚠️";
        statusMessage.style.color = "#ffd740";
    } else if (percentage <= 100) {
        forceIndicator.classList.add('danger');
        statusMessage.textContent = "État: Danger ⚠️";
        statusMessage.style.color = "#ff5252";
    } else {
        forceIndicator.classList.add('broken');
        statusMessage.textContent = "État: Rupture! 💥";
        statusMessage.style.color = "#d32f2f";
    }

    switch(currentForce) {
        case 'flexion':
            forceIndicator.style.bottom = 'calc(50% + 30px)';
            break;
        case 'compression':
            forceIndicator.style.bottom = 'calc(50% + 38px)';
            break;
        case 'traction':
            forceIndicator.style.bottom = 'calc(50% + 22px)';
            break;
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
} else {
    document.body.classList.remove('light-mode');
}
