define(["viewmodels/shell","services/displayService","services/utilities"],function(g,e,n){this.password=ko.observable(""),this.authorized=ko.observable(!1),this.Authenticate=function(){if(""==password())authorized(!1),e.display("אם אתה לא זוכר את הסיסמה, פנה לדני 4Z5SL או לגיל 4Z1KD","error");else{var g=n.base64Encode(password());"STcwaTEh"==g?authorized(!0):(authorized(!1),e.display("אם אתה לא זוכר את הסיסמה, פנה לדני 4Z5SL או לגיל 4Z1KD","error"))}};var o={activate:function(){},compositionComplete:function(){},Authenticate:Authenticate,authorized:authorized,shell:g};return o});