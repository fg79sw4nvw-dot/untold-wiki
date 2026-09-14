# ChatGPT運用ガイド

ChatGPTがUNTOLD Wikiを参照・更新する際のルーター。毎回Wiki全体を読むのではなく、話題に必要な正本だけを読む。

## 基本参照順【確定】

1. `README.md`
2. このページ
3. 話題に直接関係する正本
4. 必要な補助ページ

単なる相づちや直前の発言だけで完結する確認では、Wiki参照を省略してよい。

## 情報源の優先順位【確定】

矛盾時は次を優先する。

1. 同一会話で新しく確定した未反映事項
2. 話題ごとの現行正本
3. 設計思想・命名基準
4. 個別ページの補助要約
5. 実装状況・開発引き継ぎの要約
6. 廃止済み・履歴・旧資料

`確定`は使用可、`暫定`は暫定として扱う。`案`・`候補`・`未確定`は採用済みにしない。`廃止`・`旧`・`履歴`は現行仕様の根拠にしない。

## 話題別ルーティング【確定】

- 設計判断・会話・演出・ストーリー：`pages/design-philosophy.md`
- 主人公：`pages/story/protagonist.md`
- 新規命名：`pages/naming-guidelines.md`
- 世界名・島・世界構成：`pages/world/world.md`、`pages/world/world-map.md`
- 町名・町座標：`pages/world/towns.md`、`pages/world/terrain-allocation-final.md`
- 地形・地域ID：`pages/world/terrain-allocation-final.md`、`pages/world/region-mask.md`
- 河川・湖・街道・橋：`pages/world/world-rivers-lakes-crossings.md`、`assets/elden-terrain-mask-final.svg`
- BOOK：`pages/systems/book.md`
- 記録：`pages/systems/recording.md`
- カード：`pages/systems/cards.md`、`pages/systems/cardization-rules.md`
- UI：`pages/systems/gameplay-ui.md`
- マップ遷移：`pages/world/map-transitions.md`
- 現行マイルストーン：`pages/development/free-exploration-core-milestone.md`
- 実装状況：`pages/development/implementation-status.md` とゲーム本体 `fg79sw4nvw-dot/untold-game`

実装状況ページは進捗記録であり、仕様の正本ではない。

## 旧名称エイリアス【運用用】

- ネメリア → オルメド
- アウロス → ハルクァ
- ヴェルノク → レグナ
- ネレム → リュメイ
- マレスタ → ポルトナ
- サヴェリア → ボナペ

町と島を混同しない。

- スカルド：町 / ブリガン島：島
- ボナペ：町 / ペスカラ島：島

## 現行地理の早見【確定】

- 世界：オルバ
- 主島：正式な固有名なし
- 周辺島：ブリガン島、ペスカラ島、セトラ島、ピッコ島、名称未確定の南西火山島、ササラ島
- 大地形：カナタ平原、ネモラ大森林、カンデル山脈、フウラ高原、ミオ湿原、ガレド荒野、ナーヴァ水系
- カナタ平原：エルド地方、レグナ地方、ポルトナ地方

## Wiki更新運用【確定】

- 会話中に確定した事項は、Wiki未反映でもその会話内では確定事項として扱う。
- GitHub反映は原則として確定事項が10項目たまった時点で一括更新する。
- 10項目未満でも、話題の区切り、会話終了時、明示的な更新指示がある場合はまとめて更新してよい。
- 更新時は個別正本だけでなく `pages/open-items.md`、索引、名称参照、`pages.json` への影響も確認する。
- 未確定仕様を自然さ・一般論・実装都合で補完しない。

## 旧資料の扱い【確定】

以下は検索に出ても現行仕様として優先しない。

- `wiki.json`：旧方式・履歴用
- `assets/world-map-v11-rle.json`：旧マップ資料
- `pages/world/world-regions-routes.md`：旧街道・地域資料を含む
- `pages/development/eld-playthrough-goal.md`：廃止済みマイルストーン

`assets/elden-terrain-mask-final.svg` の `elden` は歴史的なファイル名であり、現在の主島名を意味しない。