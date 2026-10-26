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

## Cloudflare風の画面トーン

[designmd.co/d/cloudflare](https://www.designmd.co/d/cloudflare)を親担当が確認。これは第三者による整理で、Cloudflare公式のUIキットではない。白、#fdfdfc、#f0f0f0の面、#262626の文字、境界線、影のないカード、小さな角丸と4px単位の余白を採用した。プライマリーは利用者の指定に合わせ青#2563ebを維持。

FT Kunstの配布フォントは使用せず、日本語対応のシステムフォントを使用。本文14px・行高1.5を基本とし、業務画面にマーケティング見出しの大きさを持ち込まない。明るい背景に白の補助文字は使わず、コントラストを維持した。

## 実際のCloudflare管理画面を参考にした質感の調整

利用者提供の管理画面スクリーンショット2枚を確認し、上記の「影なし・小さな角丸」を見直した。現在は、ほぼ白のページに白いカード、薄い境界線、8〜10px程度の角丸、ごく浅い影を使う。入力とボタンは36〜38pxを基本に、青のプライマリーには控えめな内側のハイライトを付ける。ホーム入力は淡い外枠と白い内側の二重構造。

参考にするのは質感と余白であり、Cloudflareのページ構成を複製しない。添付画像に含まれるアカウント・ドメイン・顧客情報はデモへ取り込んでいない。既存のデータ、遷移、独立した活動カード、青のプライマリーを維持する。

## 日常操作の整理（追記）

担当者・期日をカード上で読み取れること、表示形式を切り替えられることは[Asanaのボード説明](https://help.asana.com/s/article/board-view)と[プロジェクト表示の説明](https://asana.com/inside-asana/manage-workflow-project-views)を参考にした。関連内容をタブで切り替える一般原則は[Carbon Tabs](https://v10.carbondesignsystem.com/components/tabs/usage/)を参考にしている。タスク見出し直下の「自分／すべて」、検索の下の「カンバン／一覧」という具体配置、青を使わない選択状態、会話後の下部入力はユーザー指定。担当者はWada等の架空名に統一し、本人フィルタも同じ値を参照する。履歴は既存レコードにリンクする会話例であり、新しい顧客情報は追加していない。

## 月次ダッシュボードと集計元

[HubSpotのレポートドリルダウン](https://knowledge.hubspot.com/dashboards/drill-down-into-dashboard-reports)を参考に、グラフの日付を選ぶとその日の集計元一覧、さらに元レコードへ移動する。商談実施は商談記録の日付、受注件数は受注ステージと受注日の仮データで集計する。月間目標はデモ設定（商談20件・受注15件）であり、実会社の目標ではない。各日合計と月次件数を検証した。Astroは今回導入せず、共通描画関数とhash/historyで画面を統一した。リロードは初期データに戻るが、既存レコードのURLは復元する。

## 活動種別とヘッダー内アクション

[HubSpotの活動フィルタ](https://knowledge.hubspot.com/records/filter-activities-on-a-record-timeline)のnotes/emails/calls/tasks/meetingsを参考に、メモ・メール・コール・タスク・ミーティングを分類した。資料は明示的な資料フィルタに分け、画像・動画は活動種別に加えていない。元データのないコールは空表示となる。

[Cloudscape Header](https://cloudscape.design/components/header/)と[Container](https://cloudscape.design/components/container/)のヘッダー内アクション領域を参考に、今回の集計元リンクを各カードのヘッダーへ統一した。右上配置をすべての管理画面に共通する必須ルールとはしていない。

[Salesforceの営業指標](https://help.salesforce.com/s/articleView?id=sales.sales_insights_sales_perf.htm&language=en_US&type=5)では受注率の分母に失注を含み、平均受注日数には起算日が必要となる。現デモには失注・作成日の十分な情報がないため、受注率や平均受注日数は新設していない。金額の表示・目標・集計元は10月に統一し、月間金額目標はデモ設定2,000万円とした。

## 定義とタスク実行の分離

[HubSpotのワークフロー作成](https://knowledge.hubspot.com/workflows/create-workflows)ではエディターで登録トリガーとアクションを設定し、[手動登録](https://knowledge.hubspot.com/workflows/manually-enroll-objects-into-workflows)はワークフローやレコードから行える。HubSpot自体がタスクの子としてのみフローを扱うわけではない。

今回の試作は独自方針として「案件→業務タスク→実行履歴→再利用可能なフロー定義・その版」を関連づける。タスクの所有する仕事と、それを遂行するフローを分け、フロー一覧は定義の手順表示・編集、実行入口はタスク詳細へ統一した。対象タスク・案件は固定し、成果物を元タスクに返す。同じ仕事のタスクは実行のために再作成しない。

定義編集はこのローカルデモの既存3テンプレートの参照情報・作成指示を編集する範囲。汎用フロー構築、外部接続、自動トリガー有効化、AIによる自己書き換えや権限拡大は実装していない。利用者による自由編集と導入時の共同設計の境界、AI実行階層・権限は池田さんとの確認事項。


### アイコン供給元（2026-10-27）
Lucide公式npmパッケージ `lucide-static@1.61.0` のSVGから使用する17種を抽出し、HTMLへインラインで同梱。描画パスの独自改変は行わず、サイズ・色・aria属性のみ調整。ライセンスは `docs/lucide-LICENSE.txt`。実行時CDN・追加依存は不要。グラフSVGはアイコンではなく既存のデータ描画。案件名は納品するアプリ／ポータルが分かる名称と顧客名で具体化し、参照IDは維持。永続ストレージ未使用のため、再読込またはリセットで新しいseedが反映される。
