/**
 * Assorted utility functions.
 */

///////////////////////////////////////////////////////////////////////////
// construction

var CcdbUtil = {};

if (typeof String.prototype.trim !== "function") {
  String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
  };
}

if (typeof String.prototype.endsWith !== "function") {
  String.prototype.endsWith = function (s) {
    return this.indexOf(s, this.length - s.length) !== -1;
  };
}

///////////////////////////////////////////////////////////////////////////
// constants

// Unicode CJK Unified Ideographs
CcdbUtil.MIN_UVALUE = 0x4e00;
CcdbUtil.MAX_UVALUE = 0x9fa5;

// The range of Big5a
CcdbUtil.MIN_BIG5A = 0xa440;
CcdbUtil.MAX_BIG5A = 0xc69f;

// Return the URL base of this file
CcdbUtil.getUrlBase = function () {
  var scripts = document.getElementsByTagName("script");
  for (var i in scripts) {
    var src = scripts[i].src;
    if (src && src.endsWith("/CcdbUtil.js")) {
      var left = src.split("?")[0];
      var url = left.substr(0, left.lastIndexOf("/"));
      url = url.substr(0, url.lastIndexOf("/"));
      return url;
    }
  }

  // weird
  return "";
};

///////////////////////////////////////////////////////////////////////////
// range checking

// Returns true if the first character is Chinese
CcdbUtil.isChinese = function (ch) {
  if (!ch || ch.length === 0) {
    return false;
  }

  var i = ch.charCodeAt(0);
  return i >= CcdbUtil.MIN_UVALUE && i <= CcdbUtil.MAX_UVALUE;
};

// Returns true if the Big5 character code (as a string) is Big5a
CcdbUtil.isBig5a = function (value) {
  if (!value) {
    return false;
  }

  value = parseInt(value, 16);
  return value >= CcdbUtil.MIN_BIG5A && value <= CcdbUtil.MAX_BIG5A;
};

///////////////////////////////////////////////////////////////////////////
// functions

// Return a new string by replacing one character with supplied string
CcdbUtil.setCharAt = function (str, i, ch) {
  if (i < str.length) {
    return str.substr(0, i) + ch + str.substr(i + 1);
  }

  return str;
};

// Given a string that contains 0 or more U+ values, return
// an array of 0 or more corresponding Unicode characters
CcdbUtil.convertCode = function (value) {
  if (!value) {
    return [];
  }

  var splits = value.split("U+");
  if (splits.length < 2) {
    return [];
  }

  var result = [];
  splits = splits.slice(1);

  for (var i in splits) {
    result.push(String.fromCharCode(parseInt(splits[i], 16)));
  }

  return result;
};

// Given a string that contains 0 or more radical.stroke counts,
// return an array of 0 or more {"R":int, "S":int} values.
CcdbUtil.parseRS = function (value) {
  if (!value) {
    return [];
  }

  var results = [];
  var splits = value.split(" ");

  for (var i in splits) {
    var str = splits[i];
    var iS = str.lastIndexOf(".");
    if (iS > 0) {
      var r = parseInt(str, 10);
      if (r) {
        var s = parseInt(str.substr(iS + 1), 10);
        results.push({ R: r, S: s });
      }
    }
  }

  return results;
};

// Compares two RS strings.
CcdbUtil.compareRS = function (a, b) {
  var rs1 = CcdbUtil.parseRS(a);
  var rs2 = CcdbUtil.parseRS(b);
  if (rs1.length > 0 && rs2.length > 0) {
    return rs1[0].R === rs2[0].R && rs1[0].S === rs2[0].S;
  }

  return false;
};

// Find U+xxxx sequences and insert parenthetical Unicode characters
CcdbUtil.injectUnicode = function (value) {
  if (value === null) {
    return "";
  }

  var splits = value.split("U+");
  if (splits.length == 1) {
    return value;
  }

  var result = splits[0];
  splits = splits.slice(1);

  for (var s in splits) {
    var splits2 = splits[s].split(" ");
    var v = splits2[0];
    var x = "";
    if (splits2.length > 1) {
      x = " " + splits2.slice(1).join(" ");
    }

    result += "U+" + v + " (" + String.fromCharCode(parseInt(v, 16)) + ")" + x;
  }

  return result;
};

