#!/bin/bash
# setup.sh - Create the CampusScribe monorepo structure
set -e

echo "Setting up CampusScribe Monorepo..."

# 1. Root Setup
npm init -y > /dev/null
cat << 'EOF' > package.json
{
  "name": "campus-scribe",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "prettier": "^3.0.0"
  }
}
EOF

cat << 'EOF' > turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!-next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
EOF

cat << 'EOF' > .gitignore
node_modules
.env
.turbo
dist
build
.next
coverage
EOF

touch .env.example README.md

# 2. Packages Setup
mkdir -p packages/database/prisma/migrations packages/database/src
cat << 'EOF' > packages/database/package.json
{
  "name": "@campus-scribe/database",
  "version": "1.0.0",
  "main": "src/client.ts",
  "types": "src/client.ts",
  "dependencies": {
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0"
  }
}
EOF
touch packages/database/prisma/{schema.prisma,seed.ts}
touch packages/database/src/client.ts

mkdir -p packages/shared/src/{types,constants,utils}
cat << 'EOF' > packages/shared/package.json
{
  "name": "@campus-scribe/shared",
  "version": "1.0.0",
  "main": "src/index.ts",
  "types": "src/index.ts"
}
EOF

mkdir -p packages/config/{eslint-config,ts-config,tailwind-config}

# 3. Apps / Web Setup
# Instead of create-vite which creates its own structure we need to merge, we'll create the structure directly
mkdir -p apps/web/public/assets/logo apps/web/public/assets/images
mkdir -p apps/web/src/components/common/{Button,Input,Card,Modal,Loading,Navbar}
mkdir -p apps/web/src/components/notes/{NoteCard,NoteGrid,NotePreview,UploadForm,SearchFilters,RatingStars}
mkdir -p apps/web/src/components/auth/{LoginForm,RegisterForm,GoogleAuth,ProtectedRoute}
mkdir -p apps/web/src/components/dashboard/{SellerStats,EarningsChart,MyNotes,MyPurchases,PayoutSettings}
mkdir -p apps/web/src/components/payment/{CheckoutForm,PaymentSuccess}
mkdir -p apps/web/src/pages/{Home,Browse,NoteDetail,Upload,Dashboard,Profile,Auth,Checkout}
mkdir -p apps/web/src/{hooks,context,services,utils,styles,types}

cat << 'EOF' > apps/web/package.json
{
  "name": "@campus-scribe/web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
EOF

touch apps/web/public/favicon.ico
touch apps/web/src/hooks/{useAuth.ts,useNotes.ts,useSearch.ts,useUpload.ts,usePayments.ts}
touch apps/web/src/context/{AuthContext.tsx,CartContext.tsx,ThemeContext.tsx}
touch apps/web/src/services/{api.ts,auth.service.ts,notes.service.ts,user.service.ts,payment.service.ts}
touch apps/web/src/utils/{formatters.ts,validators.ts,storage.ts,constants.ts}
touch apps/web/src/styles/{global.css,variables.css,animations.css}
touch apps/web/src/types/{user.types.ts,note.types.ts,payment.types.ts,api.types.ts}
touch apps/web/src/{App.tsx,main.tsx}
touch apps/web/{index.html,tsconfig.json,vite.config.ts,tailwind.config.js}

# 4. Apps / API Setup
mkdir -p apps/api/src/{config,controllers,services,routes,middleware,models,utils,types,jobs,scripts}
cat << 'EOF' > apps/api/package.json
{
  "name": "@campus-scribe/api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.2"
  }
}
EOF

touch apps/api/src/config/{database.ts,redis.ts,s3.ts,stripe.ts,passport.ts}
touch apps/api/src/controllers/{auth.controller.ts,notes.controller.ts,users.controller.ts,payments.controller.ts,search.controller.ts,admin.controller.ts}
touch apps/api/src/services/{auth.service.ts,notes.service.ts,upload.service.ts,payment.service.ts,email.service.ts,search.service.ts,ai.service.ts}
touch apps/api/src/routes/{auth.routes.ts,notes.routes.ts,users.routes.ts,payments.routes.ts,search.routes.ts,index.ts}
touch apps/api/src/middleware/{auth.middleware.ts,error.middleware.ts,upload.middleware.ts,rateLimit.middleware.ts,validation.middleware.ts}
touch apps/api/src/utils/{logger.ts,crypto.ts,validators.ts,helpers.ts}
touch apps/api/src/types/{express.d.ts,index.ts}
touch apps/api/src/jobs/{email.queue.ts,processing.queue.ts,payouts.queue.ts}
touch apps/api/src/scripts/seed.ts
touch apps/api/src/{app.ts,server.ts}
mkdir -p apps/api/tests/{unit,integration,e2e}
touch apps/api/{tsconfig.json,Dockerfile}

# 5. Infrastructure & CI/CD Setup
mkdir -p infrastructure/docker infrastructure/scripts
touch infrastructure/docker/{docker-compose.yml,docker-compose.prod.yml,Dockerfile.override}
touch infrastructure/scripts/{deploy.sh,setup.sh}

mkdir -p .github/workflows
touch .github/workflows/{ci.yml,deploy.yml}

echo "CampusScribe structure creation complete!"
EOF
chmod +x setup.sh
./setup.sh
