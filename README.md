# Accreditation Backend - TypeScript Starter (Updated)

What's new:
- Converted to TypeScript
- Added isAdmin flag on User model
- Admin-only route: GET /api/admin/entries returns all entries (populates user name/email)
- Middleware isAdmin ensures only admins can access admin endpoints

Run:
1. Copy .env.example -> .env and fill values
2. npm install
3. npm run dev
