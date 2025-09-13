# AWS Deployment Configuration for Portfolio Project

## 🎓 AWS Student Account Setup

### Step 1: Get AWS Educate Credits
1. Go to [AWS Educate](https://aws.amazon.com/education/awseducate/)
2. Sign up with your student email (.edu domain preferred)
3. Verify student status
4. Get $100 in AWS credits (no credit card needed!)

### Step 2: Alternative - Regular Free Tier
1. Go to [AWS Free Tier](https://aws.amazon.com/free/)
2. Create account with credit card (won't be charged)
3. Get 12 months free + always free services

## 🏗️ AWS Architecture for Portfolio

### Recommended Setup:
- **Frontend**: AWS Amplify (free hosting)
- **Backend API**: AWS Lambda + API Gateway
- **Python AI Service**: AWS Lambda + API Gateway
- **Database**: AWS RDS PostgreSQL (free tier)
- **Storage**: AWS S3 (free tier)
- **CDN**: AWS CloudFront (free tier)

## 💰 Cost Estimation (Free Tier)
- **EC2**: 750 hours/month free
- **RDS**: 750 hours/month free
- **S3**: 5GB free
- **Lambda**: 1M requests/month free
- **API Gateway**: 1M requests/month free
- **Total**: $0/month for small projects

## 🚀 Quick Deploy Commands

### Deploy Frontend to Amplify
```bash
# Install AWS CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Deploy Backend to Lambda
```bash
# Install Serverless Framework
npm install -g serverless

# Deploy
serverless deploy
```

## 📋 Next Steps
1. Set up AWS account
2. Configure AWS CLI
3. Deploy services
4. Set up custom domain (optional)
