"use client";

import { useContext } from "react";
import { TraditionalContext } from "../components/providers/traditional-provider";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Frequent = () => {
  const { tradSelected } = useContext(TraditionalContext);
  const mostFrequent100 = [
    {
      simp: "就",
      trad: "就",
      definitions:
        '["at once","right away","only","just (emphasis)","as early as","already","as soon as","then","in that case","as many as","even if","to approach","to move towards","to undertake","to engage in","to suffer","subjected to","to accomplish","to take advantage of","to go with (of foods)","with regard to","concerning"]',
      pinyin: "jiù",
    },
    {
      simp: "的",
      trad: "的",
      definitions:
        '["of","~\'s (possessive particle)","(used after an attribute)","(used to form a nominal expression)","(used at the end of a declarative sentence for emphasis)"]',
      pinyin: "de",
    },
    {
      simp: "会",
      trad: "會",
      definitions:
        '["can","to be possible","to be able to","will","to be likely to","to be sure to","to assemble","to meet","to gather","to see","union","group","association","CL:個|个[gè]","a moment (Taiwan pr. for this sense is [huǐ])"]',
      pinyin: "huì",
    },
    {
      simp: "对",
      trad: "對",
      definitions:
        '["right","correct","couple","pair","towards","at","for","to face","opposite","to treat (sb a certain way)","to match together","to adjust","to fit","to suit","to answer","to reply","classifier: couple"]',
      pinyin: "duì",
    },
    {
      simp: "做",
      trad: "做",
      definitions:
        '["to do","to make","to produce","to write","to compose","to act as","to engage in","to hold (a party)","to be","to become","to function (in some capacity)","to serve as","to be used for","to form (a bond or relationship)","to pretend","to feign","to act a part","to put on appearance"]',
      pinyin: "zuò",
    },
    {
      simp: "去",
      trad: "去",
      definitions:
        '["to go","to go to (a place)","(of a time etc) last","just passed","to send","to remove","to get rid of","to reduce","to be apart from in space or time","to die (euphemism)","to play (a part)","(when used either before or after a verb) to go in order to do sth","(after a verb of motion indicates movement away from the speaker)","(used after certain verbs to indicate detachment or separation)"]',
      pinyin: "qù",
    },
    {
      simp: "大",
      trad: "大",
      definitions:
        '["big","huge","large","major","great","wide","deep","older (than)","oldest","eldest","greatly","very much","(dialect) father","father\'s elder or younger brother"]',
      pinyin: "dà",
    },
    {
      simp: "是",
      trad: "是",
      definitions: '["is","are","am","yes","to be"]',
      pinyin: "shì",
    },
    {
      simp: "看",
      trad: "看",
      definitions:
        '["to see","to look at","to read","to watch","to visit","to call on","to consider","to regard as","to look after","to treat (an illness)","to depend on","to feel (that)","(after verb) to give it a try","Watch out! (for a danger)"]',
      pinyin: "kàn",
    },
    {
      simp: "好",
      trad: "好",
      definitions:
        '["good","well","proper","good to","easy to","very","so","(suffix indicating completion or readiness)","(of two people) close","on intimate terms","(after a personal pronoun) hello"]',
      pinyin: "hǎo",
    },
    {
      simp: "要",
      trad: "要",
      definitions:
        '["important","vital","to want","to ask for","will","going to (as future auxiliary)","may","must","(used in a comparison) must be","probably","if"]',
      pinyin: "yào",
    },
    {
      simp: "上",
      trad: "上",
      definitions:
        '["on top","upon","above","upper","previous","first (of multiple parts)","to climb","to get onto","to go up","to attend (class or university)"]',
      pinyin: "shàng",
    },
    {
      simp: "我",
      trad: "我",
      definitions: '["I","me","my"]',
      pinyin: "wǒ",
    },
    {
      simp: "在",
      trad: "在",
      definitions:
        '["(located) at","(to be) in","to exist","in the middle of doing sth","(indicating an action in progress)"]',
      pinyin: "zài",
    },
    {
      simp: "打",
      trad: "打",
      definitions:
        '["to beat","to strike","to hit","to break","to type","to mix up","to build","to fight","to fetch","to make","to tie up","to issue","to shoot","to calculate","to play (a game)","since","from"]',
      pinyin: "dǎ",
    },
    {
      simp: "起",
      trad: "起",
      definitions:
        '["to rise","to raise","to get up","to set out","to start","to appear","to launch","to initiate (action)","to draft","to establish","to get (from a depot or counter)","verb suffix, to start","starting from (a time, place, price etc)","classifier for occurrences or unpredictable events: case, instance","classifier for groups: batch, group"]',
      pinyin: "qǐ",
    },
    {
      simp: "门",
      trad: "門",
      definitions:
        '["gate","door","CL:扇[shàn]","gateway","doorway","CL:個|个[gè]","opening","valve","switch","way to do something","knack","family","house","(religious) sect","school (of thought)","class","category","phylum or division (taxonomy)","classifier for large guns","classifier for lessons, subjects, branches of technology","(suffix) -gate (i.e. scandal; derived from Watergate)"]',
      pinyin: "mén",
    },
    {
      simp: "他",
      trad: "他",
      definitions:
        '["he or him","(used for either sex when the sex is unknown or unimportant)","(used before sb\'s name for emphasis)","(used as a meaningless mock object)","other","another"]',
      pinyin: "tā",
    },
    {
      simp: "行",
      trad: "行",
      definitions:
        '["to walk","to go","to travel","a visit","temporary","makeshift","current","in circulation","to do","to perform","capable","competent","effective","all right","OK!","will do","behavior","conduct","Taiwan pr. [xìng] for the behavior-conduct sense"]',
      pinyin: "xíng",
    },
    {
      simp: "了",
      trad: "了",
      definitions:
        '["(modal particle intensifying preceding clause)","(completed action marker)"]',
      pinyin: "le",
    },
    {
      simp: "是",
      trad: "昰",
      definitions: '["variant of 是[shì]","(used in given names)"]',
      pinyin: "shì",
    },
    {
      simp: "和",
      trad: "和",
      definitions:
        '["and","together with","with","sum","union","peace","harmony","Taiwan pr. [hàn] when it means \\"and\\" or \\"with\\""]',
      pinyin: "hé",
    },
    {
      simp: "有",
      trad: "有",
      definitions: '["to have","there is","there are","to exist","to be"]',
      pinyin: "yǒu",
    },
    {
      simp: "下",
      trad: "下",
      definitions:
        '["down","downwards","below","lower","later","next (week etc)","second (of two parts)","to decline","to go down","to arrive at (a decision, conclusion etc)","measure word to show the frequency of an action"]',
      pinyin: "xià",
    },
    {
      simp: "还",
      trad: "還",
      definitions:
        '["still","still in progress","still more","yet","even more","in addition","fairly","passably (good)","as early as","even","also","else"]',
      pinyin: "hái",
    },
    {
      simp: "不",
      trad: "不",
      definitions: '["(negative prefix)","not","no"]',
      pinyin: "bù",
    },
    {
      simp: "白",
      trad: "白",
      definitions:
        '["white","snowy","pure","bright","empty","blank","plain","clear","to make clear","in vain","gratuitous","free of charge","reactionary","anti-communist","funeral","to stare coldly","to write wrong character","to state","to explain","vernacular","spoken lines in opera"]',
      pinyin: "bái",
    },
    {
      simp: "的",
      trad: "的",
      definitions: '["aim","clear"]',
      pinyin: "dì",
    },
    {
      simp: "了",
      trad: "了",
      definitions:
        '["to finish","to achieve","variant of 瞭|了[liǎo]","to understand clearly"]',
      pinyin: "liǎo",
    },
    {
      simp: "道",
      trad: "道",
      definitions:
        '["road","path","CL:條|条[tiáo],股[gǔ]","principle","truth","morality","reason","skill","method","Dao (of Daoism)","to say","to speak","to talk","classifier for long thin things (rivers, cracks etc), barriers (walls, doors etc), questions (in an exam etc), commands, courses in a meal, steps in a process","(old) administrative division (similar to province in Tang times)"]',
      pinyin: "dào",
    },
    {
      simp: "个",
      trad: "個",
      definitions:
        '["individual","this","that","size","classifier for people or objects in general"]',
      pinyin: "gè",
    },
    {
      simp: "说",
      trad: "說",
      definitions:
        '["to speak","to say","to explain","to scold","to tell off","a theory (typically the last character in a compound, as in 日心說|日心说 heliocentric theory)"]',
      pinyin: "shuō",
    },
    {
      simp: "当",
      trad: "當",
      definitions:
        '["to be","to act as","manage","withstand","when","during","ought","should","match equally","equal","same","obstruct","just at (a time or place)","on the spot","right","just at"]',
      pinyin: "dāng",
    },
    {
      simp: "人",
      trad: "人",
      definitions: '["man","person","people","CL:個|个[gè],位[wèi]"]',
      pinyin: "rén",
    },
    {
      simp: "从",
      trad: "從",
      definitions:
        '["from","through","via","to follow","to obey","to engage in (an activity)","never (in negative sentence)","(Taiwan pr. [zòng]) retainer","assistant","auxiliary","subordinate","related by common paternal grandfather or earlier ancestor"]',
      pinyin: "cóng",
    },
    {
      simp: "中",
      trad: "中",
      definitions:
        '["within","among","in","middle","center","while (doing sth)","during","(dialect) OK","all right"]',
      pinyin: "zhōng",
    },
    {
      simp: "这",
      trad: "這",
      definitions:
        '["this","these","(commonly pr. [zhèi] before a classifier, esp. in Beijing)"]',
      pinyin: "zhè",
    },
    {
      simp: "带",
      trad: "帶",
      definitions:
        '["band","belt","girdle","ribbon","tire","area","zone","region","CL:條|条[tiáo]","to wear","to carry","to take along","to bear (i.e. to have)","to lead","to bring","to look after","to raise"]',
      pinyin: "dài",
    },
    {
      simp: "来",
      trad: "來",
      definitions:
        '["to come","to arrive","to come round","ever since","next"]',
      pinyin: "lái",
    },
    {
      simp: "出",
      trad: "出",
      definitions:
        '["to go out","to come out","to occur","to produce","to go beyond","to rise","to put forth","to happen","(used after a verb to indicate an outward direction or a positive result)","classifier for dramas, plays, operas etc"]',
      pinyin: "chū",
    },
    {
      simp: "的",
      trad: "的",
      definitions: '["really and truly"]',
      pinyin: "dí",
    },
    {
      simp: "得",
      trad: "得",
      definitions:
        '["to obtain","to get","to gain","to catch (a disease)","proper","suitable","proud","contented","to allow","to permit","ready","finished"]',
      pinyin: "dé",
    },
    {
      simp: "你",
      trad: "你",
      definitions: '["you (informal, as opposed to courteous 您[nín])"]',
      pinyin: "nǐ",
    },
    {
      simp: "了",
      trad: "瞭",
      definitions:
        '["(of eyes) bright","clear-sighted","to understand clearly"]',
      pinyin: "liǎo",
    },
    {
      simp: "到",
      trad: "到",
      definitions:
        '["to (a place)","until (a time)","up to","to go","to arrive","(verb complement denoting completion or result of an action)"]',
      pinyin: "dào",
    },
    {
      simp: "前",
      trad: "前",
      definitions:
        '["front","forward","ahead","first","top (followed by a number)","future","ago","before","BC (e.g. 前293年)","former","formerly"]',
      pinyin: "qián",
    },
    {
      simp: "次",
      trad: "次",
      definitions:
        '["next in sequence","second","the second (day, time etc)","secondary","vice-","sub-","infra-","inferior quality","substandard","order","sequence","hypo- (chemistry)","classifier for enumerated events: time"]',
      pinyin: "cì",
    },
    {
      simp: "快",
      trad: "快",
      definitions:
        '["rapid","quick","speed","rate","soon","almost","to make haste","clever","sharp (of knives or wits)","forthright","plainspoken","gratified","pleased","pleasant"]',
      pinyin: "kuài",
    },
    {
      simp: "走",
      trad: "走",
      definitions:
        '["to walk","to go","to run","to move (of vehicle)","to visit","to leave","to go away","to die (euph.)","from","through","away (in compound verbs, such as 撤走[chè​zǒu])","to change (shape, form, meaning)"]',
      pinyin: "zǒu",
    },
    {
      simp: "为",
      trad: "爲",
      definitions:
        '["variant of 為|为[wéi]","as (i.e. in the capacity of)","to take sth as","to act as","to serve as","to behave as","to become","to be","to do"]',
      pinyin: "wéi",
    },
    {
      simp: "为",
      trad: "為",
      definitions:
        '["as (in the capacity of)","to take sth as","to act as","to serve as","to behave as","to become","to be","to do","by (in the passive voice)"]',
      pinyin: "wéi",
    },
    {
      simp: "都",
      trad: "都",
      definitions:
        '["all","both","entirely","(used for emphasis) even","already","(not) at all"]',
      pinyin: "dōu",
    },
    {
      simp: "等",
      trad: "等",
      definitions:
        '["class","rank","grade","equal to","same as","to wait for","to await","et cetera","and so on","et al. (and other authors)","after","as soon as","once"]',
      pinyin: "děng",
    },
    {
      simp: "头",
      trad: "頭",
      definitions:
        '["head","hair style","the top","end","beginning or end","a stub","remnant","chief","boss","side","aspect","first","leading","classifier for pigs or livestock","CL:個|个[gè]"]',
      pinyin: "tóu",
    },
    {
      simp: "可",
      trad: "可",
      definitions:
        '["can","may","able to","to approve","to permit","to suit","(particle used for emphasis) certainly","very"]',
      pinyin: "kě",
    },
    {
      simp: "想",
      trad: "想",
      definitions:
        '["to think","to believe","to suppose","to wish","to want","to miss (feel wistful about the absence of sb or sth)"]',
      pinyin: "xiǎng",
    },
    {
      simp: "给",
      trad: "給",
      definitions:
        '["to","for","for the benefit of","to give","to allow","to do sth (for sb)","(grammatical equivalent of 被)","(grammatical equivalent of 把)","(sentence intensifier)"]',
      pinyin: "gěi",
    },
    {
      simp: "过",
      trad: "過",
      definitions:
        '["to cross","to go over","to pass (time)","to celebrate (a holiday)","to live","to get along","excessively","too-"]',
      pinyin: "guò",
    },
    {
      simp: "着",
      trad: "著",
      definitions:
        '["to touch","to come in contact with","to feel","to be affected by","to catch fire","to burn","(coll.) to fall asleep","(after a verb) hitting the mark","succeeding in"]',
      pinyin: "zháo",
    },
    {
      simp: "能",
      trad: "能",
      definitions:
        '["can","to be able to","might possibly","ability","(physics) energy"]',
      pinyin: "néng",
    },
    {
      simp: "那",
      trad: "那",
      definitions:
        '["that","those","then (in that case)","commonly pr. [nèi] before a classifier, esp. in Beijing"]',
      pinyin: "nà",
    },
    {
      simp: "把",
      trad: "把",
      definitions:
        '["to hold","to contain","to grasp","to take hold of","handle","particle marking the following noun as a direct object","classifier for objects with handle","classifier for small objects: handful"]',
      pinyin: "bǎ",
    },
    {
      simp: "开",
      trad: "開",
      definitions:
        '["to open","to start","to turn on","to boil","to write out (a prescription, check, invoice etc)","to operate (a vehicle)","carat (gold)","abbr. for Kelvin, 開爾文|开尔文[Kāi​\'ěr​wén]","abbr. for 開本|开本[kāi​běn], book format"]',
      pinyin: "kāi",
    },
    {
      simp: "回",
      trad: "回",
      definitions:
        '["to circle","to go back","to turn around","to answer","to return","to revolve","Hui ethnic group (Chinese Muslims)","time","classifier for acts of a play","section or chapter (of a classic book)"]',
      pinyin: "huí",
    },
    {
      simp: "个",
      trad: "箇",
      definitions: '["variant of 個|个[gè]"]',
      pinyin: "gè",
    },
    {
      simp: "时",
      trad: "時",
      definitions: '["o\'clock","time","when","hour","season","period"]',
      pinyin: "shí",
    },
    {
      simp: "后",
      trad: "後",
      definitions:
        '["back","behind","rear","afterwards","after","later","post-"]',
      pinyin: "hòu",
    },
    {
      simp: "和",
      trad: "龢",
      definitions: '["old variant of 和[hé]","harmonious"]',
      pinyin: "hé",
    },
    {
      simp: "分",
      trad: "分",
      definitions:
        '["to divide","to separate","to distribute","to allocate","to distinguish (good and bad)","part or subdivision","fraction","one tenth (of certain units)","unit of length equivalent to 0.33 cm","minute (unit of time)","minute (angular measurement unit)","a point (in sports or games)","0.01 yuan (unit of money)"]',
      pinyin: "fēn",
    },
    {
      simp: "话",
      trad: "話",
      definitions:
        '["dialect","language","spoken words","speech","talk","words","conversation","what sb said","CL:種|种[zhǒng],席[xí],句[jù],口[kǒu],番[fān]"]',
      pinyin: "huà",
    },
    {
      simp: "家",
      trad: "家",
      definitions:
        '["home","family","(polite) my (sister, uncle etc)","classifier for families or businesses","refers to the philosophical schools of pre-Han China","noun suffix for a specialist in some activity, such as a musician or revolutionary, corresponding to English -ist, -er, -ary or -ian","CL:個|个[gè]"]',
      pinyin: "jiā",
    },
    {
      simp: "本",
      trad: "本",
      definitions:
        '["root","stem","origin","source","this","the current","original","inherent","originally","classifier for books, periodicals, files etc"]',
      pinyin: "běn",
    },
    {
      simp: "别",
      trad: "別",
      definitions:
        '["to leave","to depart","to separate","to distinguish","to classify","other","another","don\'t ...!","to pin","to stick (sth) in"]',
      pinyin: "bié",
    },
    {
      simp: "安",
      trad: "安",
      definitions:
        '["content","calm","still","quiet","safe","secure","in good health","to find a place for","to install","to fix","to fit","to bring (a charge against sb)","to pacify","to harbor (good intentions)","security","safety","peace","ampere"]',
      pinyin: "ān",
    },
    {
      simp: "用",
      trad: "用",
      definitions:
        '["to use","to employ","to have to","to eat or drink","expense or outlay","usefulness","hence","therefore"]',
      pinyin: "yòng",
    },
    {
      simp: "说",
      trad: "説",
      definitions: '["variant of 說|说[shuō]"]',
      pinyin: "shuō",
    },
    {
      simp: "和",
      trad: "咊",
      definitions: '["old variant of 和[hé]"]',
      pinyin: "hé",
    },
    {
      simp: "很",
      trad: "很",
      definitions: '["(adverb of degree)","quite","very","awfully"]',
      pinyin: "hěn",
    },
    {
      simp: "解",
      trad: "解",
      definitions:
        '["to divide","to break up","to split","to separate","to dissolve","to solve","to melt","to remove","to untie","to loosen","to open","to emancipate","to explain","to understand","to know","a solution","a dissection"]',
      pinyin: "jiě",
    },
    {
      simp: "也",
      trad: "也",
      definitions:
        '["also","too","(in Classical Chinese) final particle implying affirmation"]',
      pinyin: "yě",
    },
    {
      simp: "进",
      trad: "進",
      definitions:
        '["to go forward","to advance","to go in","to enter","to put in","to submit","to take in","to admit","(math.) base of a number system","classifier for sections in a building or residential compound"]',
      pinyin: "jìn",
    },
    {
      simp: "的",
      trad: "的",
      definitions: '["see 的士[dī​shì]"]',
      pinyin: "dī",
    },
    {
      simp: "里",
      trad: "里",
      definitions:
        '["li, ancient measure of length, approx. 500 m","neighborhood","ancient administrative unit of 25 families","(Tw) borough, administrative unit between the township 鎮|镇[zhèn] and neighborhood 鄰|邻[lín] levels"]',
      pinyin: "lǐ",
    },
    {
      simp: "错",
      trad: "錯",
      definitions:
        '["mistake","wrong","bad","interlocking","complex","to grind","to polish","to alternate","to stagger","to miss","to let slip","to evade","to inlay with gold or silver"]',
      pinyin: "cuò",
    },
    {
      simp: "事",
      trad: "事",
      definitions:
        '["matter","thing","item","work","affair","CL:件[jiàn],樁|桩[zhuāng],回[huí]"]',
      pinyin: "shì",
    },
    {
      simp: "没",
      trad: "沒",
      definitions: '["(negative prefix for verbs)","have not","not"]',
      pinyin: "méi",
    },
    {
      simp: "理",
      trad: "理",
      definitions:
        '["texture","grain (of wood)","inner essence","intrinsic order","reason","logic","truth","science","natural science (esp. physics)","to manage","to pay attention to","to run (affairs)","to handle","to put in order","to tidy up"]',
      pinyin: "lǐ",
    },
    {
      simp: "老",
      trad: "老",
      definitions:
        '["prefix used before the surname of a person or a numeral indicating the order of birth of the children in a family or to indicate affection or familiarity","old (of people)","venerable (person)","experienced","of long standing","always","all the time","of the past","very","outdated","(of meat etc) tough"]',
      pinyin: "lǎo",
    },
    {
      simp: "方",
      trad: "方",
      definitions:
        '["square","power or involution (math.)","upright","honest","fair and square","direction","side","party (to a contract, dispute etc)","place","method","prescription (medicine)","just when","only or just","classifier for square things","abbr. for square or cubic meter"]',
      pinyin: "fāng",
    },
    {
      simp: "而",
      trad: "而",
      definitions:
        '["and","as well as","and so","but (not)","yet (not)","(indicates causal relation)","(indicates change of state)","(indicates contrast)"]',
      pinyin: "ér",
    },
    {
      simp: "但",
      trad: "但",
      definitions: '["but","yet","however","only","merely","still"]',
      pinyin: "dàn",
    },
    {
      simp: "经",
      trad: "經",
      definitions:
        '["classics","sacred book","scripture","to pass through","to undergo","to bear","to endure","warp (textile)","longitude","menstruation","channel (TCM)","abbr. for economics 經濟|经济[jīng​jì]"]',
      pinyin: "jīng",
    },
    {
      simp: "了",
      trad: "瞭",
      definitions: '["unofficial variant of 瞭[liào]"]',
      pinyin: "liào",
    },
    {
      simp: "帮",
      trad: "幫",
      definitions:
        '["to help","to assist","to support","for sb (i.e. as a help)","hired (as worker)","side (of pail, boat etc)","outer layer","upper (of a shoe)","group","gang","clique","party","secret society"]',
      pinyin: "bāng",
    },
    {
      simp: "掉",
      trad: "掉",
      definitions:
        '["to fall","to drop","to lag behind","to lose","to go missing","to reduce","fall (in prices)","to lose (value, weight etc)","to wag","to swing","to turn","to change","to exchange","to swap","to show off","to shed (hair)","(used after certain verbs to express completion, fulfillment, removal etc)"]',
      pinyin: "diào",
    },
    {
      simp: "管",
      trad: "管",
      definitions:
        '["to take care (of)","to control","to manage","to be in charge of","to look after","to run","to care about","tube","pipe","woodwind","classifier for tube-shaped objects","particle similar to 把[bǎ] in 管...叫 constructions","writing brush","(coll.) to","towards"]',
      pinyin: "guǎn",
    },
    {
      simp: "机",
      trad: "機",
      definitions:
        '["machine","engine","opportunity","intention","aircraft","pivot","crucial point","flexible (quick-witted)","organic","CL:臺|台[tái]"]',
      pinyin: "jī",
    },
    {
      simp: "成",
      trad: "成",
      definitions:
        '["to succeed","to finish","to complete","to accomplish","to become","to turn into","to be all right","OK!","one tenth"]',
      pinyin: "chéng",
    },
    {
      simp: "向",
      trad: "向",
      definitions:
        '["towards","to face","to turn towards","direction","to support","to side with","shortly before","formerly","always","all along"]',
      pinyin: "xiàng",
    },
    {
      simp: "生",
      trad: "生",
      definitions:
        '["to be born","to give birth","life","to grow","raw","uncooked","student"]',
      pinyin: "shēng",
    },
  ];
  return (
    <div className="md:basis-1/2">
      <h2 className="py-2 text-center text-2xl font-semibold">
        Most Frequent Words
      </h2>
      <ScrollArea className="h-[calc(100lvh-150px)]">
        <ul className="pr-2">
          {mostFrequent100.slice(0, 100).map((word, i) => {
            return (
              <li key={i}>
                <div className="flex items-end gap-2">
                  <span className="w-6 self-end">{i + 1}.</span>
                  <Link
                    className="active:opacity-disabled inline-block transition-opacity *:font-hans *:text-3xl hover:opacity-80"
                    href={`/${word.simp}`}
                  >
                    <span>{tradSelected ? word.trad : word.simp}</span>
                  </Link>
                  <span className="self-end">
                    {capitalize(JSON.parse(word.definitions)[0])}
                  </span>
                </div>
                <Separator className="my-1" />
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Frequent;
