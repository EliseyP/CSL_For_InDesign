/*  +
    Скрипт для форматирования номеров страниц в оглавлении: 
    арабские -> буквенные церковнославянские 
    (для шрифтов семейства Ponomar Unicode https://sci.ponomar.net/).
    
    Идея взята из этого замечательного скрипта:
    (http://eugenyus.rudtp.ru/ru/UpdateTOC)
    http://eugenyus.rudtp.ru/dnlbutton.php?lang=_ru&dfile=UpdateTOC
    Автору, Евгению - благодарность.

    AgripniSoft, ҂вк҃а
*/

var doc = app.activeDocument;
try {
    var mySel = app.selection[0].parentStory;
}//берём всё содержание независимо от выделенной области 
catch (e) {
    alert("Выделите содержание хоть как-нибудь","Откуда мне знать где содержание???");
    exit();
} 

// Для захвата последней строки оглавления?
if (mySel.characters[-1].contents != "\r"){
    mySel.characters[-1].contents += "\r";
}

// main function.
convert_page_numbers_to_csl()

function convert_page_numbers_to_csl(){
    app.findGrepPreferences = app.changeGrepPreferences = null; 
    app.findGrepPreferences.findWhat = "(?<=\\t)(\\d+?)(?=\\r)";
    var allFounds = doc.findGrep(); 
    // Cимвольный стиль номера страниц.
    var toc_page_number_style = allFounds[0].appliedCharacterStyle
    for( var n = 0; n < allFounds.length; n++ ) {
        var curFound = allFounds[n];
        var arabic_page_num = Number(curFound.contents);
        var csl_page_num = numberToText(arabic_page_num);   
        // Поиск в найденном.
        app.findGrepPreferences.findWhat = "\\d+";
        app.changeGrepPreferences.changeTo = csl_page_num;
        // К замененным числам применяется символьный стиль (если он был выставлен).        
        if (toc_page_number_style != app.activeDocument.characterStyles[0]){
            app.changeGrepPreferences.appliedCharacterStyle = toc_page_number_style.name;
        }
        curFound.changeGrep();
     }
     app.findGrepPreferences = app.changeTextPreferences = null;
}


//Метод Math.floor() возвращает наибольшее целое число, которое меньше или равно данному числу. Math.floor(7.1) выдаст 7  
function numberToText(number) {
    /*
        Предполагается, что в книге не будет более 99999 стр.
    */
    var ones_list = ["", "а", "в", "г", "д", "є", "ѕ", "з", "и", "ѳ"];
    var titlo = "҃";
    var res = "";

    if (number < 0) res = "ha ha"; // from origin script :-)
    if (number == 0) res = ones_list[0];
    if (number > 99999) res = String(number);

    function handle_before_hundred(_number){
      // From 1 to 99
      var tens_list = ["і", "к", "л", "м", "н", "ѯ", "ѻ", "п", "ч"];

      if (_number == 0) return ones_list[0];
      if (_number < 10) return ones_list[_number];

      var tens = Math.floor(_number / 10); // Десятки.
      var ones = _number % 10; // Единицы.
      if (ones == 0){
          return tens_list[tens-1]
      }
      else{
          // From 11 to 19
          if (_number > 10 && _number < 20 ){
              return ones_list[ones] + "і"
          }
          else if (_number > 20 && _number <= 99){
              return tens_list[tens-1] + ones_list[ones]
          }
      }
    }

    function handle_before_thousand(_number){
      // From 100 to 999
      var hundr_list = ["р", "с", "т", "у", "ф", "х", "ѱ", "ѿ", "ц"];
      var hundr = Math.floor(_number / 100); // Сотни.
      var tens_and_ones = _number % 100; // Дестяки и единицы
      var hundr_str = hundr_list[hundr-1];
      if (tens_and_ones == 0){
          return hundr_str
      }
      else{
        var before_hundred_str = handle_before_hundred(tens_and_ones);
        return hundr_str + before_hundred_str
      }
    }


    if (number >= 0 && number <= 99 ){
        res = handle_before_hundred(number)
    }
    else if (number >= 100 && number <= 999){
        res = handle_before_thousand(number)
    }
    else if (number >= 1000 && number <= 99999){
      var thousands = Math.floor(number / 1000); // Тысячи.
      var hunds_and_tens_and_ones = number % 1000; // Сотни, десятки и единицы.
      var thousands_str = handle_before_hundred(thousands)

      if (hunds_and_tens_and_ones == 0){
          res = thousands_str
      }
      else {
          var before_thousand_str = "";
          if (hunds_and_tens_and_ones < 100){
              before_thousand_str = handle_before_hundred(hunds_and_tens_and_ones)
          }
          else{
              before_thousand_str = handle_before_thousand(hunds_and_tens_and_ones)
          }
          res = thousands_str + before_thousand_str
      }
    }

    // Insert titlo.
    if (res.length == 1){
      res += titlo
    }
    else if (res.length > 1){
      res = res.slice(0,-1) + titlo + res.slice(-1)
    }

    // Вставка NBSP  между разрядами для чисел > 10000,
    // если для каждого разряда есть цифра.
    if (res.length == 6){
      res = res.slice(0,2) + " " + res.slice(2)
    }

    // Insert thousands sign. 
    if (number > 999){
      var thousands_sign = "҂";
      res = thousands_sign + res
    }
    
    return res
}
