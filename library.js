var panda;

(function() {
    panda = (function (selector) {
        var field;
        if (typeof selector == 'undefined') {
            console.error('Please enter selector');
            return;
        }
		var startSelector = selector;

        field = document.querySelector(selector);
    
        return {
            // Dom change functions
            append: function(code) {
                field.innerHTML += code;
                return this;
            },
            html: function(code) {
                if (typeof code == 'undefined') {
                    return field.innerHTML;
                }
                field.innerHTML = code;
                return this;
            },
            text: function(code) {
                if (typeof code == 'undefined') {
                    return field.innerText;
                }
                field.innerText = code;
                return this;
            },
            attr: function(attributeType, attributeValue) {
                if (typeof attributeValue == 'undefined') {
                    return field.getAttribute(attributeType);
                } else {
                    field.setAttribute(attributeType, attributeValue);
                }
                return this;
            },
            removeAttr: function(attributeType) {
                field.removeAttribute(attributeType);
                return this;
            },
            remove: function() {
                field.parentNode.removeChild(field);
                return this;
            },

            // Style controll functions
            css: function(parameter, rule) {
                if (typeof parameter == 'object') {
                    for (var key in parameter) {
                        if (parameter.hasOwnProperty(key)) {
                            field.style[key] = parameter[key];
                        }
                    }
                } else if (typeof rule != 'undefined') {
                    field.style[parameter] = rule;
                } else {
                    return field.style[parameter];
                }

                return this;
            },

            // Three control functions
            parent: function() {
                field = field.parentNode;
                return this;
            },
            child: function() {
                field = field.children[0];
                return this;
            },
            find: function(selector) {
                return panda(startSelector + ' ' + selector);
            },
            next: function() {
                do {
                    field = field['nextSibling'];
                } while ( field && field.nodeType !== 1 );
                return this;
            },
            prev: function() {
                do {
                    field = field['previousSibling'];
                } while ( field && field.nodeType !== 1 );
                return this;
            },

            // Events functions
            click: function(callback) {
                field.addEventListener("click", callback)
                return this;
            },
            change: function(callback) {
                field.addEventListener("change", callback)
                return this;
            },
            mouseover: function(callback) {
                field.addEventListener("mouseover", callback)
                return this;
            },
            mouseout: function(callback) {
                field.addEventListener("mouseout", callback)
                return this;
            },
            mousemove: function(callback) {
                field.addEventListener("mousemove", callback)
                return this;
            },
        };
    });
})();

