# Contributing to Pomodoro App

Thank you for your interest in contributing to the Pomodoro App! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development services**
   ```bash
   # Using Docker (recommended)
   docker-compose up -d
   
   # Or use the development script
   ./scripts/dev.sh
   ```

5. **Run database migrations**
   ```bash
   cd packages/database
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Hotfix branches

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```bash
feat(auth): add social login with Google
fix(timer): resolve pause/resume state issue
docs: update API documentation
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Run quality checks**
   ```bash
   npm run lint
   npm run format:check
   npm run type-check
   npm run test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Create a pull request with:
   - Clear description of changes
   - Link to related issues
   - Screenshots if UI changes
   - Test instructions

## 🏗️ Project Structure

```
pomodoro-app/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Node.js backend
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   └── database/     # Prisma database schema
├── scripts/          # Build and deployment scripts
└── .github/          # GitHub workflows and templates
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test apps/api/src/controllers/auth.test.ts
```

### Writing Tests

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write E2E tests for critical user flows
- Aim for >80% test coverage

### Test Structure

```typescript
describe('AuthController', () => {
  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      // Arrange
      const credentials = { email: 'test@example.com', password: 'password' }
      
      // Act
      const result = await authController.login(credentials)
      
      // Assert
      expect(result.accessToken).toBeDefined()
      expect(result.refreshToken).toBeDefined()
    })
  })
})
```

## 📋 Code Style

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### API Endpoints

```typescript
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, projectId } = req.body
  const userId = req.user.id

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      userId
    }
  })

  res.status(201).json({
    success: true,
    data: task
  })
})
```

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, etc.)
- Screenshots or error logs if applicable

## 💡 Feature Requests

For feature requests, please provide:

- Clear description of the feature
- Use case and motivation
- Proposed implementation (if any)
- Alternative solutions considered

## 📖 Documentation

- Update README.md for setup changes
- Document new API endpoints in the API documentation
- Add JSDoc comments for new functions
- Update type definitions for new interfaces

## 🔒 Security

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Follow security best practices
- Report security vulnerabilities privately

## 📞 Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join our Discord community (if available)
- Contact maintainers directly for sensitive issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🎉