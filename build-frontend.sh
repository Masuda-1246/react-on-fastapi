#!/bin/bash
# フロントエンドのビルドスクリプト

cd front
npm install
npm run build
echo "フロントエンドのビルドが完了しました。" 