///////////////////////////////////////////////////////////////////////////
// sounds

// Split the given sound and its tone, if any
CcdbUtil.splitSound = function (value) {
  var result = "";
  if (value) {
    result = value.toLowerCase();
  }

  var tone = parseInt(value.substr(value.length - 1), 10);
  if (isNaN(tone)) {
    tone = 0;
  } else {
    result = result.substr(0, result.length - 1);
  }

  var iV = result.indexOf("v");
  if (iV >= 0) {
    result = CcdbUtil.setCharAt(result, iV, "\u00FC");
  }

  return [result, tone];
};

CcdbUtil.addDiacritic = function (value, tone) {
  if (value === "ng") {
    switch (tone) {
      case 2:
        value = CcdbUtil.setCharAt(value, 0, "\u0144");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, 0, "\u0148");
        break;
      case 4:
        value += "\u0300";
        break;
    }

    return value;
  }

  if (value === "m") {
    switch (tone) {
      case 2:
        value += "\u0301";
        break;
      case 4:
        value += "\u0300";
        break;
    }

    return value;
  }

  var iA = value.lastIndexOf("a"); // for Yale
  var iO = value.indexOf("o");
  var iE = value.indexOf("e");
  var iI = value.indexOf("i");
  var iU = value.indexOf("u");
  var iV = value.indexOf("\u00FC");

  var iIU = value.indexOf("iu");
  if (iIU >= 0) {
    iI = -1;
    iU = iIU + 1;
  }

  if (iA >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iA, "\u0101");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iA, "\u00E1");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iA, "\u01CE");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iA, "\u00E0");
        break;
    }
  } else if (iO >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iO, "\u014D");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iO, "\u00F3");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iO, "\u01D2");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iO, "\u00F2");
        break;
    }
  } else if (iE >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iE, "\u0113");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iE, "\u00E9");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iE, "\u011B");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iE, "\u00E8");
        break;
    }
  } else if (iI >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iI, "\u012B");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iI, "\u00ED");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iI, "\u01D0");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iI, "\u00EC");
        break;
    }
  } else if (iU >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iU, "\u016B");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iU, "\u00FA");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iU, "\u01D4");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iU, "\u00F9");
        break;
    }
  } else if (iV >= 0) {
    switch (tone) {
      case 1:
        value = CcdbUtil.setCharAt(value, iV, "\u01D6");
        break;
      case 2:
        value = CcdbUtil.setCharAt(value, iV, "\u01D8");
        break;
      case 3:
        value = CcdbUtil.setCharAt(value, iV, "\u01DA");
        break;
      case 4:
        value = CcdbUtil.setCharAt(value, iV, "\u01DC");
        break;
    }
  }

  return value;
};

///////////////////////////////////////////////////////////////////////////
// pinyin

// Convert a list of space-separated Unihan-format sounds to an array of pinyin syllables
CcdbUtil.getSoundsPinyin = function (value) {
  var results = [];
  if (!value) {
    return results;
  }

  var splits = value.split(" ");
  for (var i in splits) {
    results.push(CcdbUtil.convertPinyin(splits[i]));
  }

  return results;
};

// Convert a list of space-separated Unihan-format sounds to pinyin
CcdbUtil.convertSoundsPinyin = function (value) {
  return CcdbUtil.getSoundsPinyin(value).join(" ");
};

// Convert from Unihan format (upper-case, with tone numbers) to real pinyin.
CcdbUtil.convertPinyin = function (value) {
  var split = CcdbUtil.splitSound(value);
  var result = split[0];
  var tone = split[1];
  if (tone < 1 || tone > 5) {
    return result;
  }

  return CcdbUtil.addDiacritic(result, tone);
};

///////////////////////////////////////////////////////////////////////////
// Yale romanization for Cantonese

// Convert a list of space-separated Unihan-format sounds to an array of Yale syllables
CcdbUtil.getSoundsYale = function (value) {
  var results = [];
  if (!value) {
    return results;
  }

  var splits = value.split(" ");
  for (var i in splits) {
    results.push(CcdbUtil.convertYale(splits[i]));
  }

  return results;
};

