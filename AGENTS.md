# UNTOLD Wiki - AI Agent Entry Point

このファイルは、ChatGPT / Codex / その他のAIエージェント向けの**最小入口**です。ゲーム仕様そのものの正本ではありません。

## 通常の最短参照

1. この `AGENTS.md` を読む。
2. `ai-index.json` で話題に対応する正本を特定する。
3. **その作業に直接必要な正本だけ**を読む。

Wiki全体、`README.md`、`ai-manifest.json`、`pages/chatgpt-guide.md` を毎回読み直す必要はありません。

- 「現在のマイルストーン」「次に何を決めるか」「現在地」では、必要に応じて `ai-current.json` を入口にする。
- ルーティングが曖昧、複数ページの優先順位が必要、旧資料の扱いを確認したい場合だけ `ai-manifest.json` を読む。
- Wiki保守、監査、判断基準、参照ルール自体を変更する場合は `pages/chatgpt-guide.md` と `pages/governance/spec-maintenance.md` を読む。

## 絶対ルール

- `main` を正本として扱う。
- 未確定仕様を、自然さ・一般論・実装都合で補完しない。
- `確定` と明記された内容だけを確定仕様として扱う。`暫定` は暫定、`案`・`候補`・`未確定` は未採用。
- 同じ話題に個別の正本ページがある場合、`pages/development/implementation.md` や進捗ページより個別正本を優先する。
- `ai-index.json` と `ai-current.json` は**参照先を決めるための非正本キャッシュ**であり、具体仕様の根拠にはしない。
- `wiki.json`、旧マップ資料、履歴ページを現行仕様の根拠にしない。
- 実装状況はWikiだけで断定せず、必要に応じて `fg79sw4nvw-dot/untold-game` の現行 `main` を確認する。
- 新規公開ページ追加・削除時は `pages.json` も更新する。
- 仕様を確定・変更した場合は、関連する `pages/open-items.md`、索引、名称参照への影響も確認する。

詳細ルーティングは `ai-manifest.json`、Wiki保守ルールは `pages/chatgpt-guide.md` と `pages/governance/spec-maintenance.md` を正とします。
