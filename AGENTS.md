# UNTOLD Wiki - AI Agent Entry Point

このファイルは、ChatGPT / Codex / その他のAIエージェントがこのリポジトリへ入ったときの最小入口です。ゲーム仕様そのものの正本ではありません。

## 最初に読むもの

1. `README.md`
2. `ai-manifest.json`
3. `pages/chatgpt-guide.md`
4. その作業に直接関係する正本ページだけ

Wiki全体を毎回読み直す必要はありません。`ai-manifest.json` の topic routing を使い、必要な正本へ移動してください。

## 絶対ルール

- `main` を正本として扱う。
- 未確定仕様を、自然さ・一般論・実装都合で補完しない。
- `確定` と明記された内容だけを確定仕様として扱う。`暫定` は暫定、`案`・`候補`・`未確定` は未採用。
- 同じ話題に個別の正本ページがある場合、`pages/development/implementation.md` や進捗ページより個別正本を優先する。
- `wiki.json`、旧マップ資料、履歴ページを現行仕様の根拠にしない。
- 実装状況はWikiだけで断定せず、必要に応じて `fg79sw4nvw-dot/untold-game` の現行 `main` を確認する。
- 新規ページ追加・削除時は `pages.json` も更新する。
- 仕様を確定・変更した場合は、関連する `pages/open-items.md`、索引、名称参照への影響も確認する。

詳細な参照優先順位、旧名称、更新運用は `pages/chatgpt-guide.md` を正とします。
