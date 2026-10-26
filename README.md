# キジトラ営業管理（UIデモ）

業務データから、タスクの確認や作成へつなぐ画面のレビュー用デモです。営業管理の操作デモ、LPレビュー案、採用・資材管理の表示例を含みます。

## GitHubからダウンロードする

1. [最新レビュー版のブランチ](https://github.com/kijitra/ax-crm-ui-dummy-demo/tree/codex/unified-work-lifecycle)を開く。
2. **Code → Download ZIP** を選ぶ。
3. ZIPを展開し、`index.html` をブラウザーで開くと営業デモ、`lp.html` を開くとLPレビュー案を確認できる。

[レビュー版ZIPを直接ダウンロード](https://github.com/kijitra/ax-crm-ui-dummy-demo/archive/refs/heads/codex/unified-work-lifecycle.zip)

画像とCSSの参照を保つため、HTMLだけを取り出さずフォルダー全体を展開してください。LP内の埋め込みが動かない場合は、展開フォルダーで以下を実行します。

```sh
python3 -m http.server 8877 --bind 127.0.0.1
```

営業デモは `http://localhost:8877/index.html`、LP案は `http://localhost:8877/lp.html` です。終了はターミナルで Ctrl+C を押します。

## 試せること

- チャットの「今日のToDo」を送信し、回答から担当タスクを開く。
- タスクの対応内容を確認し、ToDo／Doing／Doneを切り替える。対応記録は任意で別に保存する。
- 案件のカンバン／一覧から案件詳細、活動、関連タスクへ移動する。
- 顧客の案件一覧や活動、ダッシュボードのグラフとその対象データを確認する。
- 手動フローで対象案件とタスクを選び、資料などの作成を試す。
- 定期フローの「今すぐ実行」で対象を確認し、確認タスクを作成する。

`showcase.html?view=recruiting` は採用、`showcase.html?view=materials` は資材の撮影用表示例です。両画面は操作デモではありません。ページ内のリンクで切り替えられます。

## データと実装の範囲

顧客50件、案件50件、活動50件、タスク50件、打ち合わせ20件の架空データを同梱しています。画面の担当者Wadaを含め、実顧客データは使用していません。名称が実在しないことまで保証するものではありません。

外部AI、DB、メールなどには接続しません。チャットは固定シナリオです。実際の夜間・定期自動実行はなく、手動操作で処理例を確認します。変更・会話・追加データはブラウザーのメモリー内だけに反映し、リロードや「最初に戻す」で初期化されます。メールアドレスは予約ドメイン `.example` を使用しています。

LPは非公開のレビュー案です。帳票出力などの機能説明には設計対応例を含み、すべてがデモに実装されているわけではありません。相談ボタンは説明を開くもので、問い合わせを送信しません。本リポジトリのソース公開は、本番サービスの提供・デプロイを意味しません。

## 検証

```sh
node scripts/check.cjs
node scripts/check-chat.cjs
node scripts/check-history.cjs
node scripts/check-workflows.cjs
node scripts/check-task-context.cjs
node scripts/check-detail-navigation.cjs
node scripts/check-task-scope.cjs
node scripts/check-manual-entry.cjs
python3 scripts/check-markup.py
node scripts/check-review-pages.cjs
```

編集元は `index.html`。実行時の外部パッケージは不要です。アイコンのライセンスは [Lucide LICENSE](docs/lucide-LICENSE.txt)、検討範囲は [仕様メモ](docs/specs/brief.md) を参照してください。
