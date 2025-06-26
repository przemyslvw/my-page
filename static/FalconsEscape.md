# FalconsEscape - Technical Specification

## Overview

FalconsEscape is a 2D browser-based platformer game where players control a falcon navigating through various levels, avoiding obstacles, and collecting power-ups. Built with Angular 17+ and Firebase for real-time game state synchronization, the game features both single-player and multiplayer modes.

## Technical Stack

### Core Technologies

- **Frontend Framework**: Angular 17+
- **Language**: TypeScript 5.2+
- **Game Engine**: HTML5 Canvas with custom engine integrated with Angular
- **State Management**: NgRx (for complex state) / Signals (for component state)
- **Backend**: Firebase (Firestore, Authentication, Hosting, Cloud Functions)
- **Styling**: SCSS with Angular Material or Tailwind CSS
- **Build Tools**: Angular CLI, ESBuild (via Angular CLI)
- **Testing**: Jest 29+ with Angular Testing Library, Cypress Component Testing
- **Linting/Formatting**: ESLint, Prettier with Angular-specific rules

## Game Architecture

### 1. Project Structure

```
src/
├── app/
│   ├── core/                  # Singleton services, guards, interceptors
│   ├── features/              # Feature modules
│   │   ├── game/              # Game module
│   │   │   ├── components/     # Dumb components
│   │   │   ├── containers/     # Smart components
│   │   │   ├── services/       # Game services
│   │   │   ├── store/          # NgRx store (if using)
│   │   │   └── game.module.ts
│   │   └── ...
│   ├── shared/               # Shared module with common components
│   └── app.component.*
├── assets/
├── environments/             # Environment configurations
└── main.ts                   # Application entry point
```

### 2. Core Game Service

```typescript
@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  private gameState: WritableSignal<GameState> = signal<GameState>(initialGameState);
  private animationFrameId: number | null = null;

  // Expose state as read-only signal
  public readonly state = this.gameState.asReadonly();

  constructor() {
    // Initialize game loop
    this.gameLoop(performance.now());
  }

  private gameLoop(timestamp: number): void {
    const deltaTime = this.calculateDeltaTime(timestamp);
    this.updateGameState(deltaTime);
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // Cleanup on service destruction
  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // ... rest of the implementation
}
```

### 3. Game Component with Standalone Architecture

```typescript
@Component({
  selector: 'app-game-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #gameCanvas width="800" height="600"></canvas>
    <div class="hud" *ngIf="gameState() as state">
      <div class="score">Score: {{ state.score }}</div>
      <div class="level">Level: {{ state.level }}</div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
      canvas {
        background: #000;
        display: block;
      }
      .hud {
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
      }
    `,
  ],
})
export class GameCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  constructor(private gameEngine: GameEngineService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not initialize canvas context');
    this.ctx = ctx;

    // Subscribe to game state changes
    effect(() => {
      this.render(this.gameEngine.state());
    });
  }

  private render(state: GameState): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Render game objects
    state.players.forEach((player) => this.renderPlayer(player));
    state.obstacles.forEach((obstacle) => this.renderObstacle(obstacle));
    // ... other render methods
  }

  // ... rest of the implementation
}
```

### 4. Firebase Integration with AngularFire

#### Firebase Module

```typescript
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  // Your Firebase config
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore).catch(console.error);
      return firestore;
    }),
    provideAuth(() => getAuth()),
    // ... other providers
  ],
};
```

#### Game Session Service

```typescript
@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Create a new game session
  async createSession(): Promise<string> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const sessionRef = doc(collection(this.firestore, 'sessions'));
    const session: GameSession = {
      id: sessionRef.id,
      players: [userId],
      state: initialGameState,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
    };

    await setDoc(sessionRef, session);
    return sessionRef.id;
  }

  // Listen to game state changes
  listenToSession(sessionId: string): Observable<GameSession> {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    return docData(sessionRef) as Observable<GameSession>;
  }

  // Update game state
  async updateGameState(sessionId: string, state: Partial<GameState>): Promise<void> {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      state: state,
      updatedAt: serverTimestamp(),
    });
  }
}
```

## Implementation Phases

### Phase 1: Core Game Setup

- [ ] Set up Angular 17+ project with standalone components
- [ ] Configure Firebase with AngularFire
- [ ] Implement basic game loop with Signals
- [ ] Create canvas rendering system

### Phase 2: Game Features

- [ ] Implement player movement and physics
- [ ] Add collision detection
- [ ] Create level generation system
- [ ] Implement scoring and game state management

### Phase 3: Firebase Integration

- [ ] Set up Firestore data models
- [ ] Implement real-time multiplayer synchronization
- [ ] Add user authentication
- [ ] Create matchmaking system

### Phase 4: Polish & Performance

- [ ] Optimize rendering with Web Workers
- [ ] Add animations and visual effects
- [ ] Implement sound system
- [ ] Add analytics and error tracking

## Development Setup

```bash
# Install Angular CLI globally
npm install -g @angular/cli@latest

# Create new Angular project with routing and SCSS
ng new falcons-escape --standalone --routing --style=scss

# Install dependencies
cd falcons-escape
ng add @angular/fire
npm install @angular/material @angular/cdk

# Start development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test
```

## Deployment

The application will be deployed to Firebase Hosting with automated CI/CD using GitHub Actions. The deployment process includes:

1. Building the Angular application in production mode
2. Deploying to Firebase Hosting
3. Setting up Firebase Hosting rewrites for Angular's client-side routing
4. Configuring caching and security headers

## License

MIT License - See [LICENSE](LICENSE) for details.
