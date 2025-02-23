document.addEventListener('DOMContentLoaded', async () => {
    const imageUpload = document.getElementById('imageUpload');
    const preview = document.getElementById('preview');
    const imagePreview = document.getElementById('imagePreview');
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');

    // Load the model when the page loads
    loading.classList.remove('d-none');
    const modelLoaded = await loadModel();
    loading.classList.add('d-none');

    if (!modelLoaded) {
        alert('Error loading the model. Please try again later.');
        return;
    }

    imageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            preview.classList.remove('d-none');
            result.classList.add('d-none');
            
            // Create an image element for prediction
            const img = new Image();
            img.onload = async () => {
                loading.classList.remove('d-none');
                try {
                    const prediction = await predict(img);
                    result.textContent = `This looks like a ${prediction.className} (${(prediction.probability * 100).toFixed(2)}% confident)`;
                    result.className = 'alert alert-success';
                } catch (error) {
                    result.textContent = 'Error analyzing the image. Please try again.';
                    result.className = 'alert alert-danger';
                } finally {
                    loading.classList.add('d-none');
                    result.classList.remove('d-none');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Make sample images clickable
    document.querySelectorAll('.sample-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', async () => {
            imagePreview.src = img.src;
            preview.classList.remove('d-none');
            result.classList.add('d-none');
            loading.classList.remove('d-none');

            try {
                const prediction = await predict(img);
                result.textContent = `This looks like a ${prediction.className} (${(prediction.probability * 100).toFixed(2)}% confident)`;
                result.className = 'alert alert-success';
            } catch (error) {
                result.textContent = 'Error analyzing the image. Please try again.';
                result.className = 'alert alert-danger';
            } finally {
                loading.classList.add('d-none');
                result.classList.remove('d-none');
            }
        });
    });
});
