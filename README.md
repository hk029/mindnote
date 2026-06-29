# 心念日记

记录起心动念的小程序。

## Project Structure

```
xinnian-diary/
├── miniprogram/     # Taro frontend
│   ├── src/         # Source code
│   ├── config/      # Taro config
│   └── package.json
├── server/          # Go backend
│   ├── main.go      # Entry point
│   ├── handler/     # HTTP handlers
│   ├── go.mod       # Go module
│   └── go.sum       # Go dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 16
- Go >= 1.21
- WeChat Developer Tools

### Frontend (Taro)

1. Install dependencies:
   ```bash
   cd miniprogram
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev:weapp
   ```

3. Open WeChat Developer Tools and import the `miniprogram` directory.

### Backend (Go)

1. Install dependencies:
   ```bash
   cd server
   go mod tidy
   ```

2. Start the server:
   ```bash
   go run main.go
   ```

The server will run on port 8080.

## API Endpoints

- `GET /api/hello` - Returns a hello world message

## Development

### Frontend Development

The frontend is built with Taro and React. Key files:

- `src/app.tsx` - App entry point
- `src/pages/index/index.tsx` - Main page
- `config/index.ts` - Taro configuration

### Backend Development

The backend is built with Go and Fiber. Key files:

- `main.go` - Server entry point
- `handler/hello.go` - Hello world handler
- `router/router.go` - Route definitions

## Building for Production

### Frontend

```bash
cd miniprogram
npm run build:weapp
```

### Backend

```bash
cd server
go build -o server main.go
./server
```

## Configuration

### Frontend Configuration

Edit `miniprogram/config/index.ts` to configure Taro settings.

### Backend Configuration

Edit `server/.env` to configure server settings:

```env
PORT=8080
GIN_MODE=release
```

## License

MIT
