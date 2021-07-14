### Замена буквиц на символы из гарнитуры Bukvica UCS

#### Установка
В каталог ``Scripts Panel`` д.б. помещен  каталог ``LettrineBukvicaUCS/``  
(Весь каталог запакован в архив [LettrineBukvicaUCS.zip](../LettrineBukvicaUCS.zip))


Внутри находятся скрипты для запуска:  

- Замена с начертанием для прописных.  
[LettrineBukvicaUCS_CAPS.jsx](LettrineBukvicaUCS_CAPS.jsx)

- Замена с начертанием для строчных.  
[LettrineBukvicaUCS_small.jsx](LettrineBukvicaUCS_small.jsx)

И каталог [data](data) с библиотечным скриптом [functions.jsx](data/functions.jsx).

#### Использование
Подразумевается, что: 

Курсор находится в абзаце с одним из стилей:  
- "Абзац с большой буквицей".  
- "Абзац с большой буквицей и надстрочник".  
- "Абзац с большой буквицей и два надстрочника".  

Для этих стилей установлен символьный стиль для символов буквицы с гарнитурой ``Bukvica UCS`` и кол-во символов для буквицы 1, 2, 3 соответственно названию стиля.   

Кол-во символов рассчитывается исходя из того, что надстрочники при работе со шрифтами семейства ``Ponomar Unicode`` ***отделены и от буквы, и друг от друга.***    

Для абзаца начинающегося с **Оу** (+ надстрочники) выставляется стиль "Абзац с большой буквицей". Скрипт сам определит надстрочники и произведет замену. 

Сам текст абзаца набран для работы со шрифтом семейства ``Ponomar Unicode``.
   
После запуска одного из скриптов происходит замена символов буквицы, а также, если изменилось кол-во символов буквицы (если, например, замененный символ - единый монограф: буква + надстрочник(и) или надстрочник становится единым символом вместо двух), в таком случае заменяется и стиль абзаца на соответствующий.

В файле [Буквица.pdf](Буквица.pdf) 
результат работы скрипта с разными вариантами начертаний.  


#### Проблемы:
В отличие от замены символов, автоматическая смена стиля абзаца не включается в список Undo (Отмена).