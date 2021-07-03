/* +
    На основе этого прекрасного скрипта (благодарность to Theunis de Jong.):
    
    ------------------------------------
    DESCRIPTION:Convert Page Number Placeholder '#' into Text  
    A Jongware Script 11-Dec-2011  
    http://indesignsecrets.com/making-page-numbers-words-numbers.php
    ------------------------------------
    
    был написан настоящий скрипт для псевдо-автоматической нумерации страниц в цся 
    (для шрифтов семейства Ponomar Unicode https://sci.ponomar.net/).
    
    В мастер странице вместо маркера текущей страницы ставится знак #.
    Скрипт запускается для документа, 
    знак # заменяется на номер текущей страницы в ЦСЯ.
    
    AgripniSoft, ҂вк҃а
*/

var allPages = app.activeDocument.pages;  
for (iterate=0; iterate<allPages.length; iterate++)  
{  
          customPageNumber (allPages[iterate]);  
}  
alert("Готово!");  
  
function customPageNumber (aPage)  
{  
          if (aPage.appliedMaster == null)  
                    return;  
  
  
          pageSide = (aPage.side == PageSideOptions.RIGHT_HAND) ? 1 : 0;  
          masterFrame = findFrameContaining (aPage.appliedMaster, pageSide, '#');  
          if (masterFrame != null)  
          {  
                    frame = findByLabel (aPage.pageItems, "page number");  
                    if (frame != null)  
                    {  
                              frame.removeOverride();  
                    }  
                    frame = masterFrame.override (aPage);  
                    frame.label = "page number";  
  
                    placeholder = frame.contents.indexOf ('#');  
                    if (placeholder != -1)  
                    {  
                              pageString = numberToText(Number(aPage.name));  
                              //pageString = pageString.substr(0,1).toUpperCase()+pageString.substr(1);  
                              frame.characters[placeholder].contents = pageString;  
                    }  
          }  
}  
  
  
function findFrameContaining (master, side, text)  
{  
          var masterPage;  
          var i;  
  
          if (master.pages.length > 1)  
                    masterPage = master.pages[side];  
          else  
                    masterPage = master.pages[0];  
          for (i=0; i<masterPage.textFrames.length; i++)  
          {  
                    if (masterPage.textFrames[i].contents.indexOf(text) > -1)  
                              return masterPage.textFrames[i];  
          }  
          // Not found? Perhaps on this Master's Master?  
          if (master.appliedMaster != null)  
                    return findFrameContaining (master.appliedMaster, side, text);  
          return null;  
}  
  
  
// Needed because the very useful label lookup was  
// -- totally unnecessarily! -- removed in CS5+ ...  
function findByLabel (items, label)  
{  
          var i;  
          for (i=0; i<items.length; i++)  
                    if (items[i].label == label)  
                              return items[i];  
          return null;  
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
      var thousands_str = ones_list[thousands];
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
