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

ブラウザで http://localhost:3001/content にアクセスしてください。

## 設計について

### ディレクトリ構成

```
src/
├── app/
│   ├── globals.css          # 共通スタイル（カラー・フォント定義）
│   └── content/
│       ├── page.tsx          # ページ（状態管理・データ取得）
│       ├── schema.tsx        # バリデーションスキーマ
│       ├── schema.test.ts    # テスト
│       └── (component)/      # ページ固有のコンポーネント
├── component/                # 共通コンポーネント
└── services/                 # API通信
```

### 設計方針

- **スタイル**: 色やフォントは `globals.css` に定義し、直接hexを使わない
- **コンポーネント分離**: `page.tsx` のJSXは最小限にし、UIはコンポーネントに分ける
  - 共通コンポーネント → `src/component/`
  - ページ固有コンポーネント → 各ページの `(component)/`
- **API通信**: ロジックは `src/services/` に集約する
- **バリデーション**: zodを使用し、schemaファイルとして分離する
- **テスト**: Jestを使用（`npm test` で実行）
