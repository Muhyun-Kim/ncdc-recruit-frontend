# NCDCフロント課題

## 環境構築

### 1. パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、以下を設定してください。

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. 開発サーバーの起動

バックエンドのプロジェクトがhttp://localhost:3000で実行されていることを前提とします。

```bash
npm run dev
```

ブラウザで http://localhost:3001 にアクセスしてください。

## 設計について

### 設計思想

共通するスタイルに関しては、直接hexなどを使わない（src/app/globals.cssに作成）
コンポーネント: 共通コンポーネントは　src/component　に作成
page.tsxにはjsxを最小限にし、コンポーネントを分けるようにする
api通信に関するロジックは src/services に記入する
