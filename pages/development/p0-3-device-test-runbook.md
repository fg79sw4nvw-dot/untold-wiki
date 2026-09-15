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
- VercelではWiki用 `untold-wiki` とゲーム用 `untold-game` を別プロジェクトとして運用する。
- Wiki用Vercelプロジェクトをゲーム配信用へ流用しない。
- `untold-game` にはViteビルド、最小PWA、実行用カードアセット同期が実装済み。
- `vercel.json` でVite、`npm run build`、`dist` 出力、およびService Worker更新用ヘッダーを明示する。
- ゲーム用Vercelプロジェクト `untold-game` は作成済みで、`main` からproductionへ自動デプロイする。
- production URL：`https://untold-game.vercel.app/`

---

## 2. Vercelプロジェクト作成条件

Vercelでゲーム用プロジェクトを再作成する必要が生じた場合は以下を使用する。

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
- 代表実行用アセットの404または画像形式不正。
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

## 9. 2026-09-16 初回実機テスト結果

### 実機で確認できた範囲

- iPhone Safariでproduction URLが正常起動した。
- 縦画面で進行可能だった。
- タップ・移動を含む、No.01「忘れられた栞」取得までに必要な操作が成立した。
- No.01のカード化表示まで到達した。

### 発見した不具合

1. No.01カード化画面でイラストが表示されず、破損画像表示になった。
2. カード化表示後に進行が完了せず、操作可能状態へ戻らなかった。

### 原因と修正

#### カード化進行停止

カード化表示を開始する処理は存在したが、表示終了後に `completeBookmarkCardization()` へ接続する処理が不足していた。

修正後は、確定済みのカード化表示時間である約3秒後に自動完了し、次の進行へ戻す。

#### カード画像破損

Wiki制作正本に保存されていた一部 `.webp` が、実際にはWebPではなくHTML内容になっていた。

影響を確認したカード：

- No.01
- No.02
- No.55
- No.56
- No.82
- No.83

No.03は正常なWebPだったため変更しない。

過去のUNTOLD統合データに埋め込まれていた既存WebPを復元元として使用し、上記6枚を `untold-wiki/assets` の制作正本へ復旧した。新規の絵柄・仕様は作成していない。

ゲーム側では以下も追加した。

- `asset-manifest.json` のGit blob SHAとサイズを復旧後の画像へ更新。
- `.webp` 同期時にRIFF / WEBPシグネチャを検査し、HTML等の別内容ならビルドを失敗させる。
- Service Workerキャッシュを新世代へ更新し、旧破損カードキャッシュを削除対象にする。
- カードのstale-while-revalidateではruntimeキャッシュを優先し、同一URLの画像更新後に古いshellキャッシュが恒久的に優先されないようにする。

### 修正後の公開確認

ゲーム本体コミット `22730781ddf3d8859aa4a28197d96ac8f119946e` のVercel productionデプロイがREADYまで完了した。

Vercel本番ビルドでNo.01 / 02 / 03 / 55 / 56 / 82 / 83の同期がすべて成功し、TypeScript / Vite本番ビルドも成功した。

本番のNo.01実行用URLについて以下を確認済み。

- HTTP 200
- `Content-Type: image/webp`
- `Content-Length: 7282`
- 応答本体が `RIFF....WEBP` で開始する正常なWebP

### 次の実機再確認

現在は以下の再確認待ち。

1. Safariでproduction URLを再読込または開き直す。
2. No.01「忘れられた栞」を再取得する。
3. No.01のイラストがカード化表示内に正常表示されることを確認する。
4. カード表示後、約3秒で自動的にカード化表示が終了し、進行・入力が戻ることを確認する。

この再確認が通った後、ホーム画面追加版PWAとオフライン確認へ進む。

---

## 関連正本

- 実機テスト全体方針：`pages/development/device-test-strategy.md`
- P0-3：`pages/development/asset-pipeline.md`
- P0：`pages/development/preflight-risk-milestone.md`
- 実装状況：`pages/development/implementation-status.md`
- 移植性：`governance/platform-portability.md`
