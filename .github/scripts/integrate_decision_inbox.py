from pathlib import Path
import re


def upsert_h2(path, heading, body):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    section = f"{heading}\n\n{body.strip()}\n"
    pat = re.compile(rf"(?ms)^{re.escape(heading)}\n.*?(?=^## |\Z)")
    if pat.search(text):
        text = pat.sub(section, text, count=1)
    else:
        text = text.rstrip() + "\n\n" + section
    p.write_text(text, encoding="utf-8")


cards_body_1 = """- 指定カード99枚の配置区分別配分は、**町・集落46枚（遺物21・生物9・人物16）／主島フィールド20枚（遺物10・生物10・人物0）／ダンジョン23枚（遺物14・生物7・人物2）／島フィールド10枚（遺物9・生物1・人物0）**とする。
- 総計は**遺物54・生物27・人物18**で、番号帯比率と一致させる。
- 人物カードは**町・集落またはダンジョン**に限定し、主島フィールドおよび島フィールドには配置しない。"""

cards_body_2 = """個別カード制作時は以下を**固定配置ではなく調整可能な基準値**として使用する。各カードの設定・取得条件に応じて変更できるが、区分総数と分類合計は「指定カードの配置配分」を維持する。

### 町・集落

| 地域 | 合計 | 遺物 | 生物 | 人物 |
|---|---:|---:|---:|---:|
| エルド | 6 | 2 | 1 | 3 |
| カルドラント | 5 | 3 | 0 | 2 |
| オルメド | 5 | 1 | 2 | 2 |
| ハルクァ | 5 | 2 | 1 | 2 |
| レグナ | 5 | 2 | 1 | 2 |
| リュメイ | 5 | 2 | 2 | 1 |
| モルグレイ | 5 | 3 | 1 | 1 |
| ポルトナ | 5 | 3 | 1 | 1 |
| スカルド | 2 | 1 | 0 | 1 |
| ボナペ | 3 | 2 | 0 | 1 |

### 主島フィールド

| 地域 | 合計 | 遺物 | 生物 |
|---|---:|---:|---:|
| カナタ平原 | 4 | 2 | 2 |
| ネモラ大森林 | 3 | 1 | 2 |
| カンデル山脈 | 3 | 2 | 1 |
| フウラ高原 | 2 | 1 | 1 |
| ミオ湿原 | 3 | 1 | 2 |
| ガレド荒野 | 3 | 2 | 1 |
| ナーヴァ水系周辺 | 2 | 1 | 1 |

### ダンジョン

| ダンジョン | 合計 | 遺物 | 生物 | 人物 |
|---|---:|---:|---:|---:|
| 古渡り坑 | 2 | 1 | 1 | 0 |
| 試し峰 | 3 | 1 | 1 | 1 |
| ネモラ深林 | 2 | 1 | 1 | 0 |
| 断風塔群 | 2 | 2 | 0 | 0 |
| まやかし沼 | 2 | 1 | 1 | 0 |
| 喰われた遺構 | 3 | 1 | 2 | 0 |
| セトラ廃都 | 3 | 2 | 0 | 1 |
| 潮待ち洞 | 2 | 1 | 1 | 0 |
| 焦土山 | 2 | 2 | 0 | 0 |
| 森呑み遺構 | 2 | 2 | 0 | 0 |

### 島フィールド

| 島 | 合計 | 遺物 | 生物 |
|---|---:|---:|---:|
| ブリガン島 | 2 | 2 | 0 |
| ペスカラ島 | 2 | 2 | 0 |
| セトラ島 | 2 | 2 | 0 |
| ピッコ島 | 1 | 1 | 0 |
| 南西火山島 | 2 | 2 | 0 |
| ササラ島 | 1 | 0 | 1 |

### エルド人物カードの進行方針【確定】

- エルドに配置する人物指定カード3枚のうち、既存の「やたらと親切な男」「問いを楽しむ老婆」以外の**残り1枚は序盤で完結させない**。
- 残り1枚は、**中盤以降に取得・意味・役割が効いてくる人物カード**として設計する。
- 具体的な人物、取得条件、物語上の役割は後で決める。"""

upsert_h2("pages/systems/cards.md", "## 指定カードの配置配分【確定】", cards_body_1)
upsert_h2("pages/systems/cards.md", "## 地域別配置の目安【確定】", cards_body_2)

eld = Path("pages/world/eld.md")
text = eld.read_text(encoding="utf-8")
inn_heading = "### 宿屋【確定】"
inn_body = """- エルド宿屋は、**1階の受付・ロビー・食事スペース**を操作可能な内部マップとして用意する。
- 客室は操作可能マップとして作らない。
- 宿泊処理は受付から暗転して実行する。
- 宿泊後は明転し、宿屋1階ロビー内に設定する**専用の固定復帰地点**へ戻す。"""
if inn_heading in text:
    pat = re.compile(rf"(?ms)^{re.escape(inn_heading)}\n.*?(?=^### |^## |\Z)")
    text = pat.sub(inn_heading + "\n\n" + inn_body + "\n\n", text, count=1)
else:
    marker = "\n### 図書館\n"
    if marker not in text:
        raise SystemExit("eld.md: expected 図書館 subsection not found")
    text = text.replace(marker, "\n" + inn_heading + "\n\n" + inn_body + "\n" + marker, 1)
eld.write_text(text, encoding="utf-8")

npcs = Path("pages/world/eld-npcs.md")
text = npcs.read_text(encoding="utf-8")
old = "| ELD-NPC-021 | 未割当 |"
new = "| ELD-NPC-021 | 開かずの小箱：同カードに関する別角度の情報（具体的な情報内容・会話文・clueIdとの関係は未確定） |"
if new not in text:
    if old not in text:
        raise SystemExit("eld-npcs.md: ELD-NPC-021 未割当 row not found")
    text = text.replace(old, new, 1)
npcs.write_text(text, encoding="utf-8")

inbox = Path("decision-inbox.md")
text = inbox.read_text(encoding="utf-8")
text, n1 = re.subn(r"- 未統合件数: \*\*5\*\*", "- 未統合件数: **0**", text, count=1)
if n1 != 1:
    raise SystemExit("decision-inbox.md: expected count 5 not found")
pat = re.compile(r"(?ms)(## 未統合の確定事項\n\n).*?(\n## 記録形式)")
text, n2 = pat.subn(r"\1（なし）\n\2", text, count=1)
if n2 != 1:
    raise SystemExit("decision-inbox.md: unresolved items section not found")
inbox.write_text(text, encoding="utf-8")
