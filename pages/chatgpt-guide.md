# ChatGPT運用ガイド

ChatGPTがUNTOLD Wikiを参照・更新する際のルーター。毎回Wiki全体を読むのではなく、話題に必要な正本だけを読む。機械可読の詳細ルーティングは `ai-manifest.json` を併用する。

## 基本参照順【確定】

1. `README.md`
2. `ai-manifest.json`
3. このページ
4. 話題に直接関係する正本
5. 必要な補助ページ

仕様の新規設計・変更・監査を行う場合は、必要に応じて `governance/criteria-registry.json` から適用される横断基準を確認する。

単なる相づちや直前の発言だけで完結する確認では、Wiki参照を省略してよい。

## 情報源の優先順位【確定】

矛盾時は次を優先する。

1. 同一会話で新しく確定した未反映事項
2. 話題ごとの現行正本
3. 設計思想・命名基準などの横断基準
4. 個別ページの補助要約・索引
5. 実装状況・開発引き継ぎの要約
6. 廃止済み・履歴・旧資料

`確定`は使用可、`暫定`は暫定として扱う。`案`・`候補`・`未確定`は採用済みにしない。`廃止`・`旧`・`履歴`は現行仕様の根拠にしない。

`pages/development/implementation.md` は横断的な実装仕様・引き継ぎを含むが、同じ話題に個別の正本ページがある場合は個別正本を優先する。個別正本がまだない話題では、同ページ内で明示的に確定している内容を使用してよい。

## 話題別ルーティング【確定】

- Wiki保守・判断基準・遡及適用：`pages/governance/spec-maintenance.md`、`governance/criteria-registry.json`、`governance/review-ledger.json`
- 設計判断・会話・演出・ストーリー：`pages/design-philosophy.md`
- 伏線・非公開設定・意図的な未確定真相・意味ありげな演出：`pages/story/foreshadowing-ledger.md`、`pages/design-philosophy.md`
- 主人公：`pages/story/protagonist.md`
- ゲームマスター：`pages/story/gamemaster.md`
- 新規命名：`pages/naming-guidelines.md`
- 世界名・島・世界構成：`pages/world/world.md`、`pages/world/world-map.md`
- 町名・町座標・旧名称履歴：`pages/world/towns.md`、`pages/world/terrain-allocation-final.md`
- 地形・地域ID：`pages/world/terrain-allocation-final.md`、`pages/world/region-mask.md`
- 河川・湖・街道・橋：`pages/world/world-rivers-lakes-crossings.md`、`assets/elden-terrain-mask-final.svg`
- BOOK：`pages/systems/book.md`
- 記録：`pages/systems/recording.md`
- カード：`pages/systems/cards.md`、`pages/systems/cardization-rules.md`
- フリーポケット：`pages/systems/free-pocket.md`
- 時間・天候：`pages/systems/time-weather.md`
- スペル：`pages/systems/spells.md`
- 経済・ショップ：`pages/systems/economy.md`
- エンカウント：`pages/systems/encounters.md`
- イベント：`pages/systems/events.md`
- UI：`pages/systems/gameplay-ui.md`
- MAP表示：`pages/systems/map-display-basis.md`
- チュートリアル：`pages/systems/tutorial-guidance.md`
- マップ遷移：`pages/world/map-transitions.md`
- 現行マイルストーン：`pages/development/free-exploration-core-milestone.md`
- エルド開始直後：`pages/development/eld-opening-sequence.md`
- 実装状況：`pages/development/implementation-status.md` とゲーム本体 `fg79sw4nvw-dot/untold-game`
- 専用正本へまだ分離されていない横断実装仕様：`pages/development/implementation.md`

より細かい話題別ルーティングは `ai-manifest.json` を正とする。実装状況ページは進捗記録であり、仕様の正本ではない。

## 文書の役割【確定】

- 個別正本：具体仕様の根拠。
- 横断基準：複数の個別仕様へ適用する判断基準。
- 索引・要約：入口として使う。矛盾時は個別正本を優先する。
- 進捗：実装の現在地。設計仕様の根拠としては使わない。
- 履歴：旧仕様。現行仕様の根拠にしない。
- `AGENTS.md` / `ai-manifest.json` / このページ：参照先を決めるためのルーター。具体ゲーム仕様を二重管理しない。

## 正本の重複を避ける【確定】

同じ確定内容を、管理ページや索引に便利だからという理由だけで再掲し続けない。

例えば、現行の町名・座標・旧名称履歴は `pages/world/towns.md` を参照し、この運用ガイドには一覧を複製しない。

要約が必要な場合も、どのページが正本かを明記する。

## 判断基準の運用【確定】

横断的な判断基準は `governance/criteria-registry.json` で管理する。

新しい基準を追加するときは、最低限以下を決める。

- 固定ID
- 基準本文の正本
- 適用scope
- 既存仕様への遡及モード
- revision

遡及モードは以下の3種類。

- `apply`：既存仕様にも適用して必要な変更を行う。
- `review`：既存仕様を監査するが、確定内容は自動変更しない。
- `future_only`：今後の新規設計・変更だけに適用する。

新基準に遡及モードの明示がなければ原則 `review` とする。

ユーザーが「既存にも適用」と明示した場合は `apply` として、scopeに一致する既存仕様も確認・更新する。

`apply` または `review` を行った場合は、`governance/review-ledger.json` に確認範囲・変更範囲・例外を記録する。

詳細は `pages/governance/spec-maintenance.md` を正とする。

## Wiki更新運用【確定】

- 会話中に確定した事項は、Wiki未反映でもその会話内では確定事項として扱う。
- GitHub反映は原則として確定事項が10項目たまった時点で一括更新する。
- 10項目未満でも、話題の区切り、会話終了時、明示的な更新指示がある場合はまとめて更新してよい。
- 更新時は個別正本だけでなく `pages/open-items.md`、索引、名称参照、`pages.json` への影響も確認する。
- 既存ページ本文だけを修正した場合は `wiki.json` を同期更新しない。
- `ai-manifest.json` はルーティング構造が変わる場合に更新し、具体ゲーム仕様を重複保存しない。
- 未確定仕様を自然さ・一般論・実装都合で補完しない。
- 横断基準を追加・変更した場合は `criteria-registry.json` と、必要に応じて `review-ledger.json` も更新する。

## Wiki監査時の最低チェック【確定】

- `pages.json` と実ファイルの対応。
- `ai-manifest.json` の参照先が現存するか。
- `governance/criteria-registry.json` のsource参照先が現存するか。
- `pages/open-items.md` に確定済み事項が残っていないか。
- 管理ページ・索引へ確定内容が重複しすぎていないか。
- 旧名称・旧座標が現行正本へ誤って残っていないか。
- 旧資料が現行正本より優先される導線になっていないか。
- `implementation.md` や進捗ページが個別正本を上書きする扱いになっていないか。
- 新しい基準の遡及レビューが未完了のまま、適用済み扱いされていないか。

## 旧資料の扱い【確定】

以下は検索に出ても現行仕様として優先しない。

- `wiki.json`：旧方式・履歴用
- `assets/world-map-v11-rle.json`：旧マップ資料
- `pages/world/world-regions-routes.md`：旧街道・地域資料を含む
- `pages/development/eld-playthrough-goal.md`：廃止済みマイルストーン

`assets/elden-terrain-mask-final.svg` の `elden` は歴史的なファイル名であり、現在の主島名を意味しない。
