(function(e){e.fn.clearForm=function(){return this.each(function(){var t=this.type,n=this.tagName.toLowerCase();if(n==="form")return e(":input",this).clearForm();t==="text"||t==="password"||n==="textarea"?jQuery(this).val(""):t==="hidden"&&this.name!=="csrfmiddlewaretoken"?jQuery(this).val(""):t==="checkbox"||t==="radio"?jQuery(this).attr("checked",!1):n==="select"&&jQuery(this).val("")})}})(jQuery),function(e){e.fn.ajaxform=function(t){var n=this;n.data("is_ajaxform",!0),t&&t.onSubmit&&(n.onSubmit=t.onSubmit),t&&t.onSuccess&&(n.onSuccess=t.onSuccess),t&&t.onError&&(n.onError=t.onError),t&&t.onFocus&&(n.onFocus=t.onFocus),t&&t.hasOwnProperty("clean")?n.clean=t.clean:n.clean=!0,n.submit(function(t){t.preventDefault(),n.onSubmit&&n.onSubmit(),e.post(n.attr("action"),n.serialize(),function(t){if(t){var r;t.success==="true"?(e(".error-field").remove(),e(".control-group.error").removeClass("error"),n.onSuccess&&n.onSuccess(t),t.redirect?window.location=t.redirect:n.clean&&n.clearForm()):t.success==="false"&&(e(".error-field").remove(),e(".control-group.error").removeClass("error"),e.each(t.errors,function(t,s){t==="__all__"&&(r=e("#validation-error"),r.length&&r.remove(),n.append('<div id="validation-error" class="error-field"><img src="/static/img/erro.png" /><span class="error-notice">Erro:</span>'+s+"</div>"));var o=n.find("#id_"+t);o.length||(o=n.find("input[name="+t+"]"));for(i=0;!o.is(".controls")&&i<5;o=o.parent(),i++);o.append('<div class="error-field"><img src="/static/img/erro.png" /><span class="error-notice">Erro:</span>'+s+"</div>"),o.parent().addClass("error")}),e(".btnClose").live("click",function(t){t.preventDefault(),e(this).parent().slideUp()}),n.onError&&n.onError(t))}})})}}(jQuery)