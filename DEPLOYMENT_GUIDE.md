# 🚀 Deploying to Vercel

This guide will help you deploy your Data Analysis Agent to Vercel for public access.

## Prerequisites

1. [GitHub Account](https://github.com)
2. [Vercel Account](https://vercel.com) (sign up with GitHub)
3. Git installed on your machine

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
cd "/home/rohith/Desktop/Data Analysis Agent"
git init
git add .
git commit -m "Initial commit: Production-ready Data Analysis Agent"
```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `data-analysis-agent`
   - Don't initialize with README (we already have files)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/data-analysis-agent.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"

2. **Import Repository**:
   - Select "Import Git Repository"
   - Choose your `data-analysis-agent` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/.next`
   - **Install Command**: `cd frontend && npm install`

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=/api
   NODE_ENV=production
   PYTHON_VERSION=3.9
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your site will be live at: `https://your-project.vercel.app`

### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd "/home/rohith/Desktop/Data Analysis Agent"
vercel
```

4. **Follow Prompts**:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name: `data-analysis-agent`
   - Directory: `./`
   - Override settings? **N**

5. **Production Deployment**:
```bash
vercel --prod
```

## Step 3: Verify Deployment

1. **Check Your Live Site**:
   - Visit your Vercel URL
   - Test file upload with a CSV file
   - Verify sorting and filtering work
   - Test export functionality

2. **Check API Endpoints**:
   - `https://your-project.vercel.app/api/health`
   - Should return: `{"status": "ok", "version": "2.0.0"}`

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   ```

## Troubleshooting

### Build Fails

**Issue**: Frontend build fails
**Solution**: Check that all dependencies are in `package.json`

```bash
cd frontend
npm install
npm run build
```

### API Not Working

**Issue**: Backend API returns 404
**Solution**: Verify `vercel.json` routes configuration

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/main.py"
    }
  ]
}
```

### File Upload Fails

**Issue**: Large files fail to upload
**Solution**: Vercel has limits on serverless functions
- Free tier: 5MB body size
- Pro tier: 50MB body size

Consider using Vercel Blob Storage for large files:
```bash
npm install @vercel/blob
```

### Python Dependencies Missing

**Issue**: Import errors in API
**Solution**: Ensure all dependencies are in `api/requirements.txt`

```bash
cd api
pip install -r requirements.txt
```

## Advanced Configuration

### Environment Variables for Production

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=/api
NODE_ENV=production

# Python Runtime
PYTHON_VERSION=3.9

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: API Rate Limiting
API_RATE_LIMIT=100

# Optional: Session Storage (use Redis in production)
REDIS_URL=your_redis_url
```

### Enable Analytics

1. In Vercel Dashboard:
   - Go to Analytics
   - Enable Web Analytics
   - Add to your site

### Monitoring

1. **Vercel Logs**:
   - Dashboard → Deployments → View Function Logs
   - Check for errors

2. **Performance**:
   - Dashboard → Analytics
   - Monitor load times and errors

## Production Best Practices

### 1. Session Management

For production, replace in-memory storage with Redis:

```python
# api/main.py
import redis

redis_client = redis.from_url(os.getenv('REDIS_URL'))
```

### 2. File Storage

Use Vercel Blob Storage for persistent file uploads:

```bash
npm install @vercel/blob
```

### 3. Authentication

Add user authentication:

```bash
npm install next-auth
```

### 4. Rate Limiting

Implement API rate limiting:

```python
from slowapi import Limiter

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

### 5. Error Tracking

Add Sentry for error monitoring:

```bash
npm install @sentry/nextjs
```

## Continuous Deployment

Every push to `main` branch automatically deploys to production!

```bash
git add .
git commit -m "Update features"
git push origin main
```

Vercel will:
1. Build your project
2. Run tests (if configured)
3. Deploy to production
4. Update your live site

## Cost Estimation

**Vercel Free Tier**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ⚠️ 5MB max file upload

**Vercel Pro ($20/month)**:
- ✅ Everything in Free
- ✅ 1TB bandwidth
- ✅ 50MB max file upload
- ✅ Priority support
- ✅ Advanced analytics

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)

---

**Your live application will be accessible at:**
`https://data-analysis-agent-xxx.vercel.app`

**Share it with anyone, anywhere! 🎉**
