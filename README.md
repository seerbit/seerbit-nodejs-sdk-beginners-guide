## Summary

This project demonstrates how to integrate the SeerBit Standard Checkout payment flow in a Node.js + Express API. It loads configuration from environment variables, initializes the SeerBit SDK, exposes a `/api/standard-checkout` endpoint to create payment links, and includes built‑in health checks and error handling. Follow the sections below to get started quickly.


## Table of Contents

- [Summary](#summary)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
  - [Standard Checkout](#standard-checkout)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)


## Features

* **SeerBit Standard Checkout** integration for secure payment link generation ([GitHub][1])
* **Express.js** REST API with JSON parsing and CORS support ([Express][2])
* **Environment‑based configuration** using `dotenv` ([GitHub][1])
* **Health‑check endpoint** (`GET /`) to verify server status ([Express][2])
* **Global error handler** for consistent HTTP 500 responses ([GitHub][3])


## Prerequisites

* **Node.js v14+** and **npm** installed on your machine ([GitHub][1])
* A **SeerBit merchant account** with your Public & Secret keys and Bearer Token ([doc.seerbit.com][4])
* **Git** for version control (optional)


## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**

   ```bash
   npm install express cors dotenv seerbit-nodejs
   ```

   * `express` for the web framework ([Express][2])
   * `cors` for Cross‑Origin Resource Sharing ([npm][5])
   * `dotenv` to load `.env` files ([GitHub][1])
   * `seerbit-nodejs` for SeerBit SDK ([GitHub][1])


## Configuration

Create a `.env` file in the project root with the following variables:

```env
PUBLIC_KEY=sbpub_xxx
SECRET_KEY=sbsec_xxx
BEARER_TOKEN=eyJhbGci…
PORT=8000
```

* `PUBLIC_KEY`, `SECRET_KEY`, and `BEARER_TOKEN` come from your SeerBit dashboard ([GitHub][1])
* `PORT` defines which port the server listens on (default: `8000`)


## Running the Server

Start the Express server:

```bash
node app.js
```

You should see:

```
✅ Listening on port 8000
```

To auto‑reload on changes during development, use **nodemon**:

````bash
npx nodemon app.js
``` :contentReference[oaicite:12]{index=12}  


## API Endpoints

### Health‑Check  
```http
GET /
````

**Response:**

* `200 OK` with body `"Server is up and running"` ([Express][2])

### Standard Checkout

```http
POST /api/standard-checkout
Content-Type: application/json
```

**Body Parameters:**

* `fullName` (string)
* `amount` (number)
* `currency` (string, e.g., `NGN`)
* `country` (string, ISO code)
* `email` (string)

**Success (201):**

```json
{ "response": { /* SeerBit API response */ } }
```

Under the hood, this uses SeerBit’s `/payment/initialize` endpoint to generate a checkout link ([doc.seerbit.com][4]).


## Error Handling

* **SDK Initialization Errors** log “⛔ SDK init failed” and exit if configuration is invalid.
* **Route Errors** bubble up to a global handler that returns `500 Internal Server Error` with a generic message.
* **Unhandled Routes** return `404 Not Found`. (You can add a catch‑all middleware if desired.) ([GitHub][3])


## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m "Add awesome feature"`
4. Push to your branch: `git push origin feature/awesome-feature`
5. Open a Pull Request

Please ensure all new code is covered by tests and follows existing style conventions.


## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details. ([GitHub][1])

[1]: https://github.com/seerbit/seerbit-nodejs "SeerBit NodeJS SDK - GitHub"
[2]: https://expressjs.com/en/starter/hello-world.html "Hello world example - Express.js"
[3]: https://github.com/expressjs/express/blob/master/Readme.md "express/Readme.md at master · expressjs/express - GitHub"
[4]: https://doc.seerbit.com/online-payment/integration-type/standard-checkout "Standard Checkouts - SeerBit"
[5]: https://www.npmjs.com/package/cors "cors - NPM"
