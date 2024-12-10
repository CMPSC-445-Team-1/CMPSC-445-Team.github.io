# Dog and Cat Breed Classification Web Application

A web-based application that uses machine learning to classify dog and cat breeds from uploaded images.

![Screenshot 2024-10-01 161723](https://github.com/user-attachments/assets/5697afc9-2890-4d86-bb5d-b9515ee430f1)

Features
Image Classification

    Upload and classify images of dogs and cats
    Real-time breed prediction
    Support for 120+ dog breeds and 12 cat breeds
    User-friendly interface with visual feedback

Technical Components

    Machine learning model for breed classification
    kNN classifier for digit recognition
    REST API endpoints for model interaction
    Base64 image encoding/decoding support

Architecture
Frontend

    HTML5 and JavaScript interface
    Responsive design with custom styling
    Image upload and display functionality
    Real-time classification results display

Backend

    Flask server handling API requests
    TensorFlow/Keras model for breed classification
    scikit-learn implementation for digit recognition
    PIL for image processing

    
Model Information

Supported Classifications

    Dogs: 108 breeds including popular breeds like Husky, German Shepherd, and Golden Retriever
    Cats: 12 breeds including Persian, Siamese, and Maine Coon

Performance Metrics

    Model evaluation available through the /result endpoint
    Metrics include accuracy, precision, and recall scores

Project Structure

    index.html: Main application interface
    main.js: Frontend logic and API interactions
    server.py: Flask server implementation
    ml.py: Machine learning model implementation
    test_model_python.py: Model testing and prediction logic
    model.tf: Trained TensorFlow model files
