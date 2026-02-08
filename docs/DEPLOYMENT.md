# Deployment Guide

## Quick Deployment Options

### 1. Local Development Setup

**Requirements:**
- Python 3.8+
- pip or conda
- Git

**Steps:**

```bash
# Clone repository
git clone <your-repo-url>
cd "Data Analysis Agent"

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run web app
streamlit run app.py

# OR run CLI
python cli.py
```

---

### 2. Streamlit Cloud (Free Hosting)

**Best for:** Quick demos, portfolio projects

**Steps:**

1. Push code to GitHub repository

2. Go to [share.streamlit.io](https://share.streamlit.io)

3. Click "New app" and connect your GitHub repo

4. Configure:
   - Main file: `app.py`
   - Python version: 3.8+

5. Add secrets (Settings > Secrets):
```toml
[secrets]
OPENAI_API_KEY = "your_key_here"
SCALEDOWN_API_KEY = "your_key_here"
```

6. Click "Deploy"

**URL:** `https://your-app.streamlit.app`

---

### 3. Docker Deployment

**Best for:** Containerized deployments, microservices

**Create Dockerfile:**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8501

# Run Streamlit app
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

**Build and run:**

```bash
# Build image
docker build -t data-analysis-agent .

# Run container
docker run -p 8501:8501 \
  -e OPENAI_API_KEY=your_key \
  -e SCALEDOWN_API_KEY=your_key \
  data-analysis-agent
```

**Access:** `http://localhost:8501`

---

### 4. Heroku Deployment

**Best for:** Simple cloud hosting with free tier

**Requirements:**
- Heroku account
- Heroku CLI installed

**Steps:**

1. Create `Procfile`:
```
web: streamlit run app.py --server.port=$PORT --server.address=0.0.0.0
```

2. Create `setup.sh`:
```bash
mkdir -p ~/.streamlit/
echo "\
[server]\n\
headless = true\n\
port = $PORT\n\
enableCORS = false\n\
\n\
" > ~/.streamlit/config.toml
```

3. Deploy:
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set SCALEDOWN_API_KEY=your_key

# Deploy
git push heroku main

# Open app
heroku open
```

---

### 5. AWS Deployment

**Best for:** Production environments, scalability

#### Option A: AWS EC2

```bash
# Launch EC2 instance (Ubuntu 22.04)
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv -y

# Clone and setup
git clone <your-repo>
cd "Data Analysis Agent"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run with nohup
nohup streamlit run app.py --server.port=8501 &

# Or use systemd service (recommended)
sudo nano /etc/systemd/system/data-agent.service
```

**systemd service file:**
```ini
[Unit]
Description=Data Analysis Agent
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Data Analysis Agent
Environment="PATH=/home/ubuntu/Data Analysis Agent/venv/bin"
ExecStart=/home/ubuntu/Data Analysis Agent/venv/bin/streamlit run app.py

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable data-agent
sudo systemctl start data-agent
```

#### Option B: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.9 data-analysis-agent

# Create environment
eb create data-agent-env

# Deploy
eb deploy

# Open app
eb open
```

---

### 6. Google Cloud Run

**Best for:** Serverless, pay-per-use

**Steps:**

1. Create `Dockerfile` (same as above)

2. Build and push to Google Container Registry:
```bash
# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/data-agent

# Deploy to Cloud Run
gcloud run deploy data-agent \
  --image gcr.io/YOUR_PROJECT_ID/data-agent \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=your_key,SCALEDOWN_API_KEY=your_key
```

---

### 7. Digital Ocean App Platform

**Best for:** Simple, developer-friendly

1. Push code to GitHub

2. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)

3. Click "Create App" and select your repo

4. Configure:
   - Run command: `streamlit run app.py`
   - Environment variables: Add your API keys

5. Click "Launch App"

---

### 8. Railway.app

**Best for:** Fast deployment, generous free tier

1. Go to [railway.app](https://railway.app)

2. Click "New Project" > "Deploy from GitHub"

3. Select your repository

4. Railway auto-detects Python and installs dependencies

5. Add environment variables in dashboard

6. App deploys automatically

---

## Production Best Practices

### Security

1. **Environment Variables:**
```bash
# Never commit API keys
# Use .env file locally
# Set in hosting platform dashboard
```

2. **Rate Limiting:**
```python
# Add to app.py
from streamlit_extras.throttle import throttle

@throttle(max_calls=10, period=60)
def analyze_data():
    # Your code
    pass
```

3. **Authentication (optional):**
```python
# Simple password protection
import streamlit as st

def check_password():
    if "authenticated" not in st.session_state:
        password = st.text_input("Password", type="password")
        if st.button("Login"):
            if password == "your_secure_password":
                st.session_state.authenticated = True
                st.rerun()
            else:
                st.error("Incorrect password")
        return False
    return True

if not check_password():
    st.stop()
```

### Performance

1. **Caching:**
```python
@st.cache_data
def load_data():
    # Expensive operation
    pass
```

2. **Database for History:**
```python
# Use SQLite or PostgreSQL instead of in-memory
import sqlite3
```

3. **Background Processing:**
```python
# For long-running tasks
from concurrent.futures import ThreadPoolExecutor
```

### Monitoring

1. **Logging:**
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

2. **Error Tracking:**
```bash
# Install Sentry
pip install sentry-sdk

# Add to app.py
import sentry_sdk
sentry_sdk.init(dsn="your_sentry_dsn")
```

3. **Analytics:**
```python
# Add Google Analytics or similar
# Track usage patterns
```

---

## Scaling Strategies

### Horizontal Scaling

- Use load balancer (AWS ELB, Nginx)
- Deploy multiple instances
- Session stickiness for Streamlit

### Vertical Scaling

- Increase CPU/RAM for single instance
- Optimize compression algorithms
- Use faster database (PostgreSQL vs SQLite)

### Caching Layer

- Redis for frequently accessed data
- CDN for static assets
- Cache compressed schemas

---

## CI/CD Pipeline

**GitHub Actions Example:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        python test_modules.py
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"
```

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 8501
lsof -ti:8501 | xargs kill -9
```

**Module not found:**
```bash
# Ensure virtual environment is activated
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

**Memory errors:**
```python
# Reduce max_active_steps in config
# Process data in chunks
```

**API timeouts:**
```python
# Increase timeout in requests
# Add retry logic
```

---

## Cost Estimation

### Cloud Hosting Costs (Monthly)

| Platform | Free Tier | Paid Plan | Best For |
|----------|-----------|-----------|----------|
| Streamlit Cloud | 1 app | $3/app | Demos |
| Heroku | 550 hrs | $7/dyno | Small apps |
| Railway | $5 credit | Pay-as-go | Dev/staging |
| DigitalOcean | - | $5/month | Production |
| AWS EC2 | 750 hrs | $10-50 | Scalable prod |
| Google Cloud Run | 2M requests | Pay-per-use | Serverless |

### API Costs (with compression)

- OpenAI GPT-4: ~$0.02 per analysis
- Without compression: ~$1.00 per analysis
- **Monthly savings (100 analyses): $98**

---

## Support & Maintenance

- Monitor error logs daily
- Update dependencies monthly
- Backup databases weekly
- Test new features in staging
- Keep documentation updated
