class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;

            return this;
        }
        return this.$el.outerHTML.trim();
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text;

            return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    clear() {
        this.html('');

        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    get data() {
        return this.$el.dataset;
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    css(styles = {}) {
        Object.keys(styles).forEach(propName => this.$el.style[propName] = styles[propName]);
    }

    focus() {
        this.$el.focus();
        return this;
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    id(parse) {
        if (parse) {
            const [row, col] = this.id().split(':');
            return {
                row: +row,
                col: +col,
            };
        }
        return this.data.id;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
