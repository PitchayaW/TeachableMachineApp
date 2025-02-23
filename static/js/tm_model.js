// The URL of your exported Teachable Machine model
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/AwQyYUDMEp/';
let model;

async function initializeTensorFlow() {
    try {
        // Wait for TensorFlow.js to be ready
        await tf.ready();

        // Try WebGL first
        if (tf.getBackend() !== 'webgl') {
            console.log('WebGL not available, trying CPU fallback...');
            await tf.setBackend('cpu');
        }

        console.log('Using backend:', tf.getBackend());
        return true;
    } catch (error) {
        console.error('Failed to initialize TensorFlow.js:', error);
        return false;
    }
}

async function loadModel() {
    const modelURL = MODEL_URL + 'model.json';
    const metadataURL = MODEL_URL + 'metadata.json';

    try {
        // Initialize TensorFlow.js first
        const initialized = await initializeTensorFlow();
        if (!initialized) {
            throw new Error('Failed to initialize TensorFlow.js');
        }

        // Load the model
        model = await tmImage.load(modelURL, metadataURL);
        console.log('Model loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading model:', error);
        return false;
    }
}

async function predict(image) {
    if (!model) {
        throw new Error('Model not loaded');
    }

    try {
        const prediction = await model.predict(image);
        return prediction.sort((a, b) => b.probability - a.probability)[0];
    } catch (error) {
        console.error('Prediction error:', error);
        throw new Error('Failed to analyze image');
    }
}