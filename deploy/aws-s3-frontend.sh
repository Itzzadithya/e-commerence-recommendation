#!/bin/bash

# AWS S3 Deployment Script for ShopHub Frontend

echo "🚀 Deploying ShopHub Frontend to AWS S3..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "pip install awscli"
    exit 1
fi

# Configuration
BUCKET_NAME="shophub-frontend-$(date +%s)"
REGION="us-east-1"
DISTRIBUTION_ID=""  # Optional: CloudFront distribution ID

# Create S3 bucket
echo "📦 Creating S3 bucket..."
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Configure bucket for static website hosting
echo "🌐 Configuring bucket for static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read access
echo "🔓 Setting bucket policy..."
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Build the frontend
echo "🏗️ Building frontend..."
cd frontend
npm install
npm run build

# Sync files to S3
echo "📤 Uploading files to S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete --acl public-read

# Set content types for proper serving
echo "⚙️ Setting content types..."
aws s3 sync build/ s3://$BUCKET_NAME --delete --acl public-read \
    --content-type "text/html" --exclude "*" --include "*.html" \
    --content-type "text/css" --exclude "*" --include "*.css" \
    --content-type "application/javascript" --exclude "*" --include "*.js" \
    --content-type "image/jpeg" --exclude "*" --include "*.jpg" \
    --content-type "image/jpeg" --exclude "*" --include "*.jpeg" \
    --content-type "image/png" --exclude "*" --include "*.png"

# Optional: Invalidate CloudFront cache
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
fi

# Get bucket URL
BUCKET_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo "✅ Deployment successful!"
echo "🌐 Website URL: $BUCKET_URL"
echo "🎉 ShopHub Frontend is now live on AWS S3!"
echo ""
echo "📝 Next Steps:"
echo "1. Update your backend CORS to allow: $BUCKET_URL"
echo "2. Configure your domain with CNAME to: $BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "3. Set up CloudFront for CDN and HTTPS"
