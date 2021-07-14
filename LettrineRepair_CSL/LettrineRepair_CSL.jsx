/*  +
    Скрипт для установки буквицы из шрифта Bukvica UCS
    для абзаца с текстом со шрифтом семейства Ponomar Unicode.
    Пока нет Unicode версии этого шрифта,
    совершается подобная замена символов.
    
    Подразумевается, что курсор находится в абзаце с одним из стилей:
    "Абзац с большой буквицей",
    "Абзац с большой буквицей и надстрочник",
    "Абзац с большой буквицей и два надстрочника",
    Разница - сколько символов занимает собственно буквица. 
    Для шрифта Ponomar Unicode надстрочники  отделены от буквы и друг от друга.   
    
    Сам текст абзаца - обычный Unicod текст. 
    Большинство символов совпадают, но для некоторых необходима замена.
    Сами стили буквицы д.б. настроены с указанием символьного стиля с гарнитурой Bukvica UCS
    При импорте или наборе текста, при примененных абзацных стилях буквицы,
    необходимость замены видна сразу - неотображаемостью символов непосредственно буквицы
    (буква + надстрочники, если есть).
    
    Данный скрипт запускается  при помещенном курсоре в такой абзац.
    Происходит замена символов, а также, если изменилось кол-во символов буквицы 
    (если, например, замененный символ - единый монограф буква + надстрочник(и) ),
    в таком случае заменяется и стиль абзаца на соответствующий.

    Начальная идея взята:
    http://adobeindesign.ru/2009/03/11/kak-programmno-vydelit-ves-abzac-v-kotorom-stoit-kursor/
    Авторам - благодарность.

    AgripniSoft, ҂вк҃а
*/


if (app.documents.length > 0 &&
    app.selection.length == 1 &&
        app.selection[0].hasOwnProperty("baseline")) {
    handlePara(app.selection[0]);
}

function handlePara(myText) {
    var number_to_style_name = {
        1: "Абзац с большой буквицей",
        2: "Абзац с большой буквицей и надстрочник",
        3: "Абзац с большой буквицей и два надстрочника",
    }
    
    try {
        var myPara = myText.paragraphs[0];
        var style_name = myPara.appliedParagraphStyle.name
        var number_symbols = get_number_symbols(style_name);
        
        if (number_symbols != -1){  
            var fword = myPara.words[0]        
            var fword_string = myPara.words[0].contents;
            var first_letter = fword_string[0]  
            var Zvatelco = "҆";
            var Oxia = "́";
            var Varia = "̀";
            var Iso = Zvatelco + Oxia;
            var Apostrof = Zvatelco + Varia;
            
            // Анализ надстрочников и соответственное значение 
            // number_symbols 
            if (fword_string.slice(0,2) == "Оу"){
                number_symbols = 2;
                if (fword_string.slice(0,3) == "Оу" + Zvatelco) {
                    number_symbols  = 3;
                    if (fword_string.slice(0,4) == "Оу" + Iso) {
                        number_symbols  = 4;
                    }
                }
            }

            // Символы на кот-е распространяется стиль "Буквица большая".
            // (буква+надстр-ки)    
            var symbols_with_bukvica_style = fword_string.slice(0, number_symbols)
            var tail = fword_string.slice(number_symbols)
            var new_symbols = convert_unicode_to_ucs(symbols_with_bukvica_style)
            // Различие исходного текста буквицы и нового.        
            var delta = symbols_with_bukvica_style.length - new_symbols.length

            if ( delta != 0 ){
                // Поскольку новые символы буквицы 
                // отличаются по длине от исходных,
                // необходимо изменить стиль абзацца.
                var new_para_style_name = number_to_style_name[number_symbols - delta]
                if (new_para_style_name  != undefined){
                    var new_para_style = app.activeDocument.paragraphStyles.item(new_para_style_name)
                    try {
                        myPara.appliedParagraphStyle = new_para_style
                    }
                    catch(e){
                         $.writeln ("Error replace style! " + e)   
                    }
                }
            }
            myPara.words[0].contents = new_symbols + tail
        }
        else {
            alert("Стиль абзаца не подходит!")
        }
        
    } catch(e) {}
}

