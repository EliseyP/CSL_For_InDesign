//Скрипт создал DAndr, ел. почта: niko1987a@yandex.ru или niko1987nk@gmail.com.   // VK: https://vk.com/id547800930
//Спасибо за помощь   Михаилу Иванюшину, 2012-2016  ivanyushin#yandex.ru  m.ivanyushin#gmail.com сайт:  http://adobeindesign.ru
//#target indesign
var myProgramTitul = "PerenosTexta.3.1";
// За основу взята идея http://forums.adobe.com/message/3152162#3152162
var ProgressBar = function(title)
{
    var w = new Window('palette', title, {x:0, y:0, width:640, height:60},{closeButton: false}),
        pb = w.add('progressbar', {x:20, y:32, width:600, height:12}),
        st = w.add('statictext', {x:20, y:12, width:600, height:20});
		st.justify = 'left';
		w.center();
    this.reset = function(msg,maxValue) {
	 // эта установка определяет, что прогресс бар будет расти по мере исполнения задачи
          st.text = msg;
          pb.value = 0;
          pb.maxvalue = maxValue;
          w.show();
          };
	this.show = function() {w.show();}; // эта функция открывает окно отображения исполнения задания    
	this.hit = function() {++pb.value;}; // обращение к этой функции в цикле for будет наращивать длину полосы отображения исполнения задания
	this.hide = function() {w.hide();}; // эта функция гасит окно отображения исполнения задания
    this.close = function() {w.close();}; // эта функция удаляет окно отображения исполнения задания
}
//---------------------------------------------------------------------------
function main(){//startdivisionOfWord
  if(app.documents.length == 0){alert("Пожалуйста откройте документ и попробуйте еще раз.\nPlease open a document and try again.");exit();}
  if(app.selection.length == 0){alert("Пожалуйста выберите текст или текстовый фрейм и попробуйте еще раз.\nPlease select some text or a text frame and try again.");exit();}
    var doc = app.activeDocument;
    var sel = doc.selection[0];
    var my_pages = doc.pages;
    var myStory = sel.parentStory;
    var myParentTextFrames = myStory.textContainers;
    var numberActiveFirstPage = Number(app.activeWindow.activePage.name);//Номер текущей страницы
    //Номер последней страницы статьи
    var lastPageOfparentStory = app.activeDocument.selection[0].parentStory.textContainers[app.activeDocument.selection[0].parentStory.textContainers.length-1].parentPage.name;
	

//----------------Диалоговое окно(модальное)------------------->
		  var myDialog = app.dialogs.add({name:"Создание кустоды для церковнославянских текстов v3.1"});
//---------------переменные для получения настроек из файла-------------------->
			var mySettings = [];//массив для настроек
			var FullScriptPath = myGetScriptPath();// получаем полный путь к запускаемому скрипту через функцию myGetScriptPath()
			var ScriptFolder = decodeURI(FullScriptPath.path);//путь к папке с запускаемым скриатом
			var settingFile = File(ScriptFolder + "/" + app.activeDocument.name + "Settings.ini");//переменная для файла, если файл не существует, то он будет создан
			if(settingFile.exists){//если файл существует то
                GetSettings();
                function GetSettings(){//
						settingFile.open("r");  //
						mySettings = settingFile.readln().split (",");//
						settingFile.close();//
					}//
				}//            
			with (myDialog.dialogColumns.add()){
             staticTexts.add({staticLabel:"Отступ сверху от основного текста"});
             staticTexts.add({staticLabel:"Отступ вправо от основного текста"});
             staticTexts.add({staticLabel:"Номер начальной страницы"});
             staticTexts.add({staticLabel:"Номер текстового фрейма на начальной странице"});
        }
		if((mySettings[0]!=undefined)&&(mySettings[1]!=undefined)&&(mySettings[2]!=undefined)&&(mySettings[3]!=undefined)){//если элементы массива mySettings не равны undefined, то
				with (myDialog.dialogColumns.add()){
					var myIndentField = textEditboxes.add({editContents:mySettings[0]});//
					var myIndentField2 = textEditboxes.add({editContents:mySettings[1]});//
					var myFirstPageNumberField = textEditboxes.add({editContents:mySettings[2]});//
					var myTextFrameNumberField = textEditboxes.add({editContents:mySettings[3]});//
				}
			}else{            
				with (myDialog.dialogColumns.add()){
					var myIndentField = textEditboxes.add({editContents:"0"});//
					var myIndentField2 = textEditboxes.add({editContents:"0"});//
					var myFirstPageNumberField = textEditboxes.add({editContents:"3"});//
					var myTextFrameNumberField = textEditboxes.add({editContents:"3"});//
				}
			}
            var myResult = myDialog.show();
        if (myResult == true){//aa
            var myIndent = Number(myIndentField.editContents);    //отступ сверху
            var myIndent2 = Number(myIndentField2.editContents); //отступ вправо 
            var myFirstPageNumber = Number(myFirstPageNumberField.editContents); //первая страница с переносом
            var myTextFrameNumber = Number(myTextFrameNumberField.editContents); //первый фрейм с переносом
//~             if(myFirstpage > myParentTextFrames.length-1){alert ("Неверный номер начальной страницы"); exit();}
            SaveSettings();
        function SaveSettings(){//
				mySettings[0] = myIndentField.editContents;//отступ сверху
				mySettings[1] = myIndentField2.editContents;//отступ вправо 
				mySettings[2] = myFirstPageNumberField.editContents;
				mySettings[3] = myTextFrameNumberField.editContents;
				//$.write (mySettings);
				settingFile.open("w");//
				settingFile.writeln(mySettings);//
				settingFile.close();//
				//$.write (myWin.location);//Это вывод данных в консоль для проверки
			}            
			myDialog.destroy();
//------------
//--------------------------------------------------->Проверка на наличие стиля абзаца с именем "Perenos"
            var myParaStyleNames = getParagraphStyleNames(); // Проверка на наличие стиля абзаца с именем "Perenos"
            var nameString = myParaStyleNames.join("|"); //Проверка на наличие стиля абзаца с именем "Perenos"
            var rez = nameString.match(/Perenos/); // Проверка на наличие стиля абзаца с именем "Perenos"
            if(rez == null){paragraphStyles_add();}//
//--------------------------------------------------->Размер страницы тоже bounds только не geometricBounds, а просто bounds
     var myPageBounds = my_pages[0].bounds; // [y1, x1, y2, x2] b - bounds
    app.findGrepPreferences = app.changeGrepPreferences = null;
    
//--------------------------------------------------->Прогресс бар
	var pBar = new ProgressBar(myProgramTitul);
	pBar.reset("Создаются переносы..." , myParentTextFrames.length-2);
for(i=myTextFrameNumber-1,j = myFirstPageNumber-1; i<=myParentTextFrames.length-2,j<=lastPageOfparentStory-2;i++,j++, pBar.hit()){//Start loop1

   // if(myParentTextFrames[i] != undefined && myParentTextFrames[i+1] != undefined){//прверкa на undefined
//                                                                                                     0   1    2    3
    var b = myParentTextFrames[i].geometricBounds; // [y1, x1, y2, x2] b - bounds 
    var w = Math.round(b[3] *100)/100 - Math.round(b[1] *100)/100; // x2 - x1 w: width 
    var h = Math.round(b[2] *100)/100 - Math.round(b[0] *100)/100; // y2 - y1 h: height
    var y1 = b[0] + h + myIndent;//отступ сверху
    var x1 = b[1] + w/2 + myIndent2;//отступ вправо
    var y2 = myPageBounds[2];
    var x2 = b[1] + w + myIndent2;//отступ вправо
    var txt1 = "";
    var myFrameOld = doc.pageItems.item("myPerenos" + Number(i));                              
                              if(myFrameOld.isValid == true){                                
                              myFrameOld.select();
                              myFrameOld.remove();
                              }    
    my_pages[j].textFrames.add({geometricBounds: Array(y1,x1,y2,x2), contents: txt1, name: "myPerenos" + Number(i)});//Создание маленького текстового фрейма для кустоды
    var myFrame = doc.pageItems.item("myPerenos" + Number(i));                              
                              if(myParentTextFrames[i].contents == "" && i<=myParentTextFrames.length-1){                                
                              continue;
                              }
                              
									if(myParentTextFrames[i+1].contents == "" && i<=myParentTextFrames.length-1){                                
									continue;
									}
                              
									if(myParentTextFrames[i+1].lines[0].words.length == 0 && i<=myParentTextFrames.length-1){// new if
									continue;
									}
							  
    
                                        if(myParentTextFrames[i+1].lines[0].contents.indexOf(" ")!=-1){
                                            sTemp = myParentTextFrames[i+1].lines[0].contents.split(" ");
                                            myFrame.texts[0].contents = sTemp[0];
                                            sTemp = [];
                                            }else{
                                            var sTemp = myParentTextFrames[i+1].lines[0].words[0].contents;
                                            myFrame.texts[0].contents = sTemp;
                                            sTemp = "";
                                            }
                                    try{    //---------------------------------->Перехват ошибки. После try{ - это место с возможной ошибкой
                                        myFrame.texts[0].appliedParagraphStyle ="Perenos";
                                        ///////////////
                                        myFrame.texts[0].select();
                                        app.findGrepPreferences.findWhat = "\\>.|\\>,|\\>:|\\>;";
                                        app.changeGrepPreferences.changeTo = "";
                                        myFrame.texts[0].changeGrep();
                                        var errCounter = 0;
                                        }catch(err) {// ------------------------->Если ошибка была обнаружена, то выполняется кусок кода, который находится после catch(err) {
                                                      errCounter += 1;
                                                      var sErrMsg = "\nВозникли ошибки на страницах:";
                                                      var sErr = sErr + "\n Страница " + Number(my_pages[j].name) + " " + err.message + "\n";
                                                      //$.writeln (sErr);
                                                      //alert("Ошибка! " + err.message + "\nДля продолжения просто нажмите OK.\n\n*Эта ошибка возникает, когда вместо текста идет картинка, как вложенный объект.");

                                                    }
                                    //}//конец прверки на undefined
                                            
                                        
    ////////////

//alert (j);
    }//Start loop1
	pBar.close();
        if(errCounter == 0){//Если не было ошибок, то обнуляем sErrMsg и sErr
            var sErrMsg = ""; 
            var sErr = ""; 
            }
        alert ("Переносы созданы.\nЗа вами проверка!\nВсего хорошего!\n" + sErrMsg + sErr,"Конец и Богу нашему слава!");
        my_pages[numberActiveFirstPage-1].select();
    exit();
    }//aa
        else{
            myDialog.destroy;
            }
}//start
main();
//app.doScript(divisionOfWord, undefined, undefined, UndoModes.ENTIRE_SCRIPT);//Отмена скрипта одним Ctrl +Z;
//__________________________________________________________________
//---------------------------------Дополнительные функции---------------------------------------------
            function getParagraphStyleNames() { // getParagraphStyleNames 
            var result = []; 
            var myParagraphStyles = app.activeDocument.allParagraphStyles; 
            var myParagraphStyleName, obj; 
            for (var i=0; i < myParagraphStyles.length ; i++) { // for 
                myParagraphStyleName = myParagraphStyles[i].name; 
                obj = myParagraphStyles[i]; 
            while(obj.parent instanceof ParagraphStyleGroup) { // while 
                myParagraphStyleName = obj.parent.name + ":" + myParagraphStyleName; 
                obj = obj.parent; 
                } // while 
                result.push(myParagraphStyleName); 
                } // for 
                // result.shift(); // удаление стиля No Paragraph Style 
            return result; 
            } // getParagraphStyleNames
//-------------------------------------------------------------------------------------------------------
function paragraphStyles_add(){
    var doc = app.activeDocument;
    var prgrphStyle = doc.paragraphStyles.add({name: "Perenos"});
    with(prgrphStyle){
    pointSize = 9;
    //appliedFont = "Canonic3 Ucs";//   it's working!!!
    justification = Justification.RIGHT_ALIGN;
    }
}  
function myGetScriptPath() { //myGetScriptPath
try{
    return app.activeScript;
                }
    catch(myError){
        return File(myError.fileName);
    }
} //myGetScriptPath

	
