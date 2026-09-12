# UNTOLD Wiki

UNTOLDのゲーム設計・実装仕様の正本リポジトリです。

- 正本: `fg79sw4nvw-dot/untold-wiki` / `main`
- 各記事の本文: `pages/` 以下のMarkdown
- 公開Wikiのページ一覧: `pages.json`
- 画像・視覚基準: `assets/`
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
- 既存ページの内容変更は `pages/` 以下のMarkdownへ直接反映する。
- 新規ページを追加する場合は `pages.json` に `slug` / `category` / `path` を追加する。
