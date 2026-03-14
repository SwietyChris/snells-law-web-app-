const REFRACTIVE_INDICES = {
    air: 1.0003,
    water: 1.333,
    glass: 1.5,
    silicon: 3.42,
    diamond: 2.42,
    plastic: 1.49
};

function snellsLaw(n1, n2, theta1) {
    const theta1Rad = theta1 * Math.PI / 180;
    const sinTheta2 = n1 * Math.sin(theta1Rad) / n2;
    if (Math.abs(sinTheta2) > 1) {
        return null; // Total internal reflection
    }
    const theta2Rad = Math.asin(sinTheta2);
    return theta2Rad * 180 / Math.PI;
}

document.getElementById('snellForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const n1 = REFRACTIVE_INDICES[document.getElementById('n1').value];
    const n2 = REFRACTIVE_INDICES[document.getElementById('n2').value];
    const theta1 = parseFloat(document.getElementById('theta1').value);
    let result = '';
    if (isNaN(theta1) || theta1 < 0 || theta1 > 90) {
        result = 'Please enter a valid incident angle (0-90 degrees).';
    } else {
        const theta2 = snellsLaw(n1, n2, theta1);
        if (theta2 === null) {
            result = 'Total internal reflection occurs.';
        } else {
            result = `Refracted angle: ${theta2.toFixed(2)} degrees`;
        }
    }
    document.getElementById('result').textContent = result;
});
