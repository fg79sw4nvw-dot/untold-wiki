# P0-3 iPhone Safari / PWA 実機テスト手順

**状態：確定**  
**決定日：2026-09-16**  
**更新日：2026-09-16**

このページは、`pages/development/device-test-strategy.md` で定めた最初の実機チェックポイントを、P0-3で実行するための手順書である。

目的はゲーム内容の完成度評価ではなく、UNTOLDをSafari / PWAで今後継続的に実機確認できる公開・検証基盤を成立させること。

---

## 1. 現在の前提

- ゲーム本体：`fg79sw4nvw-dot/untold-game` / `main`
- 現在の主要実行環境：iPhone Safari / ホーム画面追加版PWA
- VercelではWiki用 `untold-wiki` プロジェクトが既存であり、ゲーム本体は別プロジェクトとして作成する。
- Wiki用Vercelプロジェクトをゲーム配信用へ流用しない。
- `untold-game` にはViteビルド、最小PWA、実行用カードアセット同期が実装済み。
- `vercel.json` でVite、`npm run build`、`dist` 出力、およびService Worker更新用ヘッダーを明示する。

---

## 2. Vercelプロジェクト作成条件

Vercelで新規プロジェクトを作成するときは以下を使用する。

- Git Repository：`fg79sw4nvw-dot/untold-game`
- Project Name：`untold-game`
- Production Branch：`main`
- Framework Preset：Vite
- Root Directory：リポジトリルート
- Build Command：`npm run build`
- Output Directory：`dist`

`vercel.json` に同じ設定を保持するため、Vercel UIで別の値へ上書きしない。

現時点で追加の環境変数は前提としない。

---

## 3. デプロイ直後の技術確認

公開URLが発行されたら、iPhone実機確認へ入る前に以下を確認する。

1. `/` が200で表示できる。
2. `/manifest.webmanifest` が取得できる。
3. `/sw.js` が取得できる。
4. `/assets/cards/card-001-forgotten-bookmark.webp` が取得できる。
5. `/assets/cards/card-055-book-eating-rat.webp` が取得できる。
6. ページ読み込み時に致命的なランタイムエラーが出ていない。
7. Service Worker登録処理が本番ホストで実行可能である。

この段階で失敗した場合は、iPhone側の操作確認へ進まず、公開設定・ビルド・アセット配信を先に修正する。

---

## 4. iPhone Safari確認

公開URLをiPhone Safariで開き、以下を確認する。

### 起動・表示

- 初回表示が完了する。
- 縦画面で致命的なレイアウト崩れがない。
- Safe Areaに主要UIが潜り込まない。
- 実装済み代表カード画像が表示される。

### 入力

- タップが反応する。
- 現時点で到達可能な移動操作が反応する。
- スクロールやSafari標準ジェスチャーとの致命的競合がない。

### 再読み込み

- Safariの再読み込み後も起動する。
- 再読み込みによって白画面・無限読み込み等にならない。

---

## 5. ホーム画面追加版PWA確認

Safariの共有メニューからホーム画面へ追加して起動する。

確認項目：

- standalone表示で起動する。
- Safari通常タブと比較して致命的な表示差がない。
- 起動後に主要入力が反応する。
- アプリ終了後に再起動できる。
- バックグラウンド移行後に復帰できる。

PWA用の最終アイコンは現時点で未確定であるため、このチェックポイントではアイコン完成度をP0-3合否条件にしない。

---

## 6. Service Worker / オフライン確認

一度オンラインで正常起動し、必要な代表アセットを取得した後に確認する。

1. PWAを終了する。
2. 通信を切る。
3. ホーム画面から再起動する。
4. キャッシュ対象のアプリシェルが起動できるか確認する。
5. No.01 / No.55等、初期キャッシュ対象の代表カードが利用可能か確認する。

未取得の全地域・全カード・全音源がオフラインで利用できることは、この段階では要求しない。

---

## 7. P0-3今回チェックの判定

### 合格

以下が成立した場合、P0-3の「公開PWA / 最初のiPhone実機確認」を通過扱いにできる。

- Vercel本番URLでゲームが起動する。
- manifest / Service Worker / 代表実行用アセットが配信される。
- iPhone Safariで基本表示・入力が成立する。
- ホーム画面追加版PWAとして起動・再起動できる。
- 初期キャッシュ対象について基本的なオフライン再起動を確認できる。

### 不合格

以下は修正して再確認する。

- 本番ビルド失敗。
- 公開URLで白画面・起動不能。
- 代表実行用アセットの404。
- Service Worker登録不能。
- iPhoneで主要操作が不能。
- Safe Area等により主要UIが操作不能。
- ホーム画面追加版が起動不能。
- 想定している初期オフライン起動が成立しない。

---

## 8. 今回は判定しないもの

以下は後続チェックポイントへ送る。

- A1の基本ループ完走。
- 全UIの使いやすさ。
- 全カード・全地域のオフライン利用。
- 長時間プレイ時の最終負荷。
- 全編のセーブ互換性。
- 最終PWAアイコン。
- 製品版全体のバランス。

---

## 関連正本

- 実機テスト全体方針：`pages/development/device-test-strategy.md`
- P0-3：`pages/development/asset-pipeline.md`
- P0：`pages/development/preflight-risk-milestone.md`
- 実装状況：`pages/development/implementation-status.md`
- 移植性：`governance/platform-portability.md`
