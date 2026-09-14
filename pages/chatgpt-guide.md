# ChatGPT運用ガイド

ChatGPTがUNTOLD Wikiを参照・更新する際の運用正本。通常回答ではこのページを毎回読む必要はない。最短経路は `AGENTS.md` と `ai-index.json` を使う。

## 通常参照順【確定】

1. `AGENTS.md`
2. `ai-index.json`
3. 話題に直接関係する正本
4. 必要な場合だけ補助ページ

以下の場合のみ追加で読む。

- 現在のマイルストーン・現在地・次の判断：`ai-current.json`
- 開発再開・次の判断で未統合事項がありうる場合：`decision-inbox.md`
- ルーティングが曖昧、複数正本の優先順位、旧資料の扱い：`ai-manifest.json`
- Wiki保守・監査・判断基準・参照ルール変更：このページ、`pages/governance/spec-maintenance.md`

単なる相づちや直前の発言だけで完結する確認では、Wiki参照を省略してよい。

## 再開・「次に何を決めるか」の判断手順【確定】

開発再開時、または「次は何を決めるか」「現在どこまで決まっているか」を判断するときは、以下の手順を守る。

1. `ai-current.json` で現行マイルストーンと現在地の入口を確認する。
2. `decision-inbox.md` に未統合の確定事項がある場合は確認し、正本へ未統合でも有効な確定事項として現在地へ加える。
3. マイルストーンと進捗から、次に確認すべき**候補トピック**を決める。
4. その候補トピックを `ai-index.json` で再ルーティングし、個別正本を読む。
5. 進行が複数ページへまたがる場合は、正本本文から示される後続正本・関連正本をたどり、**最後に確定済みの進行地点まで**確認する。
6. 個別正本またはDecision Inboxですでに確定している内容は、実装されていなくても「次に決める項目」へ戻さない。
7. 本当に未確定かを判断するときは `pages/open-items.md` も確認する。ただし、個別正本またはより新しいDecision Inboxの確定事項と食い違う場合は、古い側を整理対象とする。
8. ここまで確認して初めて、新しく設計・判断が必要な境界を「次に決める項目」として提示する。

**`未実装`・`未接続`・`実装保留` と、仕様上の `未確定` は別概念とする。**

`pages/development/implementation-status.md` やゲーム本体に処理が存在しないことは、実装差分を示すだけであり、仕様が未確定である根拠にはしない。

## 情報源の優先順位【確定】

矛盾時は次を優先する。

1. 同一会話で新しく確定した未反映事項
2. `decision-inbox.md` の未統合確定事項
3. 話題ごとの現行正本
4. 設計思想・命名基準などの横断基準
5. 個別ページの補助要約・索引
6. 実装状況・開発引き継ぎの要約
7. 廃止済み・履歴・旧資料

`decision-inbox.md` はゲーム仕様の正本ではないが、未統合項目は正本より後に確定した変更として扱う。正本へ統合済みの項目はInboxから削除し、その後は正本を参照する。

`確定`は使用可、`暫定`は暫定として扱う。`案`・`候補`・`未確定`は採用済みにしない。`廃止`・`旧`・`履歴`は現行仕様の根拠にしない。

`pages/development/implementation.md` と個別正本が同じ話題を扱う場合は個別正本を優先する。

## AIルーターの役割【確定】

- `AGENTS.md`：最小入口と絶対ルール。
- `ai-index.json`：通常回答用の高速ルート表。具体仕様の正本ではない。
- `ai-current.json`：現在のマイルストーン・進捗・未確定台帳への短い入口。具体仕様の正本ではない。
- `decision-inbox.md`：会話中に確定したが正本へまだ統合していない事項の高速保存先。正本ではない。
- `ai-manifest.json`：詳細ルーティング、補助参照、旧資料、更新ルール。
- このページ：参照方針・更新運用・監査ルール。

同じ具体仕様をこれらへ恒久的に複製しない。Decision Inboxは正本統合までの一時保管に限定し、高速ルーターには参照先と必要最小限の見出しヒントだけを置く。

## 話題別ルーティング【確定】

通常は `ai-index.json` を正とする。より細かなsecondary参照や条件付きルールが必要な場合は `ai-manifest.json` を使用する。

特に重要な導線は以下。

- 設計判断・会話・演出・ストーリー：`pages/design-philosophy.md`
- 伏線・非公開設定：`pages/story/foreshadowing-ledger.md`
- 新規命名：`pages/naming-guidelines.md`
- 河川・湖・街道・橋：`pages/world/world-rivers-lakes-crossings.md`、`assets/elden-terrain-mask-final.svg`
- BOOK：`pages/systems/book.md`
- 記録：`pages/systems/recording.md`
- カード：`pages/systems/cards.md`、`pages/systems/cardization-rules.md`
- 現行マイルストーン：`pages/development/free-exploration-core-milestone.md`
- 実装状況：`pages/development/implementation-status.md` とゲーム本体 `fg79sw4nvw-dot/untold-game`
- ゲーム開始からDay 2の必須導入：`pages/development/eld-opening-sequence.md`、`pages/cards/055-book-eating-rat.md`、`pages/development/day2-home-tutorial.md`、`pages/world/protagonist-home.md`

## セリフ案の提示ルール【確定】

- ChatGPTがUNTOLD用の**新しいセリフ案を作成して提示する場合は、必ず2候補を用意する**。
- 2候補は、同じ目的・確定情報を守りつつ、言い回し、温度感、会話の運びなどに差を持たせ、比較して選べる形にする。
- すでに確定済みのセリフをそのまま参照・再掲するだけの場合は、新規作成ではないため2候補化しない。

