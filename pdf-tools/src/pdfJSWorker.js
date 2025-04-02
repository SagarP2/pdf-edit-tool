// This file provides a mock implementation of PDF.js features that require WASM
// to prevent build errors while still allowing the app to function

// Mock implementation of PDF.js worker features
const mockWorker = {
  // Required to satisfy imports
  WorkerMessageHandler: {
    setup: () => {},
  }
};

export default mockWorker; 