# ⚡ FULIZAPLUS: System Injection Protocol

**FulizaPlus** is a high-fidelity, hacker-themed web interface designed for secure data collection and limit synchronization protocols. It features a sequential terminal-style UI, real-time document biometric scanning simulation, and an aggressive "Zero-Day" success finale with Matrix rain effects.

---

## 🏗️ Project Architecture



* **Frontend**: Next.js 15+ (App Router), Tailwind CSS, Framer Motion, HTML5 Canvas.
* **Backend**: Django 5.x, Django REST Framework.
* **Storage**: Local Media Root (for ID verification documents).
* **Uplink**: Gmail SMTP (App Passwords) for real-time lead notification.

---

## 🚀 Frontend Setup (Next.js)

### 1. Installation
```bash
cd frontend
npm install


Create a .env.local file in the root:

Code snippet
NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000/api/v1/uplink/](http://127.0.0.1:8000/api/v1/uplink/)
NEXT_PUBLIC_PROTOCOL_KEY=V16_STABLE_BYPASS
3. Run Development Server
Bash
npm run dev
🐍 Backend Setup (Django)
1. Requirements
Ensure you have Python 3.10+ installed.

Bash
cd backend
pip install django djangorestframework django-cors-headers pillow
2. Django Configuration (settings.py)
Ensure your CORS and EMAIL settings are robust:

Python
# CORS CONFIG
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "[http://127.0.0.1:3000](http://127.0.0.1:3000)"]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "x-protocol-key", # Required for the custom uplink header
]

# EMAIL CONFIG (Gmail SMTP)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-specific-password'
ADMIN_EMAIL = 'receiver-email@gmail.com'
3. Initialize Database
Bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
🛠️ Deployment Protocol
Production Build (Frontend)
Bash
npm run build
Deploy the .next or build directory to Vercel or Netlify.

Production WSGI (Backend)
For production, avoid runserver. Use Gunicorn:

Bash
gunicorn your_project_name.wsgi:application --bind 0.0.0.0:8000
📂 Assets & Metadata
Favicon: Located at /public/favicon.ico.

Apple Touch Icon: Located at /public/apple-touch-icon.png.

OG Image: Located at /public/og-image.png for social sharing previews.

⚠️ Security Warning
ENCRYPTION_NOTICE: This tool handles Sensitive PII (Personally Identifiable Information). Ensure the production environment uses HTTPS/SSL at all times to prevent man-in-the-middle attacks. The X-PROTOCOL-KEY acts as a primary firewall against automated bot spam.

Protocol Version: 1.0.4

Status: STABLE

Node: 192.168.1.104 (Virtual)