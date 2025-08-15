#!/bin/bash

set -e

FLAG=$1
URI=""
DISTRIBUTION_ID=""
BUILD_PATH="./apps/client/dist"

if [ "$FLAG" == "" ]; then
  FLAG="dev"
fi

if [ "$FLAG" != "dev" ] && [ "$FLAG" != "prod" ]; then
  echo "Usage: ./deploy.sh [prod|dev]"
  exit 1
fi

if [ "$FLAG" == "dev" ]; then
  URI="dev.web-client.ummgoban.com"
  DISTRIBUTION_ID="E35G3SJR2D5WWZ"
elif [ "$FLAG" == "prod" ]; then
  URI="web-client.ummgoban.com"
  DISTRIBUTION_ID="E2SFF7ZD6CU2BU"
fi

# build
pnpm run build:$FLAG

# 정적 에셋 (해시 파일들): 장기 캐시
aws s3 sync $BUILD_PATH s3://$URI \
  --exclude "index.html" \
  --exclude "font/*" \
  --cache-control "public,max-age=31536000,immutable"

# index.html: 즉시 갱신
aws s3 cp $BUILD_PATH/index.html s3://$URI/index.html \
  --cache-control "no-cache" \
  --content-type "text/html; charset=UTF-8"

# index.html 무효화
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/index.html"



