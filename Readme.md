---ОПИСАНИЕ---

Cuckoo - скрипт валидации формы. Проверка именни (латинь и кирилица), номеров телефонов и email. Отправка формы только через JQuery-AJAX

---ВОЗМОЖНОСТИ---

    Общее:
            -> возмоность выбрать обязательные поля
            -> отправка и настройка ajax 

    Для имени:
            -> диапазон длинны именни

    Для телефонов:
            -> выбор международного формата
    

---НАСТРОЙКА---

    Общее: 
        - сlass: 'cuckoo_name'  --> настройка своего класса для стилизации ( рекомендуется не менять)
        - require: true         --> настройка обязательности поля

    Для именни:
        - minlen: 2             --> минимальная длина именни (по-умолчанию)
        - maxlen: 16            --> максимальная длина именни (по-умолчанию)

    Для телефонов:
        - format: '380'         --> международный формат номера (обязательное поле)
        - len: 13               --> длина всего номера (обязательное поле)
            
---КАК ИСПОЛЬЗОВАТЬ---

    1. Вставить в index.html форму в таком формате:
        <form action="" class="cuckoo">

                <div class="cuckoo_wrapper">
                    <input type="text" placeholder="Input name..." class="cuckoo_name" type="text"> 
                    <div class="cuckoo_warning none"></div>
                </div>

                <div class="cuckoo_wrapper">
                    <input type="text" placeholder="Input phone..." class="cuckoo_phone" type="tel">
                    <div class="cuckoo_warning none"></div>
                </div>

                <div class="cuckoo_wrapper">
                    <input type="text" placeholder="Input email..." class="cuckoo_email" type="email">
                    <div class="cuckoo_warning none"></div>
                </div>

                <button class="cuckoo_submit">Отправить</button>
            
            </form>

    2. Подключить script.js, jquery.js, style.min.css
    3. Настройка под свои криетерии


