# AGENTS.md - ax-crm-ui-dummy-demo

このリポジトリで作業するエージェント（Codex / Claude Code）と人間の共通の入口。

## ワークスペース共通ルール

`/Users/akane/Documents/kijitra-starter-kit/AGENTS.md` — kijitra ワークスペース共通の
運用ルール（役割ルーティング、承認境界、並列エージェントの worktree 隔離、
ホストで許可される git 操作、セッション開始時のワークスペース更新と作業ブランチ、
Issue tracker の選択）。ローカル環境にのみ存在するパスなので、参照できない
環境ではこのファイルとリポジトリ内の docs だけで判断する。

このファイルにはリポジトリ固有の事実だけを書き、共通ルールはここに複製しない。
複製すると必ず片方が古くなる。共通ルールより厳しい制約を課す場合だけ、その旨を
このファイルに明記する。

## まず読むもの

1. `README.md` — 起動方法とダミー実装の境界。
2. `docs/specs/brief.md` — 対象業務と未決定事項。
3. `/Users/taikiikeda/Documents/kijitra/AGENTS.md` — ワークスペース共通ルール。環境に存在しない場合は `../../AGENTS.md` を確認する。
4. `../../company/org-chart.md`、`../../company/roles/engineer.md`。過去の判断は `../../brain/`、運用は `../../ops/` を参照する。

## プロジェクト概要

- 目的: AIに業務を任せる管理画面のUI検討。
- 種別: code。フロントエンドのみのローカルデモ。
- リポジトリ: `kijitra/ax-crm-ui-dummy-demo`。
- 公開範囲: ダミー実装のGitHubソース公開をAkaneさんが承認済み。本番サービスのデプロイは対象外。
- 提供・配布の対象: 管理画面の操作レビュー。全レコードが架空。
- 技術: HTML、CSS、JavaScript。外部依存なし。
- 全レコードはダミー。DB・メール・Cloudflareへの接続なし。

## ディレクトリ構成

- `index.html`: 画面・スタイル・仮データ・操作。編集元はこのファイル。
- `scripts/check.cjs`: 構文と主要データ遷移のスモーク検証。
- `docs/specs/brief.md`: 仕様。
- `docs/research.md`: 公式資料と採用した画面構成。
- `docs/tasks/verification.md`: 検証結果。
- `docs/decisions/001-local-demo.md`: ローカル管理と未登録事項。

## ブランチと PR

- 初期ブランチ: `codex/initial-demo`。初回push後にremoteのdefault branchを確認する。
- ブランチ命名: `codex/<topic>`。
- PR宛先: 後続作業時にremoteのdefault branchを確認する。現在PRなし。
- PR本文: 変更範囲と操作検証結果、未確認の環境を書く。
- 初回GitHubソース公開は承認済み。pushは親担当が実施する。本番デプロイは含まない。

## 検証コマンド

```sh
node scripts/check.cjs
node scripts/check-chat.cjs
python3 -m http.server 8877 --bind 127.0.0.1
```
ブラウザーで `http://127.0.0.1:8877/` を確認する。未実行の検証を通過扱いしない。

## CI の実態

- 設定ファイル: なし。
- トリガー・自動変更: なし。
- CIは構文、テスト、ビルド、セキュリティを検証しない。
- 品質ゲートはローカル検証と人間の画面レビューのみ。PRを作る場合は検証結果を本文に残す。

## 手動QA

カンバンから案件詳細、案件ごとの活動、タスク完了、メール下書き、データ更新承認を確認する。親担当がブラウザーで確認し、Akaneさんが使いやすさを判断する。Windows実機は未確認。

## 承認が必要な操作

Akaneさんの承認が必要:
- GitHubリポジトリ作成、push、公開、デプロイ。
- 実顧客データ取得、DB更新、メール送信。
- 費用発生と本番システムの変更。

## Kijitra ワークスペースとの接続

- Codex: `.codex/agents/` と `.codex/skills/` はローカル生成のブリッジ。
  ワークスペースルートから再生成する。

  ```sh
  ruby ops/scripts/install-project-bridge.rb projects/ax-crm-ui-dummy-demo
  ```

  `.codex/` は gitignore 済みで、コミットしない。
- Claude Code: **プロジェクト側の配線は不要。** `~/.claude/agents` と
  `~/.claude/skills` が kijitra の `company/` を指すグローバル symlink なので、
  どのディレクトリからでも役割エージェントとスキルが使える。このリポジトリに
  `.claude/` を作らない。作ると二重管理になる。
- 既定のルーティングは kijitra CEO 判断から始める。スコープと仕様は Product
  Lead、実装と検証は Engineer、外部向けの文章は Writer に回す。
