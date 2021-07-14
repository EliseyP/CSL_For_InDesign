/*
Библиотечный скрипт для LettrineBukvicaUCS_CAPS(small).jsx  
*/
if (app.documents.length > 0 &&
    app.selection.length == 1 &&
        app.selection[0].hasOwnProperty("baseline")) {
    
	handlePara(app.selection[0], arguments[0]);
}


function handlePara(myText, style_set) {
    /*
        myText: str - текст для обработки.
        style_set: str - стиль начертания [ caps | small ]
    */
	
	// Стили абзацев с буквицей.
	var STYLE_BIG_LETTRINE = "Абзац с большой буквицей";
	var STYLE_BIG_LETTRINE_WITH_SUBSCRIPT = "Абзац с большой буквицей и надстрочник";
	var STYLE_BIG_LETTRINE_WITH_TWO_SUBSCRIPTS = "Абзац с большой буквицей и два надстрочника";

    function convert_unicode_to_ucs(_string, _dic){
        var out_string = _string;
        var converted = _dic[_string]
        if (converted != undefined){
            out_string = converted;
        }
            return out_string;
    }

	function get_number_symbols(_style_name){
		switch (_style_name){
			case STYLE_BIG_LETTRINE:
				return 1;
				break;
			case STYLE_BIG_LETTRINE_WITH_SUBSCRIPT:
				return 2;
				break;
			case STYLE_BIG_LETTRINE_WITH_TWO_SUBSCRIPTS:
				return 3;
				break;
			default:
				return -1;
		}
	}

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
    // Е е
    var unic_caps_e = "Є";
    var unic_caps_e_with_zvatelco = unic_caps_e + Zvatelco;
    var unic_caps_e_with_iso = unic_caps_e + Iso;
    var ucs_caps_e = "Е"
    var ucs_caps_e_with_zvatelco = ucs_caps_e + ucs_zvatelco;
    var ucs_caps_e_with_iso =  ucs_caps_e + ucs_iso;
    var ucs_small_e = "е";
    var ucs_small_e_with_zvatelco = ucs_small_e + ucs_zvatelco;
    var ucs_small_e_with_iso = ucs_small_e + ucs_iso;
    //--------------------------------
    // Ижица
    var unic_caps_izhitsa = "Ѵ";
    var unic_caps_izhitsa_with_zvatelco = unic_caps_izhitsa + Zvatelco;
    var ucs_caps_izhitsa = "V";
    var ucs_caps_izhitsa_with_zvatelco = ucs_caps_izhitsa + ucs_zvatelco;
    var ucs_small_izhitsa = "v";
    var ucs_small_izhitsa_with_zvatelco = ucs_small_izhitsa + ucs_zvatelco;
    //--------------------------------
    // Омега
    var unic_caps_omega = "Ѡ";
    var unic_caps_omega_with_zvatelco = unic_caps_omega + Zvatelco;
    var ucs_caps_omega = "W";
    var ucs_caps_omega_with_zvatelco = "Њ";
    var ucs_small_omega = "w";
    var ucs_small_omega_with_zvatelco = "њ";
    //--------------------------------

    // О широкое
    var unic_caps_o_broad = "Ѻ";
    var unic_caps_o_broad_with_zvatelco = unic_caps_o_broad + Zvatelco;
    var unic_caps_o_broad_with_iso = unic_caps_o_broad + Iso;
    // В шрифте нет отдельного символа -> обычное "О".
    var ucs_caps_o = "О";
    var ucs_caps_o_with_zvatelco = "N";
    var ucs_caps_o_with_iso = "Џ";
    var ucs_small_o = "о";
    var ucs_small_o_with_zvatelco = "n";
    var ucs_small_o_with_iso = "џ";
    //--------------------------------
    // Омега широкое с покрытием
    var unic_caps_omega_great = "Ѽ";
    var ucs_caps_omega_great = "Q";
    var ucs_small_omega_great = "q";
    //--------------------------------
    // Я йотифированное
    var unic_caps_ya_iot = "Ꙗ";
    var unic_caps_ya_iot_with_zvatelco = unic_caps_ya_iot + Zvatelco;
    var unic_caps_ya_iot_with_iso = unic_caps_ya_iot + Iso;
    var ucs_caps_ya_iot = "Я";
    var ucs_caps_ya_iot_with_zvatelco = "K";
    var ucs_caps_ya_iot_with_iso = "Ћ";
    var ucs_small_ya_iot = "я";
    var ucs_small_ya_iot_with_zvatelco = "k";
    var ucs_small_ya_iot_with_iso = "ћ";
    //--------------------------------
    // От
    var unic_caps_ot = "Ѿ";
    var ucs_caps_ot = "T";
    var ucs_small_ot = "t";

    // Частично несовпадающие символы.
    //--------------------------------
    var unic_caps_uk = "Оу";
    var unic_caps_uk_with_zvatelco = unic_caps_uk + Zvatelco;
    var unic_caps_uk_with_iso = unic_caps_uk + Iso;
    var ucs_caps_uk = "У";
    var ucs_caps_uk_with_zvatelco = "Ў";
    var ucs_caps_uk_with_iso = "Ќ";
    var ucs_small_uk = "у";
    var ucs_small_uk_with_zvatelco = "ў";
    var ucs_small_uk_with_iso = "ќ";
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
    var ucs_small_az = "а";
    var ucs_small_az_with_zvatelco = ucs_small_az + ucs_zvatelco;
    var ucs_small_az_with_iso = "ѓ";
    //--------------------------------
    // Иже + надстрочники
    var unic_caps_izhe = "И";
    var unic_caps_izhe_with_zvatelco = unic_caps_izhe + Zvatelco;
    var unic_caps_izhe_with_iso = unic_caps_izhe + Iso;
    var ucs_caps_izhe = "И";
    var ucs_caps_izhe_with_zvatelco = ucs_caps_izhe + ucs_zvatelco;
    var ucs_caps_izhe_with_iso = ucs_caps_izhe + ucs_iso;
    var ucs_small_izhe = "и";
    var ucs_small_izhe_with_zvatelco = ucs_small_izhe + ucs_zvatelco;
    var ucs_small_izhe_with_iso = ucs_small_izhe + ucs_iso;
    // І + надстрочники
    var unic_caps_i_decimal = "І";
    var unic_caps_i_decimal_with_zvatelco = unic_caps_i_decimal + Zvatelco;
    var unic_caps_i_decimal_with_iso = unic_caps_i_decimal + Iso;
    var ucs_caps_i_decimal = "I";
    var ucs_caps_i_decimal_with_zvatelco = "Ї";
    var ucs_caps_i_decimal_with_iso = "Ј";
    var ucs_small_i_decimal = "i";
    var ucs_small_i_decimal_with_zvatelco = "ї";
    var ucs_small_i_decimal_with_iso = "ј";
    //--------------------------------
    // Я (юс малый) + надстрочники
    var unic_caps_ya = "Ѧ";
    var unic_caps_ya_with_zvatelco = unic_caps_ya + Zvatelco;
    var unic_caps_ya_with_iso = unic_caps_ya +  Iso;
    var ucs_caps_ya = "Z";
    var ucs_caps_ya_with_zvatelco = "Љ";
    var ucs_caps_ya_with_iso = ucs_caps_ya + ucs_iso;
    var ucs_small_ya = "z";
    var ucs_small_ya_with_zvatelco = "љ";
    var ucs_small_ya_with_iso = ucs_small_ya + ucs_iso;

    // TODO: Варианты с апострофом для данного шрифта не разработаны.
    // можно заменять, если есть, в начале на Исо.
    var dic = {};
    if (style_set == "caps"){
        dic[unic_caps_e_with_iso] = ucs_caps_e_with_iso;
        dic[unic_caps_e_with_zvatelco] = ucs_caps_e_with_zvatelco;
    
        dic[unic_caps_izhitsa] = ucs_caps_izhitsa;
        dic[unic_caps_izhitsa_with_zvatelco] = ucs_caps_izhitsa_with_zvatelco;
    
        dic[unic_caps_omega_with_zvatelco] = ucs_caps_omega_with_zvatelco;
        dic[unic_caps_omega_great] = ucs_caps_omega_great;
    
        dic[unic_caps_o_broad_with_zvatelco] = ucs_caps_o_with_zvatelco;
        dic[unic_caps_o_broad_with_iso] = ucs_caps_o_with_iso;
    
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
    }
    else if (style_set == "small"){
        dic[unic_caps_e_with_iso] = ucs_small_e_with_iso;
        dic[unic_caps_e_with_zvatelco] = ucs_small_e_with_zvatelco;
    
        dic[unic_caps_izhitsa] = ucs_small_izhitsa;
        dic[unic_caps_izhitsa_with_zvatelco] = ucs_small_izhitsa_with_zvatelco;
    
        dic[unic_caps_omega_with_zvatelco] = ucs_small_omega_with_zvatelco;
        dic[unic_caps_omega_great] = ucs_small_omega_great;
    
        dic[unic_caps_o_broad_with_zvatelco] = ucs_small_o_with_zvatelco;
        dic[unic_caps_o_broad_with_iso] = ucs_small_o_with_iso;
    
        dic[unic_caps_ya_iot_with_zvatelco] = ucs_small_ya_iot_with_zvatelco;
        dic[unic_caps_ya_iot_with_iso] = ucs_small_ya_iot_with_iso;
    
        dic[unic_caps_uk_with_zvatelco] =  ucs_small_uk_with_zvatelco;
        dic[unic_caps_uk_with_iso] = ucs_small_uk_with_iso;
        dic[unic_caps_uk_monograph_with_zvatelco] = ucs_small_uk_with_zvatelco;
        dic[unic_caps_uk_monograph_with_iso] = ucs_small_uk_with_iso;
        dic[unic_caps_u_with_zvatelco] = ucs_small_uk_with_zvatelco;
        dic[unic_caps_u_with_iso] = ucs_small_uk_with_iso;
    
        dic[unic_caps_ot] =  ucs_small_ot;
    
        dic[unic_caps_az_with_zvatelco] = ucs_small_az_with_zvatelco;
        dic[unic_caps_az_with_iso] = ucs_small_az_with_iso;
    
        dic[unic_caps_izhe_with_zvatelco] = ucs_small_izhe_with_zvatelco;
        dic[unic_caps_izhe_with_iso] = ucs_small_izhe_with_iso;
        dic[unic_caps_i_decimal_with_zvatelco] = ucs_small_i_decimal_with_zvatelco;
        dic[unic_caps_i_decimal_with_iso] = ucs_small_i_decimal_with_iso;
    
        dic[unic_caps_ya_with_zvatelco] =  ucs_small_ya_with_zvatelco;
        dic[unic_caps_ya_with_iso] = ucs_small_ya_with_iso;
    }
    var number_to_style_name = {
        1: STYLE_BIG_LETTRINE,
        2: STYLE_BIG_LETTRINE_WITH_SUBSCRIPT,
        3: STYLE_BIG_LETTRINE_WITH_TWO_SUBSCRIPTS,
    }
    
    try {
        var myPara = myText.paragraphs[0];
        var style_name = myPara.appliedParagraphStyle.name;
        var number_symbols = get_number_symbols(style_name);
        
        if (number_symbols != -1){  
            var fword = myPara.words[0];
			
            var fword_string = myPara.words[0].contents;
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

            // Символы, на кот-е распространяется стиль "Буквица большая".
            // (буква+надстр-ки)    
            var symbols_with_bukvica_style = fword_string.slice(0, number_symbols)
            var tail = fword_string.slice(number_symbols)
            var new_symbols = convert_unicode_to_ucs(symbols_with_bukvica_style, dic);
            // Различие исходного текста буквицы и нового.
            var delta = symbols_with_bukvica_style.length - new_symbols.length;

            if ( delta != 0 ){
                // Поскольку новые символы буквицы 
                // отличаются по длине от исходных,
                // необходимо изменить стиль абзацца.
                var new_para_style_name = number_to_style_name[number_symbols - delta];
                if (new_para_style_name  != undefined){
                    var new_para_style = app.activeDocument.paragraphStyles.item(new_para_style_name);
                    try {
                        myPara.appliedParagraphStyle = new_para_style;
                    }
                    catch(e){
                         $.writeln ("Error replace style! " + e);
                    }
                }
            }
            myPara.words[0].contents = new_symbols + tail;
        }
        else {
            alert("Стиль абзаца не подходит!")
        }
        
    } catch(e) {}
}
