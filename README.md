# UNTOLD Wiki

UNTOLDのゲーム設計・実装仕様の正本リポジトリです。

- 正本: `fg79sw4nvw-dot/untold-wiki` / `main`
- 各記事の本文: `pages/` 以下のMarkdown
- 公開Wikiのページ一覧: `pages.json`
- 画像・視覚基準: `assets/`
- 設計思想・設計判断ルール: `pages/design-philosophy.md`
- 未確定事項: `pages/open-items.md`
- ChatGPT実装引き継ぎ: `pages/development/implementation.md`
- 簡易エンカウント仕様: `pages/systems/encounters.md`

新しいチャットでは「GitHubの `fg79sw4nvw-dot/untold-wiki` を正本として読み込む」と指定してください。

## 公開Wikiの読み込み方式

公開Wikiは `wiki.json` 内の本文を表示せず、`pages.json` を目次として読み込み、各ページのMarkdownを直接取得して表示する。

そのため、既存ページの本文を更新するときは該当Markdownだけを更新すればよい。新しいページを追加・削除した場合だけ `pages.json` の目次も更新する。

`wiki.json` は旧方式との互換・履歴参照用として残すが、公開Wiki本文の正本としては扱わない。

## 更新ルール

- 確定・一旦・案・未定を混同しない。
- 未確定事項を勝手に確定しない。
- イベント、会話、演出、ストーリー、主人公の反応など設計思想に関わる判断は `pages/design-philosophy.md` を参照する。矛盾・不整合の扱いも同ページを正本とする。
- 既存ページの内容変更は `pages/` 以下のMarkdownへ直接反映する。
- 新規ページを追加する場合は `pages.json` に `slug` / `category` / `path` を追加する。
- 目次漏れ、リンク、重複した運用説明、ChatGPT向け参照順、ページ役割の重複など、ゲーム内容を変えないWiki保守は必要に応じて整理する。
- 世界観、ストーリー、キャラクター、システム仕様、数値、カード、NPC、マップなどゲーム内容に関わる確定事項を変更する場合は、明示的な変更指示がある場合を除き内容確認を行う。
- 実装状況や最新状態を扱うときは、引き継ぎページの静的な記録だけで判断せず、ゲーム本体側の現行状態も照合する。
