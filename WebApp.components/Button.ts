import { Component, Element } from '../WebApp/WebApp.js';

export class Button extends Component<'button', Button.eventMap> {
    protected root: Element<"button">;
    protected text: Element<'span'>;
    protected image: Element<'img'>;
    public constructor(text: string, options: Button.options = {}) { super();
        this.root = Element.new('button', null, { class: 'Button' });
        this.text = Element.new('span', text, { class: 'Button-text' });
        this.image = Element.new('img', null, { class: 'Button-image' });
        this.root.append(this.text);
        

        console.log(this.root.classList, options.class)
        if (options.class) this.root.classList.add(...options.class.split(' '));
        if (options.image) this.setImage(options.image);

        this.root.on('click', () => this.emit('click'));
        this.root.on('mouseover', () => this.emit('hover'));
    }
    public setText(text: string): void {
        this.text.text = text;
    }
    public setImage(image?: string): void {
        this.image.setAttribute('src', image || '');
        if (image) this.image.appendTo(this.root);
        else this.image.remove();
    }
}
export namespace Button {
    export type options = {
        class?: string
        image?: string
    }
    export type eventMap = {
        click: () => void
        hover: () => void
    }
}
export default Button;