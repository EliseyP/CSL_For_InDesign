//Скрипт создал DAndr, ел. почта: niko1987a@yandex.ru или niko1987nk@gmail.com.   // VK: https://vk.com/id547800930
//Спасибо за помощь   Михаилу Иванюшину, 2012-2016  ivanyushin#yandex.ru  m.ivanyushin#gmail.com сайт:  http://adobeindesign.ru
#targetengine "session"
   var myWindow = new Window ("palette", "Переносы (кустода)");
   myWindow.margins = 5;
   myWindow.orientation = "row";
   var btn1 = myWindow.add ("button", [0,0,60,25], "Создать");//("button", [0,0,25,25], "S")
   btn1.helpTip = "Создать новые или обновить существующие";
   var btn3 = myWindow.add ("button", [0,0,60,25], "Справка"); //Help
   btn3.helpTip = "Мини справка"; //Help
   btn1.onClick = function(){//1
            myFileName = "DivisionOfWord_v2.1.jsx";
            var myScriptFile = myGetScriptPath();
            var myScriptFolder = decodeURI(myScriptFile.path);
            var myFilePath = decodeURI(myScriptFolder + "/Sourse1/" +  myFileName); 
            var mySetFile = new File (myFilePath);
            if (!mySetFile.exists) { // !.exists
                alert("Не найден файл\n" + myFileName + ".\nОн должен быть в папке Sourse1");
                exit();
                } // !.exists
            app.doScript(mySetFile);
            ///////
            function myGetScriptPath() { //myGetScriptPath()
                try{
                    return app.activeScript;
                }
                catch(myError){
                    return File(myError.fileName);
                }
            } //myGetScriptPath()
        myWindow.close();//закрываем окно
}//1
//**************************************************************************
   btn3.onClick = function(){//3
   var strHelp = "   1) Поставьте курсор в основной текст и нажмите кнопку [Создать].\
   2) При необходимости обновить переносы* поставьте курсор в основной текст и снова нажмите кнопку [Создать].\n\
   «Отступ сверху от основного текста» — расстояние между основным текстовым блоком и создаваемым для кустоды, обычно ставится приблизительная целая цифра, а потом с помощью стиля абзаца Perenos, он создается автоматически, более точно регулировать отступ свойством «Смещение базовой линии».\n\
   «Отступ вправо от основного текста» — аргумент не обязательный, по умолчанию текстовый блок с кустодой выравнивается ровно по правому краю, относительно основного текстового блока.\n \
   При желании задать смещение вправо, вводится положительное целое число, при вводе отрицательного числа смещение будет в противоположную сторону, т.е. влево.\n \
   «Номер начальной страницы» — обычный номер страницы, с которого нужно начать создание кустоды.\n \
   «Номер текстового фрейма на начальной странице» — эти номера не всегда совпадают, более точно определить этот номер поможет сочетание клавиш Ctrl+Alt+Y – «посмотреть цепочки текста», и выделить чёрной стрелкой  текстовый блок.\n\n \
   *Переносы(кустода) — первое слово из следующей страницы печатаются в церковно-славянских книгах.\n\n\https://vk.com/id547800930"
alert(strHelp, "! Справка")
}//3
   myWindow.show ();