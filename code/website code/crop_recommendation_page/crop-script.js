// --- CROP PREDICTION LOGIC ---

function predictCrop() {
    // 1. Get Values
    const n = parseFloat(document.getElementById('valN').value);
    const p = parseFloat(document.getElementById('valP').value);
    const k = parseFloat(document.getElementById('valK').value);
    const ph = parseFloat(document.getElementById('valPH').value);
    const rain = parseFloat(document.getElementById('valRain').value);

    // 2. Validate (Simple check)
    if (isNaN(n) || isNaN(p) || isNaN(k) || isNaN(ph) || isNaN(rain)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // 3. Button Loading State
    const btn = document.querySelector('.btn-predict');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Soil...';
    btn.disabled = true;

    // 4. Mock Logic (Replace with real API call later)
    let recommendedCrop = "Rice"; // Default

    // Simple Rule-Based Logic for Demo
    if (n > 80 && rain > 200) {
        recommendedCrop = "Rice";
    } else if (n < 50 && p < 50 && rain < 100) {
        recommendedCrop = "Moth Beans";
    } else if (k > 100 && ph > 6.0) {
        recommendedCrop = "Grapes";
    } else if (ph < 5.5) {
        recommendedCrop = "Tea";
    } else if (rain < 50) {
        recommendedCrop = "Watermelon";
    } else if (n > 100 && k > 50) {
        recommendedCrop = "Banana";
    } else if (ph > 7.5) {
        recommendedCrop = "Barley";
    } else {
        recommendedCrop = "Maize"; // Fallback
    }

    // 5. Display Result after Delay (Simulating AI processing)
    setTimeout(() => {
        // Hide Form slightly (Optional visual cue)
        
        // Update Result Data
        document.getElementById('cropOutput').innerText = recommendedCrop;
        
        // Show Result Box
        const resultBox = document.getElementById('resultBox');
        resultBox.style.display = 'block';
        
        // Scroll to Result
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset Button
        btn.innerHTML = originalText;
        btn.disabled = false;

    }, 1500);
}

// Reset Function
function resetTool() {
    document.getElementById('cropForm').reset();
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('cropForm').scrollIntoView({ behavior: 'smooth' });
}