// Convert a list of space-separated Unihan-format sounds to Yale
CcdbUtil.convertSoundsYale = function (value) {
  return CcdbUtil.getSoundsYale(value).join(" ");
};

// Convert from Unihan format (with tone numbers) to real Yale.
CcdbUtil.convertYale = function (value) {
  var split = CcdbUtil.splitSound(value);
  var result = split[0];
  var tone = split[1];
  if (tone < 1 || tone > 6) {
    return result;
  }

  if (tone >= 4) {
    result += "h";
  }

  if (tone === 3 || tone === 6) {
    return result;
  }

  if (tone === 5) {
    tone = 2;
  }

  return CcdbUtil.addDiacritic(result, tone);
};

///////////////////////////////////////////////////////////////////////////
// filters

// Negate things like x, x+y, x|y
CcdbUtil.invertFilter = function (term) {
  var result = "";
  if (!term) {
    return result;
  }

  var sep = null;
  if (term.indexOf("+") > 0) {
    sep = "+";
  }

  if (term.indexOf("|") > 0) {
    if (sep) {
      return result;
    }

    sep = "|";
  }

  function invertOne(one) {
    if (one.charAt(0) === "!") {
      return one.substr(1);
    }

    return "!" + one;
  }

  if (!sep) {
    return invertOne(term.trim());
  }

  var fields = term.split(sep);
  sep = sep === "+" ? "|" : "+";

  for (var i = 0; i < fields.length; i++) {
    if (i > 0) {
      result += sep;
    }

    result += invertOne(fields[i].trim());
  }

  return result;
};

// Multiply out Boolean AND filter. Examples:
//    a+b AND c+d = a+b+c+d
//    a+b AND c|d = a+b+c|a+b+d
//    a|b AND c|d = a+c|a+d|b+c|b+d
CcdbUtil.andFilters = function (x, y) {
  var result = "";
  if (!x | !y) {
    return result;
  }

  var f1 = x.split("|");
  var f2 = y.split("|");

  for (var i = 0; i < f1.length; i++) {
    for (var j = 0; j < f2.length; j++) {
      if (result.length > 0) {
        result += "|";
      }

      result += f1[i] + "+" + f2[j];
    }
  }

  return result;
};

///////////////////////////////////////////////////////////////////////////////
// unit testing

CcdbUtil.check = function (input, expected, result) {
  if (expected instanceof Array) {
    expected = JSON.stringify(expected);
  }

  if (result instanceof Array) {
    result = JSON.stringify(result);
  }

  if (expected != result) {
    console.log('Fail: "' + input + '" = "' + result + '"');
    console.log('Expected: "' + expected + '"');
  }
};

