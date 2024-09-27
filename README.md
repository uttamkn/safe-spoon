# Safe Spoon

Safe Spoon is a web application designed to help users determine if a food product is safe to consume based on their personal health factors. By uploading an image of the food or its ingredient list and specifying allergies, age, weight, gender, and other health information, users receive immediate feedback on potential health risks.

## Features

- **Authentication with Gmail Verification**: Secure user authentication with Gmail verification through OTP and support for forgot password functionality.
- **Profile Management**: Users can manage their profiles, providing health information such as allergies, age, weight, and gender for personalized feedback.
- **OCR for Ingredient Extraction**: Optical character recognition (OCR) using Tesseract.js to extract text from uploaded images, identifying the ingredients in food products.
- **Health Feedback with TogetherAI**: Integration with TogetherAI's API to provide health risk feedback based on the user's profile and the ingredients extracted from the image.

## Technology Stack

- **Frontend**: React.js.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT and NodeMailer.
- **OCR**: Tesseract.js.
- **API Integration**: TogetherAI for health feedback.

## How It Works

1. **User Authentication**: New users can register using their Gmail account. After entering their Gmail, an OTP is sent for verification. Users can reset their password if forgotten.

2. **Profile Setup**: After signing in, users can set up their profile, providing essential health information like age, weight, gender, and known allergies.

3. **Image Upload and OCR**: Users can upload an image of its ingredient list. The app uses Tesseract.js to extract the text from the image.

4. **Personalized Health Feedback**: Once the ingredients are extracted, the app sends this data along with the user's profile information to TogetherAI, which returns personalized health feedback based on potential risks associated with the food product.

---

**Backend Repository**: [safe-spoon-server](https://github.com/uttamkn/safe-spoon-server.git)
