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

    В шрифте Bukvica UCS два вида начертания -
    для прописных и строчных букв (буквы самого текста).
    Данная версия скрипта выставляет начертание для строчных (small).

    AgripniSoft, ҂вк҃а
*/
#targetengine "session";

var aParameters = ["small"];
/*
    code from here (thanks!):
    http://adobeindesign.ru/2019/02/06/kustoda/
*/
var myFileName = "functions.jsx";
var myScriptFile = myGetScriptPath();
var myScriptFolder = decodeURI(myScriptFile.path);
var myFilePath = decodeURI(myScriptFolder + "/data/" +  myFileName); 
var mySetFile = new File (myFilePath);
if (!mySetFile.exists) { // !.exists
	alert("Не найден файл\n" + myFileName + ".\nОн должен быть в папке data");
	exit();
} // !.exists

// run with parameter.
app.doScript(mySetFile, ScriptLanguage.javascript, aParameters);

function myGetScriptPath() { //myGetScriptPath()
	try{
		return app.activeScript;
	}
	catch(myError){
		return File(myError.fileName);
	}
} //myGetScriptPath()
