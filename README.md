# RealCheck

![Status](https://img.shields.io/badge/status-active-brightgreen) ![Last Commit](https://img.shields.io/github/last-commit/rounaknayee/realcheck.svg)

RealCheck is a blockchain-based application designed to ensure the authenticity of products by tracking their journey from manufacturer to consumer. Utilizing Blockchain technology and smart contracts, RealCheck provides a secure and transparent platform for manufacturers and suppliers to register and update product information, enabling consumers to verify the genuineness of their purchases.

## Features

- **Product Registration:** Manufacturers can register new products on the blockchain, creating a tamper-proof record.
- **Supply Chain Tracking:** Authorized suppliers can update product information at each stage of the supply chain.
- **Product Verification:** Consumers can scan product barcodes to retrieve the product's transaction history, ensuring its authenticity.
- **User Management:** Secure user registration and login processes for manufacturers, suppliers, and consumers, including JWT authentication.
- **Role-Based Access Control:** Differentiated access for manufacturers, suppliers, and consumers to perform actions specific to their role.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Blockchain:** Ethereum Smart Contracts
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (latest stable version)
- npm or yarn
- Docker and Docker Compose (for local testing as well as image deployment)
- Ethereum wallet with test Ether (for interacting with smart contracts)
- AWS account (for deployment in production)
- Alchemy account (for blockchain interaction)

### Setting Up the Development Environment

To set up the RealCheck application in a development environment, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rounaknayee/realcheck.git
   cd realcheck
   ```
2. **Set Environment Variables in `.env` file**:
    ```
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_DEFAULT_REGION=us-east-1
    MONGODB_URI=your_mongodb_uri
    PORT=5001
    JWT_SECRET=your_jwt_secret
    ALCHEMY_API_KEY=your_alchemy_api_key
    ALCHEMY_API_URL=your_alchemy_api_url
    CONTRACT_ADDRESS=your_contract_address
    ```
3. **Running a containerized version of application**:
    ```bash
    docker-compose -f docker-compose.dev.yml up
    ```