CcdbUtil.testAll = function () {
  var s = "U+4E00";
  var e = ["\u4e00"];
  CcdbUtil.check(s, e, CcdbUtil.convertCode(s));

  s = " xxx U+5E00 xxx U+6E00 xxx ";
  e = ["\u5E00", "\u6E00"];
  CcdbUtil.check(s, e, CcdbUtil.convertCode(s));

  s = " blah ";
  e = [];
  CcdbUtil.check(s, e, CcdbUtil.convertCode(s));

  s = "162.1 163'.2";
  e = [
    { R: 162, S: 1 },
    { R: 163, S: 2 },
  ];
  CcdbUtil.check(s, e, CcdbUtil.parseRS(s));

  s = " blah.2 162 163xxx.2  1..2";
  e = [
    { R: 163, S: 2 },
    { R: 1, S: 2 },
  ];
  CcdbUtil.check(s, e, CcdbUtil.parseRS(s));

  s = " blah ";
  e = [];
  CcdbUtil.check(s, e, CcdbUtil.parseRS(s));

  s = "FAN1 FAN2 FAN3 FAN4 FAN5";
  e = "fān fán fǎn fàn fan";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "a ai an ang ao";
  e = "a ai an ang ao";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "CHENG1 CHENG2 CHENG3 CHENG4 CHENG5";
  e = "chēng chéng chěng chèng cheng";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "CHIU1 CHIU2 CHIU3 CHIU4 CHIU5";
  e = "chiū chiú chiǔ chiù chiu";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "lv1 lv2 lv3 lv4 lv5";
  e = "lǖ lǘ lǚ lǜ lü";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "lü1 lü2 lü3 lü4 lü5";
  e = "lǖ lǘ lǚ lǜ lü";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "ng2 ng3 ng4";
  e = "ńg ňg ng̀";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "m2 m3 m4";
  e = "ḿ m m̀";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "ping51";
  e = "pīng5";
  CcdbUtil.check(s, e, CcdbUtil.convertSoundsPinyin(s));

  s = "ping51";
  e = "pingx1";
  CcdbUtil.check(s, e, CcdbUtil.setCharAt(s, 4, "x"));

  e = "ping5x";
  CcdbUtil.check(s, e, CcdbUtil.setCharAt(s, 5, "x"));

  e = s;
  CcdbUtil.check(s, e, CcdbUtil.setCharAt(s, 6, "x"));

  s = "U+4E00";
  e = "U+4E00 (\u4E00)";
  CcdbUtil.check(s, e, CcdbUtil.injectUnicode(s));

  s = "U+4E00 U+4E10";
  e = "U+4E00 (\u4E00) U+4E10 (\u4E10)";
  CcdbUtil.check(s, e, CcdbUtil.injectUnicode(s));

  s = "hello U+4E00 world U+4E10 hello";
  e = "hello U+4E00 (\u4E00) world U+4E10 (\u4E10) hello";
  CcdbUtil.check(s, e, CcdbUtil.injectUnicode(s));

  s = " hello U+4E00 world U+4E10 hello ";
  e = " hello U+4E00 (\u4E00) world U+4E10 (\u4E10) hello ";
  CcdbUtil.check(s, e, CcdbUtil.injectUnicode(s));

  s = "\u4e00";
  CcdbUtil.check(s, true, CcdbUtil.isChinese(s));

  s = "\u5e00";
  CcdbUtil.check(s, true, CcdbUtil.isChinese(s));

  s = "\u9fA5";
  CcdbUtil.check(s, true, CcdbUtil.isChinese(s));

  s = "\u4dff";
  CcdbUtil.check(s, false, CcdbUtil.isChinese(s));

  s = "\u9fa6";
  CcdbUtil.check(s, false, CcdbUtil.isChinese(s));

  s = "";
  CcdbUtil.check(s, false, CcdbUtil.isChinese(s));

  s = "a";
  CcdbUtil.check(s, false, CcdbUtil.isChinese(s));

  s = "A440";
  CcdbUtil.check(s, true, CcdbUtil.isBig5a(s));

  s = "a440";
  CcdbUtil.check(s, true, CcdbUtil.isBig5a(s));

  s = "BDDD";
  CcdbUtil.check(s, true, CcdbUtil.isBig5a(s));

  s = "a43f";
  CcdbUtil.check(s, false, CcdbUtil.isBig5a(s));

  s = "x";
  e = "!x";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "x+y";
  e = "!x|!y";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "x+y+z";
  e = "!x|!y|!z";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = " x + y + z ";
  e = "!x|!y|!z";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "x|y";
  e = "!x+!y";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "!x+y";
  e = "x|!y";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "!x+!y";
  e = "x|y";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  s = "x+y|z";
  e = "";
  CcdbUtil.check(s, e, CcdbUtil.invertFilter(s));

  var s1 = "a+b";
  var s2 = "c+d";
  e = "a+b+c+d";
  CcdbUtil.check([s1, s2], e, CcdbUtil.andFilters(s1, s2));

  s1 = "a+b";
  s2 = "c|d";
  e = "a+b+c|a+b+d";
  CcdbUtil.check([s1, s2], e, CcdbUtil.andFilters(s1, s2));

  s1 = "a";
  s2 = "b";
  e = "a+b";
  CcdbUtil.check([s1, s2], e, CcdbUtil.andFilters(s1, s2));

  s1 = "a|b";
  s2 = "c+d";
  e = "a+c+d|b+c+d";
  CcdbUtil.check([s1, s2], e, CcdbUtil.andFilters(s1, s2));

  s1 = "a|b";
  s2 = "c|d";
  e = "a+c|a+d|b+c|b+d";
  CcdbUtil.check([s1, s2], e, CcdbUtil.andFilters(s1, s2));
};

//CcdbUtil.testAll();
export default CcdbUtil;
