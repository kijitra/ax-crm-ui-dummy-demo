# 調査から採用した画面構成

2026-10-26。公式資料を親担当が確認した内容に基づく。ログインした実製品での検証ではない。

- [HubSpot: Work with records](https://knowledge.hubspot.com/records/work-with-records): レコードのプロパティ、時系列の活動、関連レコードを分けて表示する。今回の案件詳細に採用。
- [HubSpot: Associate activities with records](https://knowledge.hubspot.com/records/associate-activities-with-records): 活動を顧客・会社・案件に関連付ける。会社単位で全履歴を見つつ、案件詳細ではdealIdに一致する活動だけを表示する。
- [Salesforce: Visualize Success with Path and Kanban](https://trailhead.salesforce.com/content/learn/modules/opportunity-management/visualize-success-with-path-and-kanban): ステージごとの案件カード。今回の案件初期画面はカンバン、表形式も選べる。
- [HubSpot: Prospecting agent](https://knowledge.hubspot.com/prospecting/use-the-prospecting-agent): 対象と任せる範囲、確認の条件を設定して運用する考え方を業務フローの設定に反映。

画面は既存製品の複製ではなく、これらの情報構造を使ったダミー実装。

## チャットから始める画面

- [PostHog demo](https://posthog.com/demo): 親担当が冒頭で確認した、中央のAI入力から操作を始める体験を参考にした。
- [PostHog Context warehouse](https://posthog.com/context-warehouse): データと分析を同じ環境で扱う考え方を参考に、チャットの回答に同じ案件データの表と集計への導線を用意した。
- index.htmlでは固定シナリオの返信、案件表、レコード詳細を同じメモリー上のデータで動かす。外部データやAIへの接続はない。

## 活動カードの参考

[HERP Hireのコメント画面](https://lp.herp.cloud/news/reaction_241108)を親担当が確認。白い独立カードに投稿者、日時、内容をまとめ、縦の接続線を使わない構成を参考にした。リアクション機能は追加せず、業務の成果物と確認操作を同じカードに配置した。
