from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "kingdom-v2.js"


def replace_once(source: str, old: str, new: str, label: str) -> str:
    if old not in source:
        if new in source:
            return source
        raise RuntimeError(f"Could not locate {label}")
    return source.replace(old, new, 1)


def main() -> None:
    source = RUNTIME.read_text(encoding="utf-8")

    source = replace_once(
        source,
        """    {
      t:'triad',
      title:'The Three Identity Pressures',
      items:[
        {name:'Appetite', question:'What do you desire?'},
        {name:'Approval', question:'Whose validation do you require?'},
        {name:'Control', question:'Whose will do you follow?'}
      ]
    },
    {
      t:'pressure', number:'01', title:'Appetite', question:'What do you desire?',
      ref:'Matthew 4:3-4 KJV',
      principle:'Appetite is the pressure to let immediate desire overrule God’s order.',
      examples:['“I know it is wrong, but I need this.”','“I cannot wait.”','“God understands why I have to do this.”']
    },
    {
      t:'pressure', number:'02', title:'Approval', question:'Whose validation do you require?',
      ref:'Matthew 4:5-7 KJV',
      principle:'Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.',
      examples:['Needing to be noticed.','Becoming offended when overlooked.','Posting for reaction.','Speaking for applause.']
    },
    {
      t:'pressure', number:'03', title:'Control', question:'Whose will do you follow?',
      ref:'Matthew 4:8-10 KJV',
      principle:'Control is the pressure to reach a destination without submitting to God’s process.',
      examples:['Manipulating situations.','Compromising to advance faster.','Forcing relationships.','Refusing to wait.']
    },
    {
      t:'practice', title:'Weekly Practice',
      copy:'Prayerfully identify one area where you have been trying to prove something.',
      items:['Worth','Intelligence','Spirituality','Success','Strength','Independence']
    },
""",
        """    {
      t:'te', n:'16',
      hl:'The Three Identity <span class=\"acc\">Pressures</span>',
      pts:['<strong>Appetite:</strong> What do you desire?','<strong>Approval:</strong> Whose validation do you require?','<strong>Control:</strong> Whose will do you follow?'],
      ref:'Appetite · Approval · Control'
    },
    {
      t:'te', n:'17',
      hl:'Pressure #1: <span class=\"acc\">Appetite</span>',
      pts:['What do you desire?','Appetite is the pressure to let immediate desire overrule God’s order.','“I know it is wrong, but I need this.”','“I cannot wait.”','“God understands why I have to do this.”'],
      ref:'Matthew 4:3-4 KJV'
    },
    {
      t:'te', n:'18',
      hl:'Pressure #2: <span class=\"acc\">Approval</span>',
      pts:['Whose validation do you require?','Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.','Needing to be noticed.','Becoming offended when overlooked.','Posting for reaction.','Speaking for applause.'],
      ref:'Matthew 4:5-7 KJV'
    },
    {
      t:'te', n:'19',
      hl:'Pressure #3: <span class=\"acc\">Control</span>',
      pts:['Whose will do you follow?','Control is the pressure to reach a destination without submitting to God’s process.','Manipulating situations.','Compromising to advance faster.','Forcing relationships.','Refusing to wait.'],
      ref:'Matthew 4:8-10 KJV'
    },
    {
      t:'te', n:'20',
      hl:'<span class=\"acc\">Weekly Practice</span>',
      pts:['Prayerfully identify one area where you have been trying to prove something.','Worth','Intelligence','Spirituality','Success','Strength','Independence'],
      ref:'Replace proving with believing.'
    },
""",
        "custom final slide types",
    )

    source = replace_once(
        source,
        """    {id:'ps139-13-18',ref:'Psalm 139:13-18',kjv:'For thou hast possessed my reins: thou hast covered me in my mother’s womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well. My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth. Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them. How precious also are thy thoughts unto me, O God! how great is the sum of them! If I should count them, they are more in number than the sand: when I awake, I am still with thee.',slides:[1]},
""",
        """    {id:'ps139-13-18',ref:'Psalm 139:13-18',hidden:true,kjv:'For thou hast possessed my reins: thou hast covered me in my mother’s womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well. My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth. Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them. How precious also are thy thoughts unto me, O God! how great is the sum of them! If I should count them, they are more in number than the sand: when I awake, I am still with thee.',slides:[1]},
    {id:'ps139-13',ref:'Psalm 139:13',kjv:'For thou hast possessed my reins: thou hast covered me in my mother’s womb.',rvr:'Porque tú formaste mis entrañas; tú me hiciste en el vientre de mi madre.',slides:[1]},
    {id:'ps139-14',ref:'Psalm 139:14',kjv:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',rvr:'Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien.',slides:[1,20]},
    {id:'ps139-15',ref:'Psalm 139:15',kjv:'My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth.',rvr:'No fue encubierto de ti mi cuerpo, bien que en oculto fui formado, y entretejido en lo más profundo de la tierra.',slides:[1]},
    {id:'ps139-16',ref:'Psalm 139:16',kjv:'Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them.',rvr:'Mi embrión vieron tus ojos, y en tu libro estaban escritas todas aquellas cosas que fueron luego formadas, sin faltar una de ellas.',slides:[1]},
    {id:'ps139-17',ref:'Psalm 139:17',kjv:'How precious also are thy thoughts unto me, O God! how great is the sum of them!',rvr:'¡Cuán preciosos me son, oh Dios, tus pensamientos! ¡Cuán grande es la suma de ellos!',slides:[1]},
    {id:'ps139-18',ref:'Psalm 139:18',kjv:'If I should count them, they are more in number than the sand: when I awake, I am still with thee.',rvr:'Si los enumero, se multiplican más que la arena; despierto, y aún estoy contigo.',slides:[1]},
""",
        "Psalm 139 aggregate verse",
    )

    duplicate = "    {id:'ps139-14',ref:'Psalm 139:14',kjv:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',slides:[1,20]},\n"
    first = source.find(duplicate)
    second = source.find(duplicate, first + 1) if first >= 0 else -1
    if second >= 0:
        source = source[:second] + source[second + len(duplicate):]

    source = source.replace(
        "scriptureMap:SCRIPTURES,verseBank:VERSES,questions:QUESTIONS_DATA,pollBank:POLLS",
        "scriptureMap:SCRIPTURES,verseBank:VERSES.filter(function(v){return !v.hidden;}),questions:QUESTIONS_DATA,pollBank:POLLS",
        1,
    )
    source = source.replace(
        "try{ replaceArray(VERSE_BANK, VERSES); }catch(e){}",
        "try{ replaceArray(VERSE_BANK, VERSES.filter(function(v){return !v.hidden;})); }catch(e){}",
        1,
    )

    marker = "window.KP_STABLE_RUNTIME='native-slides-v1';"
    if marker not in source:
        source = source.replace("  installData();\n", f"  {marker}\n  installData();\n", 1)

    forbidden = ["t:'triad'", "t:'pressure'", "t:'practice'"]
    surviving = [item for item in forbidden if item in source]
    if surviving:
        raise RuntimeError(f"custom slide types survived stabilization: {surviving}")

    required = [
        marker,
        "t:'te', n:'16'",
        "t:'te', n:'17'",
        "t:'te', n:'18'",
        "t:'te', n:'19'",
        "t:'te', n:'20'",
        "hidden:true",
        "Psalm 139:13",
        "Psalm 139:18",
        "rvr:'Porque tú formaste mis entrañas",
    ]
    missing = [item for item in required if item not in source]
    if missing:
        raise RuntimeError(f"stabilized runtime missing markers: {missing}")

    RUNTIME.write_text(source, encoding="utf-8")
    print("Kingdom runtime stabilized: native slides, split bilingual verse bank, no repair layer")


if __name__ == "__main__":
    main()
