# UNTOLD Decision Inbox

このファイルは、会話中に確定した仕様を**正本へ統合する前に高速保存する一時保管所**です。

**このファイル自体はゲーム仕様の正本ではありません。** ただし、ここに `確定` として残っている未統合項目は、正本へ反映されるまで有効な確定事項として扱います。

## 状態

- 未統合件数: **5**

## 未統合の確定事項

- D-20260917-01 | topic: 指定カード命名 | target: pages/cards/card-roster.md | section: D4制作ルール | op: append | [確定] 指定カードの命名は、対象や状態が直感的に伝わる簡潔さを優先し、設定にない人格化・含意・詩的な意味を足しすぎない。「置き去りの移管票」程度の分かりやすさとひねり量を基準とする。
- D-20260917-02 | topic: No.09 | target: pages/cards/regna-morgrey-card-bundle.md | section: No.09 | op: replace | key: 表示名候補：四門分銅【承認待ち】 | [確定] No.09の正式表示名は「残り印の分銅」とする。
- D-20260917-03 | topic: No.10 | target: pages/cards/regna-morgrey-card-bundle.md | section: No.10 | op: replace | key: 表示名候補：荷帰り札【承認待ち】 | [確定] No.10の正式表示名は「戻り札」とする。
- D-20260917-04 | topic: No.11 | target: pages/cards/regna-morgrey-card-bundle.md | section: No.11 | op: merge | [確定] No.11の正式表示名は「並び札」とする。性質の説明は「手元から離すと、その日の自分の受付順と同じ位置へ紛れ込む」とし、「先に受付した人数と同じ位置」という曖昧な表現は使わない。
- D-20260917-05 | topic: No.12 | target: pages/cards/regna-morgrey-card-bundle.md | section: No.12 | op: replace | key: 表示名候補：継ぎ足し里程石【承認待ち】 | [確定] No.12の正式表示名は「継ぎ足しの里程石」とする。

## 直近の統合確認

- D-20260916-01：`pages/design-philosophy.md` の「プレイヤーの思考・想像の拡張」「記録・知識・選択の大前提」で、作品側が答えを代行せず、複数の解釈・判断とプレイヤー自身の選択を残す方針として統合済みと確認。
- D-20260916-02：`pages/story/gamemaster.md` の「人物像」「性格の核」「出自・『未開』との関係」「『未開』到達後の判断とUNTOLD制作」で、GMが自分と同じ結論や価値観の変化を求めず、相手が自由に考え何を選ぶかを見る人物として統合済みと確認。

## 記録形式

未統合事項は原則として1つの意味上の決定につき1項目で記録します。

```text
- D-YYYYMMDD-NN | topic: <話題> | target: <統合先> | section: <見出し> | op: <merge|append|replace> | key: <既存記述を特定できる短い識別子。不要なら省略> | [確定] <決定内容>
```

- `topic` は No.55、図書館、記録システムなど、統合時にまとめやすい単位にする。
- topic bufferは会話内だけの非永続領域であり、永続保存が必要な場合は `decision-inbox.md` へまとめて書き込む。
- 未確定・候補・保留はこのファイルへ入れない。
- 一つの決定を件数稼ぎのために細かく分割しない。
- 同一targetの複数決定はtargetを1回だけ取得してまとめて反映する。