function convert_unicode_to_ucs(_string){
    var out_string = _string;
    var Zvatelco = "҆";
    var Oxia = "́";
    var Varia = "̀";
    var Iso = Zvatelco + Oxia;
    var Apostrof = Zvatelco + Varia;
    var ucs_oxia = "1";
    var ucs_zvatelco = "3";
    var ucs_iso = "4";
    var ucs_kendema = "̏";
    
    // Полностью несовпадающие символы.    
    //--------------------------------    
    var unic_caps_e = "Є";
    var unic_caps_e_with_zvatelco = unic_caps_e + Zvatelco;
    var unic_caps_e_with_iso = unic_caps_e + Iso;
    var ucs_caps_e = "Е"
    var ucs_caps_e_with_iso =  ucs_caps_e + ucs_iso;
    var ucs_caps_e_with_zvatelco = ucs_caps_e + ucs_zvatelco;
    //--------------------------------    
    var unic_caps_izhitsa = "Ѵ";
    var unic_caps_izhitsa_with_zvatelco = unic_caps_izhitsa + Zvatelco;
    var ucs_caps_izhitsa = "V";
    var ucs_caps_izhitsa_with_zvatelco = ucs_caps_izhitsa + ucs_zvatelco;
    //--------------------------------
    var unic_caps_omega = "Ѡ";
    var unic_caps_omega_with_zvatelco = unic_caps_omega + Zvatelco;
    var ucs_caps_omega = "W";
    var ucs_caps_omega_with_zvatelco = "Њ";
    //--------------------------------
    
    var unic_caps_omega_great = "Ѽ";
    var ucs_caps_omega_great = "Q";
    //--------------------------------    
    
    var unic_caps_ya_iot = "Ꙗ";
    var unic_caps_ya_iot_with_zvatelco = unic_caps_ya_iot + Zvatelco;
    var unic_caps_ya_iot_with_iso = unic_caps_ya_iot + Iso; 
    var ucs_caps_ya_iot = "Я";
    var ucs_caps_ya_iot_with_zvatelco = "K"; 
    var ucs_caps_ya_iot_with_iso = "Ћ";
    //--------------------------------   
    var unic_caps_ot = "Ѿ";
    var ucs_caps_ot = "T";
    
    // Частично несовпадающие символы.    
    //--------------------------------   
    var unic_caps_uk = "Оу";
    var unic_caps_uk_with_zvatelco = unic_caps_uk + Zvatelco;
    var unic_caps_uk_with_iso = unic_caps_uk + Iso;
    //var unic_caps_uk_with_apostrof = unic_caps_uk + Apostrof; 
    var ucs_caps_uk = "У";
    var ucs_caps_uk_with_zvatelco = "Ў";
    var ucs_caps_uk_with_iso = "Ќ";
    // Вариант для ОУ - монографа.
    var unic_caps_uk_monograph = "Ꙋ";
    var unic_caps_uk_monograph_with_zvatelco = unic_caps_uk_monograph + Zvatelco;
    var unic_caps_uk_monograph_with_iso = unic_caps_uk_monograph + Iso;
    // У
    var unic_caps_u = "У";
    var unic_caps_u_with_zvatelco = unic_caps_u + Zvatelco;
    var unic_caps_u_with_iso = unic_caps_u + Iso;
    //--------------------------------   
    // А + надстрочники
    var unic_caps_az = "А";
    var unic_caps_az_with_zvatelco = unic_caps_az + Zvatelco;
    var unic_caps_az_with_iso = unic_caps_az + Iso;
    var ucs_caps_az = "А";
    var ucs_caps_az_with_zvatelco = ucs_caps_az + ucs_zvatelco;
    var ucs_caps_az_with_iso = "Ѓ";
    //--------------------------------
    // И І + надстрочники
    var unic_caps_izhe = "И";
    var unic_caps_izhe_with_zvatelco = unic_caps_izhe + Zvatelco;
    var unic_caps_izhe_with_iso = unic_caps_izhe + Iso;
    var ucs_caps_izhe = "И";
    var ucs_caps_izhe_with_zvatelco = ucs_caps_izhe + ucs_zvatelco;
    var ucs_caps_izhe_with_iso = ucs_caps_izhe + ucs_iso;
    var unic_caps_i_decimal = "І";
    var unic_caps_i_decimal_with_zvatelco = unic_caps_i_decimal + Zvatelco;
    var unic_caps_i_decimal_with_iso = unic_caps_i_decimal + Iso;
    var ucs_caps_i_decimal = "I";
    var ucs_caps_i_decimal_with_zvatelco = "Ї";
    var ucs_caps_i_decimal_with_iso = "Ј";
    //--------------------------------
    // Я (юс) + надстрочники
   var unic_caps_ya = "Ѧ";
   var unic_caps_ya_with_zvatelco = unic_caps_ya + Zvatelco;
   var unic_caps_ya_with_iso = unic_caps_ya +  Iso;
   var ucs_caps_ya = "Z";
   var ucs_caps_ya_with_zvatelco = "Љ";
   var ucs_caps_ya_with_iso = ucs_caps_ya + ucs_iso;
    // Варианты с апострофом для данного шрифта не разработаны.
    // можно заменять, если есть, в начале на Исо.
    
    var dic = {};
    dic[unic_caps_e_with_iso] = ucs_caps_e_with_iso;
    dic[unic_caps_e_with_zvatelco] = ucs_caps_e_with_zvatelco;
    
    dic[unic_caps_izhitsa] = ucs_caps_izhitsa;    
    dic[unic_caps_izhitsa_with_zvatelco] = ucs_caps_izhitsa_with_zvatelco;
    
    dic[unic_caps_omega_with_zvatelco] = ucs_caps_omega_with_zvatelco;
    dic[unic_caps_omega_great] = ucs_caps_omega_great;
    
    dic[unic_caps_ya_iot_with_zvatelco] = ucs_caps_ya_iot_with_zvatelco;
    dic[unic_caps_ya_iot_with_iso] = ucs_caps_ya_iot_with_iso;
    
    dic[unic_caps_uk_with_zvatelco] =  ucs_caps_uk_with_zvatelco;
    dic[unic_caps_uk_with_iso] = ucs_caps_uk_with_iso;
    dic[unic_caps_uk_monograph_with_zvatelco] = ucs_caps_uk_with_zvatelco;
    dic[unic_caps_uk_monograph_with_iso] = ucs_caps_uk_with_iso;
    dic[unic_caps_u_with_zvatelco] = ucs_caps_uk_with_zvatelco;
    dic[unic_caps_u_with_iso] = ucs_caps_uk_with_iso;
    
    dic[unic_caps_ot] =  ucs_caps_ot;
    
    dic[unic_caps_az_with_zvatelco] = ucs_caps_az_with_zvatelco;
    dic[unic_caps_az_with_iso] = ucs_caps_az_with_iso;
    
    dic[unic_caps_izhe_with_zvatelco] = ucs_caps_izhe_with_zvatelco;
    dic[unic_caps_izhe_with_iso] = ucs_caps_izhe_with_iso;
    dic[unic_caps_i_decimal_with_zvatelco] = ucs_caps_i_decimal_with_zvatelco;
    dic[unic_caps_i_decimal_with_iso] = ucs_caps_i_decimal_with_iso;
    
    dic[unic_caps_ya_with_zvatelco] =  ucs_caps_ya_with_zvatelco;
    dic[unic_caps_ya_with_iso] = ucs_caps_ya_with_iso;

    //--------------------------------
    
    var converted = dic[_string]
    if (converted != undefined){
        out_string = converted
    }
    return out_string;
}


function get_number_symbols(_style_name){
    switch (_style_name){
        case "Абзац с большой буквицей": 
            return 1;
            break;
        case "Абзац с большой буквицей и надстрочник": 
            return 2;
            break;
        case "Абзац с большой буквицей и два надстрочника": 
            return 3;
            break;
        default:
            return -1;
    }
}

function check_bukvica_style(_style_name) {
    var regexp = /^Абзац\ с\ большой\ буквицей/;
    if (_style_name.search (regexp) != -1){
        return true;
    }
    else return false;
}