## 正本の重複を避ける【確定】

一つの仕様事実には原則一つの正本を置く。

管理ページ、索引、AIルーターには、便利だからという理由だけで確定仕様本文を再掲し続けない。要約やキャッシュが必要な場合は非正本であることを明示し、参照先を持たせる。

`decision-inbox.md` だけは、正本統合までの短期間に限り未統合の確定事項を保持する例外とする。統合後は処理済み項目を削除し、二重管理を残さない。

## 判断基準の運用【確定】

横断的な判断基準は `governance/criteria-registry.json` で管理する。

新しい基準を追加するときは最低限、固定ID、基準本文の正本、適用scope、既存仕様への遡及モード、revisionを決める。

遡及モードは以下。

- `apply`：既存仕様にも適用して必要な変更を行う。
- `review`：既存仕様を監査するが、確定内容は自動変更しない。
- `future_only`：今後の新規設計・変更だけに適用する。

明示がなければ原則 `review`。`apply` または `review` を行った場合は `governance/review-ledger.json` に確認範囲・変更範囲・例外を記録する。

詳細は `pages/governance/spec-maintenance.md` を正とする。

## Wiki更新運用【確定】

### 通常反映：Decision Inboxへ高速追記

- 会話中に確定した事項は、会話内では即座に確定事項として扱う。
- 通常の `「反映して」`、`「Wikiに記録して」`、または会話中の通常反映では、**正本を毎回更新せず `decision-inbox.md` へ確定事項を高速追記する**。
- Inboxには未確定・候補・保留を入れず、確定事項だけを1つの意味上の決定につき1項目で記録する。
- 各項目には、話題と、分かる場合は正本の統合先候補を付ける。
- 追記時は `未統合件数` を更新する。
- 同じ会話内で `decision-inbox.md` の最新内容と最新blob SHAを保持している場合は、**再取得せず最新SHAを使って直接更新してよい**。通常反映を1回のGitHub更新で済ませることを優先する。
- 通常追記では、関連正本、`pages/open-items.md`、索引、名称参照、ルーター等の監査を毎回行わない。

### 正本への一括統合

次のいずれかで、Decision Inboxの未統合事項を各正本へまとめて統合する。

1. 未統合の確定事項が **10項目** に達したとき。
2. その話題の検討が終了したとき。
3. ユーザーが `「正本へ統合して」`、`「まとめて正本に反映して」` など正本統合を明示したとき。

- 単に `「反映して」` と言われただけの場合は、原則としてInboxへの高速追記であり、正本統合までは行わない。
- 話題終了時は、その話題の項目だけを統合し、別話題の未統合項目は残してよい。
- 10項目到達時は、その時点の未統合事項を原則まとめて処理する。
- 正本統合時に初めて、現行正本との整合、`pages/open-items.md`、索引、名称参照、`pages.json` への影響を確認する。
- 既存ページ本文だけを修正した場合は `wiki.json` を同期更新しない。
- `ai-index.json` はルートまたは高頻度の見出しヒントが変わる場合に更新する。
- `ai-current.json` は現行マイルストーンまたは主要な現在地参照先が変わる場合だけ更新する。
- `ai-manifest.json` は詳細ルーティング構造や優先規則が変わる場合に更新する。
- 正本へ反映済みの項目はDecision Inboxから削除し、`未統合件数` を残件数へ更新する。
- 処理済み項目をInboxへ履歴として残し続けない。履歴はGit履歴で追跡する。
- 未確定仕様を自然さ・一般論・実装都合で補完しない。

詳細なInboxの形式と処理ルールは `decision-inbox.md` を参照する。

## Wiki監査時の最低チェック【確定】

- `pages.json` と実ファイルの対応。
- `ai-index.json`、`ai-current.json`、`ai-manifest.json` の参照先が現存するか。
- `ai-index.json` の見出しヒントが実際のMarkdown見出しと一致するか。
- `governance/criteria-registry.json` のsource参照先が現存するか。
- `pages/open-items.md` に確定済み事項が残っていないか。
- `decision-inbox.md` に正本統合済みの項目が残っていないか。
- 管理ページ・索引へ確定内容が重複しすぎていないか。
- 旧名称・旧座標が現行正本へ誤って残っていないか。
- 旧資料が現行正本より優先される導線になっていないか。
- `implementation.md` や進捗ページが個別正本を上書きする扱いになっていないか。
- **進捗ページの `未実装` が、再開時に仕様上の `未確定` と誤読される導線になっていないか。**
- **現行マイルストーンの直近フローが複数正本へまたがる場合、再開用ルートから後続正本まで到達できるか。**
- 新しい基準の遡及レビューが未完了のまま適用済み扱いされていないか。

`tools/validate-ai-routing.mjs` と `.github/workflows/validate-ai-routing.yml` は、AIルーティングの参照切れや主要見出し不整合の機械検査に使う。

## 旧資料の扱い【確定】

以下は検索に出ても現行仕様として優先しない。

- `wiki.json`：旧方式・履歴用
- `assets/world-map-v11-rle.json`：旧マップ資料
- `pages/world/world-regions-routes.md`：旧街道・地域資料を含む
- `pages/development/eld-playthrough-goal.md`：廃止済みマイルストーン

`assets/elden-terrain-mask-final.svg` の `elden` は歴史的なファイル名であり、現在の主島名を意味しない。