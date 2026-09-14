# UNTOLD Wiki

UNTOLDのゲーム設計・実装仕様の正本リポジトリです。

- 正本: `fg79sw4nvw-dot/untold-wiki` / `main`
- AIエージェント入口: `AGENTS.md`
- AI向け機械可読ルーター: `ai-manifest.json`
- 各記事の本文: `pages/` 以下のMarkdown
- ChatGPT運用ルーター: `pages/chatgpt-guide.md`
- 公開Wikiのページ一覧: `pages.json`
- 画像・視覚基準: `assets/`
- 設計思想: `pages/design-philosophy.md`
- 命名基準: `pages/naming-guidelines.md`
- 未確定事項: `pages/open-items.md`
- 現在の実装状況: `pages/development/implementation-status.md`
- 長期的な実装仕様・引き継ぎ: `pages/development/implementation.md`

新しいチャットでは、まず `README.md`、`ai-manifest.json`、`pages/chatgpt-guide.md` を確認し、その後は話題に直接関係する正本だけを参照する。AIエージェントが `AGENTS.md` を自動認識できる場合は、そこを入口にしてよい。

## 正本の優先順位

同じ内容について記述が食い違う場合、原則として以下を優先する。

1. 同一会話で新しく確定したが、まだWikiへ未反映の事項
2. 話題ごとに指定された現行の正本ページ
3. `pages/design-philosophy.md` や `pages/naming-guidelines.md` などの横断ルール
4. 個別ページ内の補助的な要約
5. 実装状況・開発引き継ぎページの要約
6. 廃止済み・履歴・旧資料

`pages/development/implementation.md` と個別の正本ページが同じ話題を扱う場合は、個別正本を優先する。詳細な参照先は `ai-manifest.json` と `pages/chatgpt-guide.md` を正とする。

## 公開Wikiの読み込み方式

公開Wikiは `wiki.json` 内の本文を表示せず、`pages.json` を目次として読み込み、各ページのMarkdownを直接取得して表示する。

既存ページの本文を更新するときは該当Markdownを更新する。新しいページを追加・削除した場合は `pages.json` も更新する。

`wiki.json` は旧方式との互換・履歴参照用として残すが、公開Wiki本文や現行仕様の正本としては扱わない。

`ai-manifest.json` は参照先を決めるためのルーティング情報であり、ゲーム仕様本文の正本ではない。

## 更新ルール

- `確定`、`暫定`、`案`、`未確定`、`廃止`を混同しない。
- 未確定事項を勝手に確定しない。
- イベント、会話、演出、ストーリー、主人公の反応などは `pages/design-philosophy.md` を参照する。
- 人物名、地名、組織名、種族名、カード名などの新規命名は `pages/naming-guidelines.md` を参照する。
- ChatGPTの参照順、旧資料の扱い、名称エイリアスは `pages/chatgpt-guide.md` を参照する。
- GitHubへの仕様反映は原則として確定事項を10項目ためて一括更新する。10項目未満でも、話題の区切り、会話終了時、明示的な更新指示がある場合はまとめて更新してよい。
- 一括更新では個別正本だけでなく、`pages/open-items.md`、索引、名称参照、`pages.json` への影響も確認する。
- 新規ページを追加する場合は `pages.json` に `slug` / `category` / `path` を追加する。
- ゲーム内容を変えないWiki保守は、矛盾・古い名称・目次漏れ・重複説明・参照優先順位を整理してよい。
- 世界観、ストーリー、キャラクター、システム仕様、数値、カード、NPC、マップなどの確定内容そのものを変更する場合は、明示的な変更指示がある場合を除き勝手に変更しない。
- 実装状況を扱うときは `pages/development/implementation-status.md` だけで判断せず、必要に応じてゲーム本体 `fg79sw4nvw-dot/untold-game` の現行状態も照合する。
