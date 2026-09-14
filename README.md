# UNTOLD Wiki

UNTOLDのゲーム設計・実装仕様の正本リポジトリです。

- 正本: `fg79sw4nvw-dot/untold-wiki` / `main`
- AI最小入口: `AGENTS.md`
- AI高速ルーター: `ai-index.json`
- AI現在地ルーター: `ai-current.json`
- AI詳細ルーター: `ai-manifest.json`
- 各記事の本文: `pages/` 以下のMarkdown
- ChatGPT運用・監査ルール: `pages/chatgpt-guide.md`
- 仕様保守・変更ルール: `pages/governance/spec-maintenance.md`
- 横断判断基準レジストリ: `governance/criteria-registry.json`
- 基準の遡及適用履歴: `governance/review-ledger.json`
- 公開Wikiのページ一覧: `pages.json`
- 画像・視覚基準: `assets/`
- 未確定事項: `pages/open-items.md`
- 現在の実装状況: `pages/development/implementation-status.md`

## AIの通常参照

AIエージェントは通常、`AGENTS.md` → `ai-index.json` → 話題に直接関係する正本、の順で参照する。

`README.md`、`ai-manifest.json`、`pages/chatgpt-guide.md` を毎回答えのたびに読む必要はない。

- 現在地や次の開発判断: `ai-current.json`
- ルートが曖昧、優先順位や旧資料の扱いまで必要: `ai-manifest.json`
- Wiki保守・監査・ルーティング変更: `pages/chatgpt-guide.md`、`pages/governance/spec-maintenance.md`

`ai-index.json` と `ai-current.json` は参照高速化用であり、ゲーム仕様本文の正本ではない。

## 正本の優先順位

同じ内容について記述が食い違う場合、原則として以下を優先する。

1. 同一会話で新しく確定したが、まだWikiへ未反映の事項
2. 話題ごとに指定された現行の正本ページ
3. `pages/design-philosophy.md` や `pages/naming-guidelines.md` などの横断ルール
4. 個別ページ内の補助的な要約
5. 実装状況・開発引き継ぎページの要約
6. 廃止済み・履歴・旧資料

`pages/development/implementation.md` と個別正本が同じ話題を扱う場合は、個別正本を優先する。

## 変更しやすいWikiにするための原則

- 一つの仕様事実には、原則として一つの正本を置く。
- 管理ページ、索引、進捗ページへ同じ確定内容を必要以上に複製しない。
- 索引や要約は「どの正本を見るか」を示す役割を優先する。
- 横断的な判断基準には `governance/criteria-registry.json` で固定ID・適用範囲・遡及モードを持たせる。
- 新しい判断基準を既存仕様へ適用・監査した履歴は `governance/review-ledger.json` に残す。
- 基準を登録しただけで、既存仕様へ適用済みと扱わない。

詳細は `pages/governance/spec-maintenance.md` を正とする。

## 公開Wikiの読み込み方式

公開Wikiは `pages.json` を目次として読み込み、各ページのMarkdownを直接取得して表示する。

既存ページ本文を更新するときは該当Markdownを更新する。新しい公開ページを追加・削除した場合は `pages.json` も更新する。

`wiki.json` は旧方式との互換・履歴参照用として残すが、公開Wiki本文や現行仕様の正本としては扱わない。

## 更新ルール

- `確定`、`暫定`、`案`、`未確定`、`廃止`を混同しない。
- 未確定事項を勝手に確定しない。
- イベント、会話、演出、ストーリー、主人公の反応などは `pages/design-philosophy.md` を参照する。
- 人物名、地名、組織名、種族名、カード名などの新規命名は `pages/naming-guidelines.md` を参照する。
- 横断基準を追加・変更する場合は `governance/criteria-registry.json` と `pages/governance/spec-maintenance.md` に従う。
- GitHubへの仕様反映は原則として確定事項を10項目ためて一括更新する。10項目未満でも、話題の区切り、会話終了時、明示的な更新指示がある場合はまとめて更新してよい。
- 一括更新では個別正本だけでなく、`pages/open-items.md`、索引、名称参照、`pages.json` への影響も確認する。
- ゲーム内容を変えないWiki保守は、矛盾・古い名称・目次漏れ・重複説明・参照優先順位を整理してよい。
- 世界観、ストーリー、キャラクター、システム仕様、数値、カード、NPC、マップなどの確定内容そのものを変更する場合は、明示的な変更指示がある場合を除き勝手に変更しない。
- 実装状況を扱うときは `pages/development/implementation-status.md` だけで判断せず、必要に応じてゲーム本体 `fg79sw4nvw-dot/untold-game` の現行状態も照合する。

## AIルーティング検証

`tools/validate-ai-routing.mjs` で、`ai-index.json` / `ai-current.json` / `ai-manifest.json` の参照切れと主要見出しの不整合を検査する。

GitHub Actions の `.github/workflows/validate-ai-routing.yml` でも、関連ファイルの変更時に同じ検査を実行する。
