import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

// Initialize WebGL backend
await tf.setBackend('webgl');
await tf.ready();

// Constants for image processing
const IMAGE_SIZE = 224;
const CHANNELS = 3;

// Cloud type classifications
export const CLOUD_TYPES = {
  NORMAL: 'normal',
  PYROCUMULONIMBUS: 'pyro',
} as const;

export type CloudType = typeof CLOUD_TYPES[keyof typeof CLOUD_TYPES];

// Risk levels based on confidence scores
const RISK_LEVELS = {
  LOW: { threshold: 0.3, label: 'low' },
  MEDIUM: { threshold: 0.6, label: 'medium' },
  HIGH: { threshold: 0.8, label: 'high' },
} as const;

export type RiskLevel = typeof RISK_LEVELS[keyof typeof RISK_LEVELS]['label'];

// Weather predictions based on cloud type and confidence
const WEATHER_PREDICTIONS = {
  [CLOUD_TYPES.NORMAL]: [
    'Clear conditions expected',
    'Light precipitation possible',
    'Moderate rainfall expected',
  ],
  [CLOUD_TYPES.PYROCUMULONIMBUS]: [
    'Potential for dry lightning',
    'High risk of fire-triggered storms',
    'Severe convective activity likely',
  ],
};

export interface AnalysisResult {
  type: CloudType;
  confidence: number;
  prediction: string;
  risk: RiskLevel;
  estimatedTime: string;
}

interface ModelStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
}

class CloudModel {
  private model: tf.LayersModel | null = null;
  private status: ModelStatus = {
    isLoaded: false,
    isLoading: false,
    error: null,
  };

  async loadModel(): Promise<void> {
    if (this.status.isLoaded || this.status.isLoading) return;

    this.status.isLoading = true;
    try {
      // Load the model architecture and weights
      this.model = await tf.loadLayersModel('/models/cloud_model/model.json');
      console.log('Cloud detection model loaded successfully');
      this.status.isLoaded = true;
    } catch (error) {
      console.warn('Error loading primary model, falling back to MobileNet:', error);
      try {
        this.model = await tf.loadLayersModel(
          'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
        );
        this.status.isLoaded = true;
      } catch (fallbackError) {
        const err = new Error('Failed to load both primary and fallback models');
        this.status.error = err;
        throw err;
      }
    } finally {
      this.status.isLoading = false;
    }
  }

  private async preprocessImage(imageData: string): Promise<tf.Tensor4D> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const tensor = tf.tidy(() => {
            // Convert the image to a tensor and ensure proper shape
            const imageTensor = tf.browser.fromPixels(img)
              .resizeBilinear([IMAGE_SIZE, IMAGE_SIZE])
              .toFloat()
              .expandDims(0);
            
            // Normalize the image
            return tf.div(imageTensor, 255.0) as tf.Tensor4D;
          });
          resolve(tensor);
        } catch (error) {
          reject(new Error('Failed to process image: ' + error.message));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });
  }

  private getRiskLevel(confidence: number): RiskLevel {
    if (confidence >= RISK_LEVELS.HIGH.threshold) return RISK_LEVELS.HIGH.label;
    if (confidence >= RISK_LEVELS.MEDIUM.threshold) return RISK_LEVELS.MEDIUM.label;
    return RISK_LEVELS.LOW.label;
  }

  private getPrediction(type: CloudType, confidence: number): string {
    const predictions = WEATHER_PREDICTIONS[type];
    const index = Math.min(
      Math.floor(confidence * predictions.length),
      predictions.length - 1
    );
    return predictions[index];
  }

  private getEstimatedTime(): string {
    const now = new Date();
    now.setHours(now.getHours() + Math.floor(Math.random() * 3) + 1);
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  async analyzeImage(imageData: string): Promise<AnalysisResult> {
    if (!this.status.isLoaded) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model not initialized');
    }

    let imageTensor: tf.Tensor4D | null = null;
    let predictions: tf.Tensor | null = null;

    try {
      imageTensor = await this.preprocessImage(imageData);
      
      // Make prediction and ensure proper typing
      predictions = this.model.predict(imageTensor) as tf.Tensor;
      
      // Convert predictions to array
      const probabilities = await predictions.data();
      
      // Get the highest probability class
      const maxProbIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)));
      const confidence = probabilities[maxProbIndex];
      
      // Determine cloud type
      const type = confidence > 0.6 ? CLOUD_TYPES.PYROCUMULONIMBUS : CLOUD_TYPES.NORMAL;
      
      // Calculate risk level
      const risk = this.getRiskLevel(confidence);
      
      // Get weather prediction
      const prediction = this.getPrediction(type, confidence);
      
      // Estimate time
      const estimatedTime = this.getEstimatedTime();

      return {
        type,
        confidence: parseFloat((confidence * 100).toFixed(2)),
        prediction,
        risk,
        estimatedTime,
      };
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    } finally {
      // Clean up tensors
      if (imageTensor) tf.dispose(imageTensor);
      if (predictions) tf.dispose(predictions);
    }
  }

  // Method to check model status
  getStatus(): ModelStatus {
    return { ...this.status };
  }
}

// Export a singleton instance
export const cloudModel = new CloudModel();