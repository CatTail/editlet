(function(){
    var INIT = 0;
    var LOADING = 1;
    var LOADED = 2;

    var editlet = window.__EDITLET__ = window.__EDITLET__ || {};
    editlet.STATUS = editlet.STATUS || INIT;

    if (editlet.STATUS === INIT) {
        editlet.title = document.title;
        editlet.STATUS = LOADING;
        document.title =  'Loading';
        document.body.appendChild(document.createElement('script')).src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
        document.body.appendChild(document.createElement('script')).src='https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.min.js';
    }
    var interval = setInterval(function() {
        if (window.$ && window.ace) {
            editlet.STATUS = LOADED;
            document.title = editlet.title;
            editlet.tempTextarea = $('<textarea></textarea>');
            ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0');
            clearInterval(interval);

            // toggle original textarea
            if (editlet.mode) {
                editlet.textarea.toggle();
                return;
            }

            // setup mode
            if (editlet.textarea) {
                editlet.mode = prompt('Setup editor mode');
                editlet.editor.getSession().setMode('ace/mode/' + editlet.mode);
                return;
            }

            $(document).bind('click', handleClick);

            function handleClick(event) {
                var target = event.target;
                if (target.tagName === 'TEXTAREA' ||
                    target.tagName === 'INPUT' && target.type === 'text') {
                    $(document).unbind('click', handleClick);
                    editlet.textarea = $(event.target).hide();
                    render()
                }
            }

            function render() {
                editlet.tempTextarea.insertAfter(editlet.textarea);
                editlet.editor = ace.edit(editlet.tempTextarea[0]);
                editlet.editor.setOptions({
                    maxLines: Infinity
                });
                editlet.editor.getSession().setValue(editlet.textarea.val());
                editlet.editor.getSession().on('change', function(){
                    editlet.textarea.val(editlet.editor.getSession().getValue());
                });
            }
        } else {
            document.title = document.title + ' .';
        }
    }, 500);
})();
