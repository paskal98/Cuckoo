
document.addEventListener("DOMContentLoaded",function(){
    'use strict';

    
/////SETTINGS/////
let language={
    ru:{
        long: 'имя слишком длинное',
        short: 'имя слишком короткое',
        onlyletters: 'имя может местить только буквы',
        onlynumbers:'только цифры',
        phonelong: 'слишком длинный номер',
        wrongemail: 'почта введена не верно',
        submit:'заполните форму'
    },
    en:{
        long: 'name to long',
        short: 'name to short',
        onlyletters: 'only letters',
        onlynumbers:'only numbers',
        phonelong: 'phone number to long',
        wrongemail: 'incorect email',
        submit:'set form'
    }
};

let settings={
    warnings: language.en,
    name:{
        class:'cuckoo_name',
        require: true,
        minlen: 2,
        maxlen:16
    },
    phone:{
        class:'cuckoo_phone',
        require:true,
        format: '380',
        len: 13
    },
    email:{
        class:'cuckoo_email',
        require: true
    },
    submit:{
        class:'cuckoo_submit'
    },
    AJAX: function(){
        $.ajax({
            type: 'POST',
            url: 'validate.php',
            data: 'name=name&email=example@example.com&phone=+380501234567',
            success: function(){
                console.log('good job!');
            }
        });
    }
};
//////////////////////////////


    function warning(item,text){
        item.classList.add('cuckoo_invalid');
        item.parentElement.querySelector('.cuckoo_warning').classList.remove('none');
        item.parentElement.querySelector('.cuckoo_warning').classList.add('flex');
        item.parentElement.querySelector('.cuckoo_warning').textContent=text;
    }

    function unsetWarning(item){
        item.classList.remove('cuckoo_invalid');
        item.parentElement.querySelector('.cuckoo_warning').classList.add('none');
        item.parentElement.querySelector('.cuckoo_warning').classList.remove('flex');
    }

    function blurEvent(item){
        if (item.value.length>0){
            item.parentElement.querySelector('.cuckoo_warning').classList.add('none');
            item.parentElement.querySelector('.cuckoo_warning').classList.remove('flex');
        } else {
            item.classList.remove('cuckoo_invalid');
            item.parentElement.querySelector('.cuckoo_warning').classList.add('none');
            item.parentElement.querySelector('.cuckoo_warning').classList.remove('flex');
        }
    }

    //name
    let name=document.querySelectorAll(`.${settings.name.class}`);

    name.forEach(function(item){

            item.classList.add('cuckoo_good');

            item.addEventListener('input',function(e){

                if (item.value.length<settings.name.minlen){ 
                    warning(item,settings.warnings.short);
                } 
                else if(item.value.length>settings.name.maxlen){
                    warning(item,settings.warnings.long);
                }
                else if((item.value.match(/([a-z]+|[а-яё]+)/gi)!= null && item.value.match(/([a-z]+|[а-яё]+)/gi).length>1 ) || item.value.match(/(\d|[\s\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\`\{\|\}\~\-])/)){
                    warning(item,settings.warnings.onlyletters);
                }
                else {
                    unsetWarning(item);
                }

            });

            item.addEventListener('blur',function(){
                blurEvent(item);
            });
    });
    

    //phone
    let phone=document.querySelectorAll(`.${settings.phone.class}`);

    function setReg(){
            return settings.phone.len-settings.phone.format.length-1;
    }

    function setWarningText(val){
            let format=val;
            for(let i=val.length;i<settings.phone.len;i++)
                format=format+'X';
            return format;
    }

    phone.forEach(function(item){
        
            item.classList.add('cuckoo_good');

            item.addEventListener('input',function(e){

                if(item.value.length<settings.phone.format.length+1){
                    item.value=item.value='+'+settings.phone.format;
                }
                else if(item.value.match(/((([a-z]|[а-яё])|[\s\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\`\{\|\}\~\-]))/gi).length>1){
                    warning(item,settings.warnings.onlynumbers);
                }
                else if(item.value.length>settings.phone.len){
                    warning(item,settings.warnings.phonelong);
                }
                else if (!item.value.match(RegExp('\\+'+settings.phone.format+'\\d'+'{'+setReg()+'}'))){ 
                    warning(item,setWarningText(item.value));
                } 
                else {
                    unsetWarning(item);
                }
            });

            item.addEventListener('click',function(){
                if(item.value.length<settings.phone.format.length+1){
                    item.value='+'+settings.phone.format;
                }
            });

            item.addEventListener('blur',function(){
                if (item.value.length==4){
                    item.value='';
                }
                blurEvent(item);
            });
    });
    

    //email
    let email=document.querySelectorAll(`.${settings.email.class}`);

    email.forEach(function(item){

            item.classList.add('cuckoo_good');

            item.addEventListener('input',function(e){

                if (!item.value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)){ 
                    warning(item,settings.warnings.wrongemail);
                }
                else {
                    unsetWarning(item);
                }

            });

            item.addEventListener('blur',function(){
                blurEvent(item);
            });
    });
    
   
    //submit
    let submit=document.querySelectorAll(`.${settings.submit.class}`);

    function countRequired(){
        let obj=[];
        for(let prop in settings){
            if(typeof settings[prop].require !== 'undefined'){
                if(settings[prop].require){
                    obj.push(settings[prop].class);
                }
            }
        }
        return obj;
    }

    submit.forEach(function(item){
        item.addEventListener('click',function(e){
            e.preventDefault();

            let submit;
            
            let inputs=item.parentElement.getElementsByTagName('input'),
                required=countRequired();

            for(let i=0;i<inputs.length;i++){
                submit=true;
                for (let j=0;j<required.length;j++){
                    if(inputs[i].className.match(RegExp(required[j]))!=null && inputs[i].value.length==0){
                        warning(inputs[i],settings.warnings.submit);
                        submit=false;
                     }
                }
            }

            if (submit==true){
                settings.AJAX;
            }

        });

        item.addEventListener('blur',function(){
            let inputs=item.parentElement.getElementsByTagName('input'),
                required=countRequired();

            for(let i=0;i<inputs.length;i++){
                if(inputs[i].className.match(RegExp(required[i]))!=null){
                  blurEvent(inputs[i]);
                }
            }
        });
    });

});