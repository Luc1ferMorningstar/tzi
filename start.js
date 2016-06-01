/**
 * Created by sashok123351 on 24.05.2016.
 */

var firstButton = document.getElementById("button");
var span = document.getElementById("result");
firstButton.onclick = function(){
    var keyFirst = document.getElementById("k1");
    var keySecond = document.getElementById("k2");
    var msg1 = document.getElementById("text");
    let alpha = "ABCDE;FGHIK;LMNOP;QRSTU;VWXYZ";

    let k = keyFirst.value;
    let endAlpha = [];
    let massOfAlpha = alpha.split(";");

    let order = k.split("");
    for (let j = 0; j < 5; j++){

        let str = massOfAlpha[j].split("");

        let buffer = new Map();

        for (let i = 0; i < massOfAlpha.length; i++){
            buffer.set(+order[i],str[i]);
        }

        for (let m = 1; m <= 5; m++){
            for( let key of buffer.keys()){
                if(key == m){
                    endAlpha.push(buffer.get(key));
                }
            }
        }

    }
    var arrT = msg1.value.split(' ');
    var msg = "";
    for(var l = 0; l <arrT.length; l++ ){
        msg += arrT[l];
    }

    var cypher = (function () {
        var cypher = {}, register = function (e) {return e === e.toUpperCase();};
        cypher.language = {
            ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
            en : endAlpha,
            numbers : [0,1,2,3,4,5,6,7,8,9],
            symbols : "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ".split(""),
            all     : [],
            joinAll : function (){
                cypher.language.all = [];
                for (var i in this) {
                    if (typeof this[i] !== "function" && i !== "all") {
                        cypher.language.all = cypher.language.all.concat (this[i]);
                    }
                }
            }
        };

        cypher.vizhener = {
            square : [],
            genSqViz : function (lang) {
                var l = cypher.language[lang];
                for (var i = 0; i < l.length; i++) {
                    this.square[i] = l.slice(i).concat(l.slice(0, i));
                }
            },
            encryption : function (lang, text, key) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);

                var sText = text;

                text = text.toUpperCase();
                key  = key.toUpperCase();

                var s = "", l = cypher.language[lang];
                for (var i = 0; i < text.length; i++) {
                    s += this.square[l.indexOf(text[i])][l.indexOf(key[i])];
                }

                return s.split ("").map (function (e, i, a) {return register (sText[i]) ? e : e.toLowerCase();}).join("");
            },
            decryption : function (lang, key, cipher) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);

                var sCipher = cipher;

                cipher = cipher.toUpperCase();
                key    = key.toUpperCase();
                var s = "",  l = cypher.language[lang];
                for (var i = 0; i < cipher.length; i++) {
                    var row = l.indexOf(key[i])
                    coll = this.square[row].indexOf(cipher[i]);
                    s += l[coll];
                }
                return s.split ("").map (function (e, i, a) {return register (sCipher[i]) ? e : e.toLowerCase();}).join("");
            },
            outS : function () {
                for (var i = 0; i < this.square.length; i++) {
                    document.write(this.square[i].join ("") + "<br>");
                }
            }
        };

        cypher.caesar = {
            encryption : function (lang, text, slip) {
                var l = cypher.language[lang], text = text.split(""), s = "";
                for (var i = 0; i < text.length; i++) {
                    var index = l.indexOf (text[i]) + slip;
                    if (index >= l.length) index -= l.length;
                    s += l[index];
                }
                return s;
            },
            decryption : function (lang, cipher, slip) {
                var l = cypher.language[lang], cipher = cipher.split(""), s = "";
                for (var i = 0; i < cipher.length; i++) {
                    var index = l.indexOf (cipher[i]) - slip;
                    if (index < 0) index += l.length;
                    s += l[index];
                }
                return s;
            }
        };
        return cypher;
    } ());
    var kSecond = "";
    if (msg.length > keySecond.value.length){
        var arr = keySecond.value.split("");
        var hooly = ~~(msg.length / arr.length);

        for (var h = 0; h < hooly; h++){
            for (var t = 0; t <arr.length; t++){
                kSecond += arr[t];
            }
        }
        var ostatok =  msg.length % arr.length;

        if(ostatok>0){
            for (var e = 0; e < ostatok; e++){
                kSecond += arr[e];
            }
        }
    }
    else {
        kSecond = keySecond.value
    }
    var al = document.getElementById("alpha");
    al.innerHTML = endAlpha;
    var sh = document.getElementById("sh");
    if (sh.checked){
        span.innerHTML = cypher.vizhener.encryption ("en", msg, kSecond);
    }
    else {
        // var result = document.getElementById("result1");

        span.innerHTML = cypher.vizhener.decryption ("en", kSecond, msg);
    }
    var fg = endAlpha.join('');
    var all = document.getElementById('alphabet');
    for(var i = 0; i < 25; i++){
        if(i == 0){
            var br = document.createElement('br');
            var sp = document.createElement('span');
            sp.innerHTML = ""+ fg;
            all.appendChild(sp);
            all.appendChild(br);
        }
        else{
            var br = document.createElement('br');
            var symbol = fg.charAt(0);
            var newString = fg.substring(1);
            fg = newString + symbol;
            var sp = document.createElement('span');
            sp.innerHTML = ""+ newString + symbol;
            all.appendChild(sp);
            all.appendChild(br);

        }


    }

};
// document.write (cypher.vizhener.encryption ("en", "ATTACKATDAWN", "LEMONLEMONLE") + "<br>"); // шифруем
//  document.write (cypher.vizhener.decryption ("en", "LEMONLEMONLE", "LXFOPVEFRNHR") + "<br>"); // расшифровываем
//document.write (cypher.vizhener.encryption ("ru", "водкаВнутриАСнаружиБутылка", "курицакурицакурицакурицакурица") + "<br>"); // шифруем
//document.write (cypher.vizhener.decryption ("ru", "курицакурицакурицакурицакурица", "мвфуцВшжгщяАЬбрщйжуФдыслху") + "<br>"); // расшифровываем