//#target indesign
var myProgramTitul = "Remove kustoda";
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
//----------------------------------->
          var myDialog = app.dialogs.add({name:"Удаление кустоды"});
            
            var myResult = myDialog.show();
        if (myResult == true){//aa
            myDialog.destroy();
//------------

     var myPageBounds = my_pages[0].bounds; // [y1, x1, y2, x2] b - bounds
    app.findGrepPreferences = app.changeGrepPreferences = null;
    
//--------------------------------------------------->Прогресс бар
	var pBar = new ProgressBar(myProgramTitul);
	pBar.reset("Удаляются переносы..." , myParentTextFrames.length-2);
	
	for(i=0; i<=my_pages.length-2;i++, pBar.hit()){//Start loop1                                                                                                     0   1    2    3
		for(j=0; j<=my_pages[i].textFrames.length-1; j++){//Start loop2
		try{    //---------------------------------->Перехват ошибки. После try{ - это место с возможной ошибкой
		//...Your code
		var CheckTextFrameName = my_pages[i].textFrames[j].name;
			if (CheckTextFrameName.indexOf("myPerenos") !== -1){
				my_pages[i].textFrames[j].remove();
				// alert(CheckTextFrameName);
				continue
			}
			}catch(err) {// ------------------------->Если ошибка была обнаружена, то выполняется кусок кода, который находится после catch(err) {
		  alert("Ошибка! " + err.message + "\nДля продолжения просто нажмите OK.\n\n*Эта ошибка возникает, когда вместо текста идет картинка, как вложенный объект.");
						}// ------------------------->Если ошибка
		}//FStart loop2
	}//FStart loop1
		
		pBar.close();	 
			alert ("Переносы удалены.\nВсего хорошего!","Конец и Богу нашему слава!");
			my_pages[numberActiveFirstPage-1].select();
		exit();
		}//aa
			else{
				myDialog.destroy;
				}
}//start
main();
//app.doScript(RemoveKustoda, undefined, undefined, UndoModes.ENTIRE_SCRIPT);//Отмена скрипта одним Ctrl +